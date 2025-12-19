import { VehicleCard } from "@/components/VehicleCard";
import { Vehicle } from "@/lib/mobile-de-api";
import { Button } from "@/components/ui/button";

interface MostSearchedCarsProps {
  vehicles: Vehicle[];
}

export function MostSearchedCars({ vehicles }: MostSearchedCarsProps) {
  if (!vehicles.length) {
    return (
      <div className="liquid-glass bg-white/70 p-10 text-center">
        <h3 className="text-2xl font-bold text-dark-gray">Aktuell keine Fahrzeuge online</h3>
        <p className="mt-3 text-medium-gray text-lg">
          Wir aktualisieren unseren Bestand laufend. Melden Sie sich gern für eine persönliche Empfehlung.
        </p>
        <Button asChild className="mt-6 bg-ci-yellow text-primary-dark-gray font-bold text-lg px-8 py-4 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90">
          <a href="#kontakt">Kontakt aufnehmen</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((v) => (
        <VehicleCard key={v.id} v={v} />
      ))}
    </div>
  );
}
