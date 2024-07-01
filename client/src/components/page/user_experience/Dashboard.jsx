import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../../dashboard/Sidebar";
import Product from "../../dashboard/Product";
import Order from "../../dashboard/Order";
import Purchases from "../../dashboard/Purchases";
import Customer from "../../dashboard/Customer";
import Category from "../../dashboard/Category";
import OfficerTable from "../../dashboard/Officer";
import Home from "./home";
import "./Dashboard.css";

const Dashboard = () => {
  const [isBoss, setIsBoss] = useState(false);
  const [isOfficer, setIsOfficer] = useState(false);

  useEffect(() => {
    const bossValue = localStorage.getItem("isBoss") === "true";
    const officerValue = localStorage.getItem("isOfficer") === "true";

    setIsBoss(bossValue);
    setIsOfficer(officerValue);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          {isOfficer || isBoss ? (
            <>
              {isOfficer && <Route path="/list-product" element={<Product />} />}
              {isOfficer && <Route path="/list-order" element={<Order />} />}
              {isOfficer && <Route path="/list-customer" element={<Customer />} />}
              {isOfficer && <Route path="/list-category" element={<Category />} />}
              <Route path="/list-purchases" element={<Purchases />} />
              {isBoss && <Route path="/list-officer" element={<OfficerTable />} />}
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
