import React, { useMemo, useState } from "react";
import { PenBoxIcon, Printer, User } from "lucide-react";
import { MerchantOrder, useOrder } from "@/contexts/orderContext";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TableDataProps {
  orderNo: string;
  customer: { name: string; email: string };
  type: string;
  status: string;
  amount: number;
}

const Table = () => {
  const { order, updateOrder, loading } = useOrder(); // Added loading from context
  const router = useRouter();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  // Transform orders to table data using useMemo
  const tableData: TableDataProps[] = useMemo(() => {
    if (!order || order.length === 0) return [];

    return order.map((items) => ({
      orderNo: items.id,
      customer: {
        name: items.name ?? items.userId ?? "Unknown",
        email: items.email ?? "No Email",
      },
      type: items.type ?? "Paper",
      status: items.status ?? "pending",
      amount: Number(items.totalAmount ?? 0),
    }));
  }, [order]);

  const handleOrderUpdate = async (orderId: string, status: string) => {
    setLoadingStates((prev) => ({ ...prev, [`${orderId}-${status}`]: true }));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.status === 200) {
        toast.success(
          `Order ${status === "processing" ? "Accepted" : "Cancelled"}`
        );
      } else {
        console.log(res);
        toast.error("Failed to update order");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      updateOrder(orderId, { status });
      setLoadingStates((prev) => ({
        ...prev,
        [`${orderId}-${status}`]: false,
      }));
    }
  };

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

  // Render loading spinner if loading is true
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

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
            tableData.map((data, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => router.push(`/orders-overview/${data.orderNo}`)}
              >
                <td className="py-4 px-4 text-sm text-gray-600">
                  {data.orderNo}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <div className="flex flex-col">
                      <span className="font-medium">{data.customer.name}</span>
                      <span className="text-gray-500">
                        {data.customer.email}
                      </span>
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
                    {data.status === "pending" ? (
                      <>
                        <button
                          className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-full hover:bg-green-100 transition-colors flex items-center"
                          onClick={() =>
                            handleOrderUpdate(data.orderNo, "processing")
                          }
                          disabled={loadingStates[`${data.orderNo}-processing`]}
                        >
                          Accept
                          {loadingStates[`${data.orderNo}-processing`] && (
                            <span className="inline-block w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin ml-2"></span>
                          )}
                        </button>
                        <button
                          className="px-3 py-1 border border-red-500 text-red-500 bg-red-50 rounded-full hover:bg-red-100 transition-colors flex items-center"
                          onClick={() =>
                            handleOrderUpdate(data.orderNo, "cancelled")
                          }
                          disabled={loadingStates[`${data.orderNo}-cancelled`]}
                        >
                          Deny
                          {loadingStates[`${data.orderNo}-cancelled`] && (
                            <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin ml-2"></span>
                          )}
                        </button>
                      </>
                    ) : data.status !== "pending" &&
                      data.status !== "cancelled" ? (
                      <button className="px-3 py-1 text-green-500 opacity-75 cursor-not-allowed">
                        Accepted
                      </button>
                    ) : (
                      <button className="px-3 py-1 text-red-500 opacity-75 cursor-not-allowed">
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
    </div>
  );
};

export default Table;
