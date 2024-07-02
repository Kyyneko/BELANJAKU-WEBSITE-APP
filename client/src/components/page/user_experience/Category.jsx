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
                Discover our delicious selection of Food & Drink items. 
                From hearty breakfasts to gourmet treats, our collection 
                features a variety of mouth-watering options to satisfy your cravings.
                 Start your day right or indulge in a delightful meal with our top-quality 
                 food and drink.
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
                Explore our extensive range of cosmetic products designed to 
                enhance your beauty. From skincare essentials to luxurious makeup, 
                our collection has everything you need to look and feel your best. 
                Discover the latest trends and must-have items in the world of beauty.
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
                Pamper yourself with our premium body care products.
                 Our collection includes a variety of lotions, creams, 
                 and body washes that nourish and rejuvenate your skin. 
                 Enjoy the ultimate self-care experience with our high-quality 
                 body care essentials, perfect for every skin type.
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
