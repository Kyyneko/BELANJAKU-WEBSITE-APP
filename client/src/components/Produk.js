import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "./Produk.css";

const Produk = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/guest/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Check if user is logged in by checking if JWT token is available in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    if (isLoggedIn) {
      setSelectedProduct(product);
      setShowModal(true);
    } else {
      alert("You need to be logged in to order a product");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="produk" id="produk">
      <div className="container2">
        <h2>All Products</h2>
        <input
          type="text"
          className="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="line"></span>
        <div className="content">
          {filteredProducts.map((product) => (
            <div
              className="card"
              key={product.id_product}
              onClick={() => handleProductClick(product)}
            >
              <h3>{product.name_product}</h3>
              <p>{product.description_product}</p>
              <p>Cost: ${product.cost}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))}
        </div>
        <div className="social-icons2">
          <FaInstagram size={30} className="icon" />
          <FaFacebook size={30} className="icon" />
          <div className="line"></div>
          <h3>Belanjaku</h3>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <h3>{selectedProduct.name_product}</h3>
              <p>{selectedProduct.description_product}</p>
              <p>Cost: ${selectedProduct.cost}</p>
              <p>Stock: {selectedProduct.stock}</p>
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Quantity:</label>
                  <input type="number" className="form-control" />
                </div>
              </form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Order</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Produk;
