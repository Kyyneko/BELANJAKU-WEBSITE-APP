import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../css/user_experince/About.css";

const About = () => {
  return (
    <div className="about-section py-5" id="about">
      <Container>
        <Row className="justify-content-center align-items-center text-center">
          <Col md={8}>
            <h2 className="mb-4">WELCOME TO MARKETPLACE BELANJAKUU</h2>
            <p className="lead mb-4">
              Intense is an International Financial Planning company with
              offices in multiple jurisdictions over the world. Working with
              Intense gives me the ability to advise international expatriates
              living in the middle east from where I live in USA.
            </p>
            <Button variant="primary" className="explore-button">
              LET'S GO EXPLORE
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
