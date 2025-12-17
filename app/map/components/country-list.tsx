"use client";

import React from "react";
import { Country } from "@/lib/types";
import { getFlagByISO } from "@/lib/utils";

type CountryRowProps = {
  country: Country;
  index: number;
};

// TODO action
const CountryRow = ({ country, index }: CountryRowProps) => {
  const { name_en, iso_3166_1 } = country;

  return (
    <div
      className={`
        /* 4-Column Compact Layout: Index | Flag+Name | Visit Date | Actions */
        grid grid-cols-[0.8fr_3fr_2fr_1fr] items-center gap-2 py-2 px-3 
        border-b border-gray-100 last:border-b-0 
        transition-all duration-300 ease-in-out
        hover:bg-blue-50/50 hover:shadow-sm
      `}
    >
      {/* 1. Index (Left Aligned) */}
      <div className="text-xs font-medium text-gray-600">{index + 1}</div>

      {/* 2. Country Flag & Name (Left Aligned) */}
      <div className="flex items-center space-x-2">
        <span className="text-xl" role="img" aria-label="Country Flag">
          {getFlagByISO(iso_3166_1)}
        </span>
        <span className="text-sm font-semibold text-gray-800 truncate">
          {name_en}
        </span>
      </div>
      {/* TODO visit date */}
      <div className="text-xs text-gray-500">2024-10-10</div>
      <div className="flex justify-end">
        <button
          onClick={() => console.log(`Editing ${country}`)}
          className="p-1 rounded-full text-blue-500 hover:bg-blue-100 transition duration-150"
          aria-label={`Edit travel data for ${country}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

type CountryListProps = {
  countryList: Country[];
};

export default function CountryList({ countryList }: CountryListProps) {
  return (
    <div>
      <div className="grid grid-cols-[0.8fr_3fr_2fr_1fr] items-center gap-2 py-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-200">
        <div className="text-left">No.</div>
        <div className="text-left">Country Name</div>{" "}
        <div className="text-left">Last Visit</div>{" "}
        <div className="text-right">Action</div>
      </div>
      <div className="divide-y divide-gray-100">
        {countryList.map((country, index) => (
          <CountryRow key={country.name_en} country={country} index={index} />
        ))}
      </div>
    </div>
  );
}
