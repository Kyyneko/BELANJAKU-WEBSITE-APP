import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaksi = () => {
  const [purchases, setPurchases] = useState([]);
  const [token, setToken] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); 

    if (storedToken) {
      fetchPurchases(storedToken);
    }
  }, []);

  const fetchPurchases = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/purchases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  const filterPurchases = (purchase) => {
    const purchaseDate = new Date(purchase.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set jam 00:00:00

    // Filter berdasarkan tanggal
    switch (filter) {
      case "day":
        return (
          purchaseDate.getDate() === today.getDate() &&
          purchaseDate.getMonth() === today.getMonth() &&
          purchaseDate.getFullYear() === today.getFullYear()
        );
      case "week":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return purchaseDate >= startOfWeek && purchaseDate <= endOfWeek;
      case "month":
        return (
          purchaseDate.getMonth() === today.getMonth() &&
          purchaseDate.getFullYear() === today.getFullYear()
        );
      case "last_month":
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        return purchaseDate >= startOfLastMonth && purchaseDate <= endOfLastMonth;
      case "year":
        return purchaseDate.getFullYear() === today.getFullYear();
      case "last_year":
        const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
        const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
        return purchaseDate >= startOfLastYear && purchaseDate <= endOfLastYear;
      case "all":
        return true;
      default:
        return true;
    }
  };

  // Fungsi untuk filter berdasarkan pencarian
  const filterBySearch = (purchase) => {
    return (
      purchase.id_purchases.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.method.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Purchases</h2>
      <div className="flex items-center mb-4">
        <span className="mr-2">Filter:</span>
        <select
          value={filter}
          onChange={handleChangeFilter}
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="all">All</option>
          <option value="day">This Day</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="last_month">Last Month</option>
          <option value="year">This Year</option>
          <option value="last_year">Last Year</option>
        </select>
        <input
          type="text"
          placeholder="Search by ID or Payment Method"
          value={searchQuery}
          onChange={handleChangeSearch}
          className="ml-4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Pembelian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metode Pembayaran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Pembelian
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases
              .filter(filterPurchases)
              .filter(filterBySearch)
              .map((purchase) => (
                <tr key={purchase.id_purchases} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.id_purchases}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.id_order}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.id_customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(purchase.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaksi;
