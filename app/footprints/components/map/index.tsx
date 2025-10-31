"use client";

import mapboxgl, { LngLatLike } from "mapbox-gl";
import { center, centroid } from "@turf/turf";
import { useEffect, useRef, useContext, useState } from "react";
import Tools from "./tools";
import CountrySelector from "./country-selector";
import { CountryListContext, Country } from "../../page";

export default function Map() {
  const { setCountryList } = useContext(CountryListContext);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const mapRef = useRef<mapboxgl.Map>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZmVuZ2RvbmciLCJhIjoiY21nY3Zxa3g5MHY5cDJrcXU4MnowNWsycCJ9.7Wwc21v57NqiZe6AsvUIoQ";
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/fengdong/cmhanktxg000501s9gome7wgc",
      center: [-74.5, 40],
      zoom: 0,
      projection: "mercator", // 2D: mercator, 3D: globe
    });

    mapRef.current.on("load", () => {
      mapRef.current!.addSource("country-boundaries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      mapRef.current!.addLayer({
        id: "country-boundaries",
        source: "country-boundaries",
        "source-layer": "country_boundaries",
        type: "fill",
        filter: [
          "all",
          ["==", ["get", "disputed"], "false"],
          [
            "any",
            ["==", "all", ["get", "worldview"]],
            ["in", "CN", ["get", "worldview"]],
          ],
        ],
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "highlight"], false],
            "rgba(100,200,251, 0.3)", // highlight
            "rgba(200,100,251, 0.3)", // default
          ],
          "fill-outline-color": "#ff0000",
        },
      });

      mapRef.current!.on("click", (e) => {
        const features = mapRef.current!.queryRenderedFeatures(e.point);
        console.log("clicked country features", features);

        features.forEach((feature) => {
          if (feature.layer?.id === "country-boundaries") {
            mapRef.current!.setFeatureState(
              {
                source: feature.layer.source!,
                sourceLayer: feature.layer["source-layer"],
                id: feature.id!,
              },
              {
                highlight: true,
              }
            );
          }
        });
      });
    });

    mapRef.current.once("idle", () => {
      // Query all rendered features from country-boundaries layer to get CountryList data
      const allFeatures = mapRef.current!.queryRenderedFeatures({
        target: { layerId: "country-boundaries" },
      });
      // Filter duplicated data
      const idSet = new Set();
      const countryList: Country[] = [];
      allFeatures.forEach(({ properties, geometry }) => {
        const { mapbox_id, name_en, region, subregion } = properties;
        if (!idSet.has(mapbox_id)) {
          idSet.add(mapbox_id);
          countryList.push({
            name_en: name_en as string,
            region: region as string,
            subregion: subregion as string,
            geometry,
          });
        }
      });
      setCountryList(countryList);
    });

    return () => mapRef.current!.remove();
  }, [setCountryList]);

  // When select a country, show this country on the map
  useEffect(() => {
    if (!selectedCountry) return;
    // const bounds = bbox(selectedCountry.geometry);
    const centerCoordinates = centroid(selectedCountry.geometry).geometry
      .coordinates;
    mapRef.current?.flyTo({
      center: centerCoordinates as LngLatLike,
      zoom: 2.2,
    });
    // mapRef.current?.fitBounds(bounds as [number, number, number, number], {
    //   padding: 50,
    //   duration: 1500,
    //   maxZoom: 4,
    // });
  }, [selectedCountry]);

  return (
    <>
      <div id="map" style={{ height: "100vh" }}></div>
      <Tools mapRef={mapRef} />
      <CountrySelector
        mapRef={mapRef}
        value={selectedCountry}
        onChange={setSelectedCountry}
      />
    </>
  );
}
