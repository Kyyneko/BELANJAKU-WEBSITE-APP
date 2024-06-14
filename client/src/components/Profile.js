import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import "./Profile.css";
import user from "./images/customers.jpg"

const Profile = () => {
  // State untuk menyimpan data customer
  const [customer, setCustomer] = useState(null);
  // State untuk menyimpan pesan dari backend jika data tidak ditemukan
  const [errorMessage, setErrorMessage] = useState("");
  // Ambil username dan email dari localStorage
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  // Efek samping untuk mengambil data customer saat komponen dimuat
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (token && userId) {
          const response = await axios.get(`/api/customers/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCustomer(response.data);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        // Mengatur pesan error jika data tidak ditemukan
        if (error.response && error.response.status === 404) {
          setErrorMessage("Data not found");
        } else {
          setErrorMessage("Error fetching customer data");
        }
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <div className="profile-container">
      <h1 className="titleProfile">Your Profile</h1>
      <div className="profile-content">
        <div className="profile-photo-placeholder">
          <img src={user} alt="Placeholder" />
        </div>
        <div className="profile-photo-section">
          {/* Menampilkan foto profil customer (jika ada) */}
          {customer && (
            <div className="profile-photo-icon">
              <img src={customer.photo} alt="Profile" />
            </div>
          )}
          <div className="dataprofil">
          <button className="select-photo-button">
            <BsPencilSquare /> 
          </button>
          <div className="profile-details">
            <div className="profile-detail">
              <strong>Name:</strong> {customer ? customer.username : username}
            </div>
            <div className="profile-detail">
              <strong>Email:</strong> {customer ? customer.email : email}
            </div>
            <div className="profile-detail">
              <strong>Address:</strong> {customer ? customer.address : " "}
            </div>
            <div className="profile-detail">
              <strong>Phone:</strong> {customer ? customer.phone : " "}
            </div>
          </div>
          
          </div>
        </div>
      </div>
      <div className="social-icons4">
        <FaInstagram size={30} className="icon" />
        <FaFacebook size={30} className="icon" />
        <div className="line"></div>
        {/* Menampilkan pesan error jika data tidak ditemukan dan username tidak ada */}
        {!customer && !username && errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Profile;
