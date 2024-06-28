import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaksi = () => {
  const [purchases, setPurchases] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); // Set token from localStorage

    if (storedToken) {
      fetchPurchases(storedToken); // Call fetchPurchases with token
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

  const handleDeletePurchase = async (id_purchase) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/purchases/${id_purchase}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Refresh purchases after deletion
        fetchPurchases(token);
      }
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Daftar Pembelian</h2>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id_purchases} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{purchase.id_purchases}</td>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.id_order}</td>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.id_customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.method}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(purchase.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDeletePurchase(purchase.id_purchases)}
                  >
                    Hapus
                  </button>
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
