"use client";

import React from "react";
import styles from "./SidebarLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Link = {
	icon: any;
	title: string;
	href: string;
};

export default function SidebarLink({ icon, title, href }: Link) {
	const pathName = usePathname();
	const isActive = pathName === href;

	return (
		<Link
			href={href}
			className={`${styles.sidebarLink} ${isActive ? "bg-[#CDCDDB] font-medium" : "hover:bg-gray-200"}`}>
			<div>{icon}</div>
			<span className="flex-1">{title}</span>
		</Link>
	);
}
