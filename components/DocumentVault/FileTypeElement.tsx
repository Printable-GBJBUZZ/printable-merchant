import React from "react";

type FileTypeProps = {
    icon: React.ReactNode;
    text: string;
    quantity: number;
    size: string;
};

export default function FileTypeElement({ icon, text, quantity, size }: FileTypeProps) {
    return (
      <div className="h-[97px] w-1/5 rounded-lg px-[28.5px] py-[24.5px] bg-[#FFFFFF] flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <div>{icon}</div>
          <div className="flex flex-col ml-[10px]">
            <h2 className="text-base font-normal">{text}</h2>
            <h2 className="text-sm text-[#555555]">{quantity} files</h2>
          </div>
        </div>
        <div>
          <h2 className="text-base font-bold">{size}</h2>
        </div>
      </div>
    );
}