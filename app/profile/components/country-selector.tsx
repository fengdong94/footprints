"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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

type CountrySelectorProps = {
  value: string | null;
  onChange: (value: string | null) => void;
};

export default function CountrySelector({
  value,
  onChange,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const countryList = useMemo(
    () => Object.entries(flags).map(([, country]) => country),
    []
  );
  const curCountry = useMemo(
    () => countryList.find(({ name }) => name === value),
    [countryList, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] h-12 mt-1 shadow-sm justify-between cursor-pointer"
        >
          {value ? (
            <>
              {curCountry?.emoji} {value}
            </>
          ) : (
            "Select country/region"
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput
            placeholder="Search country/region..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No country/region found.</CommandEmpty>
            {countryList.map(({ name, emoji }) => (
              <CommandItem
                key={name}
                value={name}
                onSelect={(currentValue) => {
                  if (value && currentValue === value) {
                    onChange("");
                  } else {
                    onChange(name);
                  }
                  setOpen(false);
                }}
              >
                {emoji} {name}
                <Check
                  className={cn(
                    "ml-auto",
                    value === name ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
