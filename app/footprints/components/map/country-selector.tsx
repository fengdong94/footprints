"use client";

import { RefObject, useContext, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import flags from "@/lib/flags";
import { CountryListContext, Country } from "../../page";

type CountrySelectorProps = {
  mapRef: RefObject<mapboxgl.Map | null>;
  value?: Country;
  onChange: (value?: Country) => void;
};

export default function CountrySelector({
  mapRef,
  value,
  onChange,
}: CountrySelectorProps) {
  const { name_en, iso_3166_1 } = value || {};
  const [open, setOpen] = useState(false);
  const { countryList } = useContext(CountryListContext);

  const countriesByRegion: [string, Country[]][] = useMemo(() => {
    const data: Record<string, Country[]> = {};
    countryList.forEach((country) => {
      const region = country.region;
      if (region === "Americas") {
        // Separate "Americas" to subregions: "Northern America" and "Latin America and the Caribbean"
        const subregion = country.subregion;
        if (!data[subregion]) data[subregion] = [];
        data[subregion].push(country);
      } else {
        if (!data[region]) data[region] = [];
        data[region].push(country);
      }
    });
    return Object.entries(data);
  }, [countryList]);

  return (
    <div className="fixed top-2 right-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? (
              <>
                {flags[iso_3166_1!].emoji} {name_en}
              </>
            ) : (
              "Select country/region"
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search country/region..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No country/region found.</CommandEmpty>
              {countriesByRegion.map(([region, countryList]) => (
                <CommandGroup key={region} heading={region}>
                  {countryList.map((country) => (
                    <CommandItem
                      key={country.name_en}
                      value={country.name_en}
                      onSelect={(currentValue) => {
                        if (name_en && currentValue === name_en) {
                          onChange(undefined);
                        } else {
                          onChange(country);
                        }
                        setOpen(false);
                      }}
                    >
                      {flags[country.iso_3166_1].emoji} {country.name_en}
                      <Check
                        className={cn(
                          "ml-auto",
                          name_en === country.name_en
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
