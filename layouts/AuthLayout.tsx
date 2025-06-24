"use client";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useMerchant } from "@/contexts/MerchantContext";
import React, { ReactNode } from "react";

function FullPageSpinner() {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-dotted" />
		</div>
	);
}

const AuthLayout = ({ children }: { children: ReactNode }) => {
	const { merchant, isLoading } = useMerchant();

	if (isLoading) {
		return <FullPageSpinner />;
	}

	if (!isLoading && !merchant) {
		return children;
	}

	return (
		<div className="flex h-screen overflow-hidden gap-4 p-4 bg-[#E6E6ED]">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<Header />
				<main className="flex-1 overflow-auto mt-4 flex flex-col">{children}</main>
			</div>
		</div>
	);
};

export default AuthLayout;
