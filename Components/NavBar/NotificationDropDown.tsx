import { useEffect, useRef } from "react";
import Image from "next/image";
import { Devonshire } from "next/font/google";

type NotificationDropDownProps = {
  onClose: () => void;
};

function NotificationDropDown({ onClose }: NotificationDropDownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="flex justify-center items-center">
      <div ref={dropdownRef} className="w-[420px] px-[10px]">
        <div className="w-full">
          {/* Header */}
          <div className="flex flex-row justify-between items-center border-b border-[#E6E6ED] pb-4">
            <h2 className="text-2xl text-black font-semibold">Notifications</h2>
            <Image
              src="/MerchantChatPage/cross.png"
              alt=""
              width={20}
              height={20}
              onClick={onClose}
              className="hover:cursor-pointer"
            />
          </div>

          {/* navigation */}
          <div className="flex flex-row justify-between items-center mt-2 border-b border-[#E6E6ED] pb-2">
            <div className="flex flex-row gap-2">
              <button className="font-inter text-black text-sm px-4 py-2 hover:bg-[#E6E6ED] rounded-[5px]">
                {" "}
                Inbox{" "}
              </button>
              <button className="font-inter text-black text-sm px-4 py-2 hover:bg-[#E6E6ED] rounded-[5px]">
                {" "}
                Unread{" "}
              </button>
            </div>
            <button className="text-blue-500 text-sm"> Mark as all read</button>
          </div>

          {/* notification list */}
          <div className="h-[200px] flex flex-row justify-start mt-2 border-b border-[#E6E6ED] pb-2">
            {/* image */}
            <div className="w-1/5 h-full pt-3 pl-2">
              <div className="w-[50px] h-[50px] rounded-full bg-amber-300"></div>
            </div>
            {/* details */}
            <div className="w-4/5 h-full pt-3">
              <h2 className="text-black">
                Eliza wants to print the Offer-letter
              </h2>
              <h2 className="text-[#555555] mt-0.5">3 Hours Ago</h2>

              <div className="flex flex-row justify-start mt-2 p-3 bg-[#EFF7FF] rounded-[8px]">
                <Image
                  src="/MerchantChatPage/Document.png"
                  alt=""
                  width={30}
                  height={38}
                />

                {/* Text Block */}
                <div className="flex flex-col ml-5">
                  <h2 className="font-dm-sans text-black font-semibold">
                    Offer letter.pdf
                  </h2>
                  <h2 className="font-dm-sans text-[#555555] font-semibold">
                    2.1 MB | Edited 15 min ago
                  </h2>
                </div>
              </div>

              <div className="mt-2">
                <button className="bg-[#006ADE] m-1 px-2 py-1 rounded-[6px]">
                  Accept
                </button>
                <button className="bg-[#E6E6ED] m-1 px-2 py-1 rounded-[6px] text-black">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationDropDown;
