import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const CustomSidebarCloseIcon = ({ className }: IconProps) => {
    return (
        <svg
            width="32"
            className={className}
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6 16C6 12.2503 6 10.3754 6.95491 9.06107C7.26331 8.6366 7.6366 8.26331 8.06107 7.95491C9.3754 7 11.2503 7 15 7H17C20.7497 7 22.6246 7 23.9389 7.95491C24.3634 8.26331 24.7367 8.6366 25.0451 9.06107C26 10.3754 26 12.2503 26 16C26 19.7497 26 21.6246 25.0451 22.9389C24.7367 23.3634 24.3634 23.7367 23.9389 24.0451C22.6246 25 20.7497 25 17 25H15C11.2503 25 9.3754 25 8.06107 24.0451C7.6366 23.7367 7.26331 23.3634 6.95491 22.9389C6 21.6246 6 19.7497 6 16Z"
                stroke="#141B34"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path d="M13.5 7.5L13.5 24.5" stroke="#141B34" strokeWidth="1.8" strokeLinejoin="round" />
            <path
                d="M9 11C9 11 9.91421 11 10.5 11"
                stroke="#141B34"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M9 15H10.5" stroke="#141B34" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M21 14L19.7735 15.0572C19.2578 15.5016 19 15.7239 19 16C19 16.2761 19.2578 16.4984 19.7735 16.9428L21 18"
                stroke="#141B34"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CustomSidebarCloseIcon;
