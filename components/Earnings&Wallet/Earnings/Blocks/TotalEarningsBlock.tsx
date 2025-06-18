import Money from "@/icons/EarningsWallet/Money";

export default function TotalEarningsBlock(){
    return (
      <div className="w-[394px] h-[38%]">
        <div className="w-full h-full rounded-[10px] bg-[#06044B] p-4 flex flex-row">
          <div className="text-[#FFFFFF] text-[20px]">
            Total Earnings (This Week) 
            <div className="w-[100px] h-[100px]">
              <Money />
            </div>
          </div>
          <div className="h-full w-full text-[#FFFFFF] text-[36px]">
            {" "}
            ₹6,850
          </div>
          <div className="h-full w-full text-[#FFFFFF] text-sm">
            {" "}
            vs. Last week
          </div>
        </div>
      </div>
    );
}