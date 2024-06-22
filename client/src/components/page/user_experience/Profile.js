import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import "../../css/user_experince/Profile.css";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCustomerData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`/api/customers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomer(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setLoading(false);
      if (error.response && error.response.status === 404) {
        setErrorMessage("Data not found");
      } else {
        setErrorMessage("Error fetching customer data");
      }
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className="profile-container">
      <h1 className="titleProfile">Your Profile</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="profile-content">
          <div className="profile-photo-placeholder">
            {customer && customer.photo ? (
              <img src={customer.photo} alt="Profile" />
            ) : (
              <span>No photo available</span>
            )}
          </div>
          <div className="profile-photo-section">
            <button className="select-photo-button">
              <BsPencilSquare /> Name :{" "}
              {customer ? customer.username : errorMessage}
            </button>
          </div>
        </div>
      )}
      <div className="social-icons4">
        <FaInstagram size={30} className="icon" />
        <FaFacebook size={30} className="icon" />
        <div className="line"></div>
        {!loading && customer ? (
          <div>
            <p>Name: {customer.username}</p>
            <p>Email: {customer.email}</p>
          </div>
        ) : (
          errorMessage && <p>{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
