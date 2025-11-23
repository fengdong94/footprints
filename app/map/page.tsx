import { getFootprints, getUser } from "@/lib/db";
import PageClient from "./page-client";

export default async function Footprints() {
  const footprints = await getFootprints();
  const user = await getUser();

  return <PageClient footprints={footprints} user={user!} />;
}
