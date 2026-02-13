import { Link } from "react-router-dom";

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  offset?: boolean;
}

export default function ServiceCard({
  id,
  title,
  description,
  image,
  link,
  offset = false,
}: ServiceCardProps) {
  return (
    <div className={`group flex flex-col ${offset ? "lg:mt-24" : ""}`}>
      <div className="relative overflow-hidden aspect-[4/5] mb-8 bg-gray-100">
        <img
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
          src={image}
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-white/90 text-[10px] uppercase tracking-widest text-dark backdrop-blur-sm border border-dark/5">
            {String(id).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="pr-4">
        <h3 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <Link
          to={link}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium hover:gap-4 transition-all duration-300 group-hover:text-primary"
        >
          Lees Meer <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
