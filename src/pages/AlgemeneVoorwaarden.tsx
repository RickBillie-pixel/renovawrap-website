import { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn";

const articles = [
  {
    id: "artikel-1",
    title: "Artikel 1 — Definities",
    content: (
      <div className="space-y-3 text-gray-600 leading-relaxed">
        <p>In deze Algemene Voorwaarden wordt verstaan onder:</p>
        <ol className="space-y-2 list-none">
          {[
            ["RenovaWrap", "de eenmanszaak RenovaWrap, gevestigd aan Braakweg 22B, Helmond en ingeschreven bij de Kamer van Koophandel onder nummer 90215443."],
            ["Consument", "de natuurlijke persoon die niet handelt in de uitoefening van beroep of bedrijf en een overeenkomst aangaat met RenovaWrap."],
            ["Diensten", "de door RenovaWrap aangeboden diensten, waaronder begrepen het wrappen van keukens, kasten, aanrechtbladen, schadeherstel aan folie en andere wrapping binnen huis."],
            ["Overeenkomst", "de overeenkomst op afstand of anderszins tot stand gekomen overeenkomst tussen RenovaWrap en de Consument."],
            ["Schriftelijk", "communicatie per e-mail, per post, of via elk ander communicatiemiddel dat naar aard en bestemming schriftelijk geacht kan worden."],
            ["Offerte", "een schriftelijk aanbod van RenovaWrap voor het leveren van specifieke Diensten tegen een bepaalde prijs."],
            ["Folie", "de door RenovaWrap gebruikte materialen voor het wrappen van objecten."],
            ["Werkzaamheden", "alle activiteiten die RenovaWrap uitvoert ter uitvoering van de Overeenkomst, waaronder het plaatsen van de Folie en voorbereidende handelingen."],
          ].map(([term, def], i) => (
            <li key={i} className="flex gap-3">
              <span className="font-semibold text-dark shrink-0">{i + 1}. {term}:</span>
              <span>{def}</span>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    id: "artikel-2",
    title: "Artikel 2 — Identiteit",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
        {[
          ["Naam", "RenovaWrap (eenmanszaak)"],
          ["Adres", "Braakweg 22B, Helmond"],
          ["E-mail", "info@renovawrap.nl"],
          ["Telefoon", "06-12345678"],
          ["KvK-nummer", "90215443"],
          ["BTW-nummer", "NL004797261B06"],
          ["Openingstijden", "Ma – Vr: 09:00 – 17:30"],
          ["Weekend", "Za – Zo: Gesloten"],
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{label}</p>
            <p className="font-medium text-dark">{value}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "artikel-3",
    title: "Artikel 3 — Toepasselijkheid",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "Deze Algemene Voorwaarden zijn van toepassing op elk aanbod van RenovaWrap en op elke tot stand gekomen Overeenkomst tussen RenovaWrap en de Consument.",
          "Voordat de Overeenkomst wordt gesloten, worden deze Algemene Voorwaarden aan de Consument ter hand gesteld als PDF-bijlage bij de offerte, op de website en/of bij een fysieke offerte.",
          "Door akkoord te gaan met de offerte stemt de Consument in met de toepasselijkheid van deze Algemene Voorwaarden.",
          "Eventuele Algemene Voorwaarden van de Consument worden uitdrukkelijk van de hand gewezen, tenzij Schriftelijk anders overeengekomen.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-4",
    title: "Artikel 4 — Aanbod & Overeenkomst",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "Alle offertes van RenovaWrap zijn vrijblijvend en geldig voor een termijn van 14 dagen, tenzij anders Schriftelijk aangegeven.",
          "De Overeenkomst komt tot stand op het moment dat de Consument de offerte Schriftelijk accepteert of op het moment dat RenovaWrap met de uitvoering van de Werkzaamheden begint.",
          "Indien de Consument het aanbod langs elektronische weg heeft aanvaard, bevestigt RenovaWrap onverwijld langs elektronische weg de ontvangst van de aanvaarding.",
          "De door RenovaWrap aangeboden Diensten betreffen maatwerk, uitgevoerd conform de specificaties en wensen van de Consument.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-5",
    title: "Artikel 5 — Prijzen & Betaling",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "De prijzen worden vastgesteld op basis van een offerte op maat na opname ter plaatse. Alle prijzen zijn inclusief BTW, tenzij anders vermeld.",
          "RenovaWrap is gerechtigd een aanbetaling van 30% van de totale overeengekomen prijs te vragen voordat de Werkzaamheden aanvangen.",
          "Het resterende bedrag dient binnen 14 dagen na oplevering via bankoverschrijving te zijn voldaan, tenzij Schriftelijk anders overeengekomen.",
          "Bij niet-tijdige betaling is de Consument van rechtswege in verzuim en verschuldigd de wettelijke rente alsmede incassokosten conform de Wet Incassokosten.",
          "Bezwaren tegen de hoogte van een factuur schorten de betalingsverplichting niet op.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-6",
    title: "Artikel 6 — Uitvoering & Termijnen",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "RenovaWrap voert de Overeenkomst naar beste inzicht uit conform de eisen van goed vakmanschap, op de locatie van de Consument.",
          "Termijnen zijn indicatief en gelden niet als fatale termijnen, tenzij uitdrukkelijk Schriftelijk anders overeengekomen.",
          "De Consument zorgt voor een schone, vetvrije en obstakelvrije ondergrond, vrije toegang tot de werkplek en beschikbaarheid van stroom en water.",
          "Indien de ondergrond niet geschikt blijkt door nalatigheid van de Consument, kan RenovaWrap meerwerk in rekening brengen of de uitvoering opschorten.",
          "Wijzigingen tijdens uitvoering worden Schriftelijk vastgelegd en dienen door de Consument geaccordeerd te worden alvorens uitvoering.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-7",
    title: "Artikel 7 — Herroepingsrecht",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "Het wettelijke herroepingsrecht is na aanvang van de Werkzaamheden niet meer van toepassing gezien het maatwerk karakter van de Diensten.",
          "Aangezien de Overeenkomst altijd gepaard gaat met een fysieke intake en beoordeling, is een bedenktijd conform art. 6:230o BW niet van toepassing.",
          "Indien de Consument vóór aanvang annuleert maar RenovaWrap al materialen heeft besteld, kunnen deze kosten in rekening worden gebracht.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-8",
    title: "Artikel 8 — Oplevering & Risico",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "Na afronding vindt een gezamenlijke inspectie plaats met de Consument en de installateur van de folie.",
          "Goedkeuring geschiedt mondeling door de Consument. Indien niet direct akkoord, wordt op locatie een oplossing gezocht of de klachtenprocedure gestart.",
          "Het risico voor beschadiging of verlies gaat direct na oplevering over op de Consument.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-9",
    title: "Artikel 9 — Garantie",
    content: (
      <div className="space-y-4">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
          <div className="text-3xl font-display font-bold text-primary">5 jaar</div>
          <p className="text-gray-600 text-sm">garantie op montage en folie bij normaal gebruik en onderhoud.</p>
        </div>
        <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
          {[
            "De garantie dekt geen schade door normale slijtage, verkeerde reiniging (bijv. agressieve schoonmaakmiddelen), extreem gebruik of invloeden van buitenaf.",
            "Indien binnen de garantietermijn een defect optreedt en de originele folie niet meer leverbaar is, biedt RenovaWrap kosteloos een vergelijkbare vervangende folie aan.",
          ].map((text, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary font-bold shrink-0">{i + 2}.</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    id: "artikel-10",
    title: "Artikel 10 — Klachtenprocedure",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          {[["14 dagen", "Klacht indienen na ontdekking"], ["10 werkdagen", "Reactietermijn RenovaWrap"], ["30 dagen", "Afhandelingstermijn"]].map(([num, label]) => (
            <div key={num} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
              <p className="text-lg font-bold text-primary font-display">{num}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 leading-relaxed">
          Klachten dienen Schriftelijk en volledig omschreven te worden ingediend bij RenovaWrap. RenovaWrap streeft ernaar klachten binnen 30 dagen inhoudelijk af te handelen via een oplossing, reparatie of alternatief voorstel.
        </p>
      </div>
    ),
  },
  {
    id: "artikel-11",
    title: "Artikel 11 — Annulering",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "Bij annulering nadat het herroepingsrecht is vervallen en geen overmacht van toepassing is, is de Consument 5% van de overeengekomen totaalprijs verschuldigd als annuleringskosten.",
          "Daarnaast is de Consument vergoeding verschuldigd voor reeds verrichte Werkzaamheden en bestelde materialen, afhankelijk van de voortgang.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-12",
    title: "Artikel 12 — Overmacht",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "RenovaWrap is niet gehouden tot nakoming indien zij gehinderd wordt door een omstandigheid die niet aan haar schuld te wijten is (overmacht).",
          "In geval van overmacht worden termijnen verlengd met de duur van de overmachtsituatie. RenovaWrap informeert de Consument zo spoedig mogelijk.",
          "Duurt de overmacht langer dan 30 dagen, dan zijn beide partijen gerechtigd de Overeenkomst kosteloos Schriftelijk te ontbinden.",
          "Reeds gemaakte kosten voor materialen en verrichte Werkzaamheden tot het moment van opzegging komen voor rekening van de Consument.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-13",
    title: "Artikel 13 — Aansprakelijkheid",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "RenovaWrap is uitsluitend aansprakelijk voor directe schade als gevolg van een toerekenbare tekortkoming, tot maximaal de factuurwaarde van de Overeenkomst of het door de verzekeraar uitgekeerde bedrag.",
          "RenovaWrap is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen of schade door bedrijfsstagnatie.",
          "De aansprakelijkheidsbeperkingen gelden niet bij opzet of grove schuld van RenovaWrap of haar leidinggevend personeel.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-14",
    title: "Artikel 14 — Eigendomsvoorbehoud",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "Alle geleverde materialen, waaronder de folies, blijven eigendom van RenovaWrap totdat de Consument alle verplichtingen volledig is nagekomen.",
          "Zolang de eigendom niet is overgegaan, mag de Consument de materialen niet verpanden, vervreemden of bezwaren.",
          "Bij wanbetaling heeft RenovaWrap het recht de materialen te verwijderen. De Consument verleent hiervoor onherroepelijk toegang, aangezien de folie slechts decoratief is en geen integraal deel van de woning wordt.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-15",
    title: "Artikel 15 — Beeldmateriaal",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "De Consument verleent RenovaWrap het recht om foto's of video's van uitgevoerde projecten te gebruiken voor promotionele doeleinden (website, social media, portfolio).",
          "RenovaWrap respecteert de privacy van de Consument. Specifieke kenmerken die direct herleidbaar zijn tot de Consument worden onherkenbaar gemaakt, tenzij de Consument expliciet Schriftelijk toestemming heeft gegeven.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "artikel-16",
    title: "Artikel 16 — Privacy",
    content: (
      <p className="text-gray-600 leading-relaxed">
        RenovaWrap verwerkt persoonsgegevens conform de geldende privacywetgeving (AVG). Informatie over de wijze waarop gegevens worden verzameld, gebruikt en beveiligd, alsmede over de rechten van de Consument, is te vinden in het Privacybeleid van RenovaWrap op de website.
      </p>
    ),
  },
  {
    id: "artikel-17",
    title: "Artikel 17 — Recht & Geschillen",
    content: (
      <ol className="space-y-3 text-gray-600 leading-relaxed list-none">
        {[
          "Op alle Overeenkomsten waarop deze Algemene Voorwaarden van toepassing zijn, is uitsluitend Nederlands recht van toepassing.",
          "Geschillen worden voorgelegd aan de bevoegde rechter van de Rechtbank Oost-Brabant of de rechter van de woonplaats van de Consument, ter keuze van de Consument.",
        ].map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    ),
  },
];

export default function AlgemeneVoorwaarden() {
  const [activeId, setActiveId] = useState<string>("artikel-1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    articles.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-background-light text-dark font-sans antialiased min-h-screen">
      {/* Hero */}
      <div className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">
              Versie 1.0 — 25 februari 2026
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
              Algemene{" "}
              <span className="italic text-primary">Voorwaarden</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl">
              B2C Algemene Voorwaarden voor consumenten van RenovaWrap.
              Van toepassing op alle diensten en overeenkomsten.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 pb-28">
        <div className="flex gap-12 items-start">

          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">Inhoud</p>
            <nav className="space-y-1">
              {articles.map(({ id, title }) => {
                const short = title.split("—")[0].trim();
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${
                      activeId === id
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-gray-500 hover:text-dark hover:bg-gray-100"
                    }`}
                  >
                    {short}
                  </a>
                );
              })}
            </nav>

            {/* Quick info card */}
            <div className="mt-8 border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Contact</p>
              <p className="text-sm font-medium text-dark mb-1">RenovaWrap</p>
              <p className="text-xs text-gray-500 mb-3">Braakweg 22B, Helmond</p>
              <a
                href="mailto:info@renovawrap.nl"
                className="block text-xs text-primary hover:underline break-all"
              >
                info@renovawrap.nl
              </a>
            </div>
          </aside>

          {/* Articles */}
          <div className="flex-1 min-w-0 space-y-6">
            {articles.map(({ id, title, content }, index) => (
              <FadeIn key={id}>
                <section
                  id={id}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden scroll-mt-32"
                >
                  {/* Card header */}
                  <div className="px-7 py-5 border-b border-gray-100 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <h2 className="font-display text-lg text-dark">{title}</h2>
                  </div>
                  {/* Card body */}
                  <div className="px-7 py-6">{content}</div>
                </section>
              </FadeIn>
            ))}

            {/* Footer card */}
            <FadeIn>
              <div className="rounded-2xl border border-primary/20 bg-primary/5 px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <p className="font-display text-dark font-semibold mb-1">Vragen over deze voorwaarden?</p>
                  <p className="text-sm text-gray-500">Neem contact op via e-mail, wij reageren binnen 10 werkdagen.</p>
                </div>
                <a
                  href="mailto:info@renovawrap.nl"
                  className="shrink-0 inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  info@renovawrap.nl
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
