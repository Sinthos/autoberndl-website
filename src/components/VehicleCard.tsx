import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/lib/mobile-de-api";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface VehicleCardProps {
  v: Vehicle;
}

export function VehicleCard({ v }: VehicleCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group border rounded-lg shadow-light transition-shadow hover:shadow-deep">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3]">
          <Image src={v.image} alt={`${v.brand} ${v.model}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <CardTitle className="text-2xl truncate" title={`${v.brand} ${v.model}`}>{v.brand} {v.model}</CardTitle>
        <p className="text-lg text-medium-gray">{v.type}</p>
        <div className="mt-4 text-medium-gray text-lg">{v.details}</div>
      </CardContent>
      <CardFooter className="p-6 flex items-center justify-between bg-light-gray">
        <div className="text-3xl font-bold text-dark-gray">{v.price}</div>
        <Button asChild className="bg-ci-yellow text-primary-dark-gray font-bold text-lg px-8 py-3 rounded-lg hover:bg-ci-yellow/90">
          <a href={v.url} target="_blank" rel="noreferrer">Details ansehen</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
