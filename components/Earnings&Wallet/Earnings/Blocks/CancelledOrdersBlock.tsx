import RedArrow from "@/icons/EarningsWallet/RedArrow";
import Note from "@/icons/EarningsWallet/Note";

export default function CancelledOrdersBlock() {
  return (
    <div className="w-full h-[190px]">
      <div className="w-full h-full rounded-[10px] bg-[#FFFFFF] flex flex-col justify-center">
        <div className="text-[#555555] text-[20px] flex flex-row items-center justify-between ml-[41px] mr-[41px]">
          <span>Cancelled Orders</span>
          <div className="w-[34px] h-[34px] bg-[#007AFF26] rounded-[17px] flex justify-center items-center">
            <Note />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-full w-full text-[#555555] text-[36px] flex flex-row items-center ml-[41px] mt-[15px]">
            {" "}
            12
            <div className="ml-[15px] flex items-center gap-1">
              <RedArrow />
              <span className="text-base text-[#FF3B30]">5%</span>
            </div>
          </div>
          <div className="h-full w-full text-[#555555] text-sm ml-[41px]">
            {" "}
            vs. Last week
          </div>
        </div>
      </div>
    </div>
  );
}