import { useState } from "react";
import RazorPayIcon from "@/icons/EarningsWallet/RazorPayIcon";
import StripeIcon from "@/icons/EarningsWallet/stripeIcon";
import PayPalIcon from "@/icons/EarningsWallet/PayPalIcon";

export default function ThirdPartyAccount() {
  // Move state hooks to the top level
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);

  const accounts = [
    { icon: <RazorPayIcon />, name: "Razorpay" },
    { icon: <StripeIcon />, name: "Stripe" },
    { icon: <PayPalIcon />, name: "PayPal" },
  ];

  const toggleConnection = (accountName: string) => {
    setConnectedAccounts((prev) =>
      prev.includes(accountName)
        ? prev.filter((name) => name !== accountName)
        : [...prev, accountName]
    );
  };

  return (
    <div className="border-[1px] border-[#C9C9C9] rounded-2xl p-4 hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.25)] hover:to-[rgba(52,199,89,0.25)] transition-all duration-300">
      <p className="text-sm font-medium mb-4">Connect Third-party Account</p>
      <div className="space-y-4">
        {accounts.map((option) => {
          const isRazorpay = option.name === "Razorpay";
          const isConnected = connectedAccounts.includes(option.name);
          const isHovered = hoveredAccount === option.name;

          return (
            <div
              key={option.name}
              className="flex flex-col justify-between items-center p-3 rounded-xl relative hover:bg-gray-50/50"
              onMouseEnter={() => isRazorpay && setHoveredAccount(option.name)}
              onMouseLeave={() => isRazorpay && setHoveredAccount(null)}
            >
              <div className="flex items-center gap-3 w-full justify-between">
                <div className="flex items-center gap-3">
                  {option.icon}
                  <p className="text-[20px] font-semibold">
                    {option.name}
                  </p>
                  {isRazorpay && isConnected && (
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (isRazorpay) {
                      toggleConnection(option.name);
                    }
                  }}
                  className="px-4 py-1.5 bg-[#06044B] text-white text-sm rounded-lg"
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </button>
              </div>
              {isRazorpay && isHovered && (
                <p className="text-xs text-blue-500 mt-2 text-center">
                  Enjoy Seamless Payments with Razorpay - now with 0% processing
                  fee
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}