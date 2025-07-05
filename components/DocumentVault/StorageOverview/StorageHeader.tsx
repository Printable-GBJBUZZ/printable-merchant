"use client"
import React, { useState } from "react";
import Plus from "@/icons/DocumentVault/Plus";
import UplodeFileIcon from "@/icons/DocumentVault/UplodeFileIcon";

export default function StorageHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full h-[49px] flex flex-row justify-between">
        {/* left section */}
        <div>
          <h2 className="text-[20px]">Overview Storage</h2>
          <h2 className="text-[14px] text-[#555555]">
            Document that you save on our cloud
          </h2>
        </div>

        {/* right two buttons */}
        <div className="flex flex-row ">
          <button
            className="w-[152px] h-[49px] rounded-[10px] border-[1px] border-[#06044B] mr-[10px] flex justify-center items-center"
            onClick={() => setShowModal(true)}
          >
            {/* plus and create folder */}
            <div className="flex flex-row justify-center items-center">
              <Plus />
              <h2 className="text-[13px] ml-[5px] text-[#06044B]">
                Create folder
              </h2>
            </div>
          </button>

          <div className="w-[152px] h-[49px] rounded-[10px] bg-[#06044B] flex justify-center items-center">
            {/* uplode files */}
            <div className="flex flex-row justify-center items-center">
              <UplodeFileIcon />
              <h2 className="text-[13px] ml-[5px] text-white">Upload Files</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/10 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-[600px] h-[257px] bg-white rounded-2xl px-[35px] py-[30px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[530px] h-[197px]">
              <div>
                <h2 className="text-[32px] font-semibold">New Folder</h2>
                <input
                  type="text"
                  className="h-[60px] border-[2px] border-[#C9C9C9] rounded-lg px-3 py-2 w-full mt-[25px]"
                  defaultValue={"Untitled folder"}
                />
              </div>
              <div className="flex flex-row-reverse mt-[25px]">
                <button
                  className="border-[1px] border-[#06044B] text-[#06044B] px-4 py-2 rounded-[10px] ml-[18px] hover:bg-[#06044B] hover:text-white transition-all duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Create
                </button>
                <button
                  className="border-[1px] border-[#06044B] text-[#06044B] px-4 py-2 rounded-[10px] hover:bg-[#06044B] hover:text-white transition-all duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}