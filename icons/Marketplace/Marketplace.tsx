import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const Marketplace = ({ className }: IconProps) => {
    return (
        <svg
            className={className}
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M22 4.625V11.5H20.625V6.97754L12.375 15.2275L8.25 11.1025L0.999023 18.3428L0.0322266 17.376L8.25 9.14746L12.375 13.2725L19.6475 6H15.125V4.625H22Z"
                fill="black"
            />
        </svg>
    );
};

export default Marketplace;
