"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NotificationDropDown from "./NotificationDropDown";
import { useUser } from "@clerk/nextjs";
function NavBar() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const { user } = useUser();
  useEffect(() => {
    // Function to update the date and time
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      setCurrentDateTime(formattedDateTime);
    };

    // Update the date and time every second
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const [notificationIsOpen, setNotificationIsOpen] = useState(false);

  const handleNotificationClick = () => {
    setNotificationIsOpen(!notificationIsOpen);
  };

  return (
    <div className="w-full h-[65px] bg-white rounded-[15px] mt-[15px] mb-[24px] flex  justify-between items-center">
      {/* search box */}
      <div className="flex items-center bg-[#E6E6ED] rounded-[50px] h-[40px] w-[600px] ml-[17px] px-4">
        <Image
          src="/MerchantChatPage/search1.png"
          alt=""
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="Search Messages"
          className="ml-2 bg-transparent text-black flex-1 outline-none font-inter font-normal"
        />
      </div>

      <div className="flex justify-around">
        <div className="flex flex-row items-center">
          {/* date and time */}
          <div className="text-black text-base font-open-sans font-normal">
            {currentDateTime}
          </div>

          <button className="h-[40px] w-[40px] flex items-center justify-center rounded-full hover:bg-gray-200 bg-gray-100 transition-all ml-4">
            <img
              className="h-[20px] w-[20px]"
              src="/MerchantChatPage/setting.jpeg"
              alt=""
            />
          </button>

          {/* Notification Button and Dropdown */}
          <div className="relative">
            <button
              className="h-[40px] w-[40px] flex items-center justify-center rounded-full hover:bg-gray-200 bg-gray-100 transition-all ml-4"
              onClick={handleNotificationClick}
            >
              <img
                className="h-[20px] w-[20px]"
                src="/MerchantChatPage/bell.jpeg"
                alt=""
              />
            </button>

            {notificationIsOpen && (
              <div className="absolute w-[420px] h-[700px] left-[-80px] top-[58px] bg-white shadow-[15px] rounded-[15px] px-6 py-6 border border-gray-300 z-50">
                <NotificationDropDown
                  onClose={() => setNotificationIsOpen(false)}
                />
              </div>
            )}
          </div>

          {/* shop */}
          <button className="h-[40px] w-[40px] flex items-center justify-center rounded-full hover:bg-gray-200 bg-gray-100 transition-all ml-4">
            <img
              className="h-[20px] w-[20px]"
              src="/MerchantChatPage/shop.jpeg"
              alt=""
            />
          </button>

          {/* vertical line */}
          <div className="h-[97%] w-[1px] bg-[#A1A1A1] ml-3"></div>

          {/* profile */}
          <div className="flex items-center gap-2  rounded-full bg-gray-100 hover:bg-gray-200 px-4 py-2 mx-3">
            <img
              className="h-[30px] w-[30px] rounded-full"
              src="/MerchantChatPage/icon.jpeg"
              alt="Profile"
            />
            <div className="text-black text-sm font-medium">
              <div>Print Master Shop</div>
              <div className="text-gray-500 text-xs">Merchant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
