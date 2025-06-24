"use client";

import LineGraphDashboard from "@/components/Dashboard/LineGraphDashboard";
import OrderTable from "@/components/Dashboard/Table";
import TopSellingItem from "@/components/Dashboard/TopSellingItem";
import KPICard from "@/components/KPICard/KPICard";
import { useMerchant } from "@/contexts/MerchantContext";
import ClockIcon from "@/icons/Clock/ClockIcon";
import OrderIcon from "@/icons/Order/OrderIcon";
import RupeeIcon from "@/icons/Rupee/RupeeIcon";
import TickIcon from "@/icons/Tick/TickIcon";
import { RefreshCwIcon } from "lucide-react";

export default function Dashboard() {
	const { merchant } = useMerchant();

	const kpiCards = [
		{
			title: "Total Orders",
			todayValue: merchant?.totalOrders.toString() ?? "0",
			percentage: "12 %",
			yesterdayValue: "vs. 21 yesterday",
			icon: (
				<button className="bg-[#007AFF26] absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full">
					<OrderIcon stroke="#007AFF" />
				</button>
			),
			isIncreasePercentage: true,
		},
		{
			title: "Today's Revenue",
			todayValue: `₹${merchant?.totalRevenue ?? "0.00"}`,
			percentage: "8 %",
			yesterdayValue: "vs. ₹1,705 yesterday",
			icon: (
				<div className="bg-[#34C75926] absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full">
					<RupeeIcon />
				</div>
			),
			isIncreasePercentage: true,
		},
		{
			title: "Pending Orders",
			todayValue: merchant?.pendingOrders.toString() ?? "0",
			percentage: "5 %",
			yesterdayValue: "vs. 17 yesterday",
			icon: (
				<button className="bg-[#FFCC0026] absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full">
					<ClockIcon />
				</button>
			),
			isIncreasePercentage: false,
		},
		{
			title: "Accepted Orders",
			todayValue: merchant?.acceptedOrders.toString() ?? "0",
			percentage: "20 %",
			yesterdayValue: "vs. 10 yesterday",
			icon: (
				<button className="bg-[#AF52DE26] absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full">
					<TickIcon />
				</button>
			),
			isIncreasePercentage: true,
		},
	];

	const topSellingItems = [
		{
			imageSrc: "/3U_Cube_Logo_Template.jpg",
			title: "3U Cube logo Template",
			salesCount: "1520 Sales",
			availability: true,
			remaining: "135 Stocks Remaining",
		},
		{
			imageSrc: "/printable_visiting_card.png",
			title: "Printable Visiting Card",
			salesCount: "151 Sales",
			availability: true,
			remaining: "120 Stocks Remaining",
		},
		{
			imageSrc: "/ramu_kaka_ki_chai_logo_template.jpg",
			title: "Ramu Kaka Ki Chai Logo Template",
			salesCount: "235 Sales",
			availability: true,
			remaining: "300 Stocks Remaining",
		},
		{
			imageSrc: "/realme_T300_3D_object.png",
			title: "realme T300 3d object",
			salesCount: "51 Sales",
			availability: true,
			remaining: "510 Stocks Remaining",
		},
	];

	return (
		<div className="flex flex-col flex-1 gap-4">
			<div>
				<p className="text-[28px] font-medium">Dashboard</p>
			</div>
			<div>
				{/* KPI Cards Start */}
				<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
					{kpiCards.map((kpiCard, index) => (
						<KPICard data={kpiCard} key={index} />
					))}
				</div>
				{/* KPI Cards End */}
			</div>
			<div className="flex gap-4">
				<div className="flex-1">
					<LineGraphDashboard />
				</div>
				<div className="flex-1 bg-white rounded-lg p-4 flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<span className="font-medium text-xl">Top Selling Items</span>
							<div className="w-4 h-4">
								<RefreshCwIcon className="text-[#007AFF] w-full h-full" />
							</div>
						</div>
						<div>
							<span className="font-medium text-sm text-[#007AFF]">View All</span>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						{topSellingItems.map((item, index) => (
							<TopSellingItem {...item} key={index} />
						))}
					</div>
				</div>
			</div>
			<div className="flex-1 mt-4 bg-white p-4 rounded-xl flex flex-col">
				{/* Recent Orders Start */}
				<div className="flex items-center justify-between">
					<span>Recent Orders</span>
					<span className="text-[#007AFF] text-sm">View All</span>
				</div>
				<div className="w-full mt-4 flex-1">
					<OrderTable />
				</div>
				{/* Recent Orders End */}
			</div>
			{/* Content End */}
		</div>
	);
}
