import Transaction from "./Transaction";
import RecentTransactionsHeader from "./RecentTransactionsHeader";
import TotalEarningsBlock from "./Blocks/TotalEarningsBlock";
import OrdersSection from "./OrdersSection";

type TransactionData = {
  date: string;
  orderID: string;
  name: string;
  mail: string;
  amount: string;
  tip: string;
  status: "Completed" | "Pending";
  netpayout: string;
};

export default function EarningsMain() {
  const data: TransactionData[] = [
    {
      date: "Apr 21, 2025",
      orderID: "#ORD-7829",
      name: "Emma Thompson",
      mail: "emma.t@example.com",
      amount: "120.00",
      tip: "120.00",
      status: "Completed",
      netpayout: "120.00",
    },
    {
      date: "Apr 21, 2025",
      orderID: "#ORD-7828",
      name: "Emma Thompson",
      mail: "emma.t@example.com",
      amount: "245.00",
      tip: "245.00",
      status: "Completed",
      netpayout: "245.00",
    },
    {
      date: "Apr 21, 2025",
      orderID: "#ORD-7827",
      name: "Emma Thompson",
      mail: "emma.t@example.com",
      amount: "350.00",
      tip: "350.00",
      status: "Pending",
      netpayout: "350.00",
    },
    {
      date: "Apr 21, 2025",
      orderID: "#ORD-7826",
      name: "Emma Thompson",
      mail: "emma.t@example.com",
      amount: "175.00",
      tip: "175.00",
      status: "Completed",
      netpayout: "175.00",
    },
    {
      date: "Apr 21, 2025",
      orderID: "#ORD-7825",
      name: "Emma Thompson",
      mail: "emma.t@example.com",
      amount: "220.00",
      tip: "220.00",
      status: "Completed",
      netpayout: "220.00",
    },
    {
      date: "Apr 21, 2025",
      orderID: "#ORD-7824",
      name: "Emma Thompson",
      mail: "emma.t@example.com",
      amount: "120.00",
      tip: "120.00",
      status: "Completed",
      netpayout: "120.00",
    },
    {
      date: "Apr 21, 2025",
      orderID: "#ORD-7823",
      name: "Emma Thompson",
      mail: "emma.t@example.com",
      amount: "110.00",
      tip: "110.00",
      status: "Pending",
      netpayout: "110.00",
    },
  ];

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-[420px] h-full flex flex-col gap-[13px]">
          {/* total earning */}
          <TotalEarningsBlock />

          {/* orders section */}
          <OrdersSection />
        </div>

        {/* chart */}
        <div className="w-full h-[664px] rounded-[10px] bg-[#FFFFFF] ml-[15px]"></div>
      </div>

      {/* Transaction History */}
      <div className="w-full h-[6%] text-[28px] pt-[30px]">
        Transaction History
      </div>

      {/* Recent Transactions */}
      <div className="w-full rounded-[12px] mt-[8px] bg-[#FFFFFF] flex flex-col pb-[60px]">
        {/* Top Navigation */}
        <RecentTransactionsHeader />

        {/* Transaction */}
        <Transaction data={data} />
      </div>
    </>
  );
}
