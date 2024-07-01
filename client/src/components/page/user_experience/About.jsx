import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../css/user_experince/About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-section py-5" id="about">
      <Container>
        <Row className="justify-content-center align-items-center text-center">
          <Col md={8}>
            <h2 className="mb-4">WELCOME TO MARKETPLACE BELANJAKUU</h2>
            <p className="lead mb-4">
              Welcome to our best shopping platform, where you can find a wide
              selection of the latest products at competitive prices and
              superior customer service. We're committed to providing an easy,
              fast and secure shopping experience, so you can find the device of
              your dreams in just a few clicks. Explore our constantly updated
              collection and enjoy exciting offers you can't miss.
            </p>
            <Link to="/Produk">
              <Button variant="primary" className="explore-button">
                LET'S GO EXPLORE
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
