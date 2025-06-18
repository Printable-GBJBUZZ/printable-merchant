"use client";

import { Printer } from "lucide-react";
import React, { useCallback, useState } from "react";
import PrintModal from "../PrintModal/PrintModal";

const TablePrintButton = () => {
	const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

	const handleClose = useCallback(() => {
		setIsPrintModalOpen(false);
	}, []);

	return (
		<>
			<button onClick={() => setIsPrintModalOpen(true)}>
				<Printer className="w-5 h-5" />
			</button>
			{isPrintModalOpen && <PrintModal handleClose={handleClose} />}
		</>
	);
};

export default TablePrintButton;
