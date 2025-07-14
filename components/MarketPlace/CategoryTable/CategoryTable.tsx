import React from "react";
import { EditIcon, TrashIcon } from "lucide-react";

type Category = {
	image: string;
	name: string;
	parentCategory: string;
	status: "Active" | "Inactive";
};

const categories: Category[] = [
	{
		image: "/MarketPlace/categories/2.png",
		name: "Glossy Paper",
		parentCategory: "Paper",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/3.png",
		name: "NootBook",
		parentCategory: "Book",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/4.png",
		name: "Pens",
		parentCategory: "Ball Pen",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/5.png",
		name: "Markers",
		parentCategory: "Black Markers",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/6.png",
		name: "Document Files",
		parentCategory: "File",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/6.png",
		name: "Document Files",
		parentCategory: "File",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/6.png",
		name: "Document Files",
		parentCategory: "File",
		status: "Active",
	},
];

export default function CategoryTable() {
	return (
		<div className="overflow-x-auto rounded-lg shadow border border-gray-200">
			<table className="min-w-full text-left text-sm">
				<thead className="bg-[#E6E6ED] text-base font-normal text-black uppercase">
					<tr>
						<th className="px-4 py-3">Images</th>
						<th className="px-4 py-3">Category Name</th>
						<th className="px-4 py-3">Parent Category</th>
						<th className="px-4 py-3">Status</th>
						<th className="px-4 py-3">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{categories.map((cat, idx) => (
						<tr key={idx} className="hover:bg-gray-50">
							<td className="px-4 py-3">
								<img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-md object-cover" />
							</td>
							<td className="px-4 py-3 font-medium text-black text-base">{cat.name}</td>
							<td className="px-4 py-3 font-medium text-black text-base">{cat.parentCategory}</td>
							<td className="px-4 py-3 font-medium text-black text-base">{cat.status}</td>
							<td className="px-4 py-3 font-medium text-black text-base space-x-3">
								<button>
									<EditIcon size={18} />
								</button>
								<button>
									<TrashIcon size={18} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
