import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const DocumentVaultIcon = ({ className }: IconProps) => {
    return (
        <svg
            className={className}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13 3.5L19 9.5V21.5H5V3.5H13Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M12.5 3.5V9H19" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default DocumentVaultIcon;
