import { useState } from "react";
import CloseCross from "@/icons/EarningsWallet/CloseCross";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function PaymentMethodModal({
  isOpen,
  onClose,
  onSave,
}: PaymentMethodModalProps) {
  const [paymentType, setPaymentType] = useState<"bank" | "upi">("bank");
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    upiId: "",
  });

  if (!isOpen) return null;

  const banks = [
    { id: "sbi", name: "State Bank of India (SBI)" },
    { id: "hdfc", name: "HDFC Bank" },
    { id: "icici", name: "ICICI Bank" },
    { id: "axis", name: "Axis Bank" },
    { id: "baroda", name: "Baroda Bank" },
  ];

  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred dark background */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[4px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2">
        <div className="bg-[#FFFFFF59] backdrop-blur-[96px] rounded-2xl shadow-2xl p-6 m-4 border border-[#D0D0D0]">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-black">
                Add Payout Method
              </h2>
              <p className="text-sm text-black mt-1">
                Add a bank account or UPI ID to receive your payouts.
              </p>
            </div>
            <div
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E6E6E6] transition-colors cursor-pointer"
            >
              <CloseCross />
            </div>
          </div>

          {/* Payment Type Selector */}
          <div className="flex p-1 mt-4 mb-6 rounded-[50px] border-[1px] border-[#555555]">
            <button
              className={`flex-1 py-2 px-4 rounded-[50px] text-sm font-medium transition-all ${
                paymentType === "bank"
                  ? "bg-[#06044B] text-white"
                  : "text-black"
              }`}
              onClick={() => setPaymentType("bank")}
            >
              Bank Account
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-[50px]   text-sm font-medium transition-all ${
                paymentType === "upi" ? "bg-[#06044B] text-white" : "text-black"
              }`}
              onClick={() => setPaymentType("upi")}
            >
              UPI ID
            </button>
          </div>

          {/* Conditional Form Fields */}
          {paymentType === "bank" ? (
            // Bank Account Form
            <div className="space-y-4 text-black">
              <div>
                <label className="block text-base font-medium mb-1 text-black">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  placeholder="Enter account holder name"
                  className="w-full p-3 rounded-[10px] bg-[#FFFFFF] placeholder-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-[#06044B]/20 focus:border-[#06044B]"
                  value={formData.accountHolderName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      accountHolderName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-1 text-black">
                  Bank Name
                </label>
                <select
                  className="w-full p-3 rounded-[10px] bg-[#FFFFFF] text-black focus:outline-none focus:ring-2 focus:ring-[#06044B]/20 focus:border-[#06044B]"
                  value={formData.bankName}
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                >
                  <option value="" className="text-[#555555]">
                    Select your Bank
                  </option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-base font-medium mb-1 text-black">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter account number"
                  className="w-full p-3 rounded-[10px] bg-[#FFFFFF] placeholder-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-[#06044B]/20 focus:border-[#06044B]"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-1 text-black">
                  Confirm Account Number
                </label>
                <input
                  type="text"
                  placeholder="Re-enter account number"
                  className="w-full p-3 rounded-[10px] bg-[#FFFFFF] placeholder-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-[#06044B]/20 focus:border-[#06044B]"
                  value={formData.confirmAccountNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmAccountNumber: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-1 text-black">
                  IFSC Code
                </label>
                <input
                  type="text"
                  placeholder="Enter IFSC Code"
                  className="w-full p-3 rounded-[10px] bg-[#FFFFFF] placeholder-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-[#06044B]/20 focus:border-[#06044B]"
                  value={formData.ifscCode}
                  onChange={(e) =>
                    setFormData({ ...formData, ifscCode: e.target.value })
                  }
                />
              </div>
            </div>
          ) : (
            // UPI Form
            <div className="space-y-4 text-black">
              <div className="bg-[#FFFFFF] rounded-[10px] p-4 flex items-start gap-3">
                <span className="inline-block w-6 h-6 rounded-full border border-blue-600 text-blue-600 text-center leading-6">
                  i
                </span>
                <p className="text-lg text-blue-600">
                  Enter your UPI ID to receive payments directly to your bank
                  account.
                </p>
              </div>

              <div>
                <label className="block text-base font-medium mb-1 text-black">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@okhdfc"
                  className="w-full p-3 rounded-[10px] bg-[#FFFFFF] placeholder-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-[#06044B]/20 focus:border-[#06044B]"
                  value={formData.upiId}
                  onChange={(e) =>
                    setFormData({ ...formData, upiId: e.target.value })
                  }
                />
                <p className="text-sm text-gray-600 mt-1">
                  Enter your UPI ID in the format: username@bankname
                </p>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="w-full mt-6 py-3 bg-[#06044B] text-white rounded-[10px] hover:bg-[#06044B]/90 transition-colors"
          >
            Save & Link
          </button>
        </div>
      </div>
    </div>
  );
}
