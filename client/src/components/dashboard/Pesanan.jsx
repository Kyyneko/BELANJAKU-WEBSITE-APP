import React, { useState, useEffect } from "react";
import axios from "axios";

const Pesanan = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk menunjukkan status loading

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
      setLoading(false); // Setelah data terambil, loading di-set menjadi false
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false); // Jika terjadi error, tetap set loading menjadi false
    }
  };

  const getStatusText = (status) => {
    return status ? "Completed" : "In Shipping";
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Order</h2>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        {loading ? ( // Tampilkan spinner jika sedang loading
          <div className="flex items-center justify-center py-4">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.708 7.5H16m-5.373 14.373A8.001 8.001 0 014.5 11V6.292"
              ></path>
            </svg>
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Pemesanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pesanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pembelian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id_order}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id_customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id_product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.order_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.total_orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.total_purchases}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pesanan;
