"use client";

import { createContext } from "react";
import { Country } from "@/lib/types";

export const CountryListContext = createContext<{
  countryList: Country[];
  countryMap: Record<string, Country>;
  setCountryList: (data: Country[]) => void;
}>({ countryList: [], countryMap: {}, setCountryList: () => null });
