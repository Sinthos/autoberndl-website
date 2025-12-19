import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function DatenschutzPage() {
  return (
    <div className="bg-white text-dark-gray">
      <Navbar />
      <main>
        <section className="container mx-auto py-16 max-w-3xl">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ci-blue/80">Rechtliches</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">Datenschutzerkl&auml;rung</h1>
              <Button asChild variant="outline" className="border-ci-blue text-ci-blue font-semibold px-6 py-3 rounded-xl hover:bg-ci-blue/10">
                <Link href="/">Zur&uuml;ck zur Startseite</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-6 text-lg text-medium-gray">
            <p>
              Diese Datenschutzerkl&auml;rung informiert Sie &uuml;ber Art, Umfang und Zweck der Verarbeitung
              personenbezogener Daten auf dieser Website.
            </p>

            <div>
              <p className="font-semibold text-dark-gray">Verantwortlicher</p>
              <p>
                Walter Berndl<br />
                Auto Berndl<br />
                Bieberm&uuml;hle 5<br />
                66978 Donsieders<br />
                Telefon: 06334-92270<br />
                E-Mail: <a className="text-ci-blue hover:underline" href="mailto:info@autoberndl.de">info@autoberndl.de</a>
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Hosting und Server-Logs</p>
              <p>
                Die Website wird auf einem eigenen Server betrieben. Beim Aufruf der Seite werden technisch
                erforderliche Daten verarbeitet (z. B. IP-Adresse, Zeitpunkt, angeforderte Seite, User-Agent,
                Referrer, Statuscode). Die Verarbeitung erfolgt zur Sicherstellung von Stabilit&auml;t und
                Sicherheit der Website.
              </p>
              <p className="mt-2">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Die Logdaten werden f&uuml;r 14 Tage gespeichert
                und anschlie&szlig;end gel&ouml;scht, sofern keine gesetzlichen Pflichten entgegenstehen.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Cookies</p>
              <p>
                Wir setzen ausschlie&szlig;lich technisch notwendige Cookies ein, um Ihre Auswahl zu speichern.
              </p>
              <ul className="mt-3 list-disc pl-6">
                <li>
                  <span className="font-semibold text-dark-gray">ab_cookie_consent</span>: Speichert die
                  Einwilligungsauswahl, Speicherdauer: 12 Monate (365 Tage).
                </li>
              </ul>
              <p className="mt-2">
                Rechtsgrundlage: &sect; 25 Abs. 2 TTDSG, Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Externe Inhalte (Bilder)</p>
              <p>
                Zur Darstellung von Bildern werden externe Quellen eingebunden. Dabei wird Ihre IP-Adresse an
                die jeweiligen Anbieter &uuml;bermittelt.
              </p>
              <ul className="mt-3 list-disc pl-6">
                <li>getac.com (Hero-Bild)</li>
                <li>miro.medium.com (Fallback-Bild)</li>
                <li>Mobile.de/CDN (Fahrzeugbilder)</li>
              </ul>
              <p className="mt-2">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer ansprechenden
                Darstellung der Website).
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Fahrzeugdaten von Mobile.de</p>
              <p>
                Fahrzeugdaten werden serverseitig &uuml;ber die Mobile.de API abgerufen und auf der Website
                angezeigt. Dabei werden keine personenbezogenen Daten von Besuchern an Mobile.de &uuml;bermittelt.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Externe Links</p>
              <p>
                Unsere Website enth&auml;lt Links zu externen Seiten (z. B. Mobile.de). Beim Anklicken dieser
                Links verlassen Sie unsere Website. F&uuml;r die Datenverarbeitung auf den verlinkten Seiten sind
                die jeweiligen Betreiber verantwortlich.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Kontaktaufnahme</p>
              <p>
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung
                der Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Ma&szlig;nahmen) oder
                Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Keine Analyse- oder Tracking-Tools</p>
              <p>
                Wir setzen keine Analyse-, Tracking- oder Marketing-Tools ein.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">SSL/TLS-Verschl&uuml;sselung</p>
              <p>
                Diese Website nutzt aus Sicherheitsgr&uuml;nden eine SSL/TLS-Verschl&uuml;sselung.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Ihre Rechte</p>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, L&ouml;schung, Einschr&auml;nkung der Verarbeitung,
                Daten&uuml;bertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer Daten. Zudem haben Sie
                das Recht, sich bei einer Aufsichtsbeh&ouml;rde zu beschweren.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Aktualit&auml;t</p>
              <p>
                Diese Datenschutzerkl&auml;rung wird angepasst, sobald sich rechtliche oder technische
                &Auml;nderungen ergeben.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
