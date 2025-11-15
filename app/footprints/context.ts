"use client";

import { createContext } from "react";
import { Country } from "@/lib/types";

export const CountryListContext = createContext<{
  countryList: Country[];
  setCountryList: (data: Country[]) => void;
}>({ countryList: [], setCountryList: () => null });
