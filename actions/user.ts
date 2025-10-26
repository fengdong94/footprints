"use server";

import jwt from "jsonwebtoken";
import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { users } from "@prisma/client";
import { ProfileSchema } from "@/lib/from-schemas";

export type User = users;

const getEmail = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  // TODO redirect
  if (!token) {
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    email: string;
  };
  return decoded.email;
};

export const getUser = async () => {
  const email = await getEmail();
  const user = await prisma.users.findUnique({ where: { email } });
  return user;
};

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

  const result = ProfileSchema.safeParse({ name, bio, avatar });

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  // TODO avatar size control
  // upload to cloudinary CDN
  const arrayBuffer = await avatar.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64File = `data:${avatar.type};base64,${buffer.toString("base64")}`;
  // TODO try catch error handle
  const uploadResult = await cloudinary.uploader.upload(base64File, {
    folder: "footprints_avatars",
  });
  // todo delete old avatar
  // const destroyResult = await cloudinary.uploader.destroy('public_id');

  const email = await getEmail();

  await prisma.users.update({
    where: { email },
    data: { name, bio, avatar: uploadResult.secure_url },
  });

  revalidatePath("/profile");

  return {
    success: true,
    msg: "update success",
  };
}
