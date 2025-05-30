import React, { useMemo } from "react";
import { PenBoxIcon, Printer, User } from "lucide-react";
import { useOrder } from "@/contexts/orderContext";

interface TableDataProps {
  orderNo: string;
  customer: { name: string; email: string };
  type: string;
  status: string;
  requestStatus?: string | null;
  amount: number;
}

const Table = () => {
  const { order } = useOrder();
  console.log(order);

  // Transform orders to table data using useMemo
  const tableData = useMemo(() => {
    if (!order || order.length === 0) return [];

    return order.map((items) => ({
      orderNo: items.id,
      customer: {
        name: items.name ?? items.userId ?? "Unknown",
        email: items.email ?? "No Email",
      },
      type: items.type ?? "Paper",
      status: items.status ?? "pending",
      dueDate: items.scheduledPrintTime ?? "not mentioned",
      requestStatus: items.state ?? null,
      amount: Number(items.totalAmount ?? 0),
    }));
  }, [order]);

  // Status background color mapping
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
            ORDER ID
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
            CUSTOMER
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
            TYPE
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
            STATUS
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
            REQUEST STATUS
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
            AMOUNT
          </th>
          <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {tableData.length > 0 ? (
          tableData.map((data, idx) => (
            <tr
              key={data.orderNo}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-4 text-sm text-gray-600">
                {data.orderNo}
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">{data.customer.name}</span>
                    <span className="text-gray-500">{data.customer.email}</span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">{data.type}</td>
              <td className="py-4 px-4 text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                    data.status
                  )}`}
                >
                  {data.status}
                </span>
              </td>
              <td className="py-4 px-4 text-sm">
                <div className="flex gap-2">
                  {data.requestStatus == null ? (
                    <>
                      <button className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-full hover:bg-green-100 transition-colors">
                        Accept
                      </button>
                      <button className="px-3 py-1 border border-red-500 text-red-500 bg-red-50 rounded-full hover:bg-red-100 transition-colors">
                        Deny
                      </button>
                    </>
                  ) : data.requestStatus ? (
                    <button className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-full opacity-75 cursor-not-allowed">
                      Accepted
                    </button>
                  ) : (
                    <button className="px-3 py-1 border border-red-500 text-red-500 bg-red-50 rounded-full opacity-75 cursor-not-allowed">
                      Denied
                    </button>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">
                ₹{data.amount}.00
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex justify-center gap-3">
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <PenBoxIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <Printer className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="py-4 px-4 text-center text-sm text-gray-500"
            >
              No orders available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
