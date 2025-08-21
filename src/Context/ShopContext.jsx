import React, { createContext, useState } from "react";
import data from "../Components/Assets/data.js";  

export const shopContext = createContext(null);

 const getDefaultCart = ()=> {
    let cart = {};
    for (let index = 0; index < data.length; index++){
        cart[index] = 0;
    }   
    return cart;
 }

const ShopContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
    }

    const contextValue = {data, addToCart, removeFromCart, cartItems};

    return (
        <shopContext.Provider value={contextValue}>
            {props.children}
        </shopContext.Provider>
    );
};

export default ShopContextProvider;