import ItemsTable from "@/components/MarketPlace/ItemTable/ItemTable";
import Search from "@/icons/EarningsWallet/Search";
import { ArrowUpDownIcon, FilterIcon, PlusIcon } from "lucide-react";
import React from "react";

const Items = () => {
	return (
		<div className="flex flex-col flex-1 gap-4">
			<div>
				<p className="text-[28px] font-medium">Manage Items</p>
			</div>

			<div className="flex-1 bg-white p-4 rounded-xl flex flex-col gap-4">
				<div className="flex items-center">
					<div className="flex flex-col justify-center">
						<span className="text-xl font-medium text-black">Item Lists</span>
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
						<button className="flex items-center justify-center bg-[#06044B] rounded-lg px-5 py-2.5">
							<PlusIcon className="text-white" />
							<span className="text-white">Add New Item</span>
						</button>
					</div>
				</div>

				<ItemsTable />
			</div>

			{/* Content End */}
		</div>
	);
};

export default Items;
