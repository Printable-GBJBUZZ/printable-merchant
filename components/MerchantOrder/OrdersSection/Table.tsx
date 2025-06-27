import Customer from "@/icons/EarningsWallet/Customer";
import EyeButton from "@/icons/Order/EyeButton";
import DeleteButton from "@/icons/Order/DeleteButton";
import DropDown from "@/icons/Order/DropDown";
type Props = {
  orderId: string;
  customerName: string;
  email: string;
  jobType: string;
  quantity: number;
  dueDate: string;
  status: string;
  amount: string;
};

type TableProps = {
  data: Props[];
};
export default function Table({ data }: TableProps) {

  return (
    <div>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-row border-b-[1px] border-b-[#C9C9C9]"
        >
          {/* orderId */}
          <div className="w-1/8 h-[75px] text-[16px] text-[#06044B] flex items-center justify-center">
            {item.orderId}
          </div>
          {/* customer */}
          <div className="w-2/10 h-[75px] flex flex-row items-center">
            <Customer />
            <div className="flex flex-col ml-[15px]">
              <div className="text-base text-black">{item.customerName}</div>
              <div className="text-[14px] font-light mt-[3px]">
                {item.email}
              </div>
            </div>
          </div>
          {/* print job type */}
          <div className="w-1/7 h-[75px] text-[16px] flex items-center">
            {" "}
            {item.jobType}
          </div>
          {/* quantity */}
          <div className="w-1/8 h-[75px] flex items-center">
            {" "}
            {item.quantity} pcs
          </div>
          {/* due date */}
          <div className="w-1/7 h-[75px] flex items-center">
            {" "}
            {item.dueDate}
          </div>
          {/* status */}
          <div className="w-1/8 h-[75px] flex items-center">
            <div
              className={`flex flex-row justify-center items-center px-[15px] py-[2px] rounded-[50px] gap-[10px] 
                ${
                  item.status === "Printing"
                    ? "bg-[#FFCC0026] text-[#FF9500]"
                    : item.status === "New"
                    ? "bg-[#007AFF26] text-[#007AFF]"
                    : item.status === "Ready"
                    ? "bg-[#34C75926] text-[#34C759]"
                    : item.status === "Completed"
                    ? "bg-[#AF52DE26] text-[#AF52DE]"
                    : ""
                }
              `}
            >
              {item.status}
              <DropDown />
            </div>
          </div>
          {/* amount */}
          <div className="w-1/10 h-[75px] flex items-center">
            {" "}
            ₹{item.amount}
          </div>
          {/* actions */}
          <div className="w-1/8 h-[75px] flex flex-row justify-center items-center">
            {/* eye button */}
            <div className="w-[40px] h-[40px] mr-[10px] flex items-center justify-center rounded-[10px] hover:bg-[radial-gradient(51.11%_51.11%_at_50%_50%,_#B0F4C3_0%,_#8281A5_100%)]">
              <EyeButton />
            </div>
            {/* delete button */}
            <div className="w-[40px] h-[40px] flex items-center">
              <DeleteButton />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
