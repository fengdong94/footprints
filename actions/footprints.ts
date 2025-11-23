"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getEmail } from "@/lib/db";
import { Footprint } from "@/lib/types";

export type State = {
  success?: boolean;
  msg?: string;
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
        where: {
          user_email_country_name: {
            user_email: footprint.user_email,
            country_name: footprint.country_name,
          },
        },
        data: { type },
      });
      revalidatePath("/map");
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
    revalidatePath("/map");
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
    await prisma.footprints.delete({
      where: {
        user_email_country_name: {
          user_email: footprint.user_email,
          country_name: footprint.country_name,
        },
      },
    });
    revalidatePath("/map");
    return { success: true };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      msg: "Remove footprint failed, please try again later.",
    };
  }
}

export type Top10VisitedUsersState = {
  success?: boolean;
  msg?: string;
  data?: {
    count: number;
    name?: string | null | undefined;
    email?: string | undefined;
    avatar?: string | null | undefined;
    bio?: string | null | undefined;
    nationality?: string | null | undefined;
  }[];
};
type TopUsers = { _count: { user_email: number }; user_email: string }[];
// TODO show top 10 and me?
export async function getTop10VisitedUsers(): Promise<Top10VisitedUsersState> {
  try {
    const topUsers = await prisma.footprints.groupBy({
      by: ["user_email"],
      where: { type: "visited" },
      _count: { user_email: true },
      orderBy: { _count: { user_email: "desc" } },
      take: 10, // top10
    });
    if (topUsers.length === 0) return { success: true, data: [] };

    const topUserEmails = (topUsers as TopUsers).map(
      (count) => count.user_email
    );
    const userDetails = await prisma.users.findMany({
      where: { email: { in: topUserEmails } },
      select: {
        email: true,
        name: true,
        avatar: true,
        bio: true,
        nationality: true,
      },
    });
    const detailsMap = new Map(userDetails.map((user) => [user.email, user]));

    const data = (topUsers as TopUsers).map(({ user_email, _count }) => {
      const user = detailsMap.get(user_email);
      return {
        ...user,
        count: _count.user_email,
      };
    });

    return {
      success: true,
      msg: "Get top10 visited users failed, please try again later.",
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: "Get top10 visited users failed, please try again later.",
    };
  }
}
