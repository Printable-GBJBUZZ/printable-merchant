import React, { useMemo, useState } from "react";
import { PenBoxIcon, Printer, User, Eye } from "lucide-react";
import { useOrder } from "@/contexts/orderContext";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import StatusDropdown from "./statusDropDown";
interface document {
  fileName: string;
  fileUrl: string;
}
interface TableDataProps {
  orderNo: string;
  customer: { name: string; email: string };
  type: string;
  status: string;
  amount: number;
  documents: document[] | [];
}

const Table = () => {
  const { order, updateOrder, loading } = useOrder();
  const router = useRouter();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: { isLoading: boolean; newStatus: string | null };
  }>({});

  const tableData: TableDataProps[] = useMemo(() => {
    if (!order || order.length === 0) return [];

    return order.map((items) => ({
      orderNo: items.id,
      customer: {
        name: items.userId ?? "Unknown",
        email: "No Email",
      },
      type: "Paper",
      status: items.status ?? "pending",
      amount: Number(items.totalAmount ?? 0),
      documents: items.documents.map((doc) => ({
        fileName: doc.fileName,
        fileUrl: doc.fileUrl,
      })),
    }));
  }, [order]);
  const handleDownload = (document: document[]) => {
    document.forEach(async (doc) => {
      const response = await fetch(doc.fileUrl, {
        method: "GET",
        headers: {
          Accept: "application/octet-stream",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;
      link.setAttribute("download", doc.fileName);
      window.document.body.appendChild(link);
      link.click();
    });
  };

  const handleOrderUpdate = async (orderId: string, status: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [orderId]: { isLoading: true, newStatus: status },
    }));
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
        toast.success(`Order updated to ${status}`);
      } else {
        toast.error("Failed to update order");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      updateOrder(orderId, { status });
      setLoadingStates((prev) => ({
        ...prev,
        [orderId]: { isLoading: false, newStatus: null },
      }));
    }
  };

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
              <tr key={index}>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>{data.orderNo}</span>
                    <button
                      onClick={() =>
                        router.push(`/orders-overview/${data.orderNo}`)
                      }
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
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
                  {data.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-full hover:bg-green-100 transition-colors flex items-center"
                        onClick={() =>
                          handleOrderUpdate(data.orderNo, "processing")
                        }
                        disabled={loadingStates[data.orderNo]?.isLoading}
                      >
                        Accept
                        {loadingStates[data.orderNo]?.isLoading &&
                          loadingStates[data.orderNo]?.newStatus ===
                            "processing" && (
                            <span className="inline-block w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin ml-2"></span>
                          )}
                      </button>
                      <button
                        className="px-3 py-1 border border-red-500 text-red-500 bg-red-50 rounded-full hover:bg-red-100 transition-colors flex items-center"
                        onClick={() =>
                          handleOrderUpdate(data.orderNo, "cancelled")
                        }
                        disabled={loadingStates[data.orderNo]?.isLoading}
                      >
                        Deny
                        {loadingStates[data.orderNo]?.isLoading &&
                          loadingStates[data.orderNo]?.newStatus ===
                            "cancelled" && (
                            <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin ml-2"></span>
                          )}
                      </button>
                    </div>
                  ) : data.status === "cancelled" ? (
                    <button className="px-3 py-1 text-red-500 opacity-75 cursor-not-allowed">
                      Denied
                    </button>
                  ) : (
                    <StatusDropdown
                      orderId={data.orderNo}
                      currentStatus={data.status}
                      onUpdate={handleOrderUpdate}
                      isLoading={
                        loadingStates[data.orderNo]?.isLoading || false
                      }
                      newStatus={loadingStates[data.orderNo]?.newStatus || null}
                    />
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  ₹{data.amount}.00
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <PenBoxIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => handleDownload(data.documents)}
                    >
                      <Printer className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
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
