"use client";

import { ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
  label: string;
  styleClass: string;
  onClick: () => void;
};

export default function IconButton({
  icon,
  label,
  styleClass,
  onClick,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
            group flex flex-col items-center justify-center
            w-full h-20 cursor-pointer rounded-2xl
            transition-all duration-300 ease-out
          bg-gray-200 text-gray-500 hover:bg-gray-300 
            ${styleClass}
      `}
    >
      <span className="mb-1">{icon}</span>
      <span className="font-bold tracking-wider">{label}</span>
    </button>
  );
}
