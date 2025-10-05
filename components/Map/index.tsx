"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import Controls from "./Controls";

export default function Map() {
  const mapRef = useRef<mapboxgl.Map>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZmVuZ2RvbmciLCJhIjoiY21nY3Zxa3g5MHY5cDJrcXU4MnowNWsycCJ9.7Wwc21v57NqiZe6AsvUIoQ";
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 0,
      projection: "mercator", // 2D: mercator, 3D: globe
    });
  }, []);

  return (
    <>
      <div id="map" style={{ width: 600, height: 300 }}></div>
      <Controls mapRef={mapRef} />
    </>
  );
}
