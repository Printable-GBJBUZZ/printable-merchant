export default function RecentTransactionsHeader(){
    return (
      <div className="w-full flex flex-row justify-between">
        {/* heading */}
        <div className="pl-[33px] pt-[26px] text-[20px]">
          {" "}
          Recent Transactions
        </div>

        {/* dates */}
        <div className="pt-[24px] w-[680px] h-[45px] flex flex-row gap-[15px] mr-[33px]">
          {/* from */}
          <div className="w-[240px] h-[45px]">
            <input
              type="date"
              className="w-[240px] h-[45px] rounded-[8px] border border-[#DDDDDD] px-4 outline-none"
            />
          </div>

          {/* to */}
          <div className="w-[240px] h-[45px]">
            <input
              type="date"
              className="w-[240px] h-[45px] rounded-[8px] border border-[#DDDDDD] px-4 outline-none"
            />
          </div>

          {/* filter */}
          <div className="w-[170px] h-[45px] border-[1px] border-[#C9C9C9] rounded-[10px]"></div>
        </div>
      </div>
    );
}