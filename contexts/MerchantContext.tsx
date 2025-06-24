"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const MerchantContext = createContext<any>(undefined);

export const MerchantProvider = ({ children }: { children: ReactNode }) => {
	const { user, isLoaded } = useUser();
	const [merchant, setMerchant] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) {
			console.log("Fetch useEffect skipped: Clerk Initialization in Progress!");
			return;
		}

		if (!user || !user.id) {
			console.log("Fetch useEffect skipped: Clerk Login Required!");
			setIsLoading(false);
			return;
		}

		if (user.id) {
			const fetchShopDetails = async () => {
				try {
					const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/merchant/${user.id}`); // Your custom endpoint
					const data = await res.json();
					const finalData = data.data;

					if (data.success) {
						if (!finalData.shopName) {
							router.push("/onboarding/setup");
						} else {
							setMerchant(finalData);
						}
					} else {
						router.push("/onboarding/setup");
					}
				} catch (err) {
					console.error("Failed to fetch shop data", err);
				} finally {
					setIsLoading(false);
				}
			};

			fetchShopDetails();
		}
	}, [isLoaded, user, router]);

	return <MerchantContext.Provider value={{ merchant, isLoading }}>{children}</MerchantContext.Provider>;
};

export const useMerchant = () => {
	const context = useContext(MerchantContext);
	if (!context) {
		throw new Error("useMerchant must be used within a MerchantProvider");
	}

	return context;
};
