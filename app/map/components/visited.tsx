"use client";

import { Footprints, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Country } from "@/lib/types";
import IconButton from "@/components/ui/icon-button";
import CountryList from "./country-list";

type VisitedProps = {
  countries: Country[];
};

// TODO show visited number in button?
export default function Visited({ countries }: VisitedProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="fixed top-1/6 left-3">
          <IconButton
            icon={<Footprints />}
            label="visited"
            styleClass="text-teal-700 bg-teal-50"
          />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="p-4 max-h-screen">
          <DrawerTitle className="text-lg mb-4">Visited Countries</DrawerTitle>
          <CountryList countryList={countries} />
        </ScrollArea>
        <DrawerClose>
          <X size={24} className="absolute text-gray-500 top-4 right-4 cursor-pointer" />
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
