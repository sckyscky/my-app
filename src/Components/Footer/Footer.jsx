import React from 'react'
import './Footer.css'
import footerLogo from '../Assets/logo.png'
import instagramIcon from '../Assets/icons8-instagram-96.png'
import facebookIcon from '../Assets/icons8-facebook-90.png'
import githubIcon from '../Assets/icons8-github-96 (1).png'
import gmailIcon from '../Assets/icons8-gmail-100 (1).png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footerlogo">
        <img src={footerLogo} alt=""/>
         <p>Shoppify</p>

        </div>
        <div className="footer-icons">
            <div className="icon-container">
                <img src={instagramIcon} alt="Instagram" />

            </div>

            <div className="icon-container">
                <img src={facebookIcon} alt="Facebook" />
            </div>

            <div className="icon-container">
                <img src={githubIcon} alt="GitHub" />
            </div>

            <div className="icon-container">
                <img src={gmailIcon} alt="Gmail" />
            </div>

        </div>
        <div className="footertext">
            <hr />
            <p>&copy; 2025 Shoppify. All rights reserved.</p>
        </div>
    </div>

  )
}

export default Footer
