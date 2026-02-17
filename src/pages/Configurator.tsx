import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Download, X, Check, Search, ChefHat, Square, DoorOpen, Wrench, Box, Camera, Upload, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, Info } from "lucide-react";
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
    title: "Configurator — Ontwerp Uw Interieur | Renovawrap",
    description: "Gebruik onze configurator om uw droominterieur te ontwerpen. Upload een foto en zie direct het resultaat met premium wrapping.",
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
  
  // Mobile Wizard Steps
  // 0: Intro/Upload
  // 1: Type
  // 2: Color
  // 3: Form
  const [currentStep, setCurrentStep] = useState(0);

  // Terms checkbox state
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Contactgegevens voor submission (vereist voor verzenden)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Separate ref for mobile to avoid conflicts if needed, though one is fine if logic holds
  const fileInputRefMobile = useRef<HTMLInputElement>(null);

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

  // Check valid steps for UI progress (Desktop)
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

  // Mobile Wizard Navigation
  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(c => c + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  // Determine if we can proceed to next step in Wizard
  const canProceedSteps = [
    !!uploadedImage, // Step 0: Upload
    !!selectedApplication, // Step 1: Type
    !!selectedColor, // Step 2: Color
    canGenerate // Step 3: Form (Submits instead of Next)
  ];

  return (
    <main className="w-full bg-background-light font-body transition-colors duration-300">
      

      <div className="block md:hidden fixed inset-0 top-[85px] z-30 bg-background-light flex flex-col font-sans">
        {/* Mobile Progress Bar - Minimalist */}
        <div className="relative z-50 bg-background-light/95 backdrop-blur-md border-b border-[#E6DCC3] px-6 py-3 shadow-sm">
             <div className="flex items-center justify-between mb-2">
                 <div className="flex flex-col">
                    <span className="font-display text-lg text-dark tracking-tight leading-none">
                        {currentStep === 0 && "Start Ontwerp"}
                        {currentStep === 1 && "Kies Type"}
                        {currentStep === 2 && "Kies Kleur"}
                        {currentStep === 3 && "Afronden"}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mt-0.5">
                        Stap {currentStep + 1} van 4
                    </span>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <span className="text-xs font-bold">{Math.round(((currentStep + 1) / 4) * 100)}%</span>
                 </div>
             </div>
             
             {/* Progress Bar */}
             <div className="h-1 bg-gray-100 rounded-full overflow-hidden w-full">
                <motion.div 
                    initial={{ width: "25%" }}
                    animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full bg-primary rounded-full"
                />
             </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-32 relative scroll-smooth no-scrollbar">
             <AnimatePresence mode="wait">
             {/* Step 0: Upload */}
             {currentStep === 0 && (
                 <motion.div 
                    key="step0"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col h-full items-center text-center"
                 >
                    <div className="mb-8 max-w-[280px]">
                        <h1 className="font-display text-3xl text-dark mb-3 leading-tight">Jouw Droominterieur.</h1>
                        <p className="text-gray-500 text-sm leading-relaxed">Upload een foto en zie direct hoe een wrap jouw ruimte transformeert.</p>
                    </div>

                    <div className="w-full flex-1 flex flex-col justify-center max-w-sm">
                        {uploadedImage ? (
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50 aspect-[4/5] w-full">
                                <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                <button 
                                    onClick={() => {
                                        setUploadedImage(null);
                                        setUploadedFile(null);
                                        if (fileInputRefMobile.current) fileInputRefMobile.current.value = "";
                                    }}
                                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-red-500 transition-all border border-white/30"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-6 left-6 text-white text-left">
                                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Jouw Foto</p>
                                    <p className="text-xs opacity-60">Klaar voor transformatie</p>
                                </div>
                            </div>
                        ) : (
                            <motion.div 
                                onClick={() => fileInputRefMobile.current?.click()}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="border border-dashed border-primary/20 hover:border-primary bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-sm hover:shadow-xl h-64 w-full group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 bg-background-light rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shadow-inner">
                                    <Camera className="w-10 h-10" />
                                </div>
                                <span className="font-display text-lg text-dark mb-2 group-hover:text-primary transition-colors">Maak of kies foto</span>
                                <span className="text-xs text-gray-400 bg-background-light px-3 py-1 rounded-full">JPG, PNG (max 10MB)</span>
                            </motion.div>
                        )}
                         <input
                            ref={fileInputRefMobile}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>
                 </motion.div>
             )}

             {/* Step 1: Type */}
             {currentStep === 1 && (
                 <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-3"
                 >
                    <div className="bg-white/50 border border-primary/10 p-4 rounded-xl flex items-start gap-3 mb-2">
                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-dark/80 leading-relaxed">
                            Selecteer het onderdeel dat je wilt aanpassen. Dit helpt ons om het beste resultaat te genereren.
                        </p>
                    </div>

                    {applicationTypes.map((item, index) => {
                        const Icon = item.icon;
                        const isSelected = selectedApplication === item.value;
                        return (
                            <motion.div 
                                key={item.value}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedApplication(item.value)}
                                className={`relative flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${isSelected ? 'border-primary bg-white shadow-lg shadow-primary/10 ring-1 ring-primary scale-[1.02]' : 'border-transparent bg-white shadow-sm hover:shadow-md'}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 text-gray-400'}`}>
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-display text-lg ${isSelected ? 'text-primary' : 'text-dark'}`}>{item.label}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed mt-1">{item.description}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-transparent'}`}>
                                    {isSelected && <Check size={14} strokeWidth={3} />}
                                </div>
                            </motion.div>
                        )
                    })}
                 </motion.div>
             )}

             {/* Step 2: Color */}
             {currentStep === 2 && (
                 <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col"
                 >
                    <div className="sticky top-0 z-10 bg-background-light pb-4 pt-1">
                        <div className="relative shadow-sm rounded-2xl bg-white overflow-hidden">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                            <input
                              className="w-full pl-12 pr-4 py-4 border-none text-base focus:ring-2 focus:ring-primary/20 placeholder-gray-400 font-medium"
                              placeholder="Zoek kleur of materiaal..."
                              type="text"
                              value={colorSearch}
                              onChange={(e) => setColorSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pb-4">
                        {filteredColors.map((color) => (
                           <button 
                             key={color.id} 
                             onClick={() => setSelectedColor(color.id)}
                             className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm transition-all ${selectedColor === color.id ? 'ring-4 ring-primary ring-offset-2 ring-offset-gray-50 z-10' : 'hover:opacity-90'}`}
                           >
                             <img 
                               src={color.image} 
                               alt={color.name}
                               className="w-full h-full object-cover"
                               loading="lazy"
                             />
                             {selectedColor === color.id && (
                               <motion.div 
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 className="absolute inset-0 bg-primary/40 flex items-center justify-center"
                               >
                                 <motion.div 
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    className="bg-white rounded-full p-2 shadow-lg"
                                 >
                                    <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                                 </motion.div>
                               </motion.div>
                             )}
                             <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 text-left">
                                <p className="text-[11px] text-white font-bold leading-tight shadow-black drop-shadow-sm">
                                    {color.name}
                                </p>
                             </div>
                           </button>
                        ))}
                    </div>
                 </motion.div>
             )}

             {/* Step 3: Form */}
             {currentStep === 3 && (
                 <motion.div 
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col h-full justify-center"
                 >
                    {generatedImage ? (
                        <div className="flex flex-col gap-6 items-center w-full">
                            <div className="relative w-full">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-[#D2C2AD] to-primary rounded-3xl opacity-30 blur-lg"></div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 w-full aspect-video bg-gray-100">
                                    <img src={generatedImage} alt="Resultaat" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className="text-center max-w-xs">
                                <h3 className="font-display text-2xl text-dark mb-2">Jouw Nieuwe Look</h3>
                                <p className="text-gray-500 text-xs">Dit is een impressie van de mogelijkheden.</p>
                            </div>

                            <div className="flex flex-col gap-3 w-full mt-2">
                                <button onClick={() => handleDownload(generatedImage)} className="w-full py-4 bg-white border border-gray-200 text-dark rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all">
                                    <Download size={16} /> Download
                                </button>
                                <a href="/contact" className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all relative overflow-hidden group">
                                    <span className="relative z-10 flex items-center gap-2">Offerte Aanvragen <ArrowRight size={16} /></span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </a>
                            </div>
                            <button 
                                onClick={() => {
                                    setGeneratedImage(null);
                                    setCurrentStep(0);
                                    setUploadedImage(null);
                                }}
                                className="text-gray-400 text-xs font-medium underline decoration-gray-300 underline-offset-4 text-center py-2 hover:text-primary transition-colors"
                            >
                                Start Nieuw Ontwerp
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h3 className="font-display text-2xl text-dark mb-1">Bijna daar!</h3>
                                <p className="text-gray-400 text-sm">Vul je gegevens in om het resultaat te zien.</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="group">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block ml-1 tracking-wider">Naam</label>
                                    <input
                                      type="text"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      className="w-full p-4 bg-gray-50 border border-transparent rounded-xl text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder-gray-300 outline-none"
                                      placeholder="Hoe mogen we je noemen?"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block ml-1 tracking-wider">Email</label>
                                    <input
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      className="w-full p-4 bg-gray-50 border border-transparent rounded-xl text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder-gray-300 outline-none"
                                      placeholder="uw@email.nl"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block ml-1 tracking-wider">Adres <span className="text-gray-300 font-normal normal-case">(Optioneel)</span></label>
                                    <input
                                      type="text"
                                      value={address}
                                      onChange={(e) => setAddress(e.target.value)}
                                      className="w-full p-4 bg-gray-50 border border-transparent rounded-xl text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder-gray-300 outline-none"
                                      placeholder="Waar staat je huis?"
                                    />
                                </div>
                                
                                <label className="flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="relative flex items-center pt-0.5">
                                         <input 
                                            type="checkbox" 
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-primary checked:bg-primary shadow-sm" 
                                        />
                                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 leading-relaxed">
                                        Ik ga akkoord met de <a href="#" className="text-primary underline">voorwaarden</a>.
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}
                 </motion.div>
             )}
             </AnimatePresence>
        </div>

        {/* Mobile Navigation Bar - Floating Effect */}
        {!generatedImage && (
            <div className="absolute bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-background-light via-background-light/95 to-transparent pt-12">
                <div className="flex gap-3 items-stretch">
                    {currentStep > 0 && (
                        <button 
                            onClick={prevStep}
                            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-gray-200 text-dark hover:bg-gray-50 transition-colors shadow-sm active:scale-95"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    
                    {currentStep < 3 ? (
                        <button 
                            onClick={nextStep}
                            disabled={!canProceedSteps[currentStep]}
                            className={`flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${canProceedSteps[currentStep] ? 'bg-primary text-white shadow-primary/30' : 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'}`}
                        >
                            Volgende <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button 
                             onClick={handleGenerate}
                             disabled={!canGenerate}
                             className={`flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl active:scale-[0.98] ${canGenerate ? 'bg-primary text-white shadow-primary/30' : 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'}`}
                        >
                             {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5 animate-pulse" />}
                             Genereer Resultaat
                        </button>
                    )}
                </div>
            </div>
        )}
      </div>

      {/* ================= DESKTOP SCROLL (hidden md:block) ================= */}
      <div className="hidden md:block">
        {/* Steps Header */}
        <div className="sticky top-[81px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
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
      </div>

    </main>
  );
}
