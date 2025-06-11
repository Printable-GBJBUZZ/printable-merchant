"use client";

import { IoIosArrowDown } from "react-icons/io";

import { useState } from "react";

export const Status = () => {
  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Handle button click to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative">
        {/* Button to toggle dropdown */}
        <div
          className="bg-gray-500 px-2 rounded-full text-sm flex justify-center items-center gap-1 hover:cursor-pointer"
          onClick={toggleDropdown}
        >
          <p className="text-[12px] py-2 px-2">Status</p>
          <IoIosArrowDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute mt-1 bg-white shadow-2xl rounded-md w-[150px] z-50 px-4 py-4 flex justify-center"
            style={{ top: "100%", left: 0 }}
          >
            <ul className={`space-y-1 text-xs text-gray-800 text-center `}>
              <li className="px-2 py-1 cursor-pointer bg-[#FFCC0026] text-[#FF9500] rounded-full">
                Pending
              </li>
              <li className="px-2 py-1 cursor-pointer bg-[#34C75926] text-[#34C759] rounded-full">
                Accepted
              </li>
              <li className="px-2 py-1 cursor-pointer bg-[#FF3B3026] text-[#FF3B30] rounded-full">
                Denied
              </li>
              <li className="px-2 py-1 cursor-pointer bg-[#007AFF26] text-[#007AFF] rounded-full">
                Printing
              </li>
              <li className="px-2 py-1 cursor-pointer bg-[#AF52DE26] text-[#AF52DE] rounded-full">
                Completed
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
