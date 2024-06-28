import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Picture from "../../images/user_experience/ecommerce.jpg";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../css/user_experince/Produk.css";

const Produk = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

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
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setPaymentMethod("");
  };

  const handleOrder = async () => {
    if (!paymentMethod) {
      Swal.fire({
        icon: "error",
        title: "Pilih Metode Pembayaran",
        text: "Harap pilih metode pembayaran sebelum melanjutkan.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          id_customer: localStorage.getItem("userId"),
          id_product: selectedProduct.id_product,
          total_orders: 1,
          order_date: new Date().toISOString().slice(0, 10),
          total_purchases: selectedProduct.cost,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const orderId = response.data.id_order;
        await axios.post(
          "http://localhost:5000/api/purchases",
          {
            id_order: orderId,
            id_customer: localStorage.getItem("userId"),
            method: paymentMethod,
            date: new Date().toISOString().slice(0, 10),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await axios.patch(
          `http://localhost:5000/api/products/${selectedProduct.id_product}/reduce-stock`,
          {
            total_orders: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedProductResponse = await axios.get(
          `http://localhost:5000/api/products/${selectedProduct.id_product}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedProduct = updatedProductResponse.data;

        setProducts(
          products.map((p) =>
            p.id_product === updatedProduct.id_product ? updatedProduct : p
          )
        );

        Swal.fire({
          icon: "success",
          title: "Pesanan Berhasil",
          text: "Pesanan Anda berhasil dilakukan.",
        });

        setShowModal(false);
        setSelectedProduct(null);
        setPaymentMethod("");

        navigate("/order");
      }
    } catch (error) {
      console.error("Error ordering product:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Melakukan Pesanan",
        text: "Terjadi kesalahan saat melakukan pesanan.",
      });
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
                className="h-100 shadow-lg rounded-lg overflow-hidden"
              >
                <Card.Img variant="top" src={Picture} alt="Product image" />
                <Card.Body className="text-center">
                  <Card.Title>{product.name_product}</Card.Title>
                  <Card.Text>{product.description_product}</Card.Text>
                  <Card.Text className="font-semibold">
                    Cost: ${product.cost}
                  </Card.Text>
                  <Card.Text className="font-semibold">
                    Stock: {product.stock}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="block w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from closing
                      handleProductClick(product);
                    }}
                  >
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
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
                <p className="font-semibold">Cost: ${selectedProduct.cost}</p>
                <p className="font-semibold">Stock: {selectedProduct.stock}</p>
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group controlId="formAddress" className="mt-3">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group
                    controlId="formPaymentMethod"
                    className="mt-3 font-semibold"
                  >
                    <Form.Label>Payment Method:</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-primary"
                        id="dropdown-basic"
                        className="w-full"
                      >
                        {paymentMethod
                          ? paymentMethod
                          : "Select Payment Method"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setPaymentMethod("Gopay")}
                        >
                          Gopay
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setPaymentMethod("Dana")}>
                          Dana
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setPaymentMethod("Bank Transfer")}
                        >
                          Bank Transfer
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
