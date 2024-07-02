import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import us1 from "../../images/user_experience/cs1.jpg";
import us2 from "../../images/user_experience/cs2.jpg";
import us3 from "../../images/user_experience/cs3.jpg";
import "../../css/user_experince/Customers.css";

const Customers = () => {
  return (
    <div className="customers py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">What Customers Say...</h2>
        <div className="line mx-auto mb-4"></div>
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <div className="crop-container">
                <Card.Img
                  variant="top"
                  src={us1}
                  alt="user1"
                  className="img-fluid"
                />
              </div>
              <Card.Body>
                <Card.Title>Song Joongki</Card.Title>
                <Card.Text>
                Song Joongki is our model who always looks stylish with our latest 
                collection. His formal outfit combinations always grab attention and 
                provide style inspiration.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <div className="crop-container">
                <Card.Img
                  variant="top"
                  src={us2}
                  alt="user2"
                  className="img-fluid"
                />
              </div>
              <Card.Body>
                <Card.Title>Ha Ji Won</Card.Title>
                <Card.Text>
                Ha Ji Won, a fashion icon who always looks chic and elegant with our 
                collection. Discover a variety of casual to formal clothing options that 
                will make you look stunning like Ha Ji Won. Find your style with us!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <div className="crop-container">
                <Card.Img
                  variant="top"
                  src={us3}
                  alt="user3"
                  className="img-fluid"
                />
              </div>
              <Card.Body>
                <Card.Title>kim soo hyun</Card.Title>
                <Card.Text>
                Kim Soo Hyun is the face of our latest collection, showcasing 
                elegant and classy clothing. With the latest fashion choices, 
                Kim Soo Hyun always looks captivating.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <div className="line mx-auto my-3"></div>
          <h3>Belanjaku</h3>
        </div>
      </Container>
    </div>
  );
};

export default Customers;
