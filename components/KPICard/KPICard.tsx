import React from "react";

const KPICard = ({ data }: { data: any }) => {
    return (
        <div className="relative bg-white rounded-xl p-6">
            {data.icon}

            <p className="text-xl font-medium text-gray-700">{data.title}</p>

            {/* Main stats */}
            <div className="mt-4 flex items-baseline space-x-2">
                <span className="text-4xl font-medium text-black">{data.todayValue}</span>
                <span className="flex items-center font-medium">
                    {data.isIncreasePercentage ? (
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.33333 12.8327V1.16602M7.33333 1.16602L1.5 6.99935M7.33333 1.16602L13.1667 6.99935"
                                stroke="#34C759"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.33333 12.8327V1.16602M7.33333 1.16602L1.5 6.99935M7.33333 1.16602L13.1667 6.99935"
                                stroke="#FF2D55"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}

                    <span className={data.isIncreasePercentage ? "text-[#34C759]" : "text-[#FF2D55]"}>12%</span>
                </span>
            </div>

            {/* Subtext */}
            <p className="mt-1 text-sm text-gray-500">{data.yesterdayValue}</p>
        </div>
    );
};

export default KPICard;
