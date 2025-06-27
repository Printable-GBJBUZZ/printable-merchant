export default function AutoWithdrawal(){
    return (
      <div className="border-[1px] border-[#C9C9C9] rounded-2xl mt-4 p-4">
        <p className="text-lg font-medium mb-3">Auto Withdrawal</p>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-gradient-to-r from-[rgba(255,255,255,0.25)] to-[rgba(52,199,89,0.25)] p-3 rounded-lg">
          <p className="text-sm text-gray-700">
            To start Auto withdrawal first add payout method or Connect
            Third-party Account
          </p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#06044B] transition-all duration-300"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
    );
}