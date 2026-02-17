import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { services } from "../data/mockData";
import { MAIN_NAV, BASE_URL } from "../config/nav";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, X, Menu, ChevronDown, ArrowRight } from "lucide-react";

/** SiteNavigationElement JSON-LD — matches visible nav; no UI change. */
function NavSchema() {
  const itemListElement = MAIN_NAV.map((item, i) => ({
    "@type": "SiteNavigationElement" as const,
    position: i + 1,
    name: item.label,
    url: `${BASE_URL}${item.href === "/" ? "" : item.href}`,
  }));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement,
        }),
      }}
    />
  );
}

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Lock body scroll when mobile menu is open (client-only)
  useEffect(() => {
    if (!isMounted || typeof document === "undefined") return;
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMounted, isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };


  return (
    <>
      <header
        className={cn(
          "fixed w-full top-0 z-[999] transition-all duration-300 border-b",
          isScrolled
            ? "bg-background-light/95 backdrop-blur-md border-dark/5 py-4"
            : "bg-transparent border-transparent py-6"
        )}
      >
        <NavSchema />
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-tight group z-[1001]">
            <span className="font-display font-bold text-2xl tracking-tight group-hover:opacity-80 transition-opacity">
              <span className="text-dark">RENOVA</span><span className="text-primary">WRAP</span>
            </span>
            <span className="text-[10px] tracking-[0.3em] font-medium text-dark uppercase mt-0.5 border-t border-dark/20 pt-0.5 w-full text-center">
              Keuken & Interieur
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {/* Services Dropdown */}
            <div 
              className="relative group "
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
               <Link
                to="/diensten"
                className={cn(
                  "text-xs uppercase tracking-[0.15em] hover:text-primary transition-colors relative group py-4 flex items-center gap-1",
                  isActive("/diensten") ? "text-primary" : "text-dark"
                )}
              >
                Diensten
                <span className="material-symbols-outlined text-sm">expand_more</span>
                <span
                  className={cn(
                    "absolute bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full",
                    isActive("/diensten") && "w-full"
                  )}
                />
              </Link>
              
              {/* Dropdown Menu - Mega Menu Style */}
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-4 transition-all duration-200",
                isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
              )}>
                <div className="bg-white border border-gray-100 shadow-2xl rounded-xl p-6 grid grid-cols-2 gap-x-4 gap-y-2 relative overflow-hidden">
                  
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={service.link}
                      className="flex flex-col p-3 rounded-lg hover:bg-gray-50 transition-all group/item border border-transparent hover:border-gray-100"
                    >
                      <span className="font-display text-sm font-bold text-dark group-hover/item:text-primary transition-colors mb-0.5">
                        {service.title}
                      </span>
                      <span className="text-[11px] text-gray-500 leading-tight line-clamp-2">
                        {service.description.substring(0, 60)}...
                      </span>
                    </Link>
                  ))}
                  
                  <div className="col-span-2 border-t border-gray-100 mt-2 pt-4 flex justify-between items-center px-3">
                      <Link to="/diensten" className="text-xs font-bold uppercase tracking-wider text-primary hover:text-dark transition-colors flex items-center gap-2">
                        Alle Diensten Bekijken
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/over-ons"
              className={cn(
                "text-xs uppercase tracking-[0.15em] hover:text-primary transition-colors relative group",
                isActive("/over-ons") ? "text-primary" : "text-dark"
              )}
            >
              Over ons
              <span
                className={cn(
                  "absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full",
                  isActive("/over-ons") && "w-full"
                )}
              />
            </Link>

            <Link
              to="/projecten"
              className={cn(
                "text-xs uppercase tracking-[0.15em] hover:text-primary transition-colors relative group",
                isActive("/projecten") ? "text-primary" : "text-dark"
              )}
            >
              Projecten
              <span
                className={cn(
                  "absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full",
                  isActive("/projecten") && "w-full"
                )}
              />
            </Link>

            <Link
              to="/configurator"
              className={cn(
                "text-xs uppercase tracking-[0.15em] hover:text-primary transition-colors relative group font-bold text-primary",
                isActive("/configurator") ? "text-primary" : "text-primary"
              )}
            >
              Configurator
               <span
                className={cn(
                  "absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full",
                  isActive("/configurator") && "w-full"
                )}
              />
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <Link
              to="/contact"
              className="hidden md:inline-block bg-dark text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-primary transition-colors"
            >
              Contact
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-dark z-[1001]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay — only render portal in browser (SSR-safe) */}
        {isMounted && typeof document !== "undefined" && createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 bg-[#FFF9F0] z-[1000] md:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  
                  {/* Services Accordion */}
                  <div className="border-b border-dark/10 pb-4" onClick={(e) => e.stopPropagation()}>
                    <div 
                      className="flex items-center justify-between w-full mb-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileServicesOpen(!isMobileServicesOpen);
                      }}
                    >
                      <span className="text-3xl font-display text-dark font-medium">
                        Diensten
                      </span>
                      <motion.div
                        animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={24} className="text-dark/60" />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {isMobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" as const }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col space-y-3 py-2 pl-2">
                            {services.map((service) => (
                               <Link
                                key={service.id}
                                to={service.link}
                                className="text-lg text-dark/70 hover:text-primary transition-colors flex items-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 block"></span>
                                {service.title}
                              </Link>
                            ))}
                            <Link
                               to="/diensten"
                               className="text-sm font-bold uppercase tracking-wider text-primary pt-2 flex items-center gap-2"
                               onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Alle Diensten <ArrowRight size={14} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <Link
                      to="/projecten"
                      className="text-3xl font-display text-dark font-medium block border-b border-dark/10 pb-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Projecten
                    </Link>
                  </div>
                  
                  <div>
                    <Link
                      to="/over-ons"
                      className="text-3xl font-display text-dark font-medium block border-b border-dark/10 pb-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Over ons
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/configurator"
                      className="text-3xl font-display text-primary font-medium block border-b border-dark/10 pb-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Configurator
                    </Link>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <Link
                    to="/contact"
                    className="w-full bg-dark text-white text-center py-4 text-sm uppercase tracking-[0.2em] hover:bg-primary transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  <div className="flex justify-center gap-8 pt-4">
                     <a href="#" className="text-dark hover:text-primary transition-colors" aria-label="Instagram">
                      <Instagram size={24} />
                    </a>
                    <a href="#" className="text-dark hover:text-primary transition-colors" aria-label="Facebook">
                      <Facebook size={24} />
                    </a>
                    <a href="#" className="text-dark hover:text-primary transition-colors" aria-label="LinkedIn">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </header>
    </>
  );
}
