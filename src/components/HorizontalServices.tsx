import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "../data/mockData";

export default function HorizontalServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section 
      ref={targetRef} 
      className="relative h-[400vh] bg-background-light" // Long container to allow scrolling
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
                // Apply offset to every OTHER item (odd index) to create staggering
                offset={index % 2 !== 0} 
              />
            </div>
          ))}
          
        </motion.div>
      </div>
    </section>
  );
}
