"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { updateProfile, User, State } from "@/actions/user";

export default function ProfileForm({ initialData }: { initialData: User }) {
  const initialState: State = {};
  const [{ success, errors }, formAction] = useActionState(
    updateProfile,
    initialState
  );

  const { pending } = useFormStatus();

  const [avatarPreview, setAvatarPreview] = useState<string>(
    initialData.avatar || "/default-avatar.png"
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialName = initialData.name ?? "";
  const initialBio = initialData.bio ?? "";

  // 监听文件选择变化，生成本地预览图
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else if (initialData.avatar) {
      // 如果用户取消选择，恢复到初始头像
      setAvatarPreview(initialData.avatar);
    }
  };

  useEffect(() => {
    if (success) {
      // TODO
      alert("update success");
    }
  }, [success]);

  return (
    <form action={formAction} className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Edit Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Update your profile information and preferences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <Image
              src={avatarPreview}
              alt="avatar"
              width={128}
              height={128}
              className="w-40 h-40 rounded-full bg-cover bg-center ring-4 ring-white dark:ring-gray-900 shadow-lg"
            />
            <button className="mt-6 w-full bg-gray-200 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 text-sm font-bold py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700">
              Upload New Photo
            </button>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="block text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="name"
              >
                name
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
            <div className="flex justify-end pt-4">
              <button
                className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors"
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
  );
}
