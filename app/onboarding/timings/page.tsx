"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const defaultTimings = daysOfWeek.map((day) => ({
	day,
	isOpen: true,
	open: "09:00",
	close: "21:00",
}));

export default function TimingsPage() {
	const router = useRouter();
	const { data, updateTimings } = useOnboarding();
	const [timings, setTimings] = useState(defaultTimings);

	useEffect(() => {
		if (!data.setup.storeName || !data.setup.storeAddress) {
			router.push("/onboarding/setup");
		} else if (!data.services || data.services.length === 0) {
			router.push("/onboarding/services");
		} else if (data.timings && data.timings.length > 0) {
			setTimings(data.timings);
		}
	}, [data, router]);

	const handleToggle = (index: number) => {
		setTimings((prev) => prev.map((t, i) => (i === index ? { ...t, isOpen: !t.isOpen } : t)));
	};

	const handleTimeChange = (index: number, field: "open" | "close", value: string) => {
		setTimings((prev) => prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
	};

	const handleFinish = () => {
		const openDays = timings.filter((t) => t.isOpen && t.open && t.close);
		if (openDays.length === 0) {
			alert("Please set timings for at least one day.");
			return;
		}
		// updateTimings(openDays);
		console.log("Final Onboarding Data:", { ...data, timings: openDays });
	};

	const handleBack = () => {
		router.push("/onboarding/services");
	};

	return (
		<div className="flex items-center justify-center px-4 mt-10">
			<div className="w-full max-w-6xl flex flex-col md:flex-row md:gap-4 lg:gap-8">
				{/* Left Column */}
				<div className="flex flex-col space-y-8 flex-1">
					<div className="flex flex-col gap-2">
						<p className="heading">Operational Hours</p>
						<p className="subHeading">Set your store's operating hours</p>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-3">
							{timings.map((t, index) => (
								<div
									key={t.day}
									className="flex justify-between items-center gap-8">
									<div className="">
										<label className="timingsDay">{t.day}</label>
									</div>
									<div className="flex gap-8">
										<div className="flex items-center gap-2">
											<ToggleSwitch
												enabled={t.isOpen}
												onToggle={() => handleToggle(index)}
											/>
										</div>
										<div className="col-span-10 flex items-center gap-3">
											<label className="timingsOpen">Open</label>
											<input
												type="time"
												value={t.open}
												onChange={(e) => handleTimeChange(index, "open", e.target.value)}
												className="timingsTime"
											/>
											<label className="timingsTo">To</label>
											<input
												type="time"
												value={t.close}
												onChange={(e) => handleTimeChange(index, "close", e.target.value)}
												className="timingsTime"
											/>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="flex justify-between items-center mt-6">
							<button
								onClick={handleBack}
								className="px-6 py-2 border rounded-full text-white border-white">
								Back
							</button>
							<button
								onClick={handleFinish}
								className="continueButton cursor-pointer bg-[#61e987]">
								Finish
							</button>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className="flex-1 bg-white rounded p-4">
					<div className="w-full h-full"></div>
				</div>
			</div>
		</div>
	);
}
