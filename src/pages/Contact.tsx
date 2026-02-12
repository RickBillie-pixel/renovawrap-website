import { useSEO, buildBreadcrumbs } from "@/hooks/useSEO";

export default function Contact() {
  useSEO({
    title: "Contact — Gratis Offerte | Renovawrap",
    description: "Neem contact op met Renovawrap voor een vrijblijvende offerte. Reactie binnen 24 uur. Bel, mail of vul het formulier in.",
    canonical: "https://renovawrap.nl/contact",
    jsonLd: buildBreadcrumbs([
      { name: "Home", url: "https://renovawrap.nl/" },
      { name: "Contact", url: "https://renovawrap.nl/contact" },
    ]),
  });
  return (
    <main className="pt-32 flex-grow bg-background-light text-dark min-h-screen">
      <section className="max-w-[1400px] mx-auto px-6 pb-24 relative z-10">
        <div className="flex flex-col mb-24 border-b border-dark/10 pb-12">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6">[01 — Connectie]</span>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
            Neem Contact <br />
            <span className="italic text-primary ml-16 md:ml-32">Met Ons Op.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <div className="mb-12">
              <h2 className="font-display text-4xl mb-4">Simpele Contact Aanvraag</h2>
              <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                Vul het onderstaande formulier in en wij nemen binnen 24 uur contact met u op voor een persoon lijk gesprek over uw interieurwensen.
              </p>
            </div>

            <form className="space-y-12">
              <div className="group relative">
                <input
                  className="peer w-full bg-transparent border-b border-dark/20 py-4 text-dark placeholder-transparent focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                  id="name"
                  placeholder="Naam"
                  type="text"
                />
                <label
                  className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs uppercase tracking-widest"
                  htmlFor="name"
                >
                  Naam
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group relative">
                  <input
                    className="peer w-full bg-transparent border-b border-dark/20 py-4 text-dark placeholder-transparent focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                    id="email"
                    placeholder="Email"
                    type="email"
                  />
                  <label
                    className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs uppercase tracking-widest"
                    htmlFor="email"
                  >
                    Email
                  </label>
                </div>
                <div className="group relative">
                  <input
                    className="peer w-full bg-transparent border-b border-dark/20 py-4 text-dark placeholder-transparent focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                    id="phone"
                    placeholder="Telefoonnummer"
                    type="tel"
                  />
                  <label
                    className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs uppercase tracking-widest"
                    htmlFor="phone"
                  >
                    Telefoonnummer
                  </label>
                </div>
              </div>

              <div className="group relative">
                <textarea
                  className="peer w-full bg-transparent border-b border-dark/20 py-4 text-dark placeholder-transparent focus:border-primary focus:ring-0 focus:outline-none transition-colors min-h-[120px] resize-none"
                  id="message"
                  placeholder="Uw Bericht"
                ></textarea>
                <label
                  className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs uppercase tracking-widest"
                  htmlFor="message"
                >
                  Uw Bericht
                </label>
              </div>

              <div className="pt-6">
                <button
                  className="group inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-medium hover:text-primary transition-colors"
                  type="button"
                >
                  Verstuur Aanvraag
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-dark/20 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 lg:pl-12 lg:border-l border-dark/10 flex flex-col justify-between">
            <div className="space-y-16">
              <div>
                <h3 className="font-display text-2xl mb-6">Onze Locatie</h3>
                <p className="text-gray-600 leading-relaxed font-light mb-4">
                  Bezoek onze showroom om de materialen te voelen en de mogelijkheden te bespreken. Op afspraak geopend.
                </p>
                <address className="not-italic text-sm uppercase tracking-widest text-dark border-l-2 border-primary pl-4">
                  Keizersgracht 123<br />
                  1015 CJ, Amsterdam<br />
                  Nederland
                </address>
              </div>

              <div>
                <h3 className="font-display text-2xl mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <div className="group">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Email Ons</span>
                    <a className="text-xl font-light hover:text-primary transition-colors" href="mailto:info@renovawrap.nl">
                      info@renovawrap.nl
                    </a>
                  </div>
                  <div className="group">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Bel Ons</span>
                    <a className="text-xl font-light hover:text-primary transition-colors" href="tel:+31201234567">
                      +31 (0)20 123 4567
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl mb-6">Volg Ons</h3>
                <div className="flex gap-4">
                  <a
                    className="w-10 h-10 border border-dark/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    href="#"
                  >
                    <span className="text-xs font-bold">IG</span>
                  </a>
                  <a
                    className="w-10 h-10 border border-dark/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    href="#"
                  >
                    <span className="text-xs font-bold">FB</span>
                  </a>
                  <a
                    className="w-10 h-10 border border-dark/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    href="#"
                  >
                    <span className="text-xs font-bold">LI</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-dark/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                KVK: 12345678 — BTW: NL123456789B01
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-80 w-full overflow-hidden">
        <div className="relative group h-full">
          <img
            alt="Detail 1"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0xp4zXhxN9OCy1GHjHZUMYQS1ywwcVQs5Nz8ZarRP4evqb8UkZflerz4LuvbXbtPiiGcXnEFo88C1_bbwc1-1-hYyrNv0Lzs5jKdJ6gWrpKWgLCeFSVjJSQ3MFwMQ-4E7GA85ZI3OD58RpSOQ06W6bBV8wm1Mmru44ojWNGsrJxptEeVYRhFD47qxkYPBZeoh-9PttZ7b7Du1D2RUIPIxAeTKVXwvJ482jfZnKLlNWbp66-GvN3OJPv1mjsWrim797aB3HDNhs8"
          />
        </div>
        <div className="relative group h-full">
          <img
            alt="Detail 2"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx5WR-hMnWMtZbqI_cg2HAjl9r0Cwt3U9UhDBROjPH5wx7Nj-uKMNQTsFkB15cSgFfAaQ2aXzJNtJx8hdTleOIoJeqW62mYtqOxCZCIwjdWnJnQJJ3JbNG7Zekf2tqaajugaIvzUmQmWOJvwwGs3eZ20QSVXHlR47HrijbKSf5EyUI5BRFX9Rx9jFEBUJBtYlBmIYiY7VHoF2dPP_Wkp4ngKHAMPzVJ9uk4BAXh4edaXlbHDcY6by9hdDcSZGfkHBIBFwTVvZyOp0"
          />
        </div>
        <div className="relative group h-full">
          <img
            alt="Detail 3"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLTPz2wOk-BW9C7-E3c_mneEHkQr-vNeI4rG3aITIkKapzO24UIJOdrzKNreViOcLSZgCL94V5IuEHt54ZpCNraj5r2dPjXok-3mGr-zQMSnIDAAXCJvKtO998I866VBBHj2KRHS9tZeFdKXwKwdofQWy6WTvmpMEaAOKOovEsDNMIc1T_3NihnIaIj2UDtjED4s_OR0Lr7nbPf-QRUzeFN-dMwdzmVGjt0__Wam_-1oDlMxA4Dkh381ln15C37fqmHh2rAMPckTA"
          />
        </div>
        <div className="relative group h-full">
          <img
            alt="Detail 4"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYn791KOT13rsJDS46AqrZVUi_QO4_7Rfdo2VkGC38Tc_yBJu8D0YarWfW77JRNDRV87flBxpsO39iQ20kDhvL6OUHT3jqpMNbTSEXsXZjFczMvtWJ3nb-qLB21l0cW9TAqmCUE2sKeRsHlV50AGwRcVOQ2Z8UKQy5PQbxxbTTna07PT4QBdkQVnITxv7rT6F9b12RVxiStk3QGb-A690KbJPqkggCBmYABejtuzmP5YvP9hI_KFzpIDKQho_nz5ez4oZA5Y4vy9w"
          />
        </div>
      </section>
    </main>
  );
}
