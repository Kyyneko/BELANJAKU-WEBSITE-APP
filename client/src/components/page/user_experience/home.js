import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
import "../../css/user_experince/home.css";

const Home = () => {
  return (
    <div className="bg">
      <div className="custom-container">
        <Container className="text-center py-5">
          <Row className="justify-content-center align-items-center">
            <Col md={8}>
              <h1 className="custom-text display-4 bold mt-4">
                Let's Shopping
              </h1>
              <p className="custom-paragraph lead my-4">
                Lorem Ipsum adalah teks dummy dari industri percetakan dan
                typesetting. Lorem Ipsum telah menjadi teks dummy standar
                industri sejak 1500-an, ketika seorang pencetak tidak dikenal
                mengambil galley dari jenis dan mengacaknya untuk membuat buku
                spesimen. Itu telah bertahan tidak hanya lima abad, tetapi juga
                melompat ke typesetting elektronik, tetap tidak berubah secara
                esensial.
              </p>
              <Link to="/About">
                {" "}
                {/* Menggunakan Link */}
                <Button className="custom-button btn-light btn-lg my-2">
                  Explore Now
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
