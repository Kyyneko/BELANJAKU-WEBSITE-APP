import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const isBoss = localStorage.getItem("isBoss") === "true";
  const isOfficer = localStorage.getItem("isOfficer") === "true";

  return (
    <div className="sidebar">
      <ul>
        {isBoss && (
          <>
            <li>
              <Link to="/dashboard/list-purchases">List Purchases</Link>
            </li>
            <li>
              <Link to="/dashboard/list-officer">List Officer</Link>
            </li>
          </>
        )}
        {isOfficer && (
          <>
            <li>
              <Link to="/dashboard/list-product">List Product</Link>
            </li>
            <li>
              <Link to="/dashboard/list-order">List Order</Link>
            </li>
            <li>
              <Link to="/dashboard/list-purchases">List Purchases</Link>
            </li>
            <li>
              <Link to="/dashboard/list-customer">List Customer</Link>
            </li>
            <li>
              <Link to="/dashboard/list-category">List Category Product</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
