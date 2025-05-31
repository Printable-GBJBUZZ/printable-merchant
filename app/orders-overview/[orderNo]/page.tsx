"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useOrder } from "@/contexts/orderContext";

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
  const { order } = useOrder();
  useEffect(() => {
    console.log(order);
  }, [order]);

  const [orderData, setOrderData] = useState<MerchantOrder | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

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
      imageSrc: doc.fileUrl || "https://via.placeholder.com/64",
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
          ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119064.90027594799!2d${order.longitude}!3d${order.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${order.city}%2C%20${order.state}!5e0!3m2!1sen!2sin!4v1747767266267!5m2!1sen!2sin`
          : "https://via.placeholder.com/408x270",
    }));
  };

  useEffect(() => {
    console.log("orderNo:", orderNo); // Debug: Log orderNo
    console.log("order:", order); // Debug: Log order array
    if (orderNo && order) {
      const foundOrder = order.find(
        (item: MerchantOrder) => item.id === orderNo,
      );
      console.log("foundOrder:", foundOrder); // Debug: Log found order
      if (foundOrder) {
        setOrderData(foundOrder);
        const documents = transformDocuments(foundOrder);
        console.log("documents:", documents); // Debug: Log transformed documents
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

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  if (!orderData || !selectedDocument) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#E6E7F0] p-6 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-black">Orders</h1>
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
              <div className="text-gray-700 text-sm mt-2 sm:mt-0">
                Order Date & Time:{" "}
                {new Date(orderData.createdAt).toLocaleString()}
              </div>
              <div className="flex space-x-2 ml-auto mt-3 sm:mt-0">
                <div className="text-[10px] font-semibold text-black bg-yellow-400 rounded-full px-3 py-1 flex items-center">
                  Priority: High
                </div>
                <div className="text-[10px] font-semibold text-[#a97fff] bg-[#f0e6ff] rounded-full px-3 py-1 flex items-center">
                  {orderData.status}
                </div>
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
                        <div className="p-2 bg-blue-500 text-white rounded w-38">
                          <a className=" text-white w-38" href={doc.fileUrl} download={doc.fileName}>Download Document</a>
                        </div>
                        <div className="text-[11px]">
                          Item No:{" "}
                          <span className="font-bold">{doc.itemNo}</span>
                        </div>>
                        <div className="text-[11px] text-gray-500">
                          Copies: {doc.copies}
                        </div>
                      </div>
                      <div className="ml-auto font-semibold text-[13px] flex items-center space-x-2">
                        <span>{doc.price}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check2-circle text-green-500"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                        </svg>
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
                      src="https://via.placeholder.com/40"
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
