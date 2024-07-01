import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "../../css/user_experince/Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const ordersData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setOrders(ordersData);

        // Fetch all products related to the orders
        const productIds = [
          ...new Set(ordersData.map((order) => order.id_product)),
        ];
        const productRequests = productIds.map((id) =>
          axios.get(`http://localhost:5000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const productResponses = await Promise.all(productRequests);
        const productsData = productResponses.reduce((acc, res) => {
          acc[res.data.id_product] = res.data;
          return acc;
        }, {});

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching orders or products:", error);
        setError("Order Not Found");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Confirm that you have received the order!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I received it!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `http://localhost:5000/api/orders/${orderId}`,
          { status: true },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update status directly in local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id_order === orderId ? { ...order, status: true } : order
          )
        );

        Swal.fire({
          icon: "success",
          title: "Order Completed",
          text: "You have successfully confirmed the order!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error updating order status:", error);
        setError("Failed to update order status. Please try again later.");
      }
    }
  };

  if (loading) {
    return (
      <Container
        className="order-container d-flex justify-content-center align-items-center"
        id="order"
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Col xs={12} className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="order-container" id="order">
        <h1 className="title text-center mt-4">YOUR ORDERS</h1>
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm={8} md={6} className="text-center">
            <Card className="p-4">
              <h3>Error</h3>
              <p>{error}</p>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="order-container" id="order">
      <h2 className="title text-center mt-1 mb-2">Your Orders</h2>
      {orders.length > 0 ? (
        <Row className="order-list">
          {orders.map((order) => (
            <Col key={order.id_order} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Text>
                    <strong>Product Name:</strong>{" "}
                    {products[order.id_product]?.name_product || "Loading..."}
                  </Card.Text>
                  <Card.Text>
                    <strong>Quantity:</strong> {order.total_orders}
                  </Card.Text>
                  <Card.Text>
                    <strong>Total Cost:</strong> ${order.total_purchases}
                  </Card.Text>
                  <Card.Text>
                    <strong>Order Date:</strong> {order.order_date}
                  </Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>
                      Status: {order.status ? "Complete" : "In Shipping"}
                    </strong>
                  </ListGroup.Item>
                  {!order.status && (
                    <ListGroup.Item>
                      <Button
                        variant="success"
                        onClick={() => handleCompleteOrder(order.id_order)}
                      >
                        Received Order
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm={8} md={6} className="text-center">
            <Card className="p-4">
              <h3>No Orders Found</h3>
              <p>You do not have any orders yet.</p>
              <Button variant="primary" href="/produk">
                Start Shopping
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Order;
