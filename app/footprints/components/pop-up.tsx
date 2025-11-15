"use client";

import { useActionState, startTransition, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Country } from "@/lib/types";
import { addFootprint, State } from "@/actions/footprints";

type PopUpProps = {
  selectedCountry: Country;
};

// TODO use shadcn button in all pages
export default function PopUp({ selectedCountry }: PopUpProps) {
  const initialState: State = {};
  // TODO loading and err catch
  const [state, action, pending] = useActionState(addFootprint, initialState);

  useEffect(() => {
    if (state.success === false) {
      toast.error(state.msg);
    }
  }, [state]);

  return (
    <div className="fixed w-1/4 top-20 bg-emerald-200">
      <Button
        className="mr-4"
        onClick={() =>
          startTransition(() =>
            action({ countryName: selectedCountry.name_en, type: "visited" })
          )
        }
      >
        add to visited
      </Button>
      <Button
        onClick={() =>
          startTransition(() =>
            action({ countryName: selectedCountry.name_en, type: "wishlist" })
          )
        }
      >
        add to wishlist
      </Button>
    </div>
  );
}
