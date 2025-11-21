"use client";

import { Heart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Country } from "@/lib/types";
import IconButton from "@/components/ui/icon-button";
import CountryList from "./country-list";

type WishlistProps = {
  countries: Country[];
};

// TODO show wishlist number in button?
export default function Wishlist({ countries }: WishlistProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="fixed top-2/5 left-3">
          <IconButton icon={<Heart />} label="wishlist" />
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-80">
        <h4 className="mb-4 text-sm leading-none font-medium">
          Wishlist Countries
        </h4>
        <CountryList countryList={countries} />
      </PopoverContent>
    </Popover>
  );
}
