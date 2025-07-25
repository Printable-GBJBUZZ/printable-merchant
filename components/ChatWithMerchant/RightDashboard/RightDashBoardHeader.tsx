import React, { useEffect, useRef, useState } from "react";
import RightHeaderDropDownElement from "./RightHeaderDropDownElement";
import Pin from "@/icons/ChatWithCustomers/Pin";
import ThreeDots from "@/icons/ChatWithCustomers/ThreeDots";
import { UserIcon } from "@heroicons/react/24/solid";

type ConversationHeaderProps = {
  conversation: {
    id: string;
    name: string;
    lastMessage?: {
      text: string;
      time: string;
    };
  };
};

export default function RightDashBoardHeader({
  conversation,
}: ConversationHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const handleClick = () => setIsOpen((prev) => !prev);

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="w-full bg-[#F5F5F5] flex items-center rounded-tl-[15px] rounded-tr-[15px] relative p-4 mb-2 border-b-[1px] border-[#A1A1A1]">
      {/* Profile Avatar */}
      <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center">
        <UserIcon className="w-10 h-10 text-gray-500" />
      </div>

      {/* Name and Status */}
      <div className="flex flex-col ml-4">
        <h1 className="text-black font-roboto text-xl font-bold">
          {conversation.name}
        </h1>
        <h2 className="text-green-500 text-sm font-roboto">Available</h2>
      </div>

      {/* Actions */}
      <div className="ml-auto mr-4 flex gap-4">
        <Pin />
        <div onClick={handleClick} className="cursor-pointer">
          <ThreeDots />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="w-[9vw] absolute top-[75%] right-0 bg-white shadow-lg rounded-lg px-6 py-5 border border-gray-300 mr-5 z-50"
          >
            <div className="flex flex-col gap-4 items-start justify-between">
              <RightHeaderDropDownElement text="View Profile" />
              <RightHeaderDropDownElement text="Search" />
              <RightHeaderDropDownElement text="Media" />
              <RightHeaderDropDownElement text="Mute" />
              <RightHeaderDropDownElement text="Clear Chat" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
