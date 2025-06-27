"use client";
import { useState, useRef, useEffect } from "react";
import Search from "@/icons/EarningsWallet/Search";
import Sort from "@/icons/EarningsWallet/Sort";
import DropDown from "@/icons/Order/DropDown";

export default function OrdersSectionHeader({
  onSort,
  onSearch,
}: {
  onSort: (type: "oldest" | "newest") => void;
  onSearch: (value: string) => void;
}) {
  const [sortHover, setSortHover] = useState(false);
  const [dropDownActive, setDropDownActive] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setDropDownActive(false);
      }
    }
    if (dropDownActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownActive]);

  return (
    <div className="w-full h-[45px] flex flex-row justify-between">
      {/* search bar */}
      <div className="w-[464px] h-[45px] border-[1px] px-[15px] border-[#C9C9C9] rounded-[10px] flex flex-row gap-[10px] items-center">
        <Search />
        <input
          type="text"
          placeholder="Search orders, customers"
          className="rounded-[10px] w-full outline-none text-base"
          style={{
            boxShadow: "none",
            lineHeight: "45px",
            caretColor: "#555555",
          }}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {/* right filters section */}
      <div className="w-[391.5px] h-[45px] flex flex-row gap-[10px]">
        {/* sort */}
        <div
          ref={sortRef}
          className="w-[47.5px] rounded-[8px] border-[1px] border-[#C9C9C9] flex justify-center items-center hover:bg-[#C9C9C9] relative"
          onMouseEnter={() => setSortHover(true)}
          onMouseLeave={() => setSortHover(false)}
          onClick={() => setDropDownActive((prev) => !prev)}
        >
          {sortHover || dropDownActive ? (
            <Sort strokeValue="black" />
          ) : (
            <Sort strokeValue="#555555" />
          )}
          {dropDownActive && (
            <div className="absolute left-0 top-full w-[211px] h-[128px] bg-[#FFFFFF] border-[1px] border-[#C9C9C9] z-10 mt-[5px] rounded-[10px]">
              <div className="w-full h-full flex flex-col justify-center items-center m-[5px]">
                {/* newest first */}
                <div
                  className="w-[191px] h-[36px] text-[#555555] px-[15px] rounded-[12px] flex items-center hover:bg-[#06044B] hover:text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSort("newest");
                    setDropDownActive(false);
                  }}
                >
                  Newest First
                </div>
                {/* oldest first */}
                <div
                  className="w-[191px] h-[36px] text-[#555555] px-[15px] rounded-[12px] flex items-center hover:bg-[#06044B] hover:text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSort("oldest");
                    setDropDownActive(false);
                  }}
                >
                  Oldest First
                </div>
                {/* priority (high to low) */}
                <div className="w-[191px] h-[36px] text-[#555555] px-[15px] rounded-[12px] flex items-center hover:bg-[#06044B] hover:text-white">
                  Priority (High to Low)
                </div>
              </div>
            </div>
          )}
        </div>
        {/* filter by status */}
        <div className="w-[170px] rounded-[8px] border-[1px] border-[#C9C9C9] flex flex-row justify-center items-center">
          <div className="w-[126px] h-[24px] flex flex-row justify-between items-center">
            <h2 className="text-base text-[#555555]">All Status</h2>
            <DropDown />
          </div>
        </div>
        {/* filter by types */}
        <div className="w-[154px] rounded-[8px] border-[1px] border-[#C9C9C9] flex flex-row justify-center items-center">
          <div className="w-[115px] h-[24px] flex flex-row justify-between items-center">
            <h2 className="text-base text-[#555555]">All Types</h2>
            <DropDown />
          </div>
        </div>
      </div>
    </div>
  );
}
