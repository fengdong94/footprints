import { getUser } from "@/lib/db";
import ProfileForm from "./profile-form";

// TODO force-dynamic ?
// export const dynamic = 'force-dynamic';

export default async function Profile() {
  const user = await getUser();

  // TODO remove “!” loading?
  return <ProfileForm initialData={user!} />;
}
