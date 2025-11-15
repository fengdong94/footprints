import { getFootprints } from "@/actions/footprints";
import PageClient from "./page-client";

export default async function Footprints() {
  const footprints = await getFootprints();
  return <PageClient footprints={footprints} />;
}
