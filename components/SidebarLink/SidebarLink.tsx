import React from "react";
import styles from "./styles.module.css";

type Link = {
    icon: any;
    label: string;
    href?: string;
    badge?: number;
    active?: boolean;
};

export default function SidebarLink({ icon, label, href, badge, active }: Link) {
    return (
        <a href={href} className={`${styles.sidebarLink} ${active ? "bg-[#CDCDDB] font-medium" : ""}`}>
            <div>{icon}</div>
            <span className="flex-1">{label}</span>
            {badge != null && <span className={styles.badge}>{badge}</span>}
        </a>
    );
}
