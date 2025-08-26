
import './CartItems.css';
import React, { useContext, useEffect } from 'react';
import { shopContext } from '../../Context/ShopContext';

const CartItems = () => {
    const { data, cartItems, removeFromCart, getTotalCartAmount } = useContext(shopContext);

    // Debug: Log cart items and data
    useEffect(() => {
        console.log('Cart Items:', cartItems);
        console.log('Products Data:', data);
    }, [cartItems, data]);

    // Calculate total items in cart
    const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

    return (
        <div className='cartItems'>
            <h1>Shopping Cart</h1>
            
            <div className="cart-layout">
                <div className="cart-items-section">
                    {totalItems === 0 ? (
                        <div className="empty-cart-message">
                            <h2>Your cart is empty</h2>
                            <p>Add some items to get started!</p>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {Object.entries(cartItems).map(([itemId, quantity]) => {
                                if (quantity > 0) {
                                    const item = data.find(product => product.id === parseInt(itemId));
                                    if (item) {
                                        return (
                                            <div key={itemId} className="cart-item">
                                                <div className="item-main-content">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/100';
                                                        }}
                                                    />
                                                    <div className="item-info">
                                                        <h3>{item.name}</h3>
                                                        <p>Price: ₱{item.newPrice || 'N/A'}</p>
                                                        <p>Quantity: {quantity}</p>
                                                        <p>Total: ₱{(item.newPrice * quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => removeFromCart(itemId)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        );
                                    } else {
                                        console.warn(`Item with ID ${itemId} not found in products`);
                                        return null;
                                    }
                                }
                                return null;
                            })}
                        </div>
                    )}
                </div>

                {totalItems > 0 && (
                    <div className="cart-totals-section">
                        <h2>Cart Totals</h2>
                        <div className="total-item">
                            <span>Subtotal ({totalItems} items):</span>
                            <span>₱{getTotalCartAmount()}</span>
                        </div>
                        <div className="total-item">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="total-item total-final">
                            <span>Total:</span>
                            <span>₱{getTotalCartAmount()}</span>
                        </div>
                        <button className="checkout-btn">PROCEED TO CHECKOUT</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartItems;
