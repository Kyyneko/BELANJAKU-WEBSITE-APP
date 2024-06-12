import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './home.css'

const home = () => {
  return (
    <div className='bg'>
      <div className='custom-container'>
        <Container>
          <Row>
            <Col>
              <h1 className='custom-text'>Make</h1>
              <h1 className='custom-text'>Fun</h1>
              <p className='custom-paragraph'>Lorem Ipsum adalah teks dummy dari industri percetakan dan typesetting.<br/> 
              Lorem Ipsum telah menjadi teks dummy standar industri sejak 1500-an, ketika <br/> 
               seorang pencetak tidak dikenal mengambil galley dari jenis dan mengacaknya <br/> 
               untuk membuat buku spesimen. Itu telah bertahan tidak hanya lima abad, tetapi <br/>
              juga melompat ke typesetting elektronik, tetap tidak berubah secara esensial.</p>
              <button className='btn btn-light custom-button'>Explore Now</button>
              <div className='social-icons'>
                <FaInstagram size={30} className='icon' />
                <FaFacebook size={30} className='icon' />
                <div className='line'></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default home
