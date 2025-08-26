import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart from '../Assets/cart.png';
import account from '../Assets/account.png';
import { shopContext } from '../../Context/ShopContext';

// Navbar component
const Navbar = () => {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';
  const isAccountPage = location.pathname === '/account';
  const { getCartItemCount } = useContext(shopContext);
  
  // Calculate cart count
  const cartCount = getCartItemCount();

  return (
    <div className="navbar">
      
<div className="navbar__logo">
  <img src={logo} alt="Logo" />
  <Link style={{textDecoration: 'none', color: 'Yellow'}} to='/'><p>Shoppify</p></Link>
</div>

<div className="navbar_links">
  <div className={`cart cart-container${isCartPage ? ' cart-active' : ''}`}>
    <Link to="/cart">
      <img src={cart} alt="Cart" />
    </Link>
    <div className="cart_count">{cartCount}</div>
  </div>
  <div className={`account cart-container${isAccountPage ? ' cart-active' : ''}`}>
    <Link to="/account">
      <img src={account} alt="Account" />
    </Link>
  </div>
</div>
</div>

   

  );
};

export default Navbar;