import Arrow from "@/icons/Order/Arrow";
import Note from "@/icons/Order/Notet";

export default function TodaysOrderBlock() {
  return (
    <div className="w-1/4 h-full bg-[#FFFFFF] rounded-[12px] flex flex-col justify-center ">
      <div className="mx-[33.5px] my-[29.5px]">
        {/* heading part */}
        <div className="text-[#555555] text-[20px] font-medium flex flex-row items-center justify-between">
          <span>Today's Orders </span>
          <div className="w-[34px] h-[34px] bg-[#007AFF26] rounded-[17px] flex justify-center items-center">
            <Note />
          </div>
        </div>
        {/* bottom section */}
        <div className="flex flex-col">
          <div className="h-full w-full text-[#000000] text-[36px] flex flex-row items-center mt-[10px]">
            {" "}
            24
            <div className="ml-[15px] flex items-center gap-1">
              <Arrow />
              <span className="text-base text-[#34C759]">12%</span>
            </div>
          </div>
          <div className="h-full w-full text-[#555555] text-sm">
            {" "}
            vs. 21 yesterday
          </div>
        </div>
      </div>
    </div>
  );
}
