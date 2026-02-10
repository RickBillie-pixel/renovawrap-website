import { stats } from "../data/mockData";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-dark/10 dark:border-white/10 pt-16 mt-32">
      {stats.map((stat) => (
        <div key={stat.label} className="group cursor-default">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-primary transition-colors">
            {stat.label}
          </p>
          <p className="font-display text-7xl md:text-8xl text-dark dark:text-white group-hover:translate-x-2 transition-transform duration-500">
            {stat.value}
            <span className="text-4xl align-top">+</span>
          </p>
        </div>
      ))}
    </div>
  );
}
