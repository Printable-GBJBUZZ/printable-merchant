"use client";

import PDFIcon from "@/icons/PDF/PDFIcon";
import { ArrowDownIcon, XIcon } from "lucide-react";
import React from "react";

const PrintModal = ({ handleClose }: { handleClose: () => void }) => {
	return (
		<>
			<div className="fixed inset-0 z-[100] p-4">
				<div className="h-full w-full rounded-lg bg-[#E6E6ED] flex">
					<div className="flex-1 overflow-auto">
						<div className="m-4 flex flex-col gap-6 justify-center items-center">
							<div className="">
								<img src="/my_resume_template.png" width={486} />
							</div>
							<div className="">
								<img src="/my_resume_template.png" width={486} />
							</div>
						</div>
					</div>
					<div className="flex-1">
						<div className="bg-white rounded-lg flex h-full">
							<div className="border-r border-r-[#C9C9C9]">
								<div className="border-b border-b-[#C9C9C9] px-5 py-6">
									<span className="font-medium text-xl">Order ID: #ORD-7829</span>
								</div>
								<div className="p-4 flex flex-col gap-4">
									<span className="font-medium text-base">Order Items</span>
									<div className="flex flex-col justify-center gap-8">
										<div className="flex flex-col gap-2">
											<img src="/my_resume_template.png" width={202} />
											<div className="flex items-center justify-center gap-2">
												<div className="bg-[#FF3B30] w-5 h-5 flex justify-center items-center rounded-xs p-1">
													<PDFIcon />
												</div>
												<span className="font-medium text-sm">My-resume template.pdf</span>
											</div>
										</div>

										<div className="flex flex-col gap-2">
											<img src="/printable_logo.png" width={202} />
											<div className="flex items-center justify-center gap-2">
												<div className="bg-[#FF3B30] w-5 h-5 flex justify-center items-center rounded-xs p-1">
													<PDFIcon />
												</div>
												<span className="font-medium text-sm">My-resume template.pdf</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col flex-1 p-4">
								<div className="flex justify-between">
									<div className="flex items-center gap-2">
										<div className="bg-[#FF3B30] h-[40px] w-[40px] flex justify-center items-center rounded-md">
											<PDFIcon />
										</div>
										<div className="flex flex-col">
											<span className="font-semibold text-base text-black">
												theprojetks-design-tokens.pdf
											</span>
											<span className="font-light text-base text-black">0.10 MB</span>
										</div>
									</div>

									<button type="button" onClick={handleClose}>
										<XIcon />
									</button>
								</div>

								<div className="flex flex-col justify-center gap-6">
									<div className="flex items-center">
										<div className="flex-1 ">
											<span className="text-sm text-black font-medium">Print Color</span>
										</div>
										<div className="bg-[#DFFBE7] flex-1 flex justify-between items-center px-2.5 py-5 rounded-sm gap-2.5">
											<span className="">Black & White</span>
											<span className="">
												<ArrowDownIcon />
											</span>
										</div>
									</div>

									<div className="flex items-center">
										<div className="flex-1 ">
											<span className="text-sm text-black font-medium">Number of Copies</span>
										</div>
										<div className="bg-[#DFFBE7] flex-1 flex justify-between items-center px-2.5 py-5 rounded-sm gap-2.5">
											<span className="">12</span>
										</div>
									</div>

									<div className="flex items-center">
										<div className="flex-1 ">
											<span className="text-sm text-black font-medium">Page Orientation</span>
										</div>
										<div className="bg-[#DFFBE7] flex-1 flex justify-between items-center px-2.5 py-5 rounded-sm gap-2.5">
											<span className="">Portrait</span>
											<span className="">
												<ArrowDownIcon />
											</span>
										</div>
									</div>

									<div className="flex items-center">
										<div className="flex-1 ">
											<span className="text-sm text-black font-medium">Pages to Print</span>
										</div>
										<div className="bg-[#DFFBE7] flex-1 flex justify-between items-center px-2.5 py-5 rounded-sm gap-2.5">
											<span className="">1</span>
											<span className="">
												<ArrowDownIcon />
											</span>
										</div>
									</div>

									<div className="flex items-center">
										<div className="flex-1 ">
											<span className="text-sm text-black font-medium">Paper Size</span>
										</div>
										<div className="bg-[#DFFBE7] flex-1 flex justify-between items-center px-2.5 py-5 rounded-sm gap-2.5">
											<span className="">A4 (8.27” x 11.69”)</span>
											<span className="">
												<ArrowDownIcon />
											</span>
										</div>
									</div>

									<div className="flex items-center">
										<div className="flex-1 ">
											<span className="text-sm text-black font-medium">Paper Margin</span>
										</div>
										<div className="bg-[#DFFBE7] flex-1 flex justify-between items-center px-2.5 py-5 rounded-sm gap-2.5">
											<span className="">Normal</span>
											<span className="">
												<ArrowDownIcon />
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="fixed inset-0 z-[99] bg-black/50"></div>
		</>
	);
};

export default PrintModal;
