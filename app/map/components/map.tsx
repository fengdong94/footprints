"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useContext, RefObject } from "react";
import { Country, Footprint } from "@/lib/types";
import {
  useSetCountryList,
  useHighlight,
  useClick,
  useFootprints,
} from "../hooks";
import { CountryListContext } from "../context";

type MapProps = {
  selectedCountry?: Country;
  setSelectedCountry: (country: Country | undefined) => void;
  prevCountry?: Country;
  footprints: Footprint[];
  mapRef: RefObject<mapboxgl.Map | null>;
};

export default function Map({
  selectedCountry,
  setSelectedCountry,
  prevCountry,
  footprints,
  mapRef,
}: MapProps) {
  const { setCountryList, countryList, countryMap } =
    useContext(CountryListContext);

  // initialize the map
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZmVuZ2RvbmciLCJhIjoiY21oZmY4amVwMDRrdjJqczc2YnB6d2M3bCJ9.fGVMghfQ1iBc7KGon0oIFg";
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/fengdong/cmj9i5oep002r01sa7z2l1o4d",
      center: [20, 26],
      zoom: 1.5,
      projection: "mercator", // 2D: mercator, 3D: globe
    });

    // mapRef.current.on("load", () => {
    //   console.log("layer place-label", mapRef.current!.getLayer("place-label"));
    //   console.log(
    //     "layer country-boundaries",
    //     mapRef.current!.getLayer("country-boundaries")
    //   );
    // });

    return () => mapRef.current!.remove();
  }, [mapRef]);

  useSetCountryList(mapRef, setCountryList);
  useClick(mapRef, countryList, setSelectedCountry);
  useHighlight(mapRef, selectedCountry);
  useFootprints(mapRef, footprints, countryMap, countryList);

  return <div id="map" style={{ height: "100vh" }}></div>;
}
