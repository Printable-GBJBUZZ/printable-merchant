"use client";

import { ArrowUpDownIcon, EditIcon, InfoIcon, PlusIcon, SearchIcon, Trash2Icon, SaveIcon, XIcon } from "lucide-react";
import React, { useState } from "react";

const allServices = [
	{
		name: "Black & White Print",
		a4: "5",
		a3: "10",
		bw: "5",
		color: "",
		status: true,
	},
	{
		name: "Color Print",
		a4: "10",
		a3: "20",
		bw: "",
		color: "10",
		status: true,
	},
	{
		name: "Spiral Binding",
		a4: "30",
		a3: "50",
		bw: "",
		color: "",
		status: true,
	},
	{
		name: "Lamination",
		a4: "15",
		a3: "30",
		bw: "",
		color: "",
		status: true,
	},
	{
		name: "Resume Printing",
		a4: "25",
		a3: "",
		bw: "25",
		color: "40",
		status: true,
	},
];

const ServiceAndPricingPage = () => {
	const [currentTab, setCurrentTab] = useState<"servicePricing" | "additionalServices">("servicePricing");
	const [services, setServices] = useState(allServices);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editedService, setEditedService] = useState({ ...allServices[0] });
	const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

	const toggleStatus = (index: number) => {
		const newData = [...services];
		newData[index].status = !newData[index].status;
		setServices(newData);
	};

	const handleEditClick = (index: number) => {
		setEditingIndex(index);
		setEditedService({ ...services[index] });
	};

	const handleCancelEdit = () => {
		setEditingIndex(null);
	};

	const handleSaveEdit = () => {
		if (editingIndex !== null) {
			const updatedServices = [...services];
			updatedServices[editingIndex] = { ...editedService };
			setServices(updatedServices);
			setEditingIndex(null);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setEditedService((prev) => ({ ...prev, [field]: value }));
	};

	const handleSaveAdd = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const serviceData = {
			name: formData.get("serviceName") as string,
			a4: formData.get("a4Price") as string,
			a3: formData.get("a3Price") as string,
			bw: formData.get("bwPrice") as string,
			color: formData.get("colorPrice") as string,
			basePrice: formData.get("basePrice") as string,
			status: true,
		};

		setServices((prev) => [...prev, serviceData]);
		setIsAddServiceModalOpen(false);
	};

	return (
		<>
			<div className="flex flex-col justify-center gap-4">
				<div>
					<p className="text-[28px] font-medium">Pricing & Services</p>
				</div>
				<div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-md px-5 py-2 flex gap-3">
					<div className="flex items-center">
						<InfoIcon className="text-[#F59E0B]" />
					</div>
					<div className="flex flex-col">
						<span className="text-[#92400E] font-semibold text-base">Important Notice</span>
						<span className="text-[#B45309]">
							Price changes will take effect immediately for new orders. Existing orders will continue
							with the price at the time of placement.
						</span>
					</div>
				</div>

				<div className="bg-white p-5 rounded-sm flex flex-col gap-5">
					<div className="flex w-full rounded-full border p-1 gap-2">
						<button
							type="button"
							className={`flex-1 text-center rounded-full p-2 cursor-pointer ${
								currentTab === "servicePricing" ? "bg-[#E6E6ED]" : ""
							}`}
							onClick={() => setCurrentTab("servicePricing")}>
							<span>Service Pricing</span>
						</button>
						<button
							type="button"
							className={`flex-1 text-center rounded-full p-2 cursor-pointer ${
								currentTab === "additionalServices" ? "bg-[#E6E6ED]" : ""
							}`}
							onClick={() => setCurrentTab("additionalServices")}>
							<span>Additional Services</span>
						</button>
					</div>

					<div className="flex justify-between">
						<div className="flex flex-col justify-center">
							<span className="text-black font-semibold text-xl">Service Pricing Table</span>
							<span className="text-[#555555] font-normal text-base">
								Define pricing for your printing services
							</span>
						</div>
						<div>
							<button
								className="flex items-center justify-center bg-[#06044B] rounded-full px-5 py-2.5"
								onClick={() => setIsAddServiceModalOpen(true)}>
								<PlusIcon className="text-white" />
								<span className="text-white">Add New Service</span>
							</button>
						</div>
					</div>

					<div className="flex justify-between">
						<div className="flex-1">
							<div className="relative border border-[#C9C9C9] rounded-md w-2/3">
								<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
									<SearchIcon className="w-5 h-5" />
								</span>
								<input
									type="text"
									placeholder="Search orders, customers"
									className="w-full pl-10 pr-4 py-1.5 shadow-sm focus:outline-none"
								/>
							</div>
						</div>
						<div className="flex-1 flex items-center justify-end gap-2">
							<div className="border border-[#C9C9C9] rounded-md w-10 h-full flex justify-center items-center">
								<ArrowUpDownIcon className="text-[#555555]" />
							</div>
							<div className="relative inline-block">
								<select className="appearance-none border border-[#C9C9C9] rounded-lg px-4 pr-10 py-2 text-[#555555] focus:outline-none ">
									<option value="all">All Status</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#555555]">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</div>
							<div className="relative inline-block">
								<select className="appearance-none border border-[#C9C9C9] rounded-lg px-4 pr-10 py-2 text-[#555555] focus:outline-none">
									<option value="all">All Types</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#555555]">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto rounded-xl border border-gray-200">
						<table className="min-w-full text-sm text-left text-gray-700">
							<thead className="bg-gray-100 text-xs text-gray-600 uppercase">
								<tr>
									<th className="px-4 py-3 font-medium text-black">Service Type</th>
									<th className="px-4 py-3 font-medium text-black">A4 Price (₹)</th>
									<th className="px-4 py-3 font-medium text-black">A3 Price (₹)</th>
									<th className="px-4 py-3 font-medium text-black">B&W Price (₹)</th>
									<th className="px-4 py-3 font-medium text-black">Color Price (₹)</th>
									<th className="px-4 py-3 font-medium text-black text-center">Status</th>
									<th className="px-4 py-3 font-medium text-black text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{services.map((service, index) => {
									const isEditing = editingIndex === index;
									return (
										<tr key={index} className="border-t">
											<td className="px-4 py-3 text-black font-medium">
												{isEditing ? (
													<input
														type="text"
														className="border border-gray-300 rounded px-2 py-1 w-full"
														value={editedService.name}
														onChange={(e) => handleInputChange("name", e.target.value)}
													/>
												) : (
													service.name
												)}
											</td>
											{["a4", "a3", "bw", "color"].map((field) => (
												<td key={field} className="px-4 py-3 text-black">
													<div className="flex gap-1">
														{isEditing ? (
															""
														) : (
															<span>
																{service[field as keyof typeof service] !== ""
																	? "₹"
																	: "-"}
															</span>
														)}
														{isEditing ? (
															<input
																type="text"
																className="border border-gray-300 rounded px-2 py-1 w-full"
																value={`${
																	editedService[field as keyof typeof editedService]
																}`}
																onChange={(e) =>
																	handleInputChange(field, e.target.value)
																}
															/>
														) : (
															service[field as keyof typeof service]
														)}
													</div>
												</td>
											))}
											<td className="px-4 py-3 text-center">
												<label className="inline-flex items-center cursor-pointer">
													<input
														type="checkbox"
														className="sr-only peer"
														checked={isEditing ? editedService.status : service.status}
														onChange={() =>
															isEditing
																? setEditedService((prev) => ({
																		...prev,
																		status: !prev.status,
																  }))
																: toggleStatus(index)
														}
													/>
													<div
														className={`w-11 h-6 bg-gray-300 rounded-full relative transition-all ${
															(isEditing ? editedService.status : service.status)
																? " peer peer-focus:outline-none  peer-checked:bg-[#06044E]"
																: ""
														}`}>
														<div
															className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
																(isEditing ? editedService.status : service.status)
																	? "peer-checked:-translate-x-5 right-1"
																	: "left-1 peer-checked:translate-x-5"
															}`}
														/>
													</div>
												</label>
											</td>
											<td className="px-4 py-3 text-center">
												<div className="flex justify-center items-center space-x-3 text-black">
													{isEditing ? (
														<>
															<button onClick={handleCancelEdit}>
																<XIcon className="w-4 h-4" />
															</button>
															<button onClick={handleSaveEdit}>
																<SaveIcon className="w-4 h-4" />
															</button>
														</>
													) : (
														<>
															<button onClick={() => handleEditClick(index)}>
																<EditIcon className="w-4 h-4" />
															</button>
															<button>
																<Trash2Icon className="w-4 h-4" />
															</button>
														</>
													)}
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{isAddServiceModalOpen && (
				<>
					<div className="max-w-lg fixed inset-0 flex justify-center items-center m-auto z-[1000]">
						<div className="w-full backdrop-blur-sm p-4 rounded-md bg-gradient-to-br from-[#06044b59] to-[#61e98759] border-white">
							<div className="flex justify-between items-center">
								<span className="text-white text-2xl font-medium">Add New Service</span>
								<button type="button" onClick={() => setIsAddServiceModalOpen(false)}>
									<XIcon />
								</button>
							</div>
							<div className="mt-4">
								<form className="flex flex-col gap-5" onSubmit={handleSaveAdd}>
									<div className="flex flex-col gap-1 justify-center">
										<label className="text-base text-black font-normal">Service Name</label>
										<input
											id="serviceName"
											name="serviceName"
											className="bg-white rounded-md w-full px-4 py-1.5 placeholder:text-[#555555] text-sm"
											placeholder="Service Name"
										/>
									</div>
									<div className="flex items-center gap-4">
										<div className="flex-1 flex flex-col gap-1 justify-center">
											<label className="text-base text-black font-normal">A4 Price (₹)</label>
											<input
												id="a4Price"
												name="a4Price"
												className="bg-white rounded-md w-full px-4 py-1.5 placeholder:text-[#555555] text-sm"
												placeholder="0"
												type="number"
											/>
										</div>
										<div className="flex-1 flex flex-col gap-1 justify-center">
											<label className="text-base text-black font-normal">A3 Price (₹)</label>
											<input
												id="a3Price"
												name="a3Price"
												className="bg-white rounded-md w-full px-4 py-1.5 placeholder:text-[#555555] text-sm"
												placeholder="0"
												type="number"
											/>
										</div>
									</div>

									<div className="flex items-center gap-4">
										<div className="flex-1 flex flex-col gap-1 justify-center">
											<label className="text-base text-black font-normal">B&W Price (₹)</label>
											<input
												id="bwPrice"
												name="bwPrice"
												className="bg-white rounded-md w-full px-4 py-1.5 placeholder:text-[#555555] text-sm"
												placeholder="0"
												type="number"
											/>
										</div>
										<div className="flex-1 flex flex-col gap-1 justify-center">
											<label className="text-base text-black font-normal">Color Price (₹)</label>
											<input
												id="colorPrice"
												name="colorPrice"
												className="bg-white rounded-md w-full px-4 py-1.5 placeholder:text-[#555555] text-sm"
												placeholder="0"
												type="number"
											/>
										</div>
									</div>

									<div className="flex flex-col gap-1 justify-center">
										<label className="text-base text-black font-normal">Base Price (₹)</label>
										<input
											id="basePrice"
											name="basePrice"
											className="bg-white rounded-md w-full px-4 py-1.5 placeholder:text-[#555555] text-sm"
											placeholder="Base Price"
											type="text"
										/>
									</div>

									<div className="flex justify-end">
										<button
											type="submit"
											className="px-5 py-1.5 bg-[#06044B] text-white rounded-xl">
											Add Service
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div
						className="fixed inset-0 bg-black/40 z-[999]"
						onClick={() => setIsAddServiceModalOpen(false)}></div>
				</>
			)}
		</>
	);
};

export default ServiceAndPricingPage;
