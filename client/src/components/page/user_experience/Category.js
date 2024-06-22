import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import user1 from "../../images/user_experience/user1.jpg";
import user2 from "../../images/user_experience/user2.jpg";
import user3 from "../../images/user_experience/user3.jpg";
import "../../css/user_experince/category.css";

const Category = () => {
  return (
    <div className="category py-5">
      <Container>
        <h2 className="text-center mb-4">CATEGORY PRODUCT</h2>
        <div className="line mx-auto mb-4"></div>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={user1} alt="user1" />
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
              <Card.Img variant="top" src={user2} alt="user2" />
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
              <Card.Img variant="top" src={user3} alt="user3" />
              <Card.Body>
                <Card.Title>Body Care</Card.Title>
                <Card.Text>
                  A very professional financial advisor, who is true to his
                  word. John has demonstrated a high amount of integrity in the
                  time I have known him, and he is fast to respond to my
                  concerns.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Category;
