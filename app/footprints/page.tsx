"use client";

import { createContext, useMemo, useState } from "react";
import { AllGeoJSON } from "@turf/turf";
import Map from "./components/map";

export type Country = {
  // color_group: number;
  // disputed: string; // "false" / "true"
  iso_3166_1: string;
  // iso_3166_1_alpha_3: string;
  // mapbox_id: string;
  // name: string;
  name_en: string;
  region: string;
  subregion: string;
  // wikidata_id: string;
  // worldview: string;
  geometry: AllGeoJSON;
  id: string | number | undefined;
};

export const CountryListContext = createContext<{
  countryList: Country[];
  setCountryList: (data: Country[]) => void;
}>({ countryList: [], setCountryList: () => null });

export default function Home() {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const value = useMemo(() => ({ countryList, setCountryList }), [countryList]);

  return (
    <CountryListContext value={value}>
      <Map />
    </CountryListContext>
  );
}
