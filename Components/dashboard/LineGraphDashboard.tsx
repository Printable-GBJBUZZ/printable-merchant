"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
	{ day: "Mon", orders: 12, revenue: 1500 },
	{ day: "Tue", orders: 14, revenue: 1800 },
	{ day: "Wed", orders: 18, revenue: 2300 },
	{ day: "Thu", orders: 9, revenue: 800 },
	{ day: "Fri", orders: 26, revenue: 1500 },
	{ day: "Sat", orders: 14, revenue: 2900 },
	{ day: "Sun", orders: 20, revenue: 3000 },
];

const renderLegend = () => {
	return (
		<div className="flex gap-6 mt-4 justify-center text-sm font-medium">
			<div className="flex items-center gap-2">
				<span className="w-3 h-3 rounded-full bg-[#FF3B30] inline-block"></span>
				<span>Orders</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-3 h-3 rounded-full bg-[#30B0C7] inline-block"></span>
				<span>Revenue</span>
			</div>
		</div>
	);
};

const LineGraphDashboard = () => {
	return (
		<div className="bg-white rounded-xl p-4 shadow-sm">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">Orders Overview</h2>
				<div className="flex gap-2">
					<button className="bg-[#0A0A23] text-white text-sm px-4 py-1 rounded-full">Weekly</button>
					<button className="bg-gray-200 text-sm px-4 py-1 rounded-full">Monthly</button>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
					<XAxis dataKey="day" />
					<YAxis
						yAxisId="left"
						orientation="left"
						domain={[0, 30]}
						tickCount={7}
						interval={0}
						tick={{ fontSize: 12 }}
					/>
					<YAxis
						yAxisId="right"
						orientation="right"
						domain={[0, 3000]}
						tickCount={7}
						interval={0}
						tickFormatter={(val) => `₹${val}`}
						tick={{ fontSize: 12 }}
					/>
					<Tooltip
						formatter={(value, name) => (name === "revenue" ? [`₹${value}`, "Revenue"] : [value, "Orders"])}
					/>
					<Line
						yAxisId="left"
						type="monotone"
						dataKey="orders"
						stroke="#FF3B30"
						strokeWidth={2}
						dot={false}
						name="Orders"
					/>
					<Line
						yAxisId="right"
						type="monotone"
						dataKey="revenue"
						stroke="#30B0C7"
						strokeWidth={2}
						dot={false}
						name="Revenue"
					/>
				</LineChart>
			</ResponsiveContainer>

			{renderLegend()}
		</div>
	);
};

export default LineGraphDashboard;
