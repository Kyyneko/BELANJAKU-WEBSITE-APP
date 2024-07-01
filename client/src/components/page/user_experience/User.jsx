import React from "react";
import { useNavigate } from "react-router-dom";
import Customers from "../../images/user_experience/customers.jpg";
import Admin from "../../images/user_experience/admin.jpg";
import "../../css/user_experince/User.css";

const User = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="user" id="user">
      <div className="container">
        <div className="content">
          <div className="card">
            <img src={Customers} alt="Customers" />
            <p>
              <span>Customers</span>
            </p>
            <p>
              If you are a shopper looking to browse and purchase products
              online, this option is for you. Join our community of customers
              and explore a wide range of products with ease.
            </p>
            <div className="button-container">
              <button className="btn login" onClick={navigateToLogin}>
                Log In
              </button>
              <button className="btn register" onClick={navigateToRegister}>
                Register
              </button>
            </div>
          </div>
          <div className="card">
            <img src={Admin} alt="Admin" />
            <p>
              <span>Admin</span>
            </p>
            <p>
              If you are the owner or manager of this online platform, select
              this option to manage and oversee operations. Admins have access
              to advanced features.
            </p>
            <div className="button-container">
              <button className="btn login" onClick={navigateToLogin}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
