import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const OrderIcon = ({ className }: IconProps) => {
    return (
        <svg
            className={className}
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="2.5" width="14" height="18" rx="4" stroke="#555555" strokeWidth="1.5" />
            <path d="M8 6.5H14" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 11.5H14" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 16.5H10" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default OrderIcon;
