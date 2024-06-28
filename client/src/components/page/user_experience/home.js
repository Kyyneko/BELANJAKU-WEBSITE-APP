import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/user_experince/home.css";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="custom-container py-12">
        <Container className="text-center">
          <Row className="justify-center">
            <Col md={8}>
              <h1 className="text-4xl font-bold mt-4">Let's Shopping</h1>
              <p className="text-lg my-4">
                Lorem Ipsum adalah teks dummy dari industri percetakan dan
                typesetting. Lorem Ipsum telah menjadi teks dummy standar
                industri sejak 1500-an, ketika seorang pencetak tidak dikenal
                mengambil galley dari jenis dan mengacaknya untuk membuat buku
                spesimen. Itu telah bertahan tidak hanya lima abad, tetapi juga
                melompat ke typesetting elektronik, tetap tidak berubah secara
                esensial.
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
