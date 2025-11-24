"use client";

import {
  useActionState,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { updateProfile, State } from "@/actions/user";
import UserAvatar from "@/components/ui/user-avatar";
import { User } from "@/lib/types";
import MapLink from "./components/map-link";
import CountrySelector from "./components/country-selector";

export default function PageClient({
  initialData: { avatar, name, bio, email, nationality },
}: {
  initialData: User;
}) {
  const initialState: State = {};
  const [{ success, errors, msg }, formAction, pending] = useActionState(
    updateProfile,
    initialState
  );

  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(avatar);
    }
  };

  const [country, setCountry] = useState(nationality);

  const initialName = name ?? "";
  const initialBio = bio ?? "";

  useEffect(() => {
    if (success) toast.success(msg);
  }, [success, msg]);

  return (
    <>
      <form
        action={(payload) => {
          payload.append("nationality", country || "");
          payload.append("prevAvatar", avatar || "");
          formAction(payload);
        }}
        className="pt-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-4xl space-y-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Edit Profile
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <div className="relative">
                <UserAvatar
                  src={avatarPreview}
                  name={initialName}
                  email={email}
                  size={160}
                  className="cursor-pointer"
                  onClick={handleUpload}
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Edit
                  onClick={handleUpload}
                  className="text-blue-500 absolute right-0 bottom-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="mt-1 block w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded shadow-sm py-3 px-4 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={initialName}
                />
                {errors?.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name[0]}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  className="mt-1 block w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded shadow-sm py-3 px-4 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  id="bio"
                  name="bio"
                  placeholder="Tell us something about your travels..."
                  defaultValue={initialBio}
                  rows={4}
                />
                {errors?.bio && (
                  <p className="mt-2 text-sm text-red-600">{errors.bio[0]}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="nationality"
                >
                  Nationality
                </label>
                <CountrySelector value={country} onChange={setCountry} />
              </div>
              <div className="flex justify-end pt-4">
                <button
                  className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors cursor-pointer"
                  type="submit"
                  disabled={pending}
                >
                  {pending ? "Saving Changes ..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <MapLink />
    </>
  );
}
