import { AllGeoJSON } from "@turf/turf";
import { users, footprints } from "@prisma/client";

export type User = users;
export type Footprint = footprints;

export type Country = {
  // color_group: number;
  // disputed: string; // "false" / "true"
  iso_3166_1: string;
  // iso_3166_1_alpha_3: string;
  // mapbox_id: string;
  // name: string;
  name_en: string;
  region: string;
  subregion: string;
  // wikidata_id: string;
  // worldview: string;
  geometry: AllGeoJSON;
  id: string | number | undefined;
};
