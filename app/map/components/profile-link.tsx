"use client";

import Link from "next/link";
import { User } from "@/lib/types";
import UserAvatar from "@/components/ui/user-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ProfileLinkProps = {
  user: User;
};

export default function ProfileLink({
  user: { avatar, email, name },
}: ProfileLinkProps) {
  return (
    <Link href="/profile" className="fixed top-5/6 left-3 rounded-full">
      <Tooltip>
        <TooltipTrigger>
          <UserAvatar
            src={avatar}
            email={email}
            name={name}
            className="shadow-[0_8px_30px_rgb(0,0,0,0.24)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.32)] cursor-pointer"
          />
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Click go to profile</p>
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}
