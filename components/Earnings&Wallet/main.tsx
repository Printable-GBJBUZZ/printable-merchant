"use client"

import { useState } from "react";
import TopNavigation from "./TopNavigation";
import EarningsMain from "./Earnings/EarningsMain";
import WalletMain from "./Wallet/WalletMain";

function Main() {
    const [activeTab, setActiveTab] = useState<'earnings' | 'wallet'>('earnings');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleTabChange = (tab: 'earnings' | 'wallet') => {
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveTab(tab);
            setIsTransitioning(false);
        }, 150); 
    };

    return (
      <div className="w-full h-full flex flex-col">
        {/* top section */}
        <TopNavigation 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
        />

        <div className="flex-1 w-full rounded-[10px] mt-[15px]">
          <div className={`transition-opacity duration-150 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {activeTab === "earnings" ? <EarningsMain /> : <WalletMain />}
          </div>
        </div>
      </div>
    );
}

export default Main;
