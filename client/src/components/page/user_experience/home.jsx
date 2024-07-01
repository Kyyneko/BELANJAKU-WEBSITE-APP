import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/user_experince/home.css";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen mt-3">
      <div className="custom-container py-12 mt-5">
        <Container className="text-center">
          <Row className="justify-center">
            <Col md={8}>
              <h1 className="text-4xl font-bold mt-4">Let's Shopping</h1>
              <p className="text-lg my-4">
                Welcome to our best shopping platform, where you can find a wide
                selection of the latest products at competitive prices and
                superior customer service. We're committed to providing an easy,
                fast and secure shopping experience, so you can find the device
                of your dreams in just a few clicks. Explore our constantly
                updated collection and enjoy exciting offers you can't miss.
              </p>
              <Link to="/about">
                <button className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2">
                  Explore Now
                </button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
