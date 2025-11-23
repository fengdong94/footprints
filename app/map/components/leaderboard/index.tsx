"use client";

import { useActionState, startTransition } from "react";
import { ListOrdered } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Country } from "@/lib/types";
import IconButton from "@/components/ui/icon-button";
import {
  getTop10VisitedUsers,
  Top10VisitedUsersState,
} from "@/actions/footprints";
import RankList from "./rank-list";

// type LeaderboardProps = {
//   countries: Country[];
// };

// TODO show wishlist number in button?
export default function Leaderboard() {
  const initialState: Top10VisitedUsersState = {};
  // TODO error and loading
  const [{ data }, action, pending] = useActionState(
    getTop10VisitedUsers,
    initialState
  );

  return (
    <Drawer
      direction="left"
      onOpenChange={(open) => {
        if (open) {
          startTransition(() => {
            action();
          });
        }
      }}
    >
      <DrawerTrigger asChild>
        <div className="fixed top-4/6 left-3">
          <IconButton
            icon={<ListOrdered />}
            label="ranking"
            styleClass="text-blue-500 bg-blue-50"
          />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="p-4 max-h-screen">
          <DrawerTitle className="text-lg">Leaderboard</DrawerTitle>
          <h2 className="font-bold text-gray-800 mb-4 mt-4">
            The number of visited countries
          </h2>
          <RankList data={data} />
          {/* TODO visited continents ranking */}
        </ScrollArea>
        <DrawerClose>{/* TODO close icon */}</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
