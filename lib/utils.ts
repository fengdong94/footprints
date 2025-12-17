import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import flags from "@/lib/flags";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFlagByISO(iso_3166_1?: string) {
  if (!iso_3166_1) return " ";
  return flags[iso_3166_1]?.emoji || " ";
}
