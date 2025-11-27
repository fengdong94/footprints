"use client";

import {
  useActionState,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { X, Heart, Footprints } from "lucide-react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Country, Footprint } from "@/lib/types";
import { getFlagByISO } from "@/lib/utils";
import { addFootprint, removeFootprint, State } from "@/actions/footprints";
import IconButton from "./icon-button";
import TravelMemory from "./travel-memory";

const UNSPLASH_ACCESS_KEY = "3nhfmA37I1UVTJcaSX9j28g9a1mN9XyiyLNglix9XeE";

type CountryDrawerProps = {
  selectedCountry?: Country;
  footprints: Footprint[];
  setSelectedCountry: (val?: Country) => void;
};

// TODO use shadcn button in all pages
export default function CountryDrawer({
  selectedCountry,
  footprints,
  setSelectedCountry,
}: CountryDrawerProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (selectedCountry) setOpen(true);
  }, [selectedCountry]);
  useEffect(() => {
    // clear selected country after animation of closing drawer
    if (!open) {
      setTimeout(() => setSelectedCountry(undefined), 250);
    }
  }, [open, setSelectedCountry]);

  const [bannerUrl, setBannerUrl] = useState(
    "https://placehold.co/600x400/e2e8f0/94a3b8?text=No+Image"
  );
  const [desc, setDesc] = useState("");

  const initialState: State = {};
  // TODO loading and err catch
  const [stateAdd, actionAdd, pendingAdd] = useActionState(
    addFootprint,
    initialState
  );
  const [stateRemove, actionRemove, pendingRemove] = useActionState(
    removeFootprint,
    initialState
  );
  useEffect(() => {
    if (stateAdd.success === false) toast.error(stateAdd.msg);
  }, [stateAdd]);
  useEffect(() => {
    if (stateRemove.success === false) toast.error(stateRemove.msg);
  }, [stateRemove]);

  const footprint = useMemo(
    () =>
      footprints.find(
        ({ country_name }) => country_name === selectedCountry?.name_en
      ),
    [footprints, selectedCountry]
  );

  useEffect(() => {
    if (selectedCountry?.name_en) {
      fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedCountry.name_en}`
      ).then((res) => {
        if (res.ok) {
          res.json().then((json) => setDesc(json.extract));
        }
      });
    }
  }, [selectedCountry?.name_en]);

  useEffect(() => {
    if (selectedCountry?.name_en)
      fetch(
        `https://api.unsplash.com/search/photos?query=${selectedCountry.name_en}+travel+landscape&orientation=landscape&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
      ).then((res) => {
        if (res.ok) {
          res.json().then((json) => {
            console.log("jsonjsonjson", json);
            if (json.results && json.results.length > 0) {
              setBannerUrl(json.results[0].urls.regular);
            }
          });
        }
      });
  }, [selectedCountry?.name_en]);

  return (
    <Drawer open={open} direction="left">
      <DrawerContent>
        <div className="relative h-48 sm:h-56 flex-shrink-0 mr-[-1px]">
          <Image src={bannerUrl} alt="banner" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-1 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
          <DrawerTitle className="absolute bottom-4 left-4 text-3xl font-bold text-white">
            {selectedCountry?.name_en}{" "}
            <span className="relative top-[2px]">
              {getFlagByISO(selectedCountry?.iso_3166_1)}
            </span>
          </DrawerTitle>
        </div>
        <ScrollArea className="flex-1 p-4 h-0">
          <h3 className="font-bold text-gray-900 mb-3">Quick facts</h3>
          {/* TODO ellipsis and more */}
          <p className="text-gray-700 leading-relaxed text-sm">{desc}</p>
          <hr className="border-gray-200 my-4" />
          <h3 className="font-bold text-gray-900 mb-3">Travel status</h3>
          <div className="grid grid-cols-2 gap-4">
            <IconButton
              icon={<Footprints />}
              label="visited"
              styleClass={
                footprint?.type === "visited"
                  ? "text-teal-700 bg-teal-100 hover:bg-teal-200"
                  : ""
              }
              onClick={() => {
                if (!selectedCountry) return;
                startTransition(() => {
                  if (!footprint || footprint?.type === "wishlist") {
                    actionAdd({
                      countryName: selectedCountry.name_en,
                      type: "visited",
                    });
                  } else {
                    actionRemove(selectedCountry.name_en);
                  }
                });
              }}
            />
            {/* TODO alert warning */}
            <IconButton
              icon={<Heart />}
              label="wishlist"
              styleClass={
                footprint?.type === "wishlist"
                  ? "text-pink-600 bg-pink-100 hover:bg-pink-200"
                  : ""
              }
              onClick={() => {
                if (!selectedCountry) return;
                startTransition(() => {
                  if (!footprint || footprint.type === "visited") {
                    actionAdd({
                      countryName: selectedCountry.name_en,
                      type: "wishlist",
                    });
                  } else {
                    actionRemove(selectedCountry.name_en);
                  }
                });
              }}
            />
          </div>
          {footprint?.type === "visited" && (
            <TravelMemory footprint={footprint} />
          )}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
