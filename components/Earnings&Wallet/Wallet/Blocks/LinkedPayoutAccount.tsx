import { PaymentMethodIcon } from "@/icons/EarningsWallet/PaymentMethodIcon";
import PlusIcon from "@/icons/EarningsWallet/PlusIcon";

interface LinkedPayoutAccountProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function LinkedPayoutAccount({ setIsModalOpen }: LinkedPayoutAccountProps) {
  return (
    <div className="border-[1px] border-[#C9C9C9] rounded-2xl px-4 pt-4 hover:bg-gradient-to-b hover:from-[rgba(255,255,255,0.25)] hover:to-[rgba(52,199,89,0.25)] transition-all duration-300">
      <p className="text-sm font-medium mb-4">Linked Payout Account</p>
      <div className="flex flex-col h-[200px] justify-between">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
          <PaymentMethodIcon />
          <p className="text-base font-medium">No payout method linked</p>
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
  );
}
