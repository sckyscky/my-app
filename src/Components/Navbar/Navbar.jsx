import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart from '../Assets/cart.png';
import account from '../Assets/account.png';

// Navbar component
const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');

  return (
    <div className="navbar">
      
<div className="navbar__logo">
  <img src={logo} alt="Logo" />
  <Link style={{textDecoration: 'none', color: 'Yellow'}} to='/'><p>Shoppify</p></Link>
</div>

<div className="navbar_links">
  <div
    className={`cart cart-container${activeSection === 'cart' ? ' cart-active' : ''}`}
    onClick={() =>
      setActiveSection(activeSection === 'cart' ? '' : 'cart')
    }
  ><Link to="/cart">
    <img src={cart} alt="Cart" />
    </Link>
    <div className="cart_count">0</div>
  </div>
  <div
    className={`account cart-container${activeSection === 'account' ? ' cart-active' : ''}`}
    onClick={() =>
      setActiveSection(activeSection === 'account' ? '' : 'account')
    }
  ><Link to="/account">
    <img src={account} alt="Account" />
    </Link>
  </div>
</div>
</div>

   

  );
};

export default Navbar;