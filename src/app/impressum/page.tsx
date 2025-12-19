import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ImpressumPage() {
  return (
    <div className="bg-white text-dark-gray">
      <Navbar />
      <main>
        <section className="container mx-auto py-16 max-w-3xl">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ci-blue/80">Rechtliches</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">Impressum</h1>
              <Button asChild variant="outline" className="border-ci-blue text-ci-blue font-semibold px-6 py-3 rounded-xl hover:bg-ci-blue/10">
                <Link href="/">Zur&uuml;ck zur Startseite</Link>
              </Button>
            </div>
          </div>
          <div className="mt-8 space-y-6 text-lg text-medium-gray">
            <div>
              <p className="font-semibold text-dark-gray">Angaben gem&auml;&szlig; &sect; 5 TMG</p>
              <p>
                Walter Berndl<br />
                Auto Berndl<br />
                Bieberm&uuml;hle 5<br />
                66978 Donsieders
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Handelsregister</p>
              <p>
                Handelsregister: HRA 23449<br />
                Registergericht: Kaiserslautern
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Kontakt</p>
              <p>
                Telefon: 06334-92270<br />
                E-Mail: <a className="text-ci-blue hover:underline" href="mailto:info@autoberndl.de">info@autoberndl.de</a>
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Umsatzsteuer-ID</p>
              <p>
                Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
                DE149551286
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">EU-Streitschlichtung</p>
              <p>
                Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a className="text-ci-blue hover:underline" href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>.
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark-gray">Verbraucherstreitbeilegung/Universalschlichtungsstelle</p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
