import React, { useEffect, useRef } from "react";
import Image from "next/image";
import RightHeaderDropDownElement from "./RightHeaderDropDownElement";

type MessageType = {
  sender: string;
  time: string;
  text: string;
};

type RightHeaderProps = {
  data: MessageType[];
};

function RightDashBoardHeader({ data }: RightHeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

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

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[14%] bg-[#F5F5F5] flex items-center rounded-lg relative">
        <div className="w-[40px] h-[40px] bg-gray-300 rounded-full ml-4"></div>
        <div className="flex flex-col ml-4">
          <h1 className="text-black font-roboto text-xl font-bold">
            No conversation selected
          </h1>
          <h2 className="text-gray-500 text-sm font-roboto">Select a chat to start messaging</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F5F5] flex items-center rounded-lg relative p-4 mb-2">
      <div className="w-[40px] h-[40px] bg-amber-300 rounded-full ml-4"></div>
      <div className="flex flex-col ml-4">
        <h1 className="text-black font-roboto text-xl font-bold">
          {data[0].sender}
        </h1>
        <h2 className="text-green-500 text-sm font-roboto">Available</h2>
      </div>
      <div className="ml-auto mr-4 flex gap-4">
        <Image
          src="/MerchantChatPage/Pin.png"
          alt="Pin"
          width={24}
          height={24}
        />
        <Image
          src="/MerchantChatPage/Ellipsis.png"
          alt="More"
          width={24}
          height={24}
          onClick={handleClick}
          className="cursor-pointer"
        />
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

export default RightDashBoardHeader;
