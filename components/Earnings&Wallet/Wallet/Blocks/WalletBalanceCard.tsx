import EarningsWalletIcon from "@/icons/EarningsWallet/EarningsWalletIcon";
import IndiaIcon from "@/icons/EarningsWallet/IndiaIcon";
import DownloadButton from "@/icons/EarningsWallet/DownloadButton";

export default function WalletBalanceCard() {
  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#2563EB] via-[#34d399] to-[#34C759] p-6 relative overflow-hidden">
      {/* Glass effect overlay - adjusted opacity for better blend */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

      <div className="w-full max-w-sm mx-auto h-full flex flex-col relative">
        {/* Wallet Icon */}
        <div className="flex justify-center mt-[54px]">
          {" "}
          {/* Changed this line */}
          <div className="w-[120px] h-[120px] bg-[#FFFFFF80] backdrop-blur-md rounded-full flex items-center justify-center">
            <EarningsWalletIcon className="w-[50.25px] h-[51.46px] text-white" />
          </div>
        </div>

        {/* Balance Section and Amount*/}
        <div className="mt-[17px] text-center mb-[30px]">
          <p className="text-base font-medium text-white/90 mb-[30px]">
            Your Balance
          </p>
          <p className="text-[48px] lg:text-5xl font-bold text-white">
            ₹1,80,425
          </p>
        </div>

        {/* Country Indicator */}
        <div className="flex items-center justify-center gap-1 mb-[30px]">
          <IndiaIcon />
          <p className="text-base font-medium text-white">IND</p>
        </div>

        {/* Withdraw Button */}
        <button className="w-full py-3 rounded-full bg-[#34C759] hover:bg-[#34C759]/90 text-white flex items-center justify-center gap-2 group backdrop-blur-md bg-opacity-20 border border-white/20">
          <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
            <DownloadButton />
          </div>
          <span className="text-xl">Withdraw Earnings</span>
        </button>
      </div>
    </div>
  );
}
