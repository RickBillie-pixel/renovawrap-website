import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Download, X, Check, Search, ChefHat, Square, DoorOpen, Wrench, Box, Camera, Upload, CheckCircle2 } from "lucide-react";
import { getWrapColors } from "@/lib/wrapColors";
import { supabase } from "@/lib/supabase";
import { useSEO, buildBreadcrumbs, canonicalFor } from "@/hooks/useSEO";

const applicationTypes = [
  { 
    value: "keukens", 
    label: "Keukens", 
    description: "Kastdeuren, fronten en panelen",
    icon: ChefHat,
  },
  { 
    value: "aanrechtbladen", 
    label: "Aanrechtbladen", 
    description: "Werkbladen en aanrecht oppervlakken",
    icon: Square,
  },
  { 
    value: "kozijnen", 
    label: "Kozijnen", 
    description: "Raam- en deurkozijnen",
    icon: DoorOpen,
  },
  { 
    value: "deuren", 
    label: "Deuren", 
    description: "Binnen- en buitendeuren",
    icon: DoorOpen,
  },
  { 
    value: "schadeherstel", 
    label: "Schadeherstel", 
    description: "Reparatie van beschadigde oppervlakken",
    icon: Wrench,
  },
  { 
    value: "kasten", 
    label: "(Inbouw)Kasten", 
    description: "Wandkasten, inbouwkasten en meubels",
    icon: Box,
  },
];

