import React from 'react'
import './Newsletter.css';


const Newsletter = () => {
  return (
    <div className='newsletter'>
        <h1 className='newsletter-title'>Need help? Email us directly</h1>
        <p className='newsletter-description'>We would be glad to serve you.</p>
        <div className='newsletter-form'>
            <input type='email' placeholder='Enter your email' className='newsletter-input' />
            <button className='newsletter-button'>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter
