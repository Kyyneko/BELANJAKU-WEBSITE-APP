import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import us1 from "../../images/user_experience/us1.jpg";
import us2 from "../../images/user_experience/us2.jpg";
import us3 from "../../images/user_experience/us3.jpg";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "../../css/user_experince/Customers.css";

const Customers = () => {
  return (
    <div className="customers py-5">
      <Container>
        <h2 className="text-center mb-4">What Customers Says...</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <div className="crop-container">
                <Card.Img variant="top" src={us1} alt="user1" />
              </div>
              <Card.Body>
                <Card.Title>Food & Drink</Card.Title>
                <Card.Text>
                  It is not every day that you come across a passionate and
                  trustworthy financial advisor. John Doe is true professional
                  who does his work really well. Thanks John!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <div className="crop-container">
                <Card.Img variant="top" src={us2} alt="user2" />
              </div>
              <Card.Body>
                <Card.Title>Cosmetic</Card.Title>
                <Card.Text>
                  In just 2 very short meetings with John he managed to find the
                  solution personally catered to my situation and expectations.
                  Punctual, well informed and very reliable.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <div className="crop-container">
                <Card.Img variant="top" src={us3} alt="user3" />
              </div>
              <Card.Body>
                <Card.Title>Body Care</Card.Title>
                <Card.Text>
                  A very professional financial advisor, who is true to his
                  word. John has demonstrated a high amount of integrity in the
                  time I have known him
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <FaInstagram size={30} className="icon mx-2" />
          <FaFacebook size={30} className="icon mx-2" />
          <div className="line mx-auto my-3"></div>
          <h3>Belanjaku</h3>
        </div>
      </Container>
    </div>
  );
};

export default Customers;
