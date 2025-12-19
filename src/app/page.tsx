import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MostSearchedCars } from "@/components/MostSearchedCars";
import { Footer } from "@/components/Footer";
import { getVehicles } from "@/lib/mobile-de-api";
import { Button } from "@/components/ui/button";
import { HandCoins, CheckCircle, ShieldCheck, PhoneCall, MapPin, Clock } from "lucide-react";

export default async function Page() {
  const vehicles = await getVehicles();

  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <main>
        <Hero />

        <section id="ankauf" className="py-24 bg-light-gray">
          <div className="container mx-auto grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ci-blue/80">Fahrzeugankauf</p>
              <h2 className="text-4xl font-bold mt-3 mb-4">Wir kaufen Ihr Fahrzeug fair und transparent an</h2>
              <p className="text-lg text-medium-gray mb-6">
                Ob Leasingrückläufer oder privater Verkauf: Wir erstellen ein nachvollziehbares Angebot und kümmern uns um eine unkomplizierte Abwicklung.
              </p>
              <Button asChild className="bg-ci-yellow text-primary-dark-gray font-bold text-lg px-8 py-4 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90">
                <a href="#kontakt">Ankauf anfragen</a>
              </Button>
            </div>
            <div className="grid gap-6">
              <div className="liquid-glass bg-white/70 p-6 flex gap-4">
                <HandCoins className="h-10 w-10 text-ci-yellow" />
                <div>
                  <h3 className="text-xl font-bold">Kostenlose Bewertung</h3>
                  <p className="text-medium-gray">Wir prüfen Zustand, Ausstattung und Historie Ihres Fahrzeugs.</p>
                </div>
              </div>
              <div className="liquid-glass bg-white/70 p-6 flex gap-4">
                <CheckCircle className="h-10 w-10 text-ci-yellow" />
                <div>
                  <h3 className="text-xl font-bold">Klares Angebot</h3>
                  <p className="text-medium-gray">Sie erhalten ein transparentes Angebot ohne versteckte Kosten.</p>
                </div>
              </div>
              <div className="liquid-glass bg-white/70 p-6 flex gap-4">
                <ShieldCheck className="h-10 w-10 text-ci-yellow" />
                <div>
                  <h3 className="text-xl font-bold">Sichere Abwicklung</h3>
                  <p className="text-medium-gray">Wir übernehmen die Formalitäten und begleiten Sie bis zur Übergabe.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="fahrzeuge" className="py-24 bg-light-gray">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Unser aktueller Fahrzeugbestand</h2>
            <MostSearchedCars vehicles={vehicles} />
          </div>
        </section>

        <section id="kontakt" className="py-24 bg-white">
          <div className="container mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ci-blue/80">Kontakt</p>
              <h2 className="text-4xl font-bold mt-3 mb-4">Wir beraten Sie persönlich</h2>
              <p className="text-lg text-medium-gray">
                Vereinbaren Sie einen Termin oder kommen Sie spontan vorbei. Unser Team hilft Ihnen gern bei Fahrzeugwahl, Service und Ankauf.
              </p>
              <Button asChild className="mt-6 bg-ci-yellow text-primary-dark-gray font-bold text-lg px-8 py-4 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90">
                <a href="tel:+49633492270">Jetzt anrufen</a>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="liquid-glass bg-white/70 p-6">
                <MapPin className="h-8 w-8 text-ci-blue" />
                <h3 className="text-lg font-bold mt-4">Adresse</h3>
                <p className="text-medium-gray mt-2">
                  Biebermühle 5<br />
                  66978 Donsieders
                </p>
              </div>
              <div className="liquid-glass bg-white/70 p-6">
                <PhoneCall className="h-8 w-8 text-ci-blue" />
                <h3 className="text-lg font-bold mt-4">Telefon</h3>
                <a href="tel:+49633492270" className="mt-2 inline-block text-medium-gray hover:text-ci-blue">
                  06334-92270
                </a>
                <a href="mailto:info@autoberndl.de" className="mt-2 block text-medium-gray hover:text-ci-blue">
                  info@autoberndl.de
                </a>
              </div>
              <div className="liquid-glass bg-white/70 p-6">
                <Clock className="h-8 w-8 text-ci-blue" />
                <h3 className="text-lg font-bold mt-4">Öffnungszeiten</h3>
                <p className="text-medium-gray mt-2">
                  Mo–Fr 8–18 Uhr<br />
                  Sa 9–13 Uhr
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
