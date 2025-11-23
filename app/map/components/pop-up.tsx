"use client";

import { useActionState, startTransition, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Country, Footprint } from "@/lib/types";
import { addFootprint, removeFootprint, State } from "@/actions/footprints";

type PopUpProps = {
  selectedCountry: Country;
  footprints: Footprint[];
};

// TODO use shadcn button in all pages
export default function PopUp({ selectedCountry, footprints }: PopUpProps) {
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
        ({ country_name }) => country_name === selectedCountry.name_en
      ),
    [footprints, selectedCountry]
  );

  const inWishlist = footprint?.type === "wishlist";
  const inVisited = footprint?.type === "visited";

  return (
    <div className="fixed w-1/4 top-20 bg-emerald-200">
      <Button
        className="mr-4"
        onClick={() =>
          startTransition(() => {
            if (!footprint || inWishlist) {
              actionAdd({
                countryName: selectedCountry.name_en,
                type: "visited",
              });
            } else {
              actionRemove(selectedCountry.name_en);
            }
          })
        }
      >
        {!footprint || inWishlist ? "add to visited" : "remove from visited"}
      </Button>
      <Button
        onClick={() =>
          startTransition(() => {
            if (!footprint || inVisited) {
              actionAdd({
                countryName: selectedCountry.name_en,
                type: "wishlist",
              });
            } else {
              actionRemove(selectedCountry.name_en);
            }
          })
        }
      >
        {!footprint || inVisited ? "add to wishlist" : "remove from wishlist"}
      </Button>
    </div>
  );
}
