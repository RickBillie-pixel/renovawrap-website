import { Link } from "react-router-dom";
import { footerData } from "../data/mockData";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-dark pt-24 pb-12" id="contact">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24 border-b border-dark/10 pb-24">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl md:text-5xl mb-8">
              Klaar om uw <br /> Leven te{" "}
              <span className="text-primary italic">Herontwerpen?</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Vraag een vrijblijvende offerte aan of plan een bezoek aan onze showroom.
            </p>
            <form className="flex flex-col sm:flex-row gap-0 max-w-md mt-8 border border-dark/20 p-1">
              <input
                className="flex-grow bg-transparent border-none px-6 py-4 text-sm focus:ring-0 placeholder-gray-400 text-dark"
                placeholder="Voer uw e-mail in"
                type="email"
              />
              <button
                className="bg-dark text-white px-8 py-4 text-xs uppercase tracking-widest whitespace-nowrap hover:bg-primary transition-colors font-bold"
                type="button"
              >
                Verstuur
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400">Menu</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {footerData.menu.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400">Locatie</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              {footerData.location.address}
              <br />
              {footerData.location.city}
              <br />
              {footerData.location.country}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400">Socials</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {footerData.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="hover:text-primary transition-colors">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-400">
          <div>© 2024 Renovawrap. Alle rechten voorbehouden.</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-dark transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-dark transition-colors">
              Algemene Voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
