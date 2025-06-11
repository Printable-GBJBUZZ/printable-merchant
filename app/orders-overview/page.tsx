"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { useOrder } from "@/contexts/orderContext";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaDownload } from "react-icons/fa6";
import { Status } from "@/Components/Status/page";

const order = [ //Currently im using this mock data but in real data came from useOrderhook 
                //functionality already added all you need to use only useOrder hook
    {
      id: "order_001",
      userId: "user_123",
      merchantId: "merchant_456",
      status: "processing",
      totalAmount: 150.0,
      paymentMethod: "UPI",
      scheduledPrintTime: "2025-06-11T10:00:00Z",
      createdAt: "2025-06-10T09:00:00Z",
      updatedAt: "2025-06-10T09:30:00Z",
      fulfillmentType: "pickup",
      state: "Delhi",
      city: "New Delhi",
      address: "123 Main Street, Connaught Place",
      latitude: "28.6139",
      longitude: "77.2090",
      documents: [
        {
          fileName: "resume.pdf",
          fileUrl: "https://example.com/documents/resume.pdf",
          copies: 2,
          colorType: "black_and_white",
          paperType: "A4",
          printType: "front",
          pageDirection: "vertical",
        },

        {
          fileName: "project_report.xls",
          fileUrl: "https://example.com/documents/project_report.pptx",
          copies: 1,
          colorType: "color",
          paperType: "Letter",
          printType: "front_and_back",
          pageDirection: "horizontal",
        },
      ],
    },

  ]

const OrdersOverview: React.FC = () => {
  // Assuming useOrder hook gives you the orders

  // const { order } = useOrder();

  const router = useRouter();

  // Check if orders are available before accessing documents
  if (!order || !order[0] || !order[0].documents) {
    return <div>Loading...</div>; // Handle loading state if order or documents are not yet available
  }

  // Access documents from the first order
  const documents = order[0].documents;

  // State to track the selected document
  const [selectedDocument, setSelectedDocument] = useState(documents[0]);

  // Handler for clicking a document
  const handleDocumentClick = (doc: any) => {
    setSelectedDocument(doc);
  };

  //handle File Icon

  const getFileIcon = (fileName: string) => {
    // Get file extension
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return "/Images/PDF.png"; // Path to PDF icon
      case "xls":
      case "xlsx":
        return "/Images/XL.png"; // Path to Excel icon

      case "doc":
      case "docx":
        return "/Images/DOC.png"; // Path to Word icon
      case "ppt":
      case "pptx":
        return "/Images/POINT.png"; // Path to PowerPoint icon
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
        return "/Images/JPG.png"; // Path to Image icon
      default:
        return "/Images/JPG.png"; // Generic icon for other file types
    }
  };

  // Create a separate handler for download
  const handleDownload = (
    fileUrl: string,
    fileName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Prevent triggering the other click event for document selection

    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = fileUrl; // Set the URL for the file to download
    link.download = fileName; // Set the file name for the download
    link.click(); // Simulate a click event to trigger the download
  };

  return (
    <div className="bg-[#E6E7F0] p-6 min-h-screen">
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
              Order ID: #{order[0].id}
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
                Order ID: <span className="font-bold">#{order[0].id}</span>
              </div>
              <div className="hidden sm:block border-l border-gray-300 h-5 mx-4"></div>
              <div className="text-gray-700 text-sm mt-2 sm:mt-0">
                Order Date & Time:{" "}
                {new Date(order[0].createdAt).toLocaleString()}
              </div>
              <div className="flex space-x-2 ml-auto mt-3 sm:mt-0">
                <div className="text-[10px] font-semibold text-black bg-gray-500 rounded-full px-3 py-1 flex items-center">
                  <Status />
                </div>
                <div className="text-[10px] font-semibold text-black bg-yellow-400 rounded-full px-3 py-1 flex items-center">
                  Priority: High
                </div>

                <div className="text-[10px] font-semibold text-[#AF52DE] bg-[#AF52DE26] rounded-full px-3 py-1 flex items-center">
                  Ready for pickup
                </div>
              </div>
            </div>
            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side */}
              <div className="space-y-4">
                {/* Document cards */}
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 rounded-md p-4 max-w-full cursor-pointer ${
                      selectedDocument.fileName === doc.fileName
                        ? "bg-indigo-100"
                        : "bg-[#e6eaf3]"
                    }`}
                    onClick={() => handleDocumentClick(doc)}
                  >
                    <a
                      href={`/order-details/${doc.fileName}`}
                      className="flex items-center space-x-4 w-full"
                      onClick={(e) => e.preventDefault()} // Prevent navigation for demo
                    >
                      {/* File icon */}
                      <img
                        alt={doc.fileName}
                        className="w-16 h-16 rounded"
                        src={getFileIcon(doc.fileName)} // Use the function to determine which icon to show
                        width="64"
                        height="64"
                      />
                      <div className="text-xs text-gray-900 leading-tight">
                        <div className="font-semibold text-[13px]">
                          {doc.fileName}
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
                      alt="Emoji style avatar of a woman with pink headscarf and yellow top"
                      className="w-10 h-10 rounded"
                      src="https://storage.googleapis.com/a1aa/image/aebc22dc-dc01-4178-d55a-c9f4268f3b46.jpg"
                      width="40"
                      height="40"
                    />
                    <div className="text-[12px] text-gray-900">
                      <div className="font-semibold">
                        Emma Thompson{" "}
                        <span className="font-normal text-gray-500">
                          emma.t@example.com
                        </span>
                      </div>
                      <div className="text-gray-700 text-[11px]">
                        +91 845 684 2456
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
                        Print Type
                      </div>
                      <div className="text-[12px] text-black">
                        {selectedDocument.printType}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">
                        Orientation
                      </div>
                      <div className="text-[12px] text-black">
                        {selectedDocument.pageDirection}
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
                      <span>{order[0].totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%):</span>
                      <span>{(order[0].totalAmount * 0.08).toFixed(2)}</span>
                    </div>
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
              src={`https://www.google.com/maps?q=${order[0].latitude},${order[0].longitude}&hl=es;z=14&output=embed`}
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
