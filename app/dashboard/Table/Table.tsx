import React from "react";
import { PenBoxIcon, Printer, User } from "lucide-react";
import styles from "./Table.module.css";

const tableData = [
    {
        orderNo: "#ORD-7829",
        customer: { name: "Emma Thompson", email: "emma.t@example.com" },
        type: "Flyers",
        status: 0,
        dueDate: "Apr 21, 2025",
        requestStatus: undefined,
        amount: 120.0,
    },
    {
        orderNo: "#ORD-7829",
        customer: { name: "Emma Thompson", email: "emma.t@example.com" },
        type: "Business Cards",
        status: 1,
        dueDate: "Apr 20, 2025",
        requestStatus: true,
        amount: 245.0,
    },
    {
        orderNo: "#ORD-7829",
        customer: { name: "Emma Thompson", email: "emma.t@example.com" },
        type: "Brochures",
        status: 2,
        dueDate: "Apr 19, 2025",
        requestStatus: true,
        amount: 350.0,
    },
    {
        orderNo: "#ORD-7829",
        customer: { name: "Emma Thompson", email: "emma.t@example.com" },
        type: "Posters",
        status: 3,
        dueDate: "Apr 19, 2025",
        requestStatus: true,
        amount: 175.0,
    },
    {
        orderNo: "#ORD-7829",
        customer: { name: "Emma Thompson", email: "emma.t@example.com" },
        type: "Glossy Noice",
        status: 3,
        dueDate: "Apr 19, 2025",
        requestStatus: true,
        amount: 220.0,
    },
];

const Table = () => {
    return (
        <table className={styles.table}>
            <thead className="bg-gray-300">
                <tr>
                    <th className="font-normal">ORDER ID</th>
                    <th className="font-normal">CUSTOMER</th>
                    <th className="font-normal">TYPE</th>
                    <th className="font-normal">STATUS</th>
                    <th className="font-normal">DUE DATE</th>
                    <th className="font-normal">REQUEST STATUS</th>
                    <th className="font-normal">AMOUNT</th>
                    <th className="font-normal">ACTIONS</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((data, index) => (
                    <tr className="hover:bg-gray-50" key={index}>
                        <td className="text-sm text-center">{data.orderNo}</td>
                        <td className="text-sm text-center">
                            <div className="flex items-center justify-center gap-2">
                                <User />
                                <div className="flex flex-col items-start">
                                    <span>{data.customer.name}</span>
                                    <span>{data.customer.email}</span>
                                </div>
                            </div>
                        </td>
                        <td className="text-sm text-center">{data.type}</td>
                        <td className="text-sm text-center">
                            {data.status === 0 ? (
                                <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#007AFF26] text-[#007AFF]">
                                    New
                                </span>
                            ) : data.status === 1 ? (
                                <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#FFCC0026] text-[#FF9500]">
                                    In Progress
                                </span>
                            ) : data.status === 2 ? (
                                <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#34C75926] text-[#34C759]">
                                    Ready
                                </span>
                            ) : (
                                <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#AF52DE26] text-[#AF52DE]">
                                    Completed
                                </span>
                            )}
                        </td>
                        <td className="text-sm text-center">{data.dueDate}</td>
                        <td className="text-sm text-center">
                            <div className="flex gap-4 justify-center items-center">
                                {data.requestStatus === undefined ? (
                                    <>
                                        <button className="bg-[#34C759]/15 border border-[#34C759] rounded-4xl px-6 text-[#34C759]">
                                            Accept
                                        </button>
                                        <button className="bg-[#FF3B3026]/15 border border-[#FF2D55] rounded-4xl px-6 text-[#FF3B30]">
                                            Deny
                                        </button>
                                    </>
                                ) : data.requestStatus === true ? (
                                    <button className="bg-[#34C759]/15 border border-[#34C759] rounded-4xl px-6 text-[#34C759]">
                                        Accepted
                                    </button>
                                ) : (
                                    <button className="bg-[#FF3B3026]/15 border border-[#FF2D55] rounded-4xl px-6 text-[#FF3B30]">
                                        Denied
                                    </button>
                                )}
                            </div>
                        </td>
                        <td className="text-sm text-center">₹{data.amount}.00</td>
                        <td className="text-center">
                            <div className="flex items-center justify-center gap-3">
                                <button>
                                    <PenBoxIcon className="w-5 h-5" />
                                </button>
                                <button>
                                    <Printer className="w-5 h-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
