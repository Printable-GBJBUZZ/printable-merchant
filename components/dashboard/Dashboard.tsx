import Header from "@/components/Header/Header";
import KPICard from "@/components/KPICard/KPICard";
import Sidebar from "@/components/Sidebar/Sidebar";
import Table from "./Table/Table";

const kpiCards = [
  {
    title: "Total Orders",
    todayValue: "24",
    percentage: "12 %",
    yesterdayValue: "vs. 21 yesterday",
    icon: (
      <button className="bg-[#007AFF26] absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full">
        <svg
          width="17"
          height="21"
          viewBox="0 0 17 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.5"
            y="1.5"
            width="14"
            height="18"
            rx="4"
            stroke="#007AFF"
            strokeWidth="1.5"
          />
          <path
            d="M5.5 5.5H11.5"
            stroke="#007AFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5.5 10.5H11.5"
            stroke="#007AFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5.5 15.5H7.5"
            stroke="#007AFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    ),
    isIncreasePercentage: true,
  },
  {
    title: "Today's Revenue",
    todayValue: "₹1,842",
    percentage: "8 %",
    yesterdayValue: "vs. ₹1,705 yesterday",
    icon: (
      <button className="bg-[#34C75926] absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full">
        <svg
          width="13"
          height="19"
          viewBox="0 0 13 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.25H12M1 5.83333H12M8.79167 17.75L1 10.4167H3.75C9.86142 10.4167 9.86142 1.25 3.75 1.25"
            stroke="#34C759"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ),
    isIncreasePercentage: true,
  },
  {
    title: "Pending Orders",
    todayValue: "18",
    percentage: "5 %",
    yesterdayValue: "vs. 17 yesterday",
    icon: (
      <button className="bg-[#FFCC0026] absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full">
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5007 5.00065V10.5007L14.1673 12.334M19.6673 10.5007C19.6673 15.5632 15.5632 19.6673 10.5007 19.6673C5.43804 19.6673 1.33398 15.5632 1.33398 10.5007C1.33398 5.43804 5.43804 1.33398 10.5007 1.33398C15.5632 1.33398 19.6673 5.43804 19.6673 10.5007Z"
            stroke="#FFCC00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ),
    isIncreasePercentage: false,
  },
  {
    title: "Accepted Orders",
    todayValue: "12",
    percentage: "20 %",
    yesterdayValue: "vs. 10 yesterday",
    icon: (
      <button className="bg-[#AF52DE26] absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full">
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.37565 10.5007L9.12565 13.2507L14.6257 7.75065M19.6673 10.5007C19.6673 15.5632 15.5632 19.6673 10.5007 19.6673C5.43804 19.6673 1.33398 15.5632 1.33398 10.5007C1.33398 5.43804 5.43804 1.33398 10.5007 1.33398C15.5632 1.33398 19.6673 5.43804 19.6673 10.5007Z"
            stroke="#AF52DE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ),
    isIncreasePercentage: true,
  },
];

export default function Dashboard() {
  return (
    <div className="flex p-3 gap-3 h-full bg-[#e6e6ed]">
      <div className="">
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="flex-1">
        {/* Main */}

        <div>
          {/* Header Start */}
          <Header />
          {/* Header End */}
        </div>
        <div className="mt-4">
          {/* Content Start */}
          <div>
            {/* KPI Cards Start */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
              {kpiCards.map((kpiCard, index) => (
                <KPICard data={kpiCard} key={index} />
              ))}
            </div>
            {/* KPI Cards End */}
          </div>
          <div>{/* Orders Overview and Low stock alerts */}</div>
          <div className="mt-4 bg-white p-4 rounded-xl">
            {/* Recent Orders Start */}
            <div className="flex items-center justify-between">
              <span>Recent Orders</span>
              <span className="text-[#007AFF] text-sm">View All</span>
            </div>
            <div className=" w-full mt-4">
              <Table />
            </div>

            {/* Recent Orders End */}
          </div>
          {/* Content End */}
        </div>
      </div>
    </div>
  );
}
