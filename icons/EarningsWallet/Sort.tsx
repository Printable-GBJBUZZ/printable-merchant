type SortProps = {
  strokeValue: string,
}

export default function Sort({strokeValue}: SortProps) {
  return (
    <svg
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 1.5V17.5M15.75 17.5L11.75 13.5M15.75 17.5L19.75 13.5M5.75 17.5V1.5M5.75 1.5L1.75 5.5M5.75 1.5L9.75 5.5"
        stroke={strokeValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
