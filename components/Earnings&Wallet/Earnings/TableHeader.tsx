export default function TableHeader(){
    return (
      <div className="w-full flex flex-row mt-[54px]">
        <div className="flex flex-row border-b-[1px] border-b-[#C9C9C9] ml-[33px]">
          <div className="w-[190px] h-[59px] bg-[#E6E6ED] flex items-center pl-[15px] rounded-tl-[12px]">
            {" "}
            DATE{" "}
          </div>
          <div className="w-[190px] h-[59px] bg-[#E6E6ED] pl-[10px] flex items-center">
            {" "}
            ORDER ID
          </div>
          <div className="w-[350px] h-[59px] bg-[#E6E6ED] flex items-center">
            {" "}
            CUSTOMER{" "}
          </div>
          <div className="w-[215.5px] h-[59px] bg-[#E6E6ED] flex items-center">
            {" "}
            AMOUNT (₹){" "}
          </div>
          <div className="w-[205px] h-[59px] bg-[#E6E6ED] flex items-center">
            {" "}
            TIP (₹)
          </div>
          <div className="w-[170px] h-[59px] bg-[#E6E6ED] flex items-center">
            {" "}
            STATUS{" "}
          </div>
          <div className="w-[227px] h-[59px] bg-[#E6E6ED] flex items-center justify-center rounded-tr-[12px]">
            NET PAYOUT (₹)
          </div>
        </div>
      </div>
    );
}