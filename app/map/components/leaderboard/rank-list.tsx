"use client";

import React, { useContext } from "react";
import { getFlagByISO } from "@/lib/utils";
import UserAvatar from "@/components/ui/user-avatar";
import { CountryListContext } from "../../context";

type RowData = {
  count: number;
  name?: string | null | undefined;
  email: string;
  avatar?: string | null | undefined;
  bio?: string | null | undefined;
  nationality?: string | null | undefined;
};

const getRankStyles = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-110 font-extrabold";
    case 2:
      return "bg-gray-300 text-gray-800 font-bold";
    case 3:
      return "bg-yellow-600 text-white font-bold";
    default:
      return "bg-gray-100 text-gray-500 font-medium";
  }
};

const Row = ({
  rowData: { avatar, name, bio, nationality, count, email },
  index,
}: {
  rowData: RowData;
  index: number;
}) => {
  const rank = index + 1;
  const rankStyles = getRankStyles(rank);
  const isWinner = rank === 1;
  const { countryMap } = useContext(CountryListContext);

  return (
    <div
      className={`
        /* 5-Column Compact Layout: Rank | Avatar+Name | Country | Bio | Visits */
        /* Ensuring all column content alignment matches the header */
        grid grid-cols-[0.8fr_1.8fr_1.2fr_3fr_1.2fr] items-center gap-2 py-2 px-3 
        border-b border-gray-100 last:border-b-0 
        transition-all duration-300 ease-in-out
        hover:bg-blue-50/50 hover:shadow-sm
        ${isWinner ? "bg-blue-50 border-blue-200" : ""}
      `}
    >
      <div className="flex items-center justify-start">
        <span
          className={`
            w-6 h-6 flex items-center justify-center rounded-full text-xs transition-all duration-300
            ${rankStyles}
          `}
        >
          {isWinner ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14V3h4v11" />
              <path d="M12 17v5" />
              <path d="M5 22v-4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v4" />
            </svg>
          ) : (
            rank
          )}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-0">
        <UserAvatar
          src={avatar}
          name={name}
          email={email}
          size={36}
          className="shadow-md"
        />
        <span
          className={`
            text-xs font-semibold text-gray-800 truncate text-center max-w-full
            ${isWinner ? "text-blue-700" : ""}
          `}
        >
          {name}
        </span>
      </div>
      <div className="flex flex-col items-start text-xs text-gray-600">
        <span className="mr-1 text-xl" role="img" aria-label="Country Flag">
          {getFlagByISO(countryMap[nationality || ""]?.iso_3166_1)}
        </span>
        <span className="truncate hidden md:inline text-xs">{nationality}</span>
      </div>
      <div className="hidden sm:block text-xs text-gray-500 italic whitespace-normal max-h-10 overflow-hidden">
        {bio}
      </div>
      <div className="flex flex-col items-end">
        <span
          className={`text-base font-bold ${
            isWinner ? "text-blue-500" : "text-gray-700"
          }`}
        >
          {count}
        </span>
        <span className="text-xs text-gray-400">Countries</span>
      </div>
    </div>
  );
};

export default function RankList({ data }: { data?: RowData[] }) {
  return (
    <div>
      <div className="grid grid-cols-[0.8fr_1.8fr_1.2fr_3fr_1.2fr] items-center gap-2 py-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-200">
        <div className="text-left">Rank</div>
        <div className="text-center">Traveler</div>{" "}
        <div className="hidden md:block text-left">Origin</div>{" "}
        <div className="md:hidden text-left">Flag</div>
        <div className="hidden sm:block text-left">Bio / Motto</div>{" "}
        <div className="text-right">Visits</div>
      </div>
      <div className="divide-y divide-gray-100">
        {data?.map((rowData, index) => (
          <Row key={rowData.email} rowData={rowData} index={index} />
        ))}
      </div>
    </div>
  );
}
