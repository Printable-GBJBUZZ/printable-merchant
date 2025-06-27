import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', thisMonth: 550, lastMonth: 350 },
  { month: 'Feb', thisMonth: 720, lastMonth: 560 },
  { month: 'Mar', thisMonth: 400, lastMonth: 250 },
  { month: 'Apr', thisMonth: 850, lastMonth: 780 },
  { month: 'May', thisMonth: 630, lastMonth: 140 },
  { month: 'Jun', thisMonth: 780, lastMonth: 500 },
  { month: 'Jul', thisMonth: 420, lastMonth: 640 },
  { month: 'Aug', thisMonth: 680, lastMonth: 690 },
  { month: 'Sep', thisMonth: 110, lastMonth: 430 },
  { month: 'Oct', thisMonth: 720, lastMonth: 920 },
  { month: 'Nov', thisMonth: 600, lastMonth: 630 },
  { month: 'Dec', thisMonth: 250, lastMonth: 350 }
];

export default function Chart() {
  return (
    <div className="p-6 h-full">
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} tickCount={7} />
          <Bar
            dataKey="thisMonth"
            fill="#06044B"
            radius={[5, 5, 0, 0]}
            barSize={30}
          />
          <Bar
            dataKey="lastMonth"
            fill="#61E987"
            radius={[5, 5, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#06044B]"></div>
          <span>This Month: ₹15,671.27</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#34C759]"></div>
          <span>Last Month: ₹12,585</span>
        </div>
      </div>
    </div>
  );
}