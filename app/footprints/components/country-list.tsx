"use client";

import { Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Country } from "@/lib/types";

type CountryListProps = {
  countryList: Country[];
};

export default function CountryList({ countryList }: CountryListProps) {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        {countryList.map(({ name_en }, i) => (
          <Fragment key={name_en}>
            <div className="text-sm">{i + 1}. {name_en}</div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
