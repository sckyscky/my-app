
import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../Context/ShopContext';
import './Cart.css';

// Debug component to display current cart state
const CartDebug = ({ cartItems, products = [] }) => {
    return (
        <div style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            margin: '20px 0', 
            borderRadius: '8px',
            border: '1px solid #dee2e6'
        }}>
            <h3>Debug Info</h3>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                    <h4>Cart Items:</h4>
                    <pre>{JSON.stringify(cartItems, null, 2)}</pre>
                </div>
                <div>
                    <h4>Available Products:</h4>
                    <pre>{JSON.stringify(products.map(p => ({ id: p.id, name: p.name })), null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    const context = useContext(shopContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);
    const { 
        cartItems = {}, 
        data: products = [], 
        getTotalCartAmount = () => '0.00',
        removeFromCart = () => {},
        clearCart = () => {}
    } = context || {};

    const handleCheckout = () => {
        // Clear the cart
        clearCart();
        // Show the success message
        setShowCheckoutMessage(true);
        // Hide the message after 3 seconds
        setTimeout(() => setShowCheckoutMessage(false), 3000);
    };
    
    console.log('Cart Context:', context); // Debug log
    console.log('Cart Items:', cartItems); // Debug log
    // Debug: Log cart items and data
    useEffect(() => {
        console.log('Cart Items (raw):', cartItems);
        console.log('Available Products:', products);
        
        if (!products || !Array.isArray(products) || !cartItems) {
            console.log('Missing required data');
            setCartProducts([]);
            return;
        }

        const productsInCart = [];
        
        for (const [itemId, quantity] of Object.entries(cartItems)) {
            const numericId = Number(itemId);
            if (isNaN(numericId)) {
                console.warn(`Skipping invalid cart item ID: ${itemId}`);
                continue;
            }
            
            const product = products.find(p => p.id === numericId);
            if (product) {
                productsInCart.push({
                    ...product,
                    quantity: Number(quantity) || 0
                });
            } else {
                console.warn(`Product not found for ID: ${itemId}`);
            }
        }
        
        console.log('Processed Cart Products:', productsInCart);
        setCartProducts(productsInCart);
    }, [cartItems, products]);

    // Calculate total items in cart
    const totalItems = cartItems ? Object.values(cartItems).reduce((sum, qty) => sum + (Number(qty) || 0), 0) : 0;

    // Calculate cart total using the context function
    const cartTotal = getTotalCartAmount ? getTotalCartAmount() : '0.00';

    // Debug mode - set to false in production
    const debugMode = false;
    
    // Show loading state if context isn't ready
    if (!context) {
        return (
            <div className="cart-page">
                <h1>Shopping Cart</h1>
                <div className="loading-message">Loading cart...</div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {debugMode && <CartDebug cartItems={cartItems} products={products} />}
            
            <div className="cart-layout">
                <div className="cart-items-section">
                    {totalItems === 0 ? (
                        <div className="empty-cart-message">
                            <h2>Your cart is empty</h2>
                            <p>Add some items to get started!</p>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cartProducts.map((item) => (
                                <div key={item.id} className="cart-item">
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
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Total: ₱{(item.newPrice * item.quantity).toFixed(2)}</p>
                                        <p>ID: {item.id}</p>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id.toString())}
                                        >
                                            Remove One
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {totalItems > 0 && (
                    <div className="cart-totals-section">
                        <h2>Cart Totals</h2>
                        <div className="total-item">
                            <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
                            <span>₱{cartTotal}</span>
                        </div>
                        <div className="total-item">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="total-item total-final">
                            <span>Total:</span>
                            <span>₱{cartTotal}</span>
                        </div>
                        <>
                        <button className="checkout-btn" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                        {showCheckoutMessage && (
                            <div className="checkout-message">
                                Your items have been checked out successfully!
                            </div>
                        )}
                    </>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
