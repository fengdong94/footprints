import { useEffect, useRef, RefObject } from "react";
import { centroid } from "@turf/turf";
import { Country, Footprint } from "@/lib/types";
import { LngLatLike } from "mapbox-gl";

export function usePrevious<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useSetCountryList(
  mapRef: RefObject<mapboxgl.Map | null>,
  setCountryList: (data: Country[]) => void
) {
  useEffect(() => {
    mapRef.current!.once("idle", () => {
      // Query all rendered features from country-boundaries layer to get CountryList data
      const allFeatures = mapRef.current!.queryRenderedFeatures({
        target: { layerId: "country-boundaries" },
      });
      // Filter duplicated data
      const idSet = new Set();
      const countryList: Country[] = [];
      allFeatures.forEach(({ properties, geometry, id }) => {
        const { mapbox_id, name_en, region, subregion, iso_3166_1 } =
          properties;
        if (!idSet.has(mapbox_id)) {
          idSet.add(mapbox_id);
          countryList.push({
            name_en: name_en as string,
            region: region as string,
            subregion: subregion as string,
            iso_3166_1: iso_3166_1 as string,
            geometry,
            id,
          });
        }
      });
      setCountryList(countryList);
    });
  }, [mapRef, setCountryList]);
}

// highlight and fly to the selected country; unhighlight previous selected country
export function useHighlight(
  mapRef: RefObject<mapboxgl.Map | null>,
  selectedCountry?: Country,
  prevCountry?: Country
) {
  useEffect(() => {
    if (selectedCountry?.id) {
      mapRef.current!.setFeatureState(
        {
          source: "composite",
          sourceLayer: "country_boundaries",
          id: selectedCountry.id,
        },
        { selected: true }
      );

      const centerCoordinates = centroid(selectedCountry.geometry).geometry
        .coordinates;
      mapRef.current?.flyTo({
        center: centerCoordinates as LngLatLike,
        zoom: 2.2,
      });
      // sometimes not accurate when using fitBounds
      // const bounds = bbox(selectedCountry.geometry);
      // mapRef.current?.fitBounds(bounds as [number, number, number, number], {
      //   padding: 50,
      //   duration: 1500,
      //   maxZoom: 4,
      // });
    }
    if (prevCountry?.id) {
      mapRef.current!.setFeatureState(
        {
          source: "composite",
          sourceLayer: "country_boundaries",
          id: prevCountry.id,
        },
        { selected: false }
      );
    }
  }, [mapRef, prevCountry?.id, selectedCountry]);
}

// set click event listener
export function useClick(
  mapRef: RefObject<mapboxgl.Map | null>,
  countryList: Country[],
  setSelectedCountry: (country: Country | undefined) => void
) {
  useEffect(() => {
    if (countryList.length === 0) return;
    // select a country form map
    mapRef.current!.on("click", "country-boundaries", (e) => {
      const features = mapRef.current!.queryRenderedFeatures(e.point);
      console.log("clicked country features", features);
      features.forEach((feature) => {
        const curCountry = countryList.find(({ id }) => id === feature.id);
        setSelectedCountry(curCountry);
      });
    });
  }, [mapRef, countryList, setSelectedCountry]);
}

// set hover event listener
export function useHover(mapRef: RefObject<mapboxgl.Map | null>) {
  useEffect(() => {
    mapRef.current!.on("mousemove", "country-boundaries", (e) => {
      console.log("mousemove", e, e.features);
      if (e.features?.length) {
        mapRef.current!.setFeatureState(
          {
            source: "country-boundaries",
            sourceLayer: "country_boundaries",
            id: e.features[0].id!,
          },
          { hover: true }
        );
      }
    });

    // mapRef.current!.on("mouseleave", "country-boundaries", (e) => {
    //   console.log("mouseleave", e, e.features);
    //   if (e.features?.length) {
    //     mapRef.current?.setFeatureState(
    //       {
    //         source: "states",
    //         sourceLayer: "country_boundaries",
    //         id: e.features[0].id!,
    //       },
    //       { hover: false }
    //     );
    //   }
    // });
  }, [mapRef]);
}

// highlight footprints (visited & wishlist)
export function useFootprints(
  mapRef: RefObject<mapboxgl.Map | null>,
  footprints: Footprint[],
  countryMap: Record<string, Country>
) {
  useEffect(() => {
    footprints.forEach(({ country_name, type }) => {
      if (countryMap[country_name]?.id) {
        mapRef.current!.setFeatureState(
          {
            source: "composite",
            sourceLayer: "country_boundaries",
            id: countryMap[country_name].id,
          },
          // TODO when update another type should be set to false
          { [type]: true }
        );
      }
    });
  }, [countryMap, footprints, mapRef]);
}
