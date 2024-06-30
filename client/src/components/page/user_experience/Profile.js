import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../../css/user_experince/Profile.css";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    address: "",
    email: "",
    hp: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      await axios.put(`/api/customers/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCustomerData(); // Fetch updated data after successful update
      handleClose(); // Close modal after update
    } catch (error) {
      console.error("Error updating customer profile:", error);
      // Handle error updating profile
    }
  };

  const handleEditProfile = () => {
    setFormData({
      username: customer.username || "",
      password: "",
      address: customer.address || "",
      email: customer.email || "",
      hp: customer.hp || "",
    });
    handleShow();
  };

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
            <button className="select-photo-button" onClick={handleEditProfile}>
              <BsPencilSquare /> Edit Profile
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

      {/* Modal for editing profile */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formHp">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="hp"
                value={formData.hp}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
