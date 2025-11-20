"use client";

import { Footprints } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Country } from "@/lib/types";
import IconButton from "./icon-button";
import CountryList from "./country-list";

type VisitedProps = {
  countries: Country[];
};

// TODO show visited number in button?
export default function Visited({ countries }: VisitedProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="fixed top-1/5 left-4">
          <IconButton icon={<Footprints />} text="visited" />
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-80">
        <h4 className="mb-4 text-sm leading-none font-medium">Visited Countries</h4>
        <CountryList countryList={countries} />
      </PopoverContent>
    </Popover>
  );
}
