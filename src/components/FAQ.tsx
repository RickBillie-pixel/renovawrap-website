import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Kan ik hete pannen op het gewrapte keukenblad zetten?",
    answer: "Onze folies zijn hittebestendig tot 90 graden. Dit betekent dat een kop koffie geen probleem is, maar voor hete pannen adviseren wij altijd een onderzetter te gebruiken, net zoals bij de meeste standaard keukenbladen."
  },
  {
    question: "Hoe lang blijft de folie mooi?",
    answer: "Wij geven 5 jaar garantie op loslaten en verkleuren. Bij normaal gebruik gaat de folie echter gemakkelijk 10 tot 15 jaar mee. De folies zijn van hoogwaardige industriële kwaliteit, speciaal ontwikkeld voor intensief gebruik."
  },
  {
    question: "Is de folie krasbestendig?",
    answer: "Ja, de folies hebben een beschermende toplaag die uitstekend bestand is tegen dagelijks gebruik en lichte krassen. Mocht er toch een diepe kras ontstaan, dan is het vaak mogelijk om alleen dat specifieke deel opnieuw te wrappen (heat-repair is bij sommige folies ook mogelijk)."
  },
  {
    question: "Kan ik mijn keuken nog schoonmaken zoals gewend?",
    answer: "Absoluut. De folies zijn water- en vuilafstotend. U kunt ze schoonmaken met de meeste gangbare huishoudelijke schoonmaakmiddelen. Vermijd wel agressieve middelen zoals chloor of schuursponsjes."
  },
  {
    question: "Hoe lang duurt de montage?",
    answer: "Een gemiddelde keuken renoveren wij binnen 1 à 2 werkdagen. Omdat we geen sloopwerk hebben, ervaart u minimale overlast en kunt u 's avonds vaak alweer koken."
  },
  {
    question: "Kan ik de binnenkant van de kastjes ook laten wrappen?",
    answer: "Standaard wrappen we de zichtbare buitenzijde en de kopse kanten voor een strak resultaat. Het is mogelijk om ook de binnenzijde te doen, maar dit is arbeidsintensiever en brengt hogere kosten met zich mee. Vaak is de binnenzijde nog in prima staat en is dit niet nodig."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="faq">
       {/* Decorative subtle background elements */}
       <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
       <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Veelgestelde Vragen</span>
          <h2 className="font-display text-3xl md:text-5xl text-dark leading-tight">
            Alles wat u moet <span className="italic text-gray-400">weten</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gray-100 rounded-2xl bg-white transition-all duration-300 ${activeIndex === index ? 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border-primary/20' : 'hover:border-gray-300'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left px-8 py-6 flex items-center justify-between group"
              >
                <span className={`font-display text-lg md:text-xl transition-colors ${activeIndex === index ? 'text-primary' : 'text-dark group-hover:text-primary'}`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 ml-6 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-primary border-primary text-white rotate-180' : 'group-hover:border-primary group-hover:text-primary'}`}>
                  <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-gray-500 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
