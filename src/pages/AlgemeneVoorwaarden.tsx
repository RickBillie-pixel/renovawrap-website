import FadeIn from "../components/FadeIn";

export default function AlgemeneVoorwaarden() {
  return (
    <main className="bg-background-light text-dark font-sans antialiased min-h-screen pt-32 pb-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeIn>
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
              Algemene <span className="italic text-primary">Voorwaarden</span>
            </h1>
            <p className="text-gray-500 text-sm uppercase tracking-widest">
              Geldig vanaf: {new Date().getFullYear()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-dark prose-p:text-gray-600 prose-a:text-primary">
            <p className="lead text-xl text-gray-700 italic font-display mb-12">
              Op al onze diensten en leveringen zijn deze algemene voorwaarden van toepassing.
            </p>

            <h3>Artikel 1. Definities</h3>
            <p>
              In deze algemene voorwaarden wordt verstaan onder:<br />
              <strong>Opdrachtnemer:</strong> Renovawrap.<br />
              <strong>Opdrachtgever:</strong> de wederpartij van opdrachtnemer.
            </p>

            <h3>Artikel 2. Toepasselijkheid</h3>
            <p>
              Deze voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen Renovawrap en een Opdrachtgever.
            </p>

            <h3>Artikel 3. Offertes en Aanbiedingen</h3>
            <p>
              Alle offertes en aanbiedingen van Renovawrap zijn vrijblijvend, tenzij in de offerte een termijn voor aanvaarding is gesteld. Prijzen zijn exclusief BTW tenzij anders vermeld.
            </p>

            <h3>Artikel 4. Uitvoering van de overeenkomst</h3>
            <p>
              Renovawrap zal de overeenkomst naar beste inzicht en vermogen en overeenkomstig de eisen van goed vakmanschap uitvoeren.
            </p>

            <h3>Artikel 5. Betaling</h3>
            <p>
              Betaling dient te geschieden binnen 14 dagen na factuurdatum, op een door Renovawrap aan te geven wijze.
            </p>

            <h3>Artikel 6. Aansprakelijkheid</h3>
            <p>
              Renovawrap is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat Renovawrap is uitgegaan van door of namens de Opdrachtgever verstrekte onjuiste en/of onvolledige gegevens.
            </p>

            <div className="mt-12 pt-12 border-t border-dark/10">
              <p className="not-prose text-sm text-gray-500">
                Wilt u de volledige algemene voorwaarden ontvangen als PDF? Stuur een email naar <a href="mailto:info@renovawrap.nl" className="text-primary hover:underline">info@renovawrap.nl</a>.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
