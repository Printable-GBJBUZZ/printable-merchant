"use client";
import { useState } from "react";
import StorageHeader from "./StorageHeader";
import FilterSection from "./FilterSection";
import TableList from "./TableList";
import TableGrid from "./TableGrid";

const data = [
	{
		name: "Business Cards",
		type: "Folder",
		size: "45 Items",
		modified: "Apr 21, 2025",
		isFolder: true,
		isFav: false,
	},
	{
		name: "Flyers",
		type: "Folder",
		size: "45 Items",
		modified: "Apr 20, 2025",
		isFolder: true,
		isFav: true,
	},
	{
		name: "Barouches",
		type: "Folder",
		size: "45 Items",
		modified: "Apr 19, 2025",
		isFolder: true,
		isFav: false,
	},
	{
		name: "Posters",
		type: "Folder",
		size: "45 Items",
		modified: "Apr 19, 2025",
		isFolder: true,
		isFav: false,
	},
	{
		name: "Glossy Noice",
		type: "Folder",
		size: "45 Items",
		modified: "Apr 19, 2025",
		isFolder: true,
		isFav: false,
	},
	{
		name: "May-scanner-2024.jpg",
		type: "Image",
		size: "10 MB",
		modified: "Apr 19, 2025",
		icon: "image",
		isFav: false,
	},
	{
		name: "May-scanner-2024.pdf",
		type: "Document",
		size: "10 MB",
		modified: "Apr 19, 2025",
		icon: "pdf",
		isFav: false,
	},
	{
		name: "May-scanner-2024.docx",
		type: "Word",
		size: "10 MB",
		modified: "Apr 19, 2025",
		icon: "word",
		isFav: false,
	},
	{
		name: "May-scanner-2024.xlsx",
		type: "Excel",
		size: "10 MB",
		modified: "Apr 19, 2025",
		icon: "excel",
		isFav: false,
	},
];

interface StorageItem {
	name: string;
	type: string;
	size: string;
	modified: string;
	isFolder?: boolean;
	isFav: boolean;
	icon?: string;
}

type FilterType = "" | "week" | "month" | "3months" | "large" | "small" | "recent" | "never";

function filterData(data: StorageItem[], filter: FilterType): StorageItem[] {
	if (!filter) return data;
	const now = new Date();

	switch (filter) {
		case "week": {
			const weekAgo = new Date(now);
			weekAgo.setDate(now.getDate() - 7);
			return data.filter((item) => new Date(item.modified) >= weekAgo);
		}
		case "month": {
			const monthAgo = new Date(now);
			monthAgo.setMonth(now.getMonth() - 1);
			return data.filter((item) => new Date(item.modified) >= monthAgo);
		}
		case "3months": {
			const threeMonthsAgo = new Date(now);
			threeMonthsAgo.setMonth(now.getMonth() - 3);
			return data.filter((item) => new Date(item.modified) >= threeMonthsAgo);
		}
		case "large":
			return data.filter((item) => {
				if (!item.size) return false;
				const match = item.size.match(/([\d.]+)\s*MB/i);
				return match && parseFloat(match[1]) > 10;
			});
		case "small":
			return data.filter((item) => {
				if (!item.size) return false;
				const match = item.size.match(/([\d.]+)\s*MB/i);
				return match && parseFloat(match[1]) < 1;
			});
		case "recent":
			// Example: last 5 modified files
			return [...data]
				.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
				.slice(0, 5);
		case "never":
			// Example: never printed (simulate with isFav false)
			return data.filter((item) => !item.isFav);
		default:
			return data;
	}
}

export default function StorageOverview() {
	const [view, setView] = useState<"grid" | "list">("grid");
	const [activeFilter, setActiveFilter] = useState<FilterType>(""); // "" means 'all'
	const [searchValue, setSearchValue] = useState<string>("");

	// Filter and search
	const filteredData = filterData(data, activeFilter).filter((item) =>
		item.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<div className="w-full bg-white mt-[31px] rounded-lg p-[33px]">
			{/* header */}
			<StorageHeader />

			{/* filters, search and sort section */}
			<FilterSection
				view={view}
				onViewChange={setView}
				onFilterChange={(filter: string) => setActiveFilter(filter as FilterType)}
				activeFilter={activeFilter}
				searchValue={searchValue}
				onSearchChange={setSearchValue}
			/>

			{/* main table/grid */}
			<div className="mt-[30px]">
				{view === "list" ? <TableList data={filteredData} /> : <TableGrid data={filteredData} />}
			</div>
		</div>
	);
}