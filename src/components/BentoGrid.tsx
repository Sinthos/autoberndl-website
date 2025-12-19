import { StyledCard } from "./StyledCard";
import { cn } from "@/lib/utils";

export function BentoGrid() {
  return (
    <section className="py-16">
      <div className="container-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StyledCard className="md:col-span-2">
            <h3 className="text-2xl font-bold">Flexible Finanzierung</h3>
            <p className="text-dark-muted mt-2">
              Wir bieten maßgeschneiderte Finanzierungslösungen, die zu Ihrem Budget passen.
            </p>
          </StyledCard>
          <StyledCard>
            <h3 className="text-2xl font-bold">Inzahlungnahme</h3>
            <p className="text-dark-muted mt-2">
              Tauschen Sie Ihr altes Fahrzeug bei uns ein und sparen Sie beim Kauf.
            </p>
          </StyledCard>
          <StyledCard>
            <h3 className="text-2xl font-bold">Werkstatt-Service</h3>
            <p className="text-dark-muted mt-2">
              Unsere Experten kümmern sich um Wartung und Reparaturen.
            </p>
          </StyledCard>
          <StyledCard className="md:col-span-2">
            <h3 className="text-2xl font-bold">Garantie & Versicherung</h3>
            <p className="text-dark-muted mt-2">
              Sichern Sie sich ab mit unseren umfassenden Garantie- und Versicherungspaketen.
            </p>
          </StyledCard>
        </div>
      </div>
    </section>
  );
}
