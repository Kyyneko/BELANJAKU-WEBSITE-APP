// components/page/user_experience/Dashboard.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../dashboard/Sidebar";
import StokBarang from "../../dashboard/StokBarang";
import Pesanan from "../../dashboard/Pesanan";
import Transaksi from "../../dashboard/Transaksi";
import Pelanggan from "../../dashboard/Pelanggan";
import Category from "../../dashboard/Category";
import "./Dashboard.css"; // Import file CSS untuk styling dashboard

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/stok-barang" element={<StokBarang />} />
          <Route path="/pesanan" element={<Pesanan />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
