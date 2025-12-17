"use client";

import { useMemo, useState, useRef } from "react";
import { Country, Footprint, User } from "@/lib/types";
import { CountryListContext } from "./context";
import {
  Map,
  CountryDrawer,
  CountrySelector,
  Tools,
  Visited,
  Wishlist,
  Achievement,
  Leaderboard,
  ProfileLink,
} from "./components";
import { usePrevious } from "./hooks";

type FootprintsProps = {
  footprints: Footprint[];
  user: User;
};

export default function Footprints({ footprints, user }: FootprintsProps) {
  // TODO no antarctic
  const [countryList, setCountryList] = useState<Country[]>([]);
  const value = useMemo(() => {
    const countryMap: Record<string, Country> = {};
    countryList.forEach((country) => {
      countryMap[country.name_en] = country;
    });
    return { countryList, countryMap, setCountryList };
  }, [countryList]);

  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const prevCountry = usePrevious(selectedCountry);

  const mapRef = useRef<mapboxgl.Map>(null);

  // TODO visited/wishlist countries go into map directly
  const { visitedCountries, wishlistCountries } = useMemo(() => {
    const visitedCountries: Country[] = [];
    const wishlistCountries: Country[] = [];
    footprints.forEach(({ type, country_name }) => {
      const country = value.countryMap[country_name];
      if (!country) return;
      if (type === "visited") visitedCountries.push(country);
      if (type === "wishlist") wishlistCountries.push(country);
    });
    return { visitedCountries, wishlistCountries };
  }, [footprints, value]);

  return (
    <CountryListContext value={value}>
      <Map
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        prevCountry={prevCountry}
        footprints={footprints}
        mapRef={mapRef}
      />
      <Tools mapRef={mapRef} />
      <CountrySelector value={selectedCountry} onChange={setSelectedCountry} />
      <CountryDrawer
        selectedCountry={selectedCountry}
        footprints={footprints}
        setSelectedCountry={setSelectedCountry}
      />
      <Visited countries={visitedCountries} />
      <Wishlist countries={wishlistCountries} />
      <Achievement countries={visitedCountries} />
      <Leaderboard />
      <ProfileLink user={user} />
    </CountryListContext>
  );
}
