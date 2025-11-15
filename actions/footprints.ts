"use server";

import prisma from "@/lib/prisma";
import { getEmail } from "./user";

export const getFootprints = async () => {
  const email = await getEmail();
  const footprints = await prisma.footprints.findMany({
    where: { user_email: email },
  });
  return footprints;
};
