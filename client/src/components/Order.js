import React from 'react';
import './Order.css';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Order = () => {
  return (
    <div className="order-container"  id='order'>
      <h1 className='title'>ALL YOUR ORDER</h1>
      <input type="text" placeholder="Search...." className="search-bar" />
      <div className="order-list">
        <div className="order-item">
          <div className="order-image"></div>
          <button className="order-button">Order Here</button>
        </div>
        <div className="order-item">
          <div className="order-image"></div>
          <button className="order-button">Order Here</button>
        </div>
        <div className="order-item">
          <div className="order-image"></div>
          <button className="order-button">Order Here</button>
        </div>
      </div>
      {/* <div className="pagination">
        <span>&larr;</span>
        <span>2</span>
        <span>&rarr;</span>
      </div> */}
      <div className='social-icon'>
                <FaInstagram size={30} className='icon' />
                <FaFacebook size={30} className='icon' />
                <div className='line'></div>
                <h3>Belanjaku</h3>
        </div>
    </div>
  );
};

export default Order;
