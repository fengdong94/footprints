import { RefObject } from "react";

type ControlsProps = { mapRef: RefObject<mapboxgl.Map | null> };

export default function Tools({ mapRef }: ControlsProps) {
  return (
    <div className="fixed top-2 left-2">
      <button
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => mapRef.current?.setProjection("mercator")}
      >
        2D
      </button>
      <button
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => mapRef.current?.setProjection("globe")}
      >
        3D
      </button>
    </div>
  );
}
