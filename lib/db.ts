import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export const getEmail = async () => {
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

export const getFootprints = async () => {
  const email = await getEmail();
  const footprints = await prisma.footprints.findMany({
    where: { user_email: email },
  });
  return footprints;
};

export const getUser = async () => {
  const email = await getEmail();
  const user = await prisma.users.findUnique({ where: { email } });
  return user;
};
