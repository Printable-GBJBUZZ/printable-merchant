import React from "react";

type TProps = { image: string; title: string; parentCategory: string; category: string; isActive: boolean };

const ProductItemCard = ({ image, title, category, isActive, parentCategory }: TProps) => {
	return (
		<div className="bg-[#E8E7FE] rounded-xl p-2.5 flex flex-col gap-2.5">
			<div className="relative">
				<img src={image} className="max-w-[250px] w-full h-full object-contain" />
				<span
					className={`py-1 px-2 rounded-md absolute top-2 right-2 text-white text-sm ${
						isActive ? "bg-[#24873D]" : "bg-[#FF3B30]"
					}`}>
					{isActive ? "Active" : "Inactive"}
				</span>
			</div>

			<div className="flex flex-col gap-2.5">
				<div>
					<p className="font-bold text-black text-base">{title}</p>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-black text-sm font-medium">Parent Category</span>
					<span className="bg-[#433DF5] rounded-md px-2 text-white text-sm font-normal">
						{parentCategory}
					</span>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-black text-sm font-medium">Category</span>
					<span className="bg-[#AF52DE] rounded-md px-2 text-white text-sm font-normal">{category}</span>
				</div>
			</div>
		</div>
	);
};

export default ProductItemCard;
