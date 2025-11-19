"use client";

import { ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
  text: string;
};

export default function IconButton({ icon, text }: IconButtonProps) {
  return (
    <div className="w-12 h-12 bg-stone-200 cursor-pointer rounded-full flex flex-wrap justify-center items-center">
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}
