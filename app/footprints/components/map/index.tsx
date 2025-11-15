"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useContext, useState } from "react";
import Tools from "./tools";
import {
  useSetCountryList,
  usePrevious,
  useHighlight,
  useClick,
} from "./custom-hooks";
import PopUp from "./pop-up";
import CountrySelector from "./country-selector";
import { CountryListContext, Country } from "../../page";

export default function Map() {
  const { setCountryList, countryList } = useContext(CountryListContext);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const preCountry = usePrevious(selectedCountry);
  const mapRef = useRef<mapboxgl.Map>(null);

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
  }, []);

  useSetCountryList(mapRef, setCountryList);
  // TODO
  // useHover(mapRef);
  useClick(mapRef, countryList, setSelectedCountry);
  useHighlight(mapRef, selectedCountry, preCountry);

  return (
    <>
      <div id="map" style={{ height: "100vh" }}></div>
      <Tools mapRef={mapRef} />
      <CountrySelector
        mapRef={mapRef}
        value={selectedCountry}
        onChange={setSelectedCountry}
      />
      <PopUp />
    </>
  );
}
