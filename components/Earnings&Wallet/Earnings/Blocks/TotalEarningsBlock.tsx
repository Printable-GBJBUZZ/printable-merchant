import Money from "@/icons/EarningsWallet/Money";
import Arrow from "@/icons/EarningsWallet/Arrow";

export default function TotalEarningsBlock(){
    return (
      <div className="w-[394px] h-[258px]">
        <div className="w-full h-full rounded-[10px] bg-[#06044B] flex flex-col">
          <div className="text-[#FFFFFF] text-[20px] flex flex-row items-center justify-between ml-[41px] mr-[41px] mt-[41px]">
            <span>Total Earnings (This Week)</span>
            <div className="w-[34px] h-[34px] bg-[#34C75926] rounded-[17px] flex justify-center items-center">
              <Money />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-full w-full text-[#FFFFFF] text-[36px] flex flex-row items-center ml-[41px] mt-[30px]">
              {" "}
              ₹6,850
              <div className="ml-[15px] flex items-center gap-1">
                <Arrow />
                <span className="text-base text-[#34C759]">
                  12%
                </span>
              </div>
            </div>
            <div className="h-full w-full text-[#FFFFFF] text-sm ml-[41px]">
              {" "}
              vs. Last week
            </div>
          </div>
        </div>
      </div>
    );
}