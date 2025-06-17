type TopNavigationProps = {
    activeTab: 'earnings' | 'wallet';
    setActiveTab: (tab: 'earnings' | 'wallet') => void;
}

export default function TopNavigation({ activeTab, setActiveTab }: TopNavigationProps) {
    return (
        <div className="w-full h-[6.4%] flex justify-between">
            <div className="w-[165px] flex justify-center items-center">
                <h1 className="text-[28px]">My Earnings</h1>
            </div>

            <div className="w-[355px] rounded-[50px] flex flex-row border-[1px] border-[#C9C9C9] p-[5px]">
                <div 
                    onClick={() => setActiveTab('earnings')}
                    className={`w-1/2 rounded-[50px] flex justify-center items-center text-base font-medium cursor-pointer
                        ${activeTab === 'earnings' ? 'bg-white' : ''}`}
                >
                    Earnings
                </div>
                <div 
                    onClick={() => setActiveTab('wallet')}
                    className={`w-1/2 rounded-[50px] flex justify-center items-center text-base font-medium cursor-pointer
                        ${activeTab === 'wallet' ? 'bg-white' : ''}`}
                >
                    Wallet
                </div>
            </div>
        </div>
    );
}