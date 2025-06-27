"use client"
import { useState } from "react";
import OrdersSectionHeader from "./OrdersSectionHeader";
import Table from "./Table";
import TableHeader from "./TableHeader";

const initialData = [
  {
    orderId: "#ORD-7829",
    customerName: "Emma Thompson",
    email: "emma.t@example.com",
    jobType: "Business Cards",
    quantity: 500,
    dueDate: "Apr 21, 2025",
    status: "Printing",
    amount: "120.00",
  },
  {
    orderId: "#ORD-7828",
    customerName: "Emma Thompson",
    email: "emma.t@example.com",
    jobType: "Flyers",
    quantity: 1000,
    dueDate: "Apr 20, 2025",
    status: "New",
    amount: "245.00",
  },
  {
    orderId: "#ORD-7827",
    customerName: "Emma Thompson",
    email: "emma.t@example.com",
    jobType: "Brochures",
    quantity: 250,
    dueDate: "Apr 19, 2025",
    status: "Ready",
    amount: "350.00",
  },
  {
    orderId: "#ORD-7826",
    customerName: "Emma Thompson",
    email: "emma.t@example.com",
    jobType: "Posters",
    quantity: 50,
    dueDate: "Apr 19, 2025",
    status: "Completed",
    amount: "175.00",
  },
  {
    orderId: "#ORD-7825",
    customerName: "Emma Thompson",
    email: "emma.t@example.com",
    jobType: "Glossy Noice",
    quantity: 5,
    dueDate: "Apr 19, 2025",
    status: "Completed",
    amount: "220.00",
  },
];

export default function OrdersSection() {
  const [data, setData] = useState(initialData);

  // Sorting handler
  const handleSort = (type: "oldest" | "newest") => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return type === "oldest"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setData(sorted);
  };

  // Search handler
  const handleSearch = (value: string) => {
    if (!value) {
      setData(initialData);
      return;
    }
    const filtered = initialData.filter(
      (item) =>
        item.orderId.toLowerCase().includes(value.toLowerCase()) ||
        item.customerName.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  return (
    <div className="w-full h-full bg-[#FFFFFF] rounded-[12px] px-[33px] py-[27px]">
      {/* header */}
      <OrdersSectionHeader onSort={handleSort} onSearch={handleSearch} />

      {/* table */}
      <div>
        {/* table header */}
        <TableHeader />

        {/* //actual table */}
        <Table data={data} />
      </div>
    </div>
  );
}
