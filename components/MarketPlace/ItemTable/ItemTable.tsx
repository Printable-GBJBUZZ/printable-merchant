import React from "react";
import { EditIcon, TrashIcon } from "lucide-react";
type Item = {
	image: string;
	categoryName: string;
	parentCategory: string;
	components: string;
	vat: string;
	status: "Active" | "Inactive";
};

const items: Item[] = [
	{
		image: "/MarketPlace/categories/2.png",
		categoryName: "Glossy Paper",
		parentCategory: "Paper",
		components: "100 sheets, 3x3",
		vat: "12%",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/3.png",
		categoryName: "NootBook",
		parentCategory: "Book",
		components: "A4, 180 GSM",
		vat: "10%",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/4.png",
		categoryName: "Pens",
		parentCategory: "Ball Pen",
		components: "Black, Low Odor",
		vat: "15%",
		status: "Inactive",
	},
	{
		image: "/MarketPlace/categories/5.png",
		categoryName: "Markers",
		parentCategory: "Black Markers",
		components: "Black, Low Odor",
		vat: "8%",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/6.png",
		categoryName: "Document Files",
		parentCategory: "File",
		components: "Pack of 10",
		vat: "5%",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/6.png",
		categoryName: "Document Files",
		parentCategory: "File",
		components: "Pack of 10",
		vat: "5%",
		status: "Active",
	},
	{
		image: "/MarketPlace/categories/6.png",
		categoryName: "Document Files",
		parentCategory: "File",
		components: "Pack of 10",
		vat: "5%",
		status: "Inactive",
	},
];

export default function ItemsTable() {
	return (
		<div className="overflow-x-auto rounded-lg shadow border border-gray-200">
			<table className="min-w-full text-left text-sm">
				<thead className="bg-[#E6E6ED] text-base font-normal text-black uppercase">
					<tr>
						<th className="px-4 py-3">Images</th>
						<th className="px-4 py-3">Category Name</th>
						<th className="px-4 py-3">Parent Category</th>
						<th className="px-4 py-3">Components</th>
						<th className="px-4 py-3">VAT (%)</th>
						<th className="px-4 py-3">Status</th>
						<th className="px-4 py-3">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{items.map((item, idx) => (
						<tr key={idx} className="hover:bg-gray-50">
							<td className="px-4 py-3">
								<img
									src={item.image}
									alt={item.categoryName}
									className="w-14 h-14 rounded-md object-cover"
								/>
							</td>
							<td className="px-4 py-3 font-medium text-black text-base">{item.categoryName}</td>
							<td className="px-4 py-3 font-medium text-black text-base">{item.parentCategory}</td>
							<td className="px-4 py-3 font-medium text-black text-base">{item.components}</td>
							<td className="px-4 py-3 font-medium text-black text-base">{item.vat}</td>
							<td className="px-4 py-3 font-medium text-black text-base">{item.status}</td>
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
