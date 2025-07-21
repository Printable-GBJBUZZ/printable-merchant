import KPICard from "@/components/KPICard/KPICard";
import ProductItemCard from "@/components/MarketPlace/ProductItemCard/ProductItemCard";
import Search from "@/icons/EarningsWallet/Search";
import OrderIcon from "@/icons/Order/OrderIcon";
import RupeeIcon from "@/icons/Rupee/RupeeIcon";
import TickIcon from "@/icons/Tick/TickIcon";
import { ArrowUpDownIcon, ClockIcon, FilterIcon } from "lucide-react";
import React from "react";

const MarketPlace = () => {
	const kpiCards = [
		{
			title: "Total Orders",
			todayValue: "0",
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
			title: "Pending Orders",
			todayValue: "0",
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
			title: "Today's Revenue",
			todayValue: `₹${"0.00"}`,
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
			title: "Accepted Orders",
			todayValue: "0",
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

	const allProducts = [
		{
			title: "Cutler Color pens",
			parentCategory: "Pen",
			category: "Color Pen",
			image: "/MarketPlace/pens.png",
			isActive: true,
		},
		{
			title: "Office Logbook",
			parentCategory: "Book",
			category: "Professional diary",
			image: "/MarketPlace/pens.png",
			isActive: true,
		},
		{
			title: "Camel Water Colors",
			parentCategory: "Color",
			category: "Water Colors",
			image: "/MarketPlace/pens.png",
			isActive: true,
		},
		{
			title: "Cutler Color pens",
			parentCategory: "",
			category: "Color Pen",
			image: "/MarketPlace/pens.png",
			isActive: true,
		},
		{
			title: "Cutler Color pens",
			parentCategory: "Pen",
			category: "Color Pen",
			image: "/MarketPlace/pens.png",
			isActive: true,
		},
		{
			title: "Cutler Color pens",
			parentCategory: "Pen",
			category: "Color Pen",
			image: "/MarketPlace/pens.png",
			isActive: false,
		},
		{
			title: "Cutler Color pens",
			parentCategory: "Pen",
			category: "Color Pen",
			image: "/MarketPlace/pens.png",
			isActive: false,
		},
	];

	return (
		<div className="flex flex-col flex-1 gap-4">
			<div>
				<p className="text-[28px] font-medium">All Items</p>
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

			<div className="flex-1 mt-4 bg-white p-4 rounded-xl flex flex-col gap-4">
				<div className="flex items-center">
					<div className="flex flex-col justify-center">
						<span className="text-xl font-medium text-black">Manage Your Products</span>
						<span className="text-[#555555] text-base font-medium">
							Update product details, stock, and categories easily.
						</span>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="w-[464px] h-[45px] border-[1px] px-[15px] border-[#C9C9C9] rounded-[10px] flex flex-row gap-[10px] items-center">
						<Search />
						<input
							type="text"
							placeholder="Search orders, customers"
							className="rounded-[10px] w-full outline-none text-base"
							style={{
								boxShadow: "none",
								lineHeight: "45px",
								caretColor: "#555555",
							}}
						/>
					</div>
					<div className="flex items-center gap-2 h-full">
						<div className="border border-[#C9C9C9] rounded-md w-10 h-full flex justify-center items-center">
							<ArrowUpDownIcon className="text-[#555555]" />
						</div>
						<div className="border border-[#C9C9C9] rounded-md h-full flex items-center gap-2 px-4">
							<FilterIcon className="text-[#555555]" />
							<span>Filters</span>
						</div>
					</div>
				</div>
				<div className="w-full mt-4 flex-1 grid grid-cols-5 gap-4">
					{allProducts.map((product, index) => (
						<ProductItemCard {...product} key={index} />
					))}
				</div>
			</div>

			{/* Content End */}
		</div>
	);
};

export default MarketPlace;
