import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Pesanan = () => {
  const [orders, setOrders] = useState([]);

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
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleProcessOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Berhasil diproses
        Swal.fire({
          icon: "success",
          title: "Pesanan Diproses",
          text: "Pesanan berhasil diproses.",
        });
        // Refresh data pesanan setelah proses berhasil
        fetchOrders();
      }
    } catch (error) {
      console.error("Error processing order:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Memproses Pesanan",
        text: "Terjadi kesalahan saat memproses pesanan.",
      });
    }
  };

  const handleCancelProcess = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Berhasil dibatalkan
        Swal.fire({
          icon: "success",
          title: "Pesanan Dibatalkan",
          text: "Pesanan berhasil dibatalkan.",
        });
        // Refresh data pesanan setelah pembatalan berhasil
        fetchOrders();
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Membatalkan Pesanan",
        text: "Terjadi kesalahan saat membatalkan pesanan.",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pesanan</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Pelanggan</th>
            <th>Nama Produk</th>
            <th>Tanggal Pemesanan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id_order}>
              <td>{order.id_customer}</td>
              <td>{order.product_name}</td>
              <td>{order.order_date}</td>
              <td>{order.status ? "Sudah Diproses" : "Menunggu Proses"}</td>
              <td>
                {!order.status && (
                  <>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleProcessOrder(order.id_order)}
                    >
                      Proses
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleCancelProcess(order.id_order)}
                    >
                      Batal
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Pesanan;
