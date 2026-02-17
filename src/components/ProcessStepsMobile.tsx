import FadeIn from "./FadeIn";

interface Step {
  step: string;
  title: string;
  desc: string;
  img: string;
}

interface ProcessStepsMobileProps {
  steps: Step[];
}

export default function ProcessStepsMobile({ steps }: ProcessStepsMobileProps) {
  return (
    <div className="relative py-12">
      {/* Central Line (Static) */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gray-100 z-0"></div>

      <div className="space-y-16 relative z-10">
        {steps.map((item, index) => {
           return (
            <FadeIn
              key={index}
              delay={index * 100} // slight stagger
              className="relative pl-12 pr-4"
              direction="right" // default slide-in direction
            >
               {/* Dot on the line */}
               <div className="absolute left-[14px] top-0 w-3 h-3 rounded-full bg-white border-2 border-[#C4A47C] z-20 shadow-sm" />

               <div className="flex flex-col gap-4">
                  {/* Step Number & Title */}
                  <div className="flex flex-col">
                      <span className="text-[#C4A47C] font-serif italic text-lg">Stap {item.step}</span>
                      <h3 className="font-display text-2xl text-dark leading-tight">{item.title}</h3>
                  </div>

                  {/* Image */}
                  <div className="w-full aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden shadow-md">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
               </div>
            </FadeIn>
           )
        })}
      </div>
    </div>
  );
}
