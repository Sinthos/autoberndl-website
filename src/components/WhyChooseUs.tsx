import { Car, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-16 h-16 text-ci-yellow" />,
    title: "Gründlich geprüfte Fahrzeuge",
    description: "Jedes Auto durchläuft eine strenge Inspektion in unserer hauseigenen Werkstatt.",
  },
  {
    icon: <Sparkles className="w-16 h-16 text-ci-yellow" />,
    title: "Professionelle Aufbereitung",
    description: "Wir führen eine Generalreinigung durch und beheben Lackschäden mittels Smart Repair.",
  },
  {
    icon: <Car className="w-16 h-16 text-ci-yellow" />,
    title: "Große Markenauswahl",
    description: "Vom Kleinwagen bis zum SUV bieten wir eine vielfältige Auswahl an Fahrzeugen.",
  },
];

export function WhyChooseUs() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="liquid-glass bg-white/70 p-8 text-center flex flex-col items-center">
          {feature.icon}
          <h3 className="text-2xl font-bold mt-6 mb-3">{feature.title}</h3>
          <p className="text-dark-gray text-lg">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
