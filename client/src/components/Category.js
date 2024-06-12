import React from 'react'
import user1 from './images/user1.jpg'
import user2 from './images/user2.jpg'
import user3 from './images/user3.jpg'
import './category.css'

const Category = () => {
  return (
    <div className='category'>
            <div className='container'>
                <h2>CATEGORY PRODUCT</h2>
                <span className='line'></span>
                <div className='content'>
                    <div className='card'>
                        <img src={user1} alt='user1'/>
                        <p><span>Food & Drink</span></p>
                        <p>It is not every day that you come across a passionate and trustworthy financial advisor. John Doe is true professional who does his work really well. Thanks John!</p>
                        
                    </div>
                    <div className='card'>
                        <img src={user2} alt='user1'/>
                        <p><span>Cosmetic</span></p>
                        <p>In just 2 very short meetings with John he managed to find the solution personally catered to my situation and expectations. Punctual, well informed and very reliable.</p>
                    </div>
                    <div className='card'>
                        <img src={user3} alt='user1'/>
                        <p><span>Body Care</span></p>
                        <p>A very professional financial advisor, who is true to his word. John has demonstrated a high amount of integrity in the time I have known him, and he is fast to respond to my concerns.</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Category
