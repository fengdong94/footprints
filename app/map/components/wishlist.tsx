"use client";

import { Heart } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Country } from "@/lib/types";
import IconButton from "@/components/ui/icon-button";
import CountryList from "./country-list";

type WishlistProps = {
  countries: Country[];
};

// TODO show wishlist number in button?
export default function Wishlist({ countries }: WishlistProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="fixed top-2/6 left-3">
          <IconButton
            icon={<Heart />}
            label="wishlist"
            styleClass="text-pink-600 bg-pink-50"
          />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="p-4 max-h-screen">
          <DrawerTitle className="text-lg mb-4">Wishlist Countries</DrawerTitle>
          <CountryList countryList={countries} />
        </ScrollArea>
        <DrawerClose>{/* TODO close icon */}</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
