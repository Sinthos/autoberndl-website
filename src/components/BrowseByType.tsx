import { Button } from "@/components/ui/button";
import { Car, CarFront, Truck } from "lucide-react";

const types = [
  { name: "SUV", icon: <CarFront className="w-5 h-5 mr-2" /> },
  { name: "Sedan", icon: <Car className="w-5 h-5 mr-2" /> },
  { name: "Hatchback", icon: <Car className="w-5 h-5 mr-2" /> },
  { name: "Truck", icon: <Truck className="w-5 h-5 mr-2" /> },
];

export function BrowseByType() {
  return (
    <div className="flex justify-center gap-4">
      {types.map((type) => (
        <Button key={type.name} variant="outline" className="rounded-full">
          {type.icon}
          {type.name}
        </Button>
      ))}
    </div>
  );
}
