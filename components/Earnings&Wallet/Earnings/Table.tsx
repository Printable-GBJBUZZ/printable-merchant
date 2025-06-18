import Customer from "@/icons/EarningsWallet/Customer";

type TableProps = {
  data: {
    date: string;
    orderID: string;
    name: string;
    mail: string;
    amount: string;
    tip: string;
    status: "Completed" | "Pending";
    netpayout: string;
  }[];
};

export default function Table({ data }: TableProps) {
    return (
      <div className="w-full">
        {data.map((item, index) => (
          <div
            key={item.orderID}
            className="w-[1547.5px] flex flex-row ml-[33px] border-b border-[#C9C9C9]"
          >
            <div className="w-[190px] h-[59px] flex items-center pl-[15px]">
              {item.date}
            </div>
            <div className="w-[190px] h-[59px] pl-[10px] flex items-center">
              {item.orderID}
            </div>
            <div className="w-[350px] h-[59px] flex flex-row items-center gap-2">
              <div>
                <Customer />
              </div>
              <div className="flex flex-col">
                <div>{item.name}</div>
                <div className="text-[#666666] text-sm">{item.mail}</div>
              </div>
            </div>
            <div className="w-[215.5px] h-[59px] flex items-center">
              ₹{item.amount}
            </div>
            <div className="w-[205px] h-[59px] flex items-center">
              ₹{item.tip}
            </div>
            <div className="w-[170px] h-[59px] flex items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  item.status === "Completed"
                    ? "bg-[#E7F4EC] text-[#1F9254]"
                    : "bg-[#FFF6ED] text-[#FF8A00]"
                }`}
              >
                {item.status}
              </span>
            </div>
            <div className="w-[227px] h-[59px] flex items-center justify-center">
              ₹{item.netpayout}
            </div>
          </div>
        ))}
      </div>
    );
}
