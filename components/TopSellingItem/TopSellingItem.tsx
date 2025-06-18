import React from "react";

type TProps = {
	imageSrc: string;
	title: string;
	salesCount: string;
	availability: boolean;
	remaining: string;
};

const TopSellingItem = ({ imageSrc, title, salesCount, availability, remaining }: TProps) => {
	return (
		<div className="flex gap-4 items-center">
			<div className="w-[109px] h-[67px]">
				<img src={imageSrc} className="rounded-sm h-full w-full object-cover" />
			</div>

			<div className="flex flex-col flex-1 justify-center">
				<div className="flex items-center justify-between gap-2">
					<span className="font-medium text-base text-black">{title}</span>
					<p className="flex gap-2 items-center">
						{availability && (
							<>
								<p className="w-1.5 h-1.5 bg-[#35813C] rounded-full"></p>
								<span className="text-[#35813C] font-normal text-sm">Available</span>
							</>
						)}
					</p>
				</div>

				<div className="flex items-center justify-between gap-2">
					<span className="font-light text-sm text-black">{salesCount}</span>
					<p className="text-sm text-black font-thin">{remaining}</p>
				</div>
			</div>
		</div>
	);
};

export default TopSellingItem;
