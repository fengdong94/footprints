"use client";

import { RefObject } from "react";
import ViewToggle from "@/components/ui/view-toggle";

type ControlsProps = { mapRef: RefObject<mapboxgl.Map | null> };

// TODO other tools scale ...
export default function Tools({ mapRef }: ControlsProps) {
  return (
    <ViewToggle
      onToggle={(mode) => {
        mapRef.current?.setProjection(mode === "2D" ? "mercator" : "globe");
      }}
    />
  );
}
