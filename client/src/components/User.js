import React from 'react';
import { useNavigate } from 'react-router-dom';
import Customers from './images/customers.jpg';
import Admin from './images/admin.jpg';
import './User.css';

const User = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className='user' id='user'>
      <div className='container'>
        <div className='content'>
          <div className='card'>
            <img src={Customers} alt='user1' />
            <p><span>Customers</span></p>
            <p>It is not every day that you come across a passionate and trustworthy financial advisor. John Doe is true professional who does his work really well. Thanks John!</p>
            <div className='button-container'>
              <button className='btn login' onClick={navigateToLogin}>Log In</button>
              <button className='btn register' onClick={navigateToRegister}>Register</button>
            </div>
          </div>
          <div className='card'>
            <img src={Admin} alt='user2' />
            <p><span>Admin</span></p>
            <p>In just 2 very short meetings with John he managed to find the solution personally catered to my situation and expectations. Punctual, well informed and very reliable.</p>
            <div className='button-container'>
              <button className='btn login' onClick={navigateToLogin}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
