"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/contexts/orderContext";
import { FaArrowLeft, FaDownload } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import StatusDropdown from "@/Components/dashboard/statusDropDown";

interface DocumentDetails {
  fileName: string;
  fileUrl: string;
  copies: number;
  colorType: "black_and_white" | "color";
  paperType: "A4" | "Letter" | "Legal" | string;
  printType: "front" | "front_and_back";
  pageDirection: "vertical" | "horizontal";
}

interface MerchantOrder {
  id: string;
  userId: string;
  merchantId: string;
  status: "pending" | "processing" | "completed" | "cancelled" | string;
  totalAmount: number;
  paymentMethod:
    | "Credit Card"
    | "UPI"
    | "cash"
    | "paypal"
    | "net_banking"
    | string;
  scheduledPrintTime: string | null;
  createdAt: string;
  updatedAt: string;
  fulfillmentType: "delivery" | "pickup" | "takeaway" | string;
  state: string | null;
  city: string | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
  documents: DocumentDetails[];
}

interface Document extends DocumentDetails {
  id: number;
  itemNo: string;
  price: string;
  status: string;
  imageSrc: string;
  paymentDetails: {
    subtotal: string;
    pickupFee: string;
    tax: string;
    total: string;
  };
  mapSrc: string;
}

const OrdersOverview: React.FC = () => {
  const params = useParams();
  const orderNo = params.orderNo as string | null;
  const { order, updateOrder } = useOrder();
  const router = useRouter();
  console.log(order);

  const [orderData, setOrderData] = useState<MerchantOrder | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: { isLoading: boolean; newStatus: string | null };
  }>({});

  // File icon handler
  const getFileIcon = (fileName: string) => {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    switch (fileExtension) {
      case "pdf":
        return "/Images/PDF.png";
      case "xls":
      case "xlsx":
        return "/Images/XL.png";
      case "doc":
      case "docx":
        return "/Images/DOC.png";
      case "ppt":
      case "pptx":
        return "/Images/POINT.png";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
        return "/Images/JPG.png";
      default:
        return "/Images/JPG.png";
    }
  };

  // Transform MerchantOrder documents to Document format for UI
  const transformDocuments = (order: MerchantOrder): Document[] => {
    return order.documents.map((doc, index) => ({
      id: index + 1,
      fileName: doc.fileName,
      fileUrl: doc.fileUrl,
      copies: doc.copies,
      colorType: doc.colorType,
      paperType: doc.paperType,
      printType: doc.printType,
      pageDirection: doc.pageDirection,
      itemNo: `CNF${order.id}${index + 1}`,
      price: `₹ ${(doc.copies * 50).toFixed(2)}`,
      status: order.status,
      imageSrc: getFileIcon(doc.fileName),
      paymentDetails: {
        subtotal: `₹ ${(doc.copies * 50).toFixed(2)}`,
        pickupFee: order.fulfillmentType === "pickup" ? "₹ 0.00" : "₹ 50.00",
        tax: `₹ ${(doc.copies * 50 * 0.08).toFixed(2)}`,
        total: `₹ ${(
          doc.copies * 50 * 1.08 +
          (order.fulfillmentType === "pickup" ? 0 : 50)
        ).toFixed(2)}`,
      },
      mapSrc:
        order.latitude && order.longitude
          ? `https://www.google.com/maps?q=${order.latitude},${order.longitude}&hl=es;z=14&output=embed`
          : "https://via.placeholder.com/408x270",
    }));
  };

  useEffect(() => {
    if (orderNo && order) {
      const foundOrder = order.find(
        (item: MerchantOrder) => item.id === orderNo
      );
      if (foundOrder) {
        setOrderData(foundOrder);
        const documents = transformDocuments(foundOrder);
        if (documents.length > 0) {
          setSelectedDocument(documents[0]);
        } else {
          setError("No documents found for this order.");
        }
      } else {
        setError("Order not found.");
      }
    } else if (!order || order.length === 0) {
      setError("No orders available.");
    }
  }, [orderNo, order]);

  // Handler for clicking a document
  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc);
  };

  // Download handler
  const handleDownload = (
    fileUrl: string,
    fileName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  // Order update handler
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
          body: JSON.stringify({ status: status.toLowerCase() }),
        }
      );

      if (res.status === 200) {
        toast.success(`Order updated to ${status}`);
        updateOrder(orderId, { status });
        setOrderData((prev) => (prev ? { ...prev, status } : null));
      } else {
        toast.error("Failed to update order");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [orderId]: { isLoading: false, newStatus: null },
      }));
    }
  };

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  if (!orderData || !selectedDocument) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#E6E7F0] p-6 min-h-screen">
      <ToastContainer />
      <div className="mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center justify-center">
            <FaArrowLeft
              size={20}
              className="text-black hover:cursor-pointer"
              onClick={() => router.push("/")}
            />
            <h1 className="text-xl font-semibold text-black">Orders</h1>
          </div>
          <p className="text-sm text-gray-600">
            Orders /{" "}
            <span className="text-[#06044B] font-semibold">
              Order ID: #{orderData.id}
            </span>
          </p>
        </header>

        {/* Main Content */}
        <main className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div
            className="max-w-5xl col-end-9 bg-white rounded-lg p-6 space-y-6"
            style={{ width: "1000px" }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 border-b border-gray-300 pb-3">
              <div className="text-black text-base font-semibold">
                Order ID: <span className="font-bold">#{orderData.id}</span>
              </div>
              <div className="hidden sm:block border-l border-gray-300 h-5 mx-4"></div>
              <div className="flex flex-col text-gray-700 text-sm mt-2 sm:mt-0">
                <span>Order Date & Time</span>
                <span>
                  {new Date(orderData.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex space-x-2 ml-auto mt-3 sm:mt-0">
                {orderData.status === "pending" ? (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-full hover:bg-green-100 transition-colors flex items-center text-[10px] font-semibold"
                      onClick={() => handleOrderUpdate(orderData.id, "Queued")}
                      disabled={loadingStates[orderData.id]?.isLoading}
                    >
                      Accept
                      {loadingStates[orderData.id]?.isLoading &&
                        loadingStates[orderData.id]?.newStatus === "Queued" && (
                          <span className="inline-block w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin ml-2"></span>
                        )}
                    </button>
                    <button
                      className="px-3 py-1 border border-red-500 text-red-500 bg-red-50 rounded-full hover:bg-red-100 transition-colors flex items-center text-[10px] font-semibold"
                      onClick={() =>
                        handleOrderUpdate(orderData.id, "Cancelled")
                      }
                      disabled={loadingStates[orderData.id]?.isLoading}
                    >
                      Deny
                      {loadingStates[orderData.id]?.isLoading &&
                        loadingStates[orderData.id]?.newStatus ===
                          "cancelled" && (
                          <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin ml-2"></span>
                        )}
                    </button>
                  </div>
                ) : orderData.status === "cancelled" ? (
                  <button className="px-3 py-1 text-red-500 opacity-75 cursor-not-allowed text-[10px] font-semibold">
                    Denied
                  </button>
                ) : (
                  <StatusDropdown orderId={orderData.id} />
                )}
              </div>
            </div>
            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side */}
              <div className="space-y-4">
                {/* Document cards */}
                {transformDocuments(orderData).map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex items-center space-x-4 rounded-md p-4 max-w-full cursor-pointer ${
                      selectedDocument.id === doc.id
                        ? "bg-indigo-100"
                        : "bg-[#e6eaf3]"
                    }`}
                    onClick={() => handleDocumentClick(doc)}
                  >
                    <a
                      href={`/order-details/${doc.id}`}
                      className="flex items-center space-x-4 w-full"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt={doc.fileName}
                        className="w-16 h-16 rounded"
                        src={doc.imageSrc}
                        width="64"
                        height="64"
                      />
                      <div className="text-xs text-gray-900 leading-tight">
                        <div className="font-semibold text-[13px]">
                          {doc.fileName}
                        </div>
                        <div className="text-[11px]">
                          Item No:{" "}
                          <span className="font-bold">{doc.itemNo}</span>
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Copies: {doc.copies}
                        </div>
                      </div>
                      <div className="ml-auto flex justify-end items-center">
                        <FaDownload
                          size={20}
                          onClick={(e) =>
                            handleDownload(doc.fileUrl, doc.fileName, e)
                          }
                        />
                      </div>
                    </a>
                  </div>
                ))}
                {/* Customer Information */}
                <div className="border border-gray-300 rounded-md p-3 max-w-full">
                  <div className="flex items-center space-x-2 mb-3 text-[13px] font-semibold text-gray-900">
                    <i className="fa-regular fa-user"></i>
                    <span>Customer Information</span>
                  </div>
                  <hr className="border-gray-300 mb-3" />
                  <div className="flex items-center space-x-3">
                    <img
                      alt="Customer avatar"
                      className="w-10 h-10 rounded"
                      src="https://storage.googleapis.com/a1aa/image/aebc22dc-dc01-4178-d55a-c9f4268f3b46.jpg"
                      width="40"
                      height="40"
                    />
                    <div className="text-[12px] text-gray-900">
                      <div className="font-semibold">
                        Customer ID: {orderData.userId}
                      </div>
                      <div className="text-gray-700 text-[11px]">
                        Contact info not available
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right side */}
              <div className="space-y-4">
                {/* Print options */}
                <div className="border border-gray-300 rounded-md p-4 max-w-full">
                  <div className="flex items-center space-x-2 mb-3 text-[13px] font-semibold text-gray-900">
                    <i className="fas fa-print"></i>
                    <span>Print options</span>
                  </div>
                  <hr className="border-gray-300 mb-3" />
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-gray-700">
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Copies</div>
                      <div className="text-[12px] text-black">
                        {selectedDocument.copies}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">
                        Paper Size
                      </div>
                      <div className="text-[12px] text-black">
                        {selectedDocument.paperType}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">
                        Paper type
                      </div>
                      <div className="text-[12px] text-black">
                        {selectedDocument.paperType}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">
                        Print Type
                      </div>
                      <div className="text-[12px] text-black">
                        {selectedDocument.colorType === "color"
                          ? "Color"
                          : "Black & White"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">
                        Orientation
                      </div>
                      <div className="text-[12px] text-black">
                        {selectedDocument.pageDirection === "vertical"
                          ? "Portrait"
                          : "Landscape"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">
                        Fulfillment
                      </div>
                      <div>
                        <strong>{orderData.fulfillmentType}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Duplex</div>
                      <div className="text-[12px] text-black">
                        {selectedDocument.printType === "front"
                          ? "One-Sided"
                          : "Two-Sided"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Collate</div>
                      <div>
                        <strong>Yes</strong>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Quality</div>
                      <div>
                        <strong>High Quality</strong>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Staple</div>
                      <div>
                        <strong>Yes</strong>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Scaling</div>
                      <div>
                        <strong>100%</strong>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Payment Details */}
                <div className="border border-gray-300 rounded-md p-4 max-w-full">
                  <div className="flex items-center space-x-2 mb-3 text-[13px] font-semibold text-gray-900">
                    <i className="fa-regular fa-credit-card"></i>
                    <span>Payment Details</span>
                  </div>
                  <hr className="border-gray-300 mb-3" />
                  <div className="text-[11px] text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{selectedDocument.paymentDetails.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pickup fee:</span>
                      <span>{selectedDocument.paymentDetails.pickupFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%):</span>
                      <span>{selectedDocument.paymentDetails.tax}</span>
                    </div>
                  </div>
                  <hr className="my-3 border-gray-300" />
                  <div className="flex justify-between font-semibold text-[13px] text-gray-900">
                    <span>Total:</span>
                    <span>{selectedDocument.paymentDetails.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <section className="flex-1 max-w-[480px] bg-white rounded-lg border border-gray-300 p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-map"></i>
                <p className="text-sm font-semibold text-gray-700">
                  Track Delivery
                </p>
              </div>
            </div>
            <hr className="border-gray-300 mb-4" />
            <iframe
              src={selectedDocument.mapSrc}
              style={{
                width: "408px",
                height: "270px",
                borderRadius: "10px",
                position: "relative",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OrdersOverview;
