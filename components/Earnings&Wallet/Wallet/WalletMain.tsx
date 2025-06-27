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
      <>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          {/* Wallet Balance Card */}
          <div className="w-[476px]"> {/* Removed h-full to match payment section height */}
            <WalletBalanceCard />
          </div>

          {/* Payment Methods Section */}
          <div className="flex-1 rounded-[10px] bg-white">
            <div className="p-6">
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
        </div>

        {/* Payout History */}
        <div className="w-full h-[6%] text-[28px] pt-[30px]">
          Payout History
        </div>

        <div className="w-full rounded-[12px] mt-[8px] bg-white">
          <PayoutHistory />
        </div>

        <PaymentMethodModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </>
    );
}
