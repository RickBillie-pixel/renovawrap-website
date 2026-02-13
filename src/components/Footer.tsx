import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-white pt-20 pb-10" id="contact">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Onze Diensten */}
          <div>
            <h3 className="font-display text-2xl italic mb-8 relative inline-block">
              Onze Diensten
              <span className="absolute left-0 bottom-0 w-12 h-[1px] bg-[#C4A47C]"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/diensten/keuken-wrapping" className="hover:text-white transition-colors">Keuken Wrapping</Link></li>
              <li><Link to="/diensten/aanrechtbladen" className="hover:text-white transition-colors">Aanrechtbladen</Link></li>
              <li><Link to="/diensten/kasten" className="hover:text-white transition-colors">Inbouwkasten</Link></li>
              <li><Link to="/diensten/kozijnen" className="hover:text-white transition-colors">Kozijnen</Link></li>
              <li><Link to="/diensten/deuren" className="hover:text-white transition-colors">Deuren</Link></li>
              <li><Link to="/diensten/keuken-frontjes" className="hover:text-white transition-colors">Keuken Frontjes</Link></li>
              <li><Link to="/diensten/achterwanden" className="hover:text-white transition-colors">Achterwanden</Link></li>
              <li><Link to="/diensten/schadeherstel" className="hover:text-white transition-colors">Schadeherstel</Link></li>
            </ul>
          </div>

          {/* Column 2: Menu */}
          <div>
            <h3 className="font-display text-2xl italic mb-8 relative inline-block">
              Menu
              <span className="absolute left-0 bottom-0 w-12 h-[1px] bg-[#C4A47C]"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/over-ons" className="hover:text-white transition-colors">Over Ons</Link></li>
              <li><Link to="/projecten" className="hover:text-white transition-colors">Projecten</Link></li>
              <li><Link to="/configurator" className="hover:text-white transition-colors">Configurator</Link></li>
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
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Naam" 
                  className="w-full bg-[#1E1E1E] border border-[#333] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Adres" 
                  className="w-full bg-[#1E1E1E] border border-[#333] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Telefoonnummer" 
                  className="w-full bg-[#1E1E1E] border border-[#333] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-white text-black font-bold text-xs tracking-widest uppercase py-4 hover:bg-gray-200 transition-colors"
              >
                VERSTUREN
              </button>
            </form>
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
