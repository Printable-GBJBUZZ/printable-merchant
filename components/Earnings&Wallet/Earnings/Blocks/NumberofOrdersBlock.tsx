import Clock from "@/icons/EarningsWallet/Clock";
import Arrow from "@/icons/EarningsWallet/Arrow";

export default function NumberofOrdersBlock() {
  return (
    <div className="w-full h-[190px]">
      <div className="w-full h-full rounded-[10px] bg-[#FFFFFF] flex flex-col justify-center">
        <div className="text-[#555555] text-[20px] flex flex-row items-center justify-between ml-[41px] mr-[41px]">
          <span>Number of Orders</span>
          <div className="w-[34px] h-[34px] bg-[#FFCC0026] rounded-[17px] flex justify-center items-center">
            <Clock />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-full w-full text-[#555555] text-[36px] flex flex-row items-center ml-[41px] mt-[15px]">
            {" "}
            47
            <div className="ml-[15px] flex items-center gap-1">
              <Arrow />
              <span className="text-base text-[#34C759]">12%</span>
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
