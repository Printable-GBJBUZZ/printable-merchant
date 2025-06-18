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

<<<<<<< HEAD
            <div className="w-[355px] h-[50px] rounded-[50px] flex flex-row border-[1px] border-[#C9C9C9] p-[5px]">
                <div 
                    onClick={() => setActiveTab('earnings')}
                    className={`w-1/2 h-full rounded-[50px] flex justify-center items-center text-base font-medium cursor-pointer
=======
            <div className="w-[355px] rounded-[50px] flex flex-row border-[1px] border-[#C9C9C9] p-[5px]">
                <div 
                    onClick={() => setActiveTab('earnings')}
                    className={`w-1/2 rounded-[50px] flex justify-center items-center text-base font-medium cursor-pointer
>>>>>>> 60a67ef022e6883d04c60bd63cc967e0fca9c6ee
                        ${activeTab === 'earnings' ? 'bg-white' : ''}`}
                >
                    Earnings
                </div>
                <div 
                    onClick={() => setActiveTab('wallet')}
<<<<<<< HEAD
                    className={`w-1/2 h-full rounded-[50px] flex justify-center items-center text-base font-medium cursor-pointer
=======
                    className={`w-1/2 rounded-[50px] flex justify-center items-center text-base font-medium cursor-pointer
>>>>>>> 60a67ef022e6883d04c60bd63cc967e0fca9c6ee
                        ${activeTab === 'wallet' ? 'bg-white' : ''}`}
                >
                    Wallet
                </div>
            </div>
        </div>
    );
}