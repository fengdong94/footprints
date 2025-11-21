"use client";

import { useMemo, Fragment } from "react";
import { Award } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import IconButton from "@/components/ui/icon-button";
import { Country } from "@/lib/types";
import {
  ACHIEVEMENT_RULES_MILESTONE,
  ACHIEVEMENT_RULES_CONTINENT,
  ACHIEVEMENT_RULES_REGIONAL_COLLECTIONS,
  ACHIEVEMENT_RULES_SIDE_QUESTS,
} from "@/lib/achievement-rules";
import AchievementCard from "./achievement-card";

type AchievementProps = {
  countries: Country[];
};

// TODO show achievement number in button?
export default function Achievement({ countries }: AchievementProps) {
  const renderData = useMemo(
    () => [
      {
        title: "Milestone",
        achievements: ACHIEVEMENT_RULES_MILESTONE.map((item) => {
          const current = item.check(countries);
          return {
            ...item,
            current,
            unlockedDate: "2024-10-10",
          };
        }),
      },
      {
        title: "Continent",
        achievements: ACHIEVEMENT_RULES_CONTINENT.map((item) => {
          const current = item.check(countries);
          return {
            ...item,
            current,
            unlockedDate: "2024-10-10",
          };
        }),
      },
      {
        title: "Regional Collections",
        achievements: ACHIEVEMENT_RULES_REGIONAL_COLLECTIONS.map((item) => {
          const current = item.check(countries);
          return {
            ...item,
            current,
            unlockedDate: "2024-10-10",
          };
        }),
      },
      {
        title: "Side Quests",
        achievements: ACHIEVEMENT_RULES_SIDE_QUESTS.map((item) => {
          const current = item.check(countries);
          return {
            ...item,
            current,
            unlockedDate: "2024-10-10",
          };
        }),
      },
    ],
    [countries]
  );

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="fixed top-3/5 left-3">
          <IconButton icon={<Award />} label="badges" styleClass="text-yellow-500 bg-yellow-50" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="p-4 max-h-screen">
          <DrawerTitle className="text-xl">Your Achievements</DrawerTitle>
          {renderData.map(({ title, achievements }) => (
            <Fragment key={title}>
              <h2 className="font-bold text-gray-800 mb-4 mt-4">{title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {achievements.map((item) => (
                  <AchievementCard key={item.title} {...item} />
                ))}
              </div>
            </Fragment>
          ))}
        </ScrollArea>
        <DrawerClose>{/* TODO close icon */}</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
