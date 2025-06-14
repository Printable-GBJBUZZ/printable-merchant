"use client";

import React from "react";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

type Link = {
	icon: any;
	label: string;
	href?: string;
	badge?: number;
	active?: boolean;
};

export default function SidebarLink({ icon, label, href, badge, active }: Link) {
	const pathName = usePathname();

	return (
		<a
			href={href}
			className={`${styles.sidebarLink} ${pathName === href ? "bg-[#CDCDDB] font-medium" : "hover:bg-gray-200"}`}>
			<div>{icon}</div>
			<span className="flex-1">{label}</span>
			{badge != null && <span className={styles.badge}>{badge}</span>}
		</a>
	);
}
