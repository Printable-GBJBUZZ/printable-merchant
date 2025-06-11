import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface StatusDropdownProps {
  orderId: string;
}

const StatusDropdown = React.memo(({ orderId }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newStatus, setNewStatus] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const wasLoadingRef = useRef(isLoading);

  // Fetch initial status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/order/${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          const data = await res.json();
          setCurrentStatus(data.status || "pending");
        } else {
          toast.error("Failed to fetch order status");
        }
      } catch (error) {
        toast.error("An error occurred while fetching status");
      }
    };

    fetchStatus();
  }, [orderId]);

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "approved":
        return { bg: "bg-green-100", text: "text-green-800" };
      case "pending":
        return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case "printing":
        return { bg: "bg-orange-100", text: "text-orange-800" };
      case "completed":
        return { bg: "bg-green-200", text: "text-green-900" };
      case "cancelled":
        return { bg: "bg-red-100", text: "text-red-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  const currentStyles = getStatusStyles(currentStatus);

  const handleOptionClick = async (status: string) => {
    if (isLoading) return;

    setIsLoading(true);
    setNewStatus(status);

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
        setCurrentStatus(status);
      } else {
        toast.error("Failed to update order");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
      setNewStatus(null);
    }
  };

  // Close dropdown only when loading transitions from true to false
  useEffect(() => {
    if (wasLoadingRef.current && !isLoading && isOpen) {
      setIsOpen(false);
    }
    wasLoadingRef.current = isLoading;
  }, [isLoading, isOpen]);

  // Do not render until status is fetched
  if (!currentStatus) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${currentStyles.bg} ${currentStyles.text} shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300`}
        disabled={isLoading}
      >
        {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
        <svg
          className="ml-2 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed z-10 mt-1 w-[25vh] bg-white shadow-lg rounded-md border border-gray-200">
          <ul className="py-1">
            <li className="flex items-center justify-between">
              <button
                onClick={() => handleOptionClick("Printing")}
                className="flex justify-between items-center text-left px-3 py-1 my-1 mx-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium hover:bg-orange-200"
                disabled={isLoading}
              >
                Printing
              </button>
              {isLoading && newStatus === "Printing" && (
                <span className="flex items-center mr-3 justify-center w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
              )}
            </li>
            <li className="flex items-center justify-between">
              <button
                onClick={() => handleOptionClick("Completed")}
                className="text-left px-3 py-1 my-1 mx-2 rounded-full bg-green-200 text-green-900 text-sm font-medium hover:bg-green-300"
                disabled={isLoading}
              >
                Completed
              </button>
              {isLoading && newStatus === "Completed" && (
                <span className="w-4 h-4 border-2 mr-3 border-green-500 border-t-transparent rounded-full animate-spin"></span>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
});

export default StatusDropdown;
