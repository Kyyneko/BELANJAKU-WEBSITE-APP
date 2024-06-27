// components/dashboard/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard/stok-barang">Stok Barang</Link>
        </li>
        <li>
          <Link to="/dashboard/pesanan">Pesanan</Link>
        </li>
        <li>
          <Link to="/dashboard/transaksi">Transaksi</Link>
        </li>
        <li>
          <Link to="/dashboard/pelanggan">Pelanggan</Link>
        </li>
        <li>
          <Link to="/dashboard/category">Category</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
