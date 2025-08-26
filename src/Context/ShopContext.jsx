import React, { createContext, useState, useEffect } from "react";
import data from "../Components/Assets/data.js";  

export const shopContext = createContext(null);

const ShopContextProvider = (props) => {
    // Initialize cart with empty object and include product data
    const [cartItems, setCartItems] = useState(() => {
        // Clear existing cart data for fresh start
        localStorage.removeItem('cartItems');
        return {};
    });
    const [products] = useState(data);
    const [toast, setToast] = useState({ show: false, message: '' });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Cart updated:', cartItems);
    }, [cartItems]);

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const addToCart = (itemId) => {
        // Ensure itemId is valid
        if (itemId === undefined || itemId === null) {
            console.error('Cannot add to cart: itemId is undefined or null');
            return;
        }

        // Convert itemId to number if it's a string
        const numericId = typeof itemId === 'string' ? parseInt(itemId, 10) : itemId;
        
        // Find the product
        const item = products.find(p => p.id === numericId);
        
        if (!item) {
            console.error('Cannot add to cart: Item not found', {
                itemId,
                numericId,
                availableIds: products.map(p => p.id)
            });
            return;
        }
        
        console.log(`Adding ${item.name} (ID: ${item.id}) to cart`);
        
        setCartItems((prev) => {
            const currentQuantity = prev[numericId] || 0;
            const newQuantity = currentQuantity + 1;
            
            console.log(`Updating cart for item ${item.name}:`, {
                currentQuantity,
                newQuantity
            });
            
            showToast(`${item.name} added to cart!`);
            
            return {
                ...prev,
                [numericId]: newQuantity
            };
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const currentQuantity = prev[itemId] || 0;
            if (currentQuantity <= 1) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
            return {
                ...prev,
                [itemId]: currentQuantity - 1
            };
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const itemInfo = products.find((product) => product.id === parseInt(itemId));
                if (itemInfo && itemInfo.newPrice) {
                    totalAmount += itemInfo.newPrice * quantity;
                }
            }
        }
        return totalAmount.toFixed(2);
    }

    const getCartItemCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            totalCount += cartItems[itemId] || 0;
        }
        return totalCount;
    }

    const contextValue = {
        data: products, // This is what we're using in Cart.jsx
        cartItems, 
        addToCart, 
        removeFromCart, 
        getTotalCartAmount,
        getCartItemCount,
        toast,
        // Debug info
        _debug: {
            products,
            cartItems,
            getProductById: (id) => products.find(p => p.id === parseInt(id)),
            getCartItems: () => cartItems,
            getProducts: () => products
        }
    };
    
    // Debug log on cart change
    React.useEffect(() => {
        console.log('Cart items updated:', cartItems);
    }, [cartItems]);

    return (
        <shopContext.Provider value={contextValue}>
            {props.children}
            {toast.show && (
                <div className="toast">
                    <div className="toast-message">
                        <span>✓</span> {toast.message}
                    </div>
                </div>
            )}
        </shopContext.Provider>
    );
};

export default ShopContextProvider;