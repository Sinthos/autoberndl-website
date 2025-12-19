import Image from "next/image";
import { Check, Wrench, FileText, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlightCards = [
  {
    icon: Check,
    title: "Geprüfte Qualität",
    description: "Gründliche technische Kontrolle vor der Übergabe.",
  },
  {
    icon: Wrench,
    title: "Werkstatt & Smart Repair",
    description: "Aufbereitung, Service und Pflege aus einer Hand.",
  },
  {
    icon: FileText,
    title: "Garantie optional",
    description: "Bis zu 2 Jahre zusätzliche Sicherheit.",
  },
  {
    icon: Car,
    title: "Große Auswahl",
    description: "Vom Kleinwagen bis zum SUV sofort verfügbar.",
  },
];

export function Hero() {
  return (
    <section className="bg-light-gray py-12 lg:py-16">
      <div className="container mx-auto grid items-center gap-8 lg:grid-cols-[1fr,1.1fr] relative">
        <div className="relative">
          <Image
            src="https://www.getac.com/content/dam/uploads/2023/03/autorepairworkshop_cover.png"
            alt="Moderne Werkstatt von Auto Berndl"
            width={640}
            height={440}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="rounded-2xl border border-white/60 shadow-deep object-cover"
          />
        </div>
        <div className="liquid-glass bg-white/70 p-8 lg:p-10">
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ci-blue/80">
            <span className="rounded-full bg-white/70 px-3 py-1 border border-white/70">Familienbetrieb seit 1982</span>
            <span className="rounded-full bg-white/70 px-3 py-1 border border-white/70">40+ Jahre Erfahrung</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
            Über 40 Jahre Erfahrung und Qualität
          </h1>
          <p className="text-lg text-medium-gray leading-relaxed max-w-xl">
            Die Firma Auto Berndl steht seit über 40 Jahren für geprüfte Gebrauchtwagen aller Marken. Unser langjähriger, treuer Kundenstamm ist der beste Beweis für unsere Qualität. Überzeugen Sie sich selbst!
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button asChild className="bg-ci-yellow text-primary-dark-gray font-bold text-lg px-8 py-3 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90">
              <a href="#fahrzeuge">Fahrzeuge ansehen</a>
            </Button>
            <Button asChild variant="outline" className="border-ci-blue text-ci-blue font-semibold text-lg px-8 py-3 rounded-xl hover:bg-ci-blue/10">
              <a href="#kontakt">Termin vereinbaren</a>
            </Button>
          </div>
          <ul className="grid gap-4 mt-6 sm:grid-cols-2">
            {highlightCards.map((card) => {
              const Icon = card.icon;
              return (
                <li key={card.title} className="flex gap-3">
                  <Icon className="text-ci-blue h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">{card.title}</h3>
                    <p className="text-medium-gray">{card.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
