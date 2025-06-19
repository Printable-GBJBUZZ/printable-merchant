import EarningsWalletIcon from "@/icons/EarningsWallet/EarningsWalletIcon";
import { PaymentMethodIcon } from "@/icons/EarningsWallet/PaymentMethodIcon";
import RazorPayIcon from "@/icons/EarningsWallet/RazorPayIcon";
import StripeIcon from "@/icons/EarningsWallet/stripeIcon";
import PayPalIcon from "@/icons/EarningsWallet/PayPalIcon";
import IndiaIcon from "@/icons/EarningsWallet/IndiaIcon";
import DownloadButton from "@/icons/EarningsWallet/DownloadButton";
import PlusIcon from "@/icons/EarningsWallet/PlusIcon";
import { useState } from "react";
import PaymentMethodModal from './PaymentMethodModal';

export default function WalletMain() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSave = (data: any) => {
      // Handle your save logic here
      console.log("Saving payment method:", data);
    };
   const [isRazorpayConnected, setIsRazorpayConnected] = useState(false);
   const [isRazorpayHovered, setIsRazorpayHovered] = useState(false);
  
  return (
    <div className="p-4 md:p-5">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
        {/* Wallet Balance Card */}
        <div className="w-full lg:w-1/3 min-h-[500px] rounded-2xl bg-gradient-to-br from-[#06044B] via-[#32B86C] to-[#34C759] p-6 md:p-10 relative overflow-hidden">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl"></div>

          <div className="w-full max-w-sm mx-auto h-full flex flex-col relative">
            {/* Wallet Icon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <EarningsWalletIcon className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>

            {/* Balance Section */}
            <div className="mt-24 text-center space-y-2">
              <p className="text-base font-medium text-white/90">
                Your Balance
              </p>
            </div>

            {/* Amount */}
            <div className="flex-1 flex items-center justify-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                ₹1,80,425
              </p>
            </div>

            {/* Country Indicator */}
            <div className="flex items-center justify-center gap-1 mb-6">
              <IndiaIcon/>
              <p className="text-sm md:text-base font-medium text-white">IND</p>
            </div>

            {/* Withdraw Button */}
            <button className="w-full py-3 md:py-4 rounded-full bg-[#34C759] hover:bg-[#34C759]/90 text-white flex items-center justify-center gap-2 group backdrop-blur-md bg-opacity-20 border border-white/20">
              <div className="transform transition-all duration-700 ease-in-out group-hover:translate-y-[200%]">
                <DownloadButton/>
              </div>
              <span className="text-xl">Withdraw Earnings</span>
            </button>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="w-full lg:w-2/3 border rounded-2xl p-4 bg-white">
          <div className="space-y-2 mb-4">
            <p className="text-lg md:text-xl font-medium">Payment Method</p>
            <p className="text-sm text-gray-600">
              Manage Your Payout methods and withdrawal preferences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Linked Payout Account */}
            <div className="border rounded-2xl p-4 hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.25)] hover:to-[rgba(52,199,89,0.25)] transition-all duration-300">
              <p className="text-sm font-medium mb-4">Linked Payout Account</p>
              <div className="flex flex-col h-[200px] justify-between">
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                  <PaymentMethodIcon />
                  <p className="text-base font-medium">
                    No payout method linked
                  </p>
                  <p className="text-xs text-gray-700">
                    Link a bank account or UPI ID to receive your payouts
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2.5 bg-[#06044B] hover:bg-[#06044B]/90 text-white rounded-xl flex items-center justify-center gap-2 group transition-all duration-300"
                >
                  <div className="opacity-0 -translate-x-full scale-0 rotate-180 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:rotate-0">
                    <PlusIcon />
                  </div>
                  <span className="transition-all duration-500 group-hover:translate-x-1">
                    Add Payment Method
                  </span>
                </button>
              </div>
            </div>

            {/* Third-party Accounts */}
            <div className="border rounded-2xl p-4 hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.25)] hover:to-[rgba(52,199,89,0.25)] transition-all duration-300">
              <p className="text-sm font-medium mb-4">
                Connect Third-party Account
              </p>
              <div className="space-y-4">
                {[
                  { icon: <RazorPayIcon />, name: "Razorpay" },
                  { icon: <StripeIcon />, name: "Stripe" },
                  { icon: <PayPalIcon />, name: "PayPal" },
                ].map((option) => {
                  const isRazorpay = option.name === "Razorpay";
                  const [isConnected, setIsConnected] = useState(false);
                  const [hovered, setHovered] = useState(false);

                  return (
                    <div
                      key={option.name}
                      className="flex flex-col justify-between items-center p-3 rounded-xl relative hover:bg-gray-50/50"
                      onMouseEnter={() => isRazorpay && setHovered(true)}
                      onMouseLeave={() => isRazorpay && setHovered(false)}
                    >
                      <div className="flex items-center gap-3 w-full justify-between">
                        <div className="flex items-center gap-3">
                          {option.icon}
                          <p className="text-lg font-medium">{option.name}</p>
                          {isRazorpay && isConnected && (
                            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            if (isRazorpay) {
                              setIsConnected(!isConnected);
                            }
                          }}
                          className="px-4 py-1.5 bg-[#06044B] text-white text-sm rounded-lg"
                        >
                          {isRazorpay && isConnected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                      {isRazorpay && hovered && (
                        <p className="text-xs text-blue-500 mt-2 text-center">
                          Enjoy Seamless Payments with Razorpay - now with 0%
                          processing fee
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Auto Withdrawal */}
          <div className="border rounded-2xl mt-4 p-4">
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
        </div>
      </div>

      {/* Payout History */}
      <div className="mt-5">
        <div className="w-full border rounded-2xl bg-white p-4 min-h-[200px] flex flex-col">
          <p className="text-xl font-semibold mb-4">Payout History</p>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">No Data</p>
          </div>
        </div>
      </div>
      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
