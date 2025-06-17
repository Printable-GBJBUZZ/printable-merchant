"use client"

import { useState } from "react";
import TopNavigation from "./TopNavigation";
import EarningsMain from "./Earnings/EarningsMain";
import WalletMain from "./Wallet/WalletMain";

function Main() {
    const [activeTab, setActiveTab] = useState<'earnings' | 'wallet'>('earnings');

    return (
      <div className="w-full h-full flex flex-col">
        {/* top section */}
        <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 w-full rounded-[10px] mt-[15px]">
          {activeTab === "earnings" ? <EarningsMain /> : <WalletMain />}
        </div>
      </div>
    );
}

export default Main;
