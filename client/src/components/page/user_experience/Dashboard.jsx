// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../../dashboard/Sidebar";
import Product from "../../dashboard/Product";
import Order from "../../dashboard/Order";
import Purchases from "../../dashboard/Purchases";
import Customer from "../../dashboard/Customer";
import Category from "../../dashboard/Category";
import OfficerTable from "../../dashboard/Officer"; // Menggunakan OfficerTable sesuai perubahan yang diminta
import Home from "./home";
import Unauthorized from "./Unauthorized";
import "./Dashboard.css"; // Import file CSS untuk styling dashboard

const Dashboard = () => {
  const [isBoss, setIsBoss] = useState(false);
  const [isOfficer, setIsOfficer] = useState(false);

  useEffect(() => {
    // Ambil nilai isBoss dan isOfficer dari localStorage
    const bossValue = localStorage.getItem("isBoss") === "true";
    const officerValue = localStorage.getItem("isOfficer") === "true";

    // Set state dengan nilai dari localStorage
    setIsBoss(bossValue);
    setIsOfficer(officerValue);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          {/* Rute yang hanya dapat diakses oleh isOfficer atau isBoss */}
          {isOfficer || isBoss ? (
            <>
            {isOfficer &&  <Route path="/list-product" element={<Product />} />  }
            {isOfficer &&  <Route path="/list-order" element={<Order />} /> }
            {isOfficer &&  <Route path="/list-customer" element={<Customer />} /> }
            {isOfficer &&  <Route path="/list-category" element={<Category />} /> }
              <Route path="/list-purchases" element={<Purchases />} />
            {isBoss &&  <Route path="/list-officer" element={<OfficerTable />} />  }
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/unauthorized" replace />} />
          )}

          {/* Halaman Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
