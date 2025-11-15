"use client";

import { useMemo, useState, useRef } from "react";
import { Country, Footprint } from "@/lib/types";
import { CountryListContext } from "./context";
import { Map, PopUp, CountrySelector, Tools } from "./components";
import { usePrevious } from "./hooks";

type FootprintsProps = {
  footprints: Footprint[];
};

export default function Footprints({ footprints }: FootprintsProps) {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const value = useMemo(() => ({ countryList, setCountryList }), [countryList]);

  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const prevCountry = usePrevious(selectedCountry);

  const mapRef = useRef<mapboxgl.Map>(null);

  console.log("my footprints", footprints);

  return (
    <CountryListContext value={value}>
      <Map
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        prevCountry={prevCountry}
        mapRef={mapRef}
      />
      <Tools mapRef={mapRef} />
      <CountrySelector value={selectedCountry} onChange={setSelectedCountry} />
      <PopUp />
    </CountryListContext>
  );
}
