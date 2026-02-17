import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "../data/mockData";
import FadeIn from "./FadeIn";
import { Link } from "react-router-dom";

export default function HorizontalServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <>
      {/* DESKTOP: Horizontal Scroll */}
      <section 
        ref={targetRef} 
        className="hidden lg:block relative h-[400vh] bg-background-light" 
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div 
            style={{ x }} 
            className="flex gap-16 px-6 lg:px-24 items-center"
          >
            {/* Intro Text Block */}
            <div className="min-w-[400px] md:min-w-[500px] flex flex-col justify-center gap-6">
              <h2 className="font-display text-6xl md:text-8xl leading-[0.9] text-dark">
                Onze <br />
                <span className="italic text-primary ml-12">Diensten.</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Van complete keukentransformaties tot verfijnde details.
                Scroll verder om al onze specialisaties te ontdekken.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-dark/40">
                 <span className="material-symbols-outlined animate-bounce">arrow_right_alt</span>
                 Scroll
              </div>
            </div>

            {/* Cards Loop */}
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="min-w-[320px] md:min-w-[400px]"
              >
                <ServiceCard 
                  {...service} 
                  offset={index % 2 !== 0} 
                />
              </div>
            ))}
            
          </motion.div>
        </div>
      </section>

      {/* MOBILE: Vertical Stack with Animation & Asymmetry */}
      <section className="block lg:hidden bg-background-light py-24 px-6 overflow-hidden">
        <div className="flex flex-col gap-12">
            
           {/* Mobile Header */}
           <div className="mb-8">
              <h2 className="font-display text-5xl leading-[0.9] text-dark mb-4">
                Onze <br />
                <span className="italic text-primary ml-8">Diensten.</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Scroll naar beneden om onze specialisaties te ontdekken.
              </p>
           </div>

           {services.map((service, index) => (
             <FadeIn 
               key={service.id} 
               direction={index % 2 === 0 ? "left" : "right"}
               className="w-full"
               threshold={0.1}
             >
                <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                    
                    {/* Image Card */}
                    <div 
                      className={`relative w-[75%] aspect-[3/4] mb-6 shadow-2xl ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
                    >
                         <Link to={service.link} className="block w-full h-full overflow-hidden group">
                           <img
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            src={service.image}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        </Link>
                         
                         {/* Number Badge - Overlapping Bottom Corner */}
                         <div className={`absolute -bottom-5 ${index % 2 === 0 ? '-right-5' : '-left-5'} bg-white p-4 shadow-xl z-20`}>
                            <span className="font-display text-3xl text-primary font-bold">
                                {String(service.id).padStart(2, "0")}
                            </span>
                         </div>
                    </div>

                    {/* Text Content */}
                    <div className={`w-[85%] ${index % 2 === 0 ? 'text-left pl-2' : 'text-right pr-2'} mt-4`}>
                        <Link to={service.link} className="block group">
                            <h3 className="font-display text-3xl text-dark mb-3 group-hover:text-primary transition-colors leading-[0.9]">
                                {service.title}
                            </h3>
                             <p className="text-gray-500 text-xs leading-relaxed mb-4">
                               {service.description}
                             </p>
                             <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-dark group-hover:gap-5 transition-all ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                               Bekijk
                               <span className={`material-symbols-outlined text-sm ${index % 2 !== 0 ? 'rotate-180' : ''}`}>arrow_forward</span>
                             </div>
                        </Link>
                    </div>

                </div>
             </FadeIn>
           ))}
        </div>
      </section>
    </>
  );
}
