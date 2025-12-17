"use client";

import React from "react";

const styles = {
  progress: {
    border: "border-blue-200",
    bg: "bg-white",
    iconBg: "bg-blue-50",
    text: "text-gray-800",
    iconColor: "text-blue-500",
    opacity: "opacity-100",
  },
  unlocked: {
    border: "border-yellow-400 ring-1 ring-yellow-100",
    bg: "bg-yellow-50/30",
    iconBg: "bg-yellow-100",
    text: "text-gray-900",
    iconColor: "text-yellow-600",
    opacity: "opacity-100",
  },
};

type AchievementCardProps = {
  title: string;
  description: string;
  icon: string;
  current: number;
  target: number;
  unlockedDate?: string;
};

const AchievementCard = ({
  title,
  description,
  icon,
  current,
  target,
  // TODO 列表中最后一个访问的国家
  unlockedDate,
}: AchievementCardProps) => {
  const status = current < target ? "progress" : "unlocked";
  const activeStyle = styles[status];
  const progressPercentage = Math.min((current / target) * 100, 100);

  return (
    <div
      className={`
        relative flex flex-col justify-between
        rounded-xl p-3 border transition-all duration-300 ease-in-out
        ${activeStyle.border} ${activeStyle.bg} ${activeStyle.opacity}
        hover:shadow-lg hover:-translate-y-1 cursor-pointer group
      `}
    >
      <div className="flex items-start space-x-3 mb-2">
        <div
          className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${activeStyle.iconBg} ${activeStyle.iconColor} shadow-sm
        `}
        >
          {icon}
        </div>
        <div>
          <p className={`text-sm font-bold mb-1 ${activeStyle.text}`}>{title}</p>
          {/* TODO space & ellipsis */}
          <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="mt-auto">
        {status === "progress" && (
          <div className="w-full">
            <div className="flex justify-between text-xs mb-1 font-medium text-gray-600">
              <span>progress</span>
              <span>
                {current} / {target}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        {status === "unlocked" && (
          <div className="text-xs font-medium flex items-center gap-1 text-yellow-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            unlocked on {unlockedDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;
