import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { MAIN_NAV, SERVICES_NAV } from "../config/nav";
import { supabase } from "../lib/supabase";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    
    setSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from("contact_requests").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        type: 'footer-quick-contact',
        status: 'new'
      });

      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "" });
    } catch (err: unknown) {
      console.error("Error submitting contact form:", err);
      setSubmitError("Er ging iets mis. Probeer het later opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#121212] text-white pt-20 pb-10" id="contact">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Column 1: Onze Diensten — from config (same order/labels as before) */}
          <div>
            <h3 className="font-display text-2xl italic mb-8 relative inline-block">
              Onze Diensten
              <span className="absolute left-0 bottom-0 w-12 h-[1px] bg-[#C4A47C]"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {SERVICES_NAV.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Menu — same links and order as header (single source of truth) */}
          <div>
            <h3 className="font-display text-2xl italic mb-8 relative inline-block">
              Menu
              <span className="absolute left-0 bottom-0 w-12 h-[1px] bg-[#C4A47C]"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="hover:text-white transition-colors">
                    {"footerLabel" in item && item.footerLabel ? item.footerLabel : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-display text-2xl italic mb-8 relative inline-block">
              Contact
              <span className="absolute left-0 bottom-0 w-12 h-[1px] bg-[#C4A47C]"></span>
            </h3>
            <div className="space-y-8 text-sm text-gray-400">
              <div>
                <h4 className="text-white font-bold mb-2">Adres</h4>
                <p>Braakweg 22b</p>
                <p>5708 JK Helmond</p>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-2">Contactgegevens</h4>
                <p><a href="mailto:info@renovawrap.nl" className="hover:text-primary transition-colors">info@renovawrap.nl</a></p>
                <p><a href="tel:+310201234567" className="hover:text-primary transition-colors">+31 (0)20 123 4567</a></p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-2">Openingstijden</h4>
                <div className="grid grid-cols-[60px_1fr]">
                  <span>Ma - Vr:</span>
                  <span>09:00 - 17:30</span>
                </div>
                <div className="grid grid-cols-[60px_1fr]">
                  <span>Za - Zo:</span>
                  <span>Gesloten</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Snel Contact */}
          <div>
            <h3 className="font-display text-2xl italic mb-8 relative inline-block">
              Snel Contact
              <span className="absolute left-0 bottom-0 w-12 h-[1px] bg-[#C4A47C]"></span>
            </h3>
            {submitted ? (
              <div className="bg-[#1E1E1E] p-6 rounded border border-[#C4A47C]/20 text-center">
                <div className="w-12 h-12 bg-[#C4A47C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[#C4A47C] text-2xl">check</span>
                </div>
                <h4 className="text-white font-bold mb-2 font-display italic">Bedankt!</h4>
                <p className="text-gray-400 text-sm">We hebben je bericht ontvangen. We nemen zo snel mogelijk contact op.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs text-[#C4A47C] font-bold tracking-widest uppercase hover:text-white transition-colors"
                >
                  Nieuw bericht
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {submitError && (
                  <div className="text-red-400 text-xs bg-red-900/20 p-3 rounded border border-red-900/50">
                    {submitError}
                  </div>
                )}
                <div>
                  <input 
                    type="text" 
                    placeholder="Naam"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#1E1E1E] border border-[#333] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Adres" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-[#1E1E1E] border border-[#333] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Telefoonnummer" 
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-[#1E1E1E] border border-[#333] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-white text-black font-bold text-xs tracking-widest uppercase py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                      <span>VERSTUREN...</span>
                    </>
                  ) : (
                    <span>VERSTUREN</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center mb-4 md:mb-0">
            <span>© {currentYear} Renovawrap.</span>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/algemene-voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Root & Logic Branding */}
        <div className="flex justify-center border-t border-white/5 pt-8">
          <a 
            href="https://rootandlogic.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-[10px] tracking-widest group transition-colors font-sans"
          >
            <span className="text-gray-600 uppercase group-hover:text-gray-400">Website Powered By</span>
            <span className="font-bold text-white group-hover:text-primary transition-colors flex items-center">
              <span className="text-white mr-1 font-bold">./</span>
              Root & Logic
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
