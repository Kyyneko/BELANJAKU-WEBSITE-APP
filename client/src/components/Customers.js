import React from 'react'
import us1 from './images/us1.jpg'
import us2 from './images/Us2.jpg'
import us3 from './images/us3.jpg'

import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './Customers.css'

const Customers = () => {
  return (
    <div className='customers' >
            <div className='container'>
                <h2>What Customers Says...</h2>
                {/* <span className='line'></span> */}
                <div className='content'>
                    <div className='card'>
                        <img src={us1} alt='user1'/>
                        <p><span>Food & Drink</span></p>
                        <p>It is not every day that you come across a passionate and trustworthy financial advisor. John Doe is true professional who does his work really well. Thanks John!</p>
                        
                    </div>
                    <div className='card'>
                        <img src={us2} alt='user1'/>
                        <p><span>Cosmetic</span></p>
                        <p>In just 2 very short meetings with John he managed to find the solution personally catered to my situation and expectations. Punctual, well informed and very reliable.</p>
                    </div>
                    <div className='card'>
                        <img src={us3} alt='user1'/>
                        <p><span>Body Care</span></p>
                        <p>A very professional financial advisor, who is true to his word. John has demonstrated a high amount of integrity in the time I have known him, and he is fast to respond to my concerns.</p>
                    </div>
                </div>
                <div className='social-icons3'>
                        <FaInstagram size={30} className='icon' />
                        <FaFacebook size={30} className='icon' />
                        <div className='line'></div>
                        <h3>Belanjaku</h3>
                    </div>
            </div>
        </div>
  )
}

export default Customers
