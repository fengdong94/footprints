"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getEmail } from "./user";
import { Footprint } from "@/lib/types";

export type State = {
  success?: boolean;
  msg?: string;
};

export const getFootprints = async () => {
  const email = await getEmail();
  const footprints = await prisma.footprints.findMany({
    where: { user_email: email },
  });
  return footprints;
};

export async function addFootprint(
  prevState: State,
  data: {
    countryName: string;
    type: Footprint["type"];
  }
): Promise<State> {
  const email = await getEmail();
  const { countryName, type } = data;

  // check if footprint of this country has already existed
  const footprint = await prisma.footprints.findFirst({
    where: { user_email: email, country_name: countryName },
  });
  if (footprint) {
    if (footprint.type === type) {
      return { success: false, msg: "This footprint has already existed." };
    }
    // if the type is different, update the footprint
    try {
      await prisma.footprints.update({
        where: footprint,
        data: { type },
      });
      revalidatePath("/footprints");
      return { success: true };
    } catch (error) {
      console.log("error", error);
      return {
        success: false,
        msg: "Update footprint failed, please try again later.",
      };
    }
  }

  // if footprint of this country has not already existed, create a new one
  try {
    await prisma.footprints.create({
      data: {
        country_name: countryName,
        type,
        users: { connect: { email } },
      },
    });
    revalidatePath("/footprints");
    return { success: true };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      msg: "Create footprint failed, please try again later.",
    };
  }
}

export async function removeFootprint(
  prevState: State,
  countryName: string
): Promise<State> {
  const email = await getEmail();

  // check if footprint of this country has already existed
  const footprint = await prisma.footprints.findFirst({
    where: { user_email: email, country_name: countryName },
  });
  if (!footprint) {
    return { success: false, msg: "This footprint does not exist." };
  }

  try {
    await prisma.footprints.delete({ where: footprint });
    revalidatePath("/footprints");
    return { success: true };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      msg: "Remove footprint failed, please try again later.",
    };
  }
}
