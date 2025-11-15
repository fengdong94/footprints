"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useContext, RefObject } from "react";
import { Country } from "@/lib/types";
import { useSetCountryList, useHighlight, useClick } from "../hooks";
import { CountryListContext } from "../context";

type MapProps = {
  selectedCountry?: Country;
  setSelectedCountry: (country: Country | undefined) => void;
  prevCountry?: Country;
  mapRef: RefObject<mapboxgl.Map | null>;
};

export default function Map({
  selectedCountry,
  setSelectedCountry,
  prevCountry,
  mapRef,
}: MapProps) {
  const { setCountryList, countryList } = useContext(CountryListContext);

  // initialize the map
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZmVuZ2RvbmciLCJhIjoiY21oZmY4amVwMDRrdjJqczc2YnB6d2M3bCJ9.fGVMghfQ1iBc7KGon0oIFg";
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/fengdong/cmi07p3co00cw01r46ofk9134",
      center: [-74.5, 40],
      zoom: 0,
      projection: "mercator", // 2D: mercator, 3D: globe
    });

    mapRef.current.on("load", () => {
      // TODO remove
      console.log("layer place-label", mapRef.current!.getLayer("place-label"));
      console.log(
        "layer country-boundaries",
        mapRef.current!.getLayer("country-boundaries")
      );
    });

    return () => mapRef.current!.remove();
  }, [mapRef]);

  useSetCountryList(mapRef, setCountryList);
  // TODO
  // useHover(mapRef);
  useClick(mapRef, countryList, setSelectedCountry);
  useHighlight(mapRef, selectedCountry, prevCountry);

  return <div id="map" style={{ height: "100vh" }}></div>;
}
