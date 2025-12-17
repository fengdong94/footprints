"use client";

import React, { useState } from "react";

type ViewToggleProps = {
  onToggle: (mode: "2D" | "3D") => void;
};

export default function ViewToggle({ onToggle }: ViewToggleProps) {
  const [viewMode, setViewMode] = useState<"2D" | "3D">("2D");

  const handleToggle = (mode: "2D" | "3D") => {
    if (viewMode === mode) return;
    setViewMode(mode);
    if (onToggle) onToggle(mode);
  };

  return (
    <div
      className="
        fixed top-6 left-3 z-50
        w-30 h-12 flex items-center p-1
        bg-white/95 backdrop-blur-md 
        rounded-full 
        shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
        border border-white/20
      "
    >
      {/* The Blue Slider */}
      <div
        className={`
            absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] 
            rounded-full 
            bg-blue-500 shadow-md
            transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
            ${viewMode === "2D" ? "left-1.5" : "left-[calc(50%+1px)]"}
            z-0
          `}
      />
      <button
        onClick={() => handleToggle("2D")}
        className={`
            cursor-pointer relative z-10 flex-1 flex items-center justify-center gap-1 h-full rounded-full 
            text-xs font-bold tracking-wide transition-colors duration-300 
            ${
              viewMode === "2D"
                ? "text-white"
                : "text-gray-400 hover:text-blue-500"
            }
          `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M3 3h18v18H3V3z" />
        </svg>
        <span>2D</span>
      </button>
      <button
        onClick={() => handleToggle("3D")}
        className={`
            cursor-pointer relative z-10 flex-1 flex items-center justify-center gap-1 h-full rounded-full 
            text-xs font-bold tracking-wide transition-colors duration-300 
            ${
              viewMode === "3D"
                ? "text-white"
                : "text-gray-400 hover:text-blue-500"
            }
          `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
        </svg>
        <span>3D</span>
      </button>
    </div>
  );
}
