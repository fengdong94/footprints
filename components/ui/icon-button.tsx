"use client";

import { ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
  label: string;
};

export default function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button
      className="
            group flex flex-col items-center justify-center
            w-12 h-12 cursor-pointer
            bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]
            backdrop-blur-sm bg-opacity-95
            transition-all duration-300 ease-out
            hover:scale-105 hover:-translate-y-1 hover:shadow-2xl
            text-blue-500 hover:bg-blue-50"
    >
      <span className="text-gray-400 transition-colors duration-300 group-hover:text-current">
        {icon}
      </span>
      <span className="text-[9px] font-bold tracking-wider text-gray-500 transition-colors duration-300 group-hover:text-current">
        {label}
      </span>
    </button>
  );
}
