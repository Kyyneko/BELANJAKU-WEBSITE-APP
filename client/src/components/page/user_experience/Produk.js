import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Picture from "../../images/user_experience/ecommerce.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "../../css/user_experince/Produk.css";

const Produk = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/products",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProducts(response.data);
        } else {
          const response = await axios.get(
            "http://localhost:5000/api/guest/products"
          );
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    if (isLoggedIn) {
      setSelectedProduct(product);
      setShowModal(true);
    } else {
      setShowModal(true); // Menampilkan modal ketika tidak login
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleOrder = () => {
    if (localStorage.getItem("isOfficer") === "true") {
      Swal.fire({
        icon: "error",
        title: "Officer Tidak Dapat Melakukan Pemesanan",
        text: "Anda tidak diizinkan untuk melakukan pemesanan produk.",
      });
    } else {
      // Lakukan logika untuk melakukan pemesanan
      // Contoh: Mengirimkan pesanan ke backend
      console.log("Ordering product:", selectedProduct);
      // Setelah berhasil melakukan pemesanan, Anda dapat menutup modal atau melakukan tindakan lainnya
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="produk" id="produk">
      <Container>
        <h2 className="text-center my-4">All Products</h2>
        <Form.Control
          type="text"
          className="mb-4"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id_product}>
              <Card
                onClick={() => handleProductClick(product)}
                className="h-100 shadow"
              >
                <Card.Img variant="top" src={Picture} alt="Gambar produk" />

                <Card.Body>
                  <Card.Title>{product.name_product}</Card.Title>
                  <Card.Text>{product.description_product}</Card.Text>
                  <Card.Text>Cost: ${product.cost}</Card.Text>
                  <Card.Text>Stock: {product.stock}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary" block>
                    Order Now
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="social-icons2 text-center mt-4">
          <FaInstagram size={30} className="icon mx-2" />
          <FaFacebook size={30} className="icon mx-2" />
          <div className="line my-2"></div>
          <h3>Belanjaku</h3>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isLoggedIn ? "Order Product" : "You're Not Logged In"}
          </Modal.Title>
        </Modal.Header>
        {isLoggedIn && (
          <Modal.Body>
            {selectedProduct && (
              <div>
                <h3>{selectedProduct.name_product}</h3>
                <p>{selectedProduct.description_product}</p>
                <p>Cost: ${selectedProduct.cost}</p>
                <p>Stock: {selectedProduct.stock}</p>
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group controlId="formAddress" className="mt-3">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group controlId="formQuantity" className="mt-3">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Form>
              </div>
            )}
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isLoggedIn && (
            <Button variant="primary" onClick={handleOrder}>
              Order
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Produk;
