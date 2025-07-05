"use client";
import React, { useState, useRef, useEffect } from "react";
import Filter from "@/icons/DocumentVault/Filter";
import Grid from "@/icons/DocumentVault/Grid";
import List from "@/icons/DocumentVault/List";
import SearchIcon from "@/icons/DocumentVault/SearchIcon";

export default function FilterSection({
  view,
  onViewChange,
  onFilterChange,
  activeFilter,
  searchValue,
  onSearchChange,
}: {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const filterOptions = [
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Last 3 Months", value: "3months" },
    { label: "Large Files (>10 MB)", value: "large" },
    { label: "Small Files (<1 MB)", value: "small" },
    { label: "Recently used", value: "recent" },
    { label: "Never Printed", value: "never" },
  ];

  return (
    <div className="w-full h-[45px] mt-[50px] flex flex-row justify-between">
      {/* filter and view change */}
      <div className="flex flex-row items-center relative">
        {/* filter */}
        <div className="relative">
          <button
            type="button"
            className="w-[107px] border-[1px] border-[#C9C9C9] rounded-[10px] flex flex-row gap-[10px] px-[15px] py-[12.5px] items-center transition-all duration-300"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <Filter />
            <h2 className="text-base">Filters </h2>
          </button>
          {/* Dropdown */}
          <div
            ref={dropdownRef}
            className={`absolute px-[10px] py-[6px] left-0 mt-2 min-w-[210px] bg-white rounded-xl shadow-lg border border-gray-200 z-50 transition-all duration-200
              ${
                showDropdown
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }
            `}
            style={{ pointerEvents: showDropdown ? "auto" : "none" }}
          >
            <ul className="py-2 px-0 text-sm">
              {filterOptions.slice(0, 3).map((opt) => (
                <li
                  key={opt.value}
                  className={`px-5 py-2 cursor-pointer hover:bg-[#06044B] hover:text-white rounded-lg text-[#555555] ${
                    activeFilter === opt.value ? "bg-[#06044B] text-white" : ""
                  }`}
                  onClick={() => {
                    onFilterChange(opt.value);
                    setShowDropdown(false);
                  }}
                >
                  {opt.label}
                </li>
              ))}
              <hr className="my-2" />
              {filterOptions.slice(3, 5).map((opt) => (
                <li
                  key={opt.value}
                  className={`px-5 py-2 cursor-pointer hover:bg-[#06044B] hover:text-white rounded-lg text-[#555555] ${
                    activeFilter === opt.value ? "bg-[#06044B] text-white" : ""
                  }`}
                  onClick={() => {
                    onFilterChange(opt.value);
                    setShowDropdown(false);
                  }}
                >
                  {opt.label}
                </li>
              ))}
              <hr className="my-2" />
              {filterOptions.slice(5).map((opt) => (
                <li
                  key={opt.value}
                  className={`px-5 py-2 cursor-pointer hover:bg-[#06044B] hover:text-white rounded-lg text-[#555555] ${
                    activeFilter === opt.value ? "bg-[#06044B] text-white" : ""
                  }`}
                  onClick={() => {
                    onFilterChange(opt.value);
                    setShowDropdown(false);
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* grid */}
        <button
          type="button"
          className={`border-[1px] border-[#C9C9C9] rounded-tl-[10px] rounded-bl-[10px] flex flex-row gap-[10px] px-[15px] py-[12.5px] items-center ml-[18px] transition-all duration-300 ${
            view === "grid" ? "bg-[#06044B] text-white" : "bg-white text-black"
          }`}
          onClick={() => onViewChange("grid")}
        >
          <Grid stroke={view === "grid" ? "white" : "black"} />
          <h2 className={view === "grid" ? "text-white" : ""}>Grid</h2>
        </button>
        {/* list */}
        <button
          type="button"
          className={`rounded-tr-[10px] rounded-br-[10px] flex flex-row gap-[10px] px-[15px] py-[12.5px] items-center border-[1px] border-[#C9C9C9] transition-all duration-300 ${
            view === "list" ? "bg-[#06044B] text-white" : "bg-white text-black"
          }`}
          onClick={() => onViewChange("list")}
        >
          <List stroke={view === "list" ? "white" : "black"} />
          <h2 className={view === "list" ? "text-white" : ""}>List</h2>
        </button>
      </div>

      {/*  search box */}
      <div className="w-[464px] h-[45px] flex items-center relative">
        <input
          type="text"
          placeholder="Search in Drive"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-full pl-12 pr-4 border border-[#C9C9C9] rounded-[10px] outline-none"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#757575]">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}