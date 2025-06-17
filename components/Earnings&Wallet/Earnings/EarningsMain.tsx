export default function EarningsMain() {
  return (
    <div className="w-full h-[87%] flex flex-row">
      <div className="w-[420px] h-full flex flex-col gap-[13px]">
        {/* total earning */}
        <div className="w-full h-[38%]">
          <div className="w-full h-full rounded-[10px] bg-[#06044B]"></div>
        </div>
        
        {/* orders section */}
        <div className="w-full h-[60%] flex flex-col gap-[13px]">
          {/* number of order */}
          <div className="w-full flex-1 rounded-[10px] bg-[#FFFFFF]"></div>
          {/* cancelled order */}
          <div className="w-full flex-1 rounded-[10px] bg-[#FFFFFF]"></div>
        </div>
      </div>

      {/* chart */}
      <div className="w-full h-full rounded-[10px] bg-[#FFFFFF] ml-[15px]"></div>
    </div>
  );
}
