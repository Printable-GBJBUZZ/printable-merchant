export default function TableHeader(){
    return (
      <div className="flex flex-row border-b border-[#C9C9C9] mt-[54px] w-full">
        <div className="flex-1 h-[59px] bg-[#E6E6ED] flex items-center pl-4 rounded-tl-[12px]">DATE</div>
        <div className="flex-1 h-[59px] bg-[#E6E6ED] pl-2 flex items-center">ORDER ID</div>
        <div className="flex-[2] h-[59px] bg-[#E6E6ED] flex items-center">CUSTOMER</div>
        <div className="flex-[1.2] h-[59px] bg-[#E6E6ED] flex items-center">AMOUNT (₹)</div>
        <div className="flex-[1.1] h-[59px] bg-[#E6E6ED] flex items-center">TIP (₹)</div>
        <div className="flex-[0.9] h-[59px] bg-[#E6E6ED] flex items-center">STATUS</div>
        <div className="flex-[1.3] h-[59px] bg-[#E6E6ED] flex items-center justify-center rounded-tr-[12px]">NET PAYOUT (₹)</div>
      </div>
    );
}