export default function Configurator() {
  useSEO({
    title: "AI Configurator — Ontwerp Uw Keuken | Renovawrap",
    description: "Gebruik onze AI configurator om uw droomkeuken te ontwerpen. Upload een foto en zie direct het resultaat met premium wrapping.",
    canonical: canonicalFor("/configurator"),
    jsonLd: buildBreadcrumbs([
      { name: "Home", url: canonicalFor("/") },
      { name: "Configurator", url: canonicalFor("/configurator") },
    ]),
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [colorSearch, setColorSearch] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>("");
  
  // Terms checkbox state
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Contactgegevens voor submission (vereist voor verzenden)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const hasValidContact = name.trim().length >= 2 && isValidEmail(email);

  // Subscribe to realtime updates for the submission
  useEffect(() => {
    if (!submissionId) return;

    const channel = supabase
      .channel('schema-db-changes-public')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'submissions', // Listening to public submissions table if you have a result_url there
          filter: `id=eq.${submissionId}`,
        },
        (payload: any) => {
          console.log('Received update:', payload);
          const newData = payload.new as any;
          if (newData.result_url) {
            setGeneratedImage(newData.result_url);
            setIsGenerating(false);
            setSubmissionId(null);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [submissionId]);

  const allColors = getWrapColors();
  
  const filteredColors = allColors.filter(color =>
    color.name.toLowerCase().includes(colorSearch.toLowerCase()) ||
    color.code?.toLowerCase().includes(colorSearch.toLowerCase())
  );

  // Check valid steps for UI progress
  const step1Complete = !!uploadedImage;
  const step2Complete = !!selectedApplication;
  const step3Complete = !!selectedColor;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Bestand is te groot. Maximaal 10MB.");
        return;
      }

      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `public-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('configurator-uploads') // Ensure this bucket exists and has public write access
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('configurator-uploads')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleGenerate = async () => {
    if (!canGenerate) {
       // Should be disabled but just in case
       return;
    }

    setIsGenerating(true);
    setLoadingStep("upload");

    try {
      let imageUrl = uploadedImage;
      
      // Step 1: Upload image
      if (uploadedFile) {
        setLoadingStep("upload");
        
        const uploadedUrl = await uploadImageToSupabase(uploadedFile);
        if (!uploadedUrl) {
          throw new Error("Kon afbeelding niet uploaden. Probeer het opnieuw.");
        }
        imageUrl = uploadedUrl;
      }

      // Step 2: Prepare data
      setLoadingStep("prepare");
      const selectedService = applicationTypes.find(a => a.value === selectedApplication);
      const serviceDetails = selectedService ? {
        value: selectedService.value,
        label: selectedService.label,
        description: selectedService.description
      } : null;

      const selectedColorData = allColors.find(c => c.id === selectedColor);
      let colorImageUrl = selectedColorData?.image || '';
      if (colorImageUrl && !colorImageUrl.startsWith('http')) {
        const cleanPath = colorImageUrl.startsWith('/') ? colorImageUrl : `/${colorImageUrl}`;
        colorImageUrl = `${window.location.origin}${cleanPath}`;
      }

      const colorDetails = selectedColorData ? {
        id: selectedColorData.id,
        name: selectedColorData.name,
        code: selectedColorData.code,
        image_url: colorImageUrl
      } : null;

      // Step 3: Send to webhook
      setLoadingStep("webhook");

      // For public configurator, we need email/name usually, 
      // but if we want to allow anonymous partial usage we might need to adjust the Edge Function
      // or prompt for email in step 4.
      // Assuming for now we send dummy data or just what we have.
      // NOTE: The `submit-configuration` function usually expects `email` and `name`. 
      // If you want purely anonymous usage, you might need to supply placeholders or update the function.
      
      // Prompt user for email/name? Or just assume anonymous for now?
      // Let's use placeholders if we don't have a form, or add a simple form in Step 4.
      // For this port, I will add simple dummy data or use a "Anonymous User" if not collected.
      
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'submit-configuration',
        {
          body: {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            address: address.trim() || null,
            service_details: serviceDetails,
            color_details: colorDetails,
            image_url: imageUrl,
          },
        }
      );

      if (functionError) {
        throw new Error(functionError.message || "Er is een fout opgetreden bij het verzenden.");
      }

      setSubmissionId(functionData.submission_id);
      setLoadingStep("success");
      
      // Wait for realtime update (handled by useEffect)
      
    } catch (error: any) {
      console.error("Submission error:", error);
      setIsGenerating(false);
      setLoadingStep("");
      alert(`Fout bij genereren: ${error.message}`);
    }
  };

  const handleDownload = (url: string) => {
    if (url) {
      const link = document.createElement("a");
      link.download = `renovawrap-result-${Date.now()}.jpg`;
      link.href = url;
      link.target = "_blank";
      link.click();
    }
  };

  const canGenerate =
    uploadedImage &&
    selectedApplication &&
    selectedColor &&
    termsAccepted &&
    hasValidContact &&
    !isGenerating;

  return (
    <main className="w-full bg-background-light font-body transition-colors duration-300">
      {/* Steps Header */}
      <div className="sticky top-[81px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 hidden md:block">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
            <a className={`flex items-center gap-2 transition-colors ${step1Complete ? 'text-primary' : ''}`} href="#upload">
              <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] ${step1Complete ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>1</span>
              Upload
            </a>
            <div className={`flex-grow mx-4 h-px ${step1Complete ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <a className={`flex items-center gap-2 hover:text-primary transition-colors ${step2Complete ? 'text-primary' : ''}`} href="#wrap-type">
              <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] ${step2Complete ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>2</span>
              Keuze
            </a>
            <div className={`flex-grow mx-4 h-px ${step2Complete ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <a className={`flex items-center gap-2 hover:text-primary transition-colors ${step3Complete ? 'text-primary' : ''}`} href="#colors">
              <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] ${step3Complete ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>3</span>
              Kleur
            </a>
            <div className={`flex-grow mx-4 h-px ${step3Complete ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <a className="flex items-center gap-2 hover:text-primary transition-colors" href="#terms-section">
              <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">4</span>
              Afronden
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center border-b border-gray-100 scroll-mt-24">
        <p className="text-xs font-bold tracking-[0.3em] text-[#A0A0A0] uppercase mb-6">Ontwerp Uw Interieur</p>
        <h2 className="font-display text-5xl md:text-7xl text-primary mb-12 leading-tight">Zie Uw Droomproject Voor U</h2>
        
        {generatedImage && (
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-12 max-w-4xl mx-auto"
              >
                 <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img src={generatedImage} alt="Gegenereerd Resultaat" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8 text-white text-left">
                        <h3 className="text-2xl font-display font-bold mb-2">Uw Nieuwe Look</h3>
                        <p className="opacity-90 mb-6">Klaar om dit werkelijkheid te maken?</p>
                        <div className="flex gap-4">
                             <button onClick={() => handleDownload(generatedImage)} className="bg-white text-primary px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors flex items-center">
                                <Download className="w-4 h-4 mr-2" /> Download
                             </button>
                             <a href="/contact" className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-primary-dark transition-colors border border-white/20">
                                Offerte Aanvragen
                             </a>
                        </div>
                    </div>
                 </div>
              </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#FFF5EB] rounded-full flex items-center justify-center mb-6">
              <Camera className="text-primary text-xl" />
            </div>
            <h3 className="font-display text-xl mb-3 text-dark">1. Upload Foto</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">
              Upload een duidelijke foto van uw huidige keuken, kast of meubelstuk.
            </p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 bg-[#FFF5EB] rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-primary text-xl" />
            </div>
            <h3 className="font-display text-xl mb-3 text-dark">2. Kies Opties</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">
              Selecteer wat u precies wilt wrappen en uw gewenste premium kleur.
            </p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 bg-[#FFF5EB] rounded-full flex items-center justify-center mb-6">
              <Sparkles className="text-primary text-xl" />
            </div>
            <h3 className="font-display text-xl mb-3 text-dark">3. Ontvang Resultaat</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">
              Onze AI genereert direct een realistisch voorbeeld voor uw project.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="scroll-mt-24 w-full bg-white py-24" id="upload">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/3">
              <span className="text-primary font-bold text-xs tracking-widest uppercase mb-4 block">Stap 01</span>
              <h3 className="font-display text-4xl text-primary mb-6">Upload Uw Afbeelding</h3>
              <p className="text-gray-500 leading-relaxed">
                Begin door een foto van uw ruimte te uploaden. Zorg voor goede belichting voor het beste resultaat.
              </p>
            </div>
            <div className="w-full md:w-2/3">
              {uploadedImage ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                      <img src={uploadedImage} alt="Uploaded" className="w-full h-auto max-h-[600px] object-cover" />
                      <button 
                        onClick={() => {
                            setUploadedImage(null);
                            setUploadedFile(null);
                            setGeneratedImage(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white text-gray-700 hover:text-red-500 transition-colors shadow-md"
                        aria-label="Foto verwijderen"
                      >
                          <X className="w-6 h-6" />
                      </button>
                  </div>
              ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 hover:border-primary transition-colors rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-background-light min-h-[400px] cursor-pointer group"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-10 h-10" />
                    </div>
                    <h4 className="font-display text-2xl mb-2 text-dark">Klik om te uploaden</h4>
                    <p className="text-sm text-gray-500 mb-8 max-w-sm">
                      Sleep uw bestand hierheen of klik om te bladeren. JPG, PNG of WEBP (max. 10MB)
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <button className="flex items-center justify-center px-8 py-4 bg-primary text-white rounded uppercase text-xs font-bold tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                         <Camera className="w-4 h-4 mr-2" /> Selecteer Foto
                      </button>
                    </div>
                  </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                aria-label="Kies een foto om te uploaden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wrap Type Section */}
      <section className="scroll-mt-24 w-full bg-background-light py-24" id="wrap-type">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs tracking-widest uppercase mb-4 block">Stap 02</span>
            <h3 className="font-display text-4xl text-primary">Wat Wilt U Wrappen?</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {applicationTypes.map((item, index) => {
                const Icon = item.icon;
                const isSelected = selectedApplication === item.value;
                return (
                  <label key={index} className="cursor-pointer group relative">
                    <input 
                        className="peer sr-only" 
                        name="wrap_type" 
                        type="radio" 
                        value={item.value}
                        checked={isSelected}
                        onChange={() => setSelectedApplication(item.value)}
                    />
                    <div className={`flex flex-col p-8 border bg-white rounded-2xl transition-all h-full ${isSelected ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background-light shadow-xl' : 'border-transparent shadow-soft hover:shadow-md'}`}>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400 group-hover:text-primary'}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h4 className={`font-display text-xl mb-2 ${isSelected ? 'text-primary' : 'text-dark'}`}>{item.label}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                     {isSelected && (
                        <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1">
                            <Check className="w-4 h-4" />
                        </div>
                     )}
                  </label>
            )})}
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="scroll-mt-24 w-full bg-white py-24" id="colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/4">
              <span className="text-primary font-bold text-xs tracking-widest uppercase mb-4 block">Stap 03</span>
              <h3 className="font-display text-4xl text-primary mb-6">Kies Uw Kleur</h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Ontdek ons assortiment hoogwaardige folies. Van natuurlijke houtnerven tot moderne matte afwerkingen.
              </p>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <Search className="w-5 h-5" />
                </span>
                <input
                  className="w-full pl-12 pr-4 py-4 border border-gray-100 rounded-xl bg-gray-50 text-sm focus:ring-primary focus:border-primary text-dark placeholder-gray-400 transition-shadow focus:shadow-md"
                  placeholder="Zoek op naam of code..."
                  type="text"
                  value={colorSearch}
                  onChange={(e) => setColorSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredColors.map((color) => (
                  <button 
                    key={color.id} 
                    onClick={() => setSelectedColor(color.id)}
                    className={`cursor-pointer group relative aspect-square rounded-xl overflow-hidden border-2 transition-all shadow-sm ${selectedColor === color.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent hover:border-primary/50'}`}
                  >
                    <img 
                      alt={color.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      src={color.image} 
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-[10px] text-white font-medium truncate text-center">{color.name}</p>
                        {color.code && <p className="text-[9px] text-gray-300 text-center">{color.code}</p>}
                    </div>
                    {selectedColor === color.id && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-lg">
                          <Check className="w-6 h-6" />
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Contact Section */}
      <section className="scroll-mt-24 w-full bg-background-light py-24" id="terms-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-primary font-bold text-xs tracking-widest uppercase mb-4 block">Afronden</span>
          <h3 className="font-display text-4xl text-primary mb-12">Uw Gegevens & Versturen</h3>
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft text-left">
            <p className="text-gray-600 mb-8">
              Vul uw gegevens in zodat we uw aanvraag kunnen verwerken en het resultaat met u kunnen delen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-dark mb-2" htmlFor="config-name">
                  Naam <span className="text-red-500">*</span>
                </label>
                <input
                  id="config-name"
                  type="text"
                  required
                  placeholder="Bijv. Jan Jansen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-dark placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2" htmlFor="config-email">
                  E-mailadres <span className="text-red-500">*</span>
                </label>
                <input
                  id="config-email"
                  type="email"
                  required
                  placeholder="bijv@voorbeeld.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-dark placeholder-gray-400 ${email && !isValidEmail(email) ? 'border-red-300' : 'border-gray-200'}`}
                />
                {email && !isValidEmail(email) && (
                  <p className="mt-1 text-sm text-red-500">Voer een geldig e-mailadres in.</p>
                )}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-dark mb-2" htmlFor="config-address">
                Adres <span className="text-gray-400 font-normal">(optioneel)</span>
              </label>
              <input
                id="config-address"
                type="text"
                placeholder="Straat, huisnummer, postcode en plaats"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-dark placeholder-gray-400"
              />
            </div>
            <div className="flex items-start text-left mb-10">
              <input
                className="mt-1.5 w-6 h-6 text-primary border-gray-200 rounded focus:ring-primary bg-transparent cursor-pointer"
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label className="ml-4 text-sm text-gray-600 leading-relaxed cursor-pointer select-none" htmlFor="terms">
                Ik ga akkoord met de <a className="underline text-primary hover:text-primary-dark" href="#">algemene voorwaarden</a> en begrijp dat dit een indicatief voorbeeld is. Het eindresultaat kan afwijken van het gegenereerde voorbeeld.
              </label>
            </div>
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`w-full py-6 rounded-xl font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center text-lg shadow-lg ${canGenerate ? 'bg-secondary hover:bg-[#C2B29D] text-white transform hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  {loadingStep === "upload" && "Uploaden..."}
                  {loadingStep === "webhook" && "Aanvraag versturen..."}
                  {loadingStep === "success" && "Even geduld..."}
                  {!loadingStep && "Verwerken..."}
                </>
              ) : (
                <>
                  <Sparkles className={`mr-3 w-6 h-6 ${canGenerate ? 'animate-pulse' : ''}`} />
                  Versturen
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
