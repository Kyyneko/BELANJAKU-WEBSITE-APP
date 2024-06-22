import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "../../css/user_experince/Order.css"; // Pastikan file CSS ini di-import

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/orders/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched Orders:", response.data);
        setOrders([response.data]); // Pastikan respons berbentuk array
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="order-container" id="order">
      <h1 className="title text-center mt-4">YOUR ORDERS</h1>
      {orders.length > 0 ? (
        <Row className="order-list">
          {orders.map((order) => (
            <Col key={order.id_order} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Order ID: {order.id_order}</Card.Title>
                  <Card.Text>Product Name: {order.product_name}</Card.Text>
                  <Card.Text>Quantity: {order.total_orders}</Card.Text>
                  <Card.Text>Total Cost: ${order.total_purchases}</Card.Text>
                  <Card.Text>Order Date: {order.order_date}</Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Status:</strong>{" "}
                    {order.status ? "Completed" : "Pending"}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm={8} md={6} className="text-center">
            <Card className="p-4">
              <h3>No orders found</h3>
              <p>You haven't placed any orders yet.</p>
            </Card>
          </Col>
        </Row>
      )}
      <div className="social-icon text-center mt-4">
        <FaInstagram size={30} className="icon mx-2" />
        <FaFacebook size={30} className="icon mx-2" />
        <div className="line my-2"></div>
        <h3>Belanjaku</h3>
      </div>
    </Container>
  );
};

export default Order;
