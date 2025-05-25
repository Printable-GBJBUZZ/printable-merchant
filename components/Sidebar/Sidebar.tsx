import React from "react";
import SidebarLink from "@/components/SidebarLink/SidebarLink";
import Image from "next/image";
import DashboardIcon from "@/icons/Dashboard/DashboardIcon";
import OrderIcon from "@/icons/Order/OrderIcon";
import Marketplace from "@/icons/Marketplace/Marketplace";
import DocumentVaultIcon from "@/icons/DocumentVault/DocumentVaultIcon";
import ServicesPricingIcon from "@/icons/ServicesPricing/ServicesPricingIcon";
import EarningsWalletIcon from "@/icons/EarningsWallet/EarningsWalletIcon";
import ChatWithCustomersIcon from "@/icons/ChatWithCustomers/ChatWithCustomersIcon";
import Equipments from "@/icons/Equipments/Equipments";
import CustomSidebarCloseIcon from "@/icons/CustomSidebarClose/CustomSidebarCloseIcon";

const navbarlinks = [
    { title: "Dashboard", icon: <DashboardIcon className="w-5 h-5 flex-shrink-0" /> },
    { title: "Orders", icon: <OrderIcon className="w-5 h-5 flex-shrink-0" />, badge: 5 },
    { title: "Marketplace", icon: <Marketplace className="w-5 h-5 flex-shrink-0" /> },
    { title: "Document Vault", icon: <DocumentVaultIcon className="w-5 h-5 flex-shrink-0" /> },
    { title: "Services & Pricing", icon: <ServicesPricingIcon className="w-5 h-5 flex-shrink-0" /> },
    { title: "Earnings & Wallet", icon: <EarningsWalletIcon className="w-5 h-5 flex-shrink-0" /> },
    { title: "Chat with customers", icon: <ChatWithCustomersIcon className="w-5 h-5 flex-shrink-0" /> },
    { title: "Equipments", icon: <Equipments className="w-5 h-5 flex-shrink-0" /> },
];

export default function Sidebar() {
    return (
        <aside className="flex flex-col w-64 rounded-xl bg-white shadow-lg space-y-6 h-full">
            {/* Logo + Toggle */}
            <div className="h-16 w-full flex justify-between items-center rounded-t-xl bg-white px-4 py-3 border-b border-[#C9C9C9CC]">
                <div className="flex items-center">
                    <Image src="/logo.svg" height={43} width={36} alt="Printable Logo" />
                    <span className="ml-2 text-xl font-bold text-gray-800">Printable</span>
                </div>
                <button className="p-1 rounded hover:bg-gray-200">
                    <CustomSidebarCloseIcon />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
                {navbarlinks.map((link, index) => (
                    <SidebarLink icon={link.icon} label={link.title} badge={link.badge} key={link.title} />
                ))}
            </nav>

            {/* Support button */}
            {/* <div>
                <button
                    className="
            w-full flex items-center px-4 py-2 border border-gray-300
            rounded-lg text-gray-700 hover:bg-gray-100 transition-colors
          ">
                    <SupportIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <span>Support Center</span>
                </button>
            </div> */}
        </aside>
    );
}
