"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getEmail } from "@/lib/db";

import { ProfileSchema } from "@/lib/from-schemas";

export type State = {
  errors?: {
    name?: string[];
    bio?: string[];
  };
  success?: boolean;
  msg?: string;
};

// TODO bug:values are reseted when validate fail

export async function updateProfile(
  prevState: State,
  formData: FormData
): Promise<State> {
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const avatar = formData.get("avatar") as File;
  const prevAvatar = formData.get("prevAvatar") as string;
  const nationality = formData.get("nationality") as string;

  const result = ProfileSchema.safeParse({ name, bio, avatar });
  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const email = await getEmail();
  // TODO avatar size control

  if (avatar.size !== 0) {
    // upload to cloudinary CDN
    const arrayBuffer = await avatar.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = `data:${avatar.type};base64,${buffer.toString(
      "base64"
    )}`;
    const uploadResult = await cloudinary.uploader.upload(base64File, {
      folder: "footprints_avatars",
    });
    // delete previous avatar
    if (prevAvatar) {
      const arr = prevAvatar.split("/");
      const publicId = arr[7] + "/" + arr[8]?.split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await prisma.users.update({
      where: { email },
      data: { name, bio, avatar: uploadResult.secure_url, nationality },
    });
  } else {
    // no upload file
    await prisma.users.update({
      where: { email },
      data: { name, bio, nationality },
    });
  }

  revalidatePath("/profile");
  return {
    success: true,
    msg: "update success",
  };
}
