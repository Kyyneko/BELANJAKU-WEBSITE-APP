// Dashboard.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../dashboard/Sidebar";
import Product from "../../dashboard/Product";
import Order from "../../dashboard/Order";
import Purchases from "../../dashboard/Purchases";
import Customer from "../../dashboard/Customer";
import Category from "../../dashboard/Category";
import Officer from "../../dashboard/Officer"; // Ubah Officer menjadi OfficerTable sesuai komponen yang dibuat
import "./Dashboard.css"; // Import file CSS untuk styling dashboard

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/list-product" element={<Product />} />
          <Route path="/list-order" element={<Order />} />
          <Route path="/list-purchases" element={<Purchases />} />
          <Route path="/list-customer" element={<Customer />} />
          <Route path="/list-category" element={<Category />} />
          <Route path="/list-officer" element={<Officer />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
