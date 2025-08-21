import React from 'react'
import './Banner.css'
import bannerImage from '../Assets/Untitled design (1).png';

const Banner = () => {
  return (
    <div className="banner-container">
      <img src={bannerImage} alt="Banner" className="banner-image" />
      <div className="banner-text">
        <h1>Welcome to Shoppify</h1>
        <p>Your one-stop shop for everything you need!</p>
      </div>
    </div>
  )
}

export default Banner