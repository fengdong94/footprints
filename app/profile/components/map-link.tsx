"use client";

import Link from "next/link";
import { Map } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MapLink() {
  return (
    <Link href="/map" className="fixed top-5/6 left-3 rounded-full">
      <Tooltip>
        <TooltipTrigger>
          <div
            className="
              w-12 h-12 flex flex-col items-center justify-center 
              text-blue-500 bg-blue-50 rounded-full 
              shadow-[0_8px_30px_rgb(0,0,0,0.24)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.32)] cursor-pointer
            "
          >
            <Map />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Click go to map</p>
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}
