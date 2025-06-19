import { useState } from "react";
import PaymentMethodModal from './PaymentMethodModal';
import WalletBalanceCard from "./Blocks/WalletBalanceCard";
import LinkedPayoutAccount from "./Blocks/LinkedPayoutAccount";
import ThirdPartyAccount from "./Blocks/ThirdPartyAccount";
import AutoWithdrawal from "./Blocks/AutoWithdrawal";
import PayoutHistory from "./PayoutHistory";

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
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Wallet Balance Card */}
        <WalletBalanceCard />

        {/* Payment Methods Section */}
        <div className="w-full lg:w-2/3 rounded-2xl p-4 bg-white">
          <div className="space-y-2 mb-4">
            <p className="text-lg md:text-xl font-medium">Payment Method</p>
            <p className="text-sm text-gray-600">
              Manage Your Payout methods and withdrawal preferences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Linked Payout Account */}
            <LinkedPayoutAccount setIsModalOpen={setIsModalOpen} />

            {/* Third-party Accounts */}
            <ThirdPartyAccount />
          </div>

          {/* Auto Withdrawal */}
          <AutoWithdrawal />
        </div>
      </div>

      {/* Payout History */}
      <PayoutHistory />

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
