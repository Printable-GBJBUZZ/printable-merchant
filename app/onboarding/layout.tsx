import { OnboardingProvider } from "@/contexts/OnboardingContext";
import Image from "next/image";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
	return (
		<OnboardingProvider>
			<div className="onboarding-layout">
				<div className="w-full max-w-6xl py-10 mx-auto">
					<div className="flex items-center gap-4">
						<Image
							src="/printable_logo.svg"
							height={51}
							width={59}
							alt="Printable Logo"
						/>
						<span className="brandName">Printable (Merchant)</span>
					</div>
				</div>
				<div>{children}</div>
			</div>
		</OnboardingProvider>
	);
}
