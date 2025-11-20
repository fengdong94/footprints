"use client";

import { ListOrdered } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Country } from "@/lib/types";
import IconButton from "./icon-button";

// type LeaderboardProps = {
//   countries: Country[];
// };

// TODO show wishlist number in button?
export default function Leaderboard() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="fixed top-4/5 left-4">
          <IconButton icon={<ListOrdered />} text="leaderboard" />
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-80">
        <h4 className="mb-4 text-sm leading-none font-medium">Leaderboard</h4>
      </PopoverContent>
    </Popover>
  );
}
