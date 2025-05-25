import React from "react"; // Import React for React.ReactNode type

export default function ContinueButton({
  children, // Add children to props
  isDisabled,
  onClick,
}: {
  children: React.ReactNode; // Type for children (string, number, element, array, etc.)
  isDisabled: boolean;
  onClick: () => Promise<void> | void; // Allow for either synchronous or asynchronous
}) {
  return (
    <button
      type="button"
      className={`continueButton ${isDisabled ? "notAllowed" : "allowed"}`}
      disabled={isDisabled} // `disabled` prop directly accepts boolean
      onClick={onClick}
    >
      {children} {/* Render children here */}
    </button>
  );
}
