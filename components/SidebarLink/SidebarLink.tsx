"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./SidebarLink.module.css";
import { ChevronDown, ChevronRight } from "lucide-react";

type ChildLink = {
	title: string;
	href: string;
};

type Link = {
	icon: React.ReactNode;
	title: string;
	href?: string;
	children?: ChildLink[];
};

export default function SidebarLink({ icon, title, href = "#", children }: Link) {
	const pathname = usePathname();
	const isChildActive = children?.some((child) => pathname.startsWith(child.href)) ?? false;
	const isActive = pathname === href || isChildActive;
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Update open state when path changes (optional, for dynamic routing)
		if (isChildActive) setIsOpen(true);
	}, [pathname]);

	// If has children → render dropdown toggle
	if (children && children.length > 0) {
		return (
			<div>
				<button
					className={`${styles.sidebarLink} ${isOpen ? "bg-[#CDCDDB] font-medium" : "hover:bg-gray-200"}`}
					onClick={() => setIsOpen(!isOpen)}>
					<div>{icon}</div>
					<span>{title}</span>
					<span className="ml-auto">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
				</button>
				{isOpen && (
					<div className="ml-8 p-2 border-l-2 border-gray-300 space-y-1">
						{children.map((child) => (
							<a
								key={child.title}
								href={child.href}
								className={`block text-base p-3.5 rounded-xl font-medium ${
									pathname === child.href
										? "bg-[#E8E7FE] text-black"
										: "text-[#555555] hover:bg-[#E8E7FE]"
								}`}>
								{child.title}
							</a>
						))}
					</div>
				)}
			</div>
		);
	}

	// Regular link
	return (
		<a
			href={href}
			className={`${styles.sidebarLink} ${isActive ? "bg-[#CDCDDB] font-medium" : "hover:bg-gray-200"}`}>
			<div className="flex-shrink-0">{icon}</div>
			<span className="flex-1 truncate">{title}</span>
		</a>
	);
}
