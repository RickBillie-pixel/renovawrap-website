import FadeIn from "../components/FadeIn";

export default function PrivacyPolicy() {
  return (
    <main className="bg-background-light text-dark font-sans antialiased min-h-screen pt-32 pb-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeIn>
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
              Privacy <span className="italic text-primary">Policy</span>
            </h1>
            <p className="text-gray-500 text-sm uppercase tracking-widest">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-dark prose-p:text-gray-600 prose-a:text-primary">
            <p className="lead text-xl text-gray-700 italic font-display mb-12">
              Uw privacy is belangrijk voor ons. Dit privacybeleid legt uit welke persoonlijke gegevens wij verzamelen en hoe wij deze gebruiken.
            </p>

            <h3>1. Verzameling van gegevens</h3>
            <p>
              Wij verzamelen gegevens wanneer u gebruik maakt van onze diensten, onze website bezoekt of contact met ons opneemt. Dit kan onder andere bestaan uit uw naam, e-mailadres, telefoonnummer en adresgegevens.
            </p>

            <h3>2. Gebruik van gegevens</h3>
            <p>
              De verzamelde gegevens worden gebruikt om onze diensten te leveren, betalingen te verwerken en communicatie met u te onderhouden. Wij delen uw gegevens niet met derden zonder uw toestemming, tenzij wettelijk verplicht.
            </p>

            <h3>3. Beveiliging</h3>
            <p>
              Wij nemen passende maatregelen om uw persoonlijke gegevens te beschermen tegen ongeoorloofde toegang, verlies of misbruik. Onze website maakt gebruik van beveiligde verbindingen (SSL).
            </p>

            <h3>4. Cookies</h3>
            <p>
              Onze website maakt gebruik van cookies om de gebruikerservaring te verbeteren en bezoekersstatistieken bij te houden. U kunt uw browserinstellingen aanpassen om cookies te weigeren.
            </p>

            <h3>5. Uw rechten</h3>
            <p>
              U heeft het recht om uw persoonlijke gegevens in te zien, te corrigeren of te laten verwijderen. Neem contact met ons op als u gebruik wilt maken van deze rechten.
            </p>

            <div className="mt-12 pt-12 border-t border-dark/10">
              <p className="not-prose text-sm text-gray-500">
                Heeft u vragen over ons privacybeleid? Neem dan contact op via <a href="mailto:info@renovawrap.nl" className="text-primary hover:underline">info@renovawrap.nl</a>.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
