import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function KitchenBenefits() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section ref={containerRef} className="relative py-24 px-6 lg:px-8 overflow-hidden bg-[#F5F5F5] dark:bg-[#1A1A1A]">
      {/* Abstract Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
            style={{ y: y1 }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-[#C4A47C] opacity-10 blur-3xl rounded-full" 
        />
        <motion.div 
            style={{ y: y2 }}
            className="absolute top-1/2 right-0 w-80 h-80 bg-[#C4A47C] opacity-5 blur-3xl rounded-full transform translate-x-1/2" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section - Left aligned on mobile, centered on desktop */}
        <div className="text-left md:text-center mb-16 md:mb-24 max-w-3xl md:mx-auto">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full border border-[#C4A47C]/30 text-[#C4A47C] text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase mb-6 dark:border-[#C4A47C]/30"
          >
            Voordelen
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display text-gray-900 dark:text-[#FFF9F0] leading-[1.1] mb-6"
          >
            Waarom Keuken <span className="text-[#C4A47C] italic">Wrappen?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-[rgba(255,249,240,0.7)] font-light max-w-2xl md:mx-auto leading-relaxed border-l-2 border-[#C4A47C] pl-6 md:border-none md:pl-0"
          >
            Ontdek de kracht van renovatie met een ziel. Duurzaam, stijlvol en verrassend betaalbaar.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min"
        >
          {/* Item 01 */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-7 relative group"
          >
            <div className="h-full bg-white dark:bg-[#242424] rounded-sm p-8 md:p-12 shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-xl relative overflow-hidden">
              <span className="absolute -right-4 -bottom-12 text-[180px] font-display font-bold text-gray-100 dark:text-white/5 leading-none select-none z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                01
              </span>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#C4A47C]/10 flex items-center justify-center mb-6 text-[#C4A47C]">
                  <span className="material-symbols-outlined text-2xl">savings</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display text-gray-900 dark:text-[#FFF9F0] mb-4">
                  Tot 70% Goedkoper
                </h3>
                <p className="text-gray-600 dark:text-[rgba(255,249,240,0.7)] leading-relaxed text-lg max-w-md font-light">
                  Een nieuwe keuken kost al snel €8.000+. Wrappen kan al vanaf <strong>€750</strong>. Bespaar aanzienlijk op uw
                  renovatiebudget zonder in te leveren op kwaliteit.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Item 02 */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-5 row-span-2 relative group"
          >
            <div className="h-full bg-[#C4A47C] text-white rounded-sm p-8 md:p-10 shadow-lg border border-[#C4A47C]/20 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
              <span className="absolute -right-8 -top-8 text-[200px] font-display font-bold text-white/10 leading-none select-none z-0 pointer-events-none transition-transform duration-700 group-hover:rotate-12">
                02
              </span>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6 text-white backdrop-blur-sm">
                  <span className="material-symbols-outlined text-2xl">speed</span>
                </div>
                <h3 className="text-3xl font-display text-white mb-4">Snel Resultaat</h3>
                <p className="text-white/90 leading-relaxed text-lg font-light">
                  Geen wekenlange verbouwingen in stof en lawaai. In de meeste gevallen is uw keuken binnen <strong>1 dag</strong>
                  volledig getransformeerd.
                </p>
              </div>
              <div className="relative z-10 mt-12 pt-8 border-t border-white/20">
                <p className="font-display italic text-xl opacity-90">"Vandaag geplaatst, vanavond koken."</p>
              </div>
            </div>
          </motion.div>

          {/* Item 03 */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-7 relative group"
          >
            <div className="h-full bg-white dark:bg-[#242424] rounded-sm p-8 md:p-10 shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-xl relative overflow-hidden">
              <span className="absolute right-4 top-4 text-[120px] font-display font-bold text-gray-100 dark:text-white/5 leading-none select-none z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                03
              </span>
              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#C4A47C]/10 flex items-center justify-center text-[#C4A47C]">
                  <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                </div>
                <div>
                  <h3 className="text-2xl font-display text-gray-900 dark:text-[#FFF9F0] mb-3">Onderhoudsarm</h3>
                  <p className="text-gray-600 dark:text-[rgba(255,249,240,0.7)] leading-relaxed font-light">
                    Een natte doek is alles wat u nodig heeft. De hoogwaardige folies zijn krasbestendig,
                    duurzaam, geurloos en bijzonder hygiënisch.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Item 04 */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-4 relative group"
          >
            <div className="h-full bg-gray-50 dark:bg-[#1f1f1f] rounded-sm p-8 shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
              <span className="absolute -left-4 -bottom-8 text-[140px] font-display font-bold text-gray-200 dark:text-white/5 leading-none select-none z-0 pointer-events-none">
                04
              </span>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C4A47C]/10 flex items-center justify-center text-[#C4A47C]">
                    <span className="material-symbols-outlined text-xl">palette</span>
                  </div>
                  <h3 className="text-xl font-display text-gray-900 dark:text-[#FFF9F0]">Eindeloze Opties</h3>
                </div>
                <p className="text-gray-600 dark:text-[rgba(255,249,240,0.7)] text-sm leading-relaxed font-light">
                  Van mat zwart tot marmerlook of warme houttinten. Meer dan 200 premium designs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Item 05 */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-4 relative group"
          >
            <div className="h-full bg-gray-50 dark:bg-[#1f1f1f] rounded-sm p-8 shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
              <span className="absolute right-0 top-0 text-[140px] font-display font-bold text-gray-200 dark:text-white/5 leading-none select-none z-0 pointer-events-none transform rotate-12 transition-transform duration-700 group-hover:rotate-0">
                05
              </span>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C4A47C]/10 flex items-center justify-center text-[#C4A47C]">
                    <span className="material-symbols-outlined text-xl">recycling</span>
                  </div>
                  <h3 className="text-xl font-display text-gray-900 dark:text-[#FFF9F0]">Duurzaam</h3>
                </div>
                <p className="text-gray-600 dark:text-[rgba(255,249,240,0.7)] text-sm leading-relaxed font-light">
                  Geen afval van een oude keuken. We hergebruiken de basis. Beter voor uw portemonnee én de planeet.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Item 06 */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-4 relative group"
          >
            <div className="h-full bg-gray-900 dark:bg-black rounded-sm p-8 shadow-lg border border-gray-800 dark:border-white/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-center">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[160px] font-display font-bold text-white/5 leading-none select-none z-0 pointer-events-none">
                06
              </span>
              <div className="relative z-10 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#C4A47C] flex items-center justify-center text-white mb-4 shadow-lg shadow-[#C4A47C]/30">
                  <span className="material-symbols-outlined text-xl">verified</span>
                </div>
                <h3 className="text-xl font-display text-white mb-2">5 Jaar Garantie</h3>
                <p className="text-gray-400 text-sm font-light">Op het loslaten van de folie.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
        >
          <Link
            to="/projecten"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-300 bg-[#C4A47C] border border-transparent rounded-full shadow-lg hover:bg-[#b08e60] hover:shadow-[#C4A47C]/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C4A47C] dark:focus:ring-offset-gray-900 group"
          >
            Bekijk onze projecten
            <span className="material-symbols-outlined ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
