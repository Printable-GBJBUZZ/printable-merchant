"use client";

type ToggleSwitchProps = {
	enabled: boolean;
	onToggle: () => void;
};

export default function ToggleSwitch({ enabled, onToggle }: ToggleSwitchProps) {
	return (
		<label className="relative inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				checked={enabled}
				onChange={onToggle}
				className="sr-only peer"
			/>
			<div
				className={`w-11 h-6 rounded-full transition-colors duration-300 ${
					enabled ? "bg-[#2563EB]" : "bg-gray-400"
				}`}></div>
			<div
				className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
					enabled ? "translate-x-5" : ""
				}`}></div>
		</label>
	);
}
