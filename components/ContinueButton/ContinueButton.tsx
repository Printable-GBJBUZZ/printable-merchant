export default function ContinueButton({ isDisabled, onClick }: { isDisabled: boolean; onClick: () => void }) {
	return (
		<button
			type="button"
			className={`continueButton ${isDisabled ? "notAllowed" : "allowed"}`}
			disabled={isDisabled ? true : false}
			onClick={onClick}>
			Continue
		</button>
	);
}
