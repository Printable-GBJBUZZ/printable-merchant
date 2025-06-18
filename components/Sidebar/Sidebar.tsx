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
  { title: "Dashboard", icon: <DashboardIcon />, href: "" },
  { title: "Orders", icon: <OrderIcon />, href: "" },
  { title: "Marketplace", icon: <Marketplace />, href: "" },
  { title: "Document Vault", icon: <DocumentVaultIcon />, href: "" },
  { title: "Services & Pricing", icon: <ServicesPricingIcon />, href: "" },
  {
    title: "Earnings & Wallet",
    icon: <EarningsWalletIcon />,
    href: "earnings-wallet",
  },
  { title: "Chat with customers", icon: <ChatWithCustomersIcon />, href: "" },
  { title: "Equipments", icon: <Equipments />, href: "" },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-64 rounded-xl bg-white shadow-lg space-y-6 h-full">
      {/* Logo + Toggle */}
      <div className="h-16 w-full flex justify-between items-center rounded-t-xl bg-white px-4 py-3 border-b border-[#C9C9C9CC]">
        <div className="flex items-center">
          <Image src="/logo.svg" height={43} width={36} alt="Printable Logo" />
          <span className="ml-2 text-xl font-bold text-gray-800">
            Printable
          </span>
        </div>
        <button className="p-1 rounded hover:bg-gray-200">
          <CustomSidebarCloseIcon />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4">
        {navbarlinks.map((link, index) => (
          <SidebarLink {...link} key={link.title} />
        ))}
      </nav>
    </aside>
  );
}
