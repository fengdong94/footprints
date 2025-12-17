import { getUser } from "@/lib/db";
import PageClient from "./page-client";

// TODO force-dynamic ?
// export const dynamic = 'force-dynamic';

export default async function Profile() {
  const user = await getUser();
  return <PageClient initialData={user!} />;
}
