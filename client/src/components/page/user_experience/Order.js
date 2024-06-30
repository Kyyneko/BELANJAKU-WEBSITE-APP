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
        setError("Failed to fetch orders or products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
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
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status. Please try again later.");
    }
  };

  if (loading) {
    return (
      <Container className="order-container" id="order">
        <h1 className="title text-center mt-4">YOUR ORDERS</h1>
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm={8} md={6} className="text-center">
            <Card className="p-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Card>
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
      <h1 className="title text-center mt-4">YOUR ORDERS</h1>
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
                        Pesanan Diterima
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
              <h3>No orders found</h3>
              <p>You haven't placed any orders yet.</p>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Order;
