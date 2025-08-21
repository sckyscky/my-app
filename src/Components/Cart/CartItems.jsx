
import './CartItems.css'
import React, { useContext } from 'react'
import { shopContext } from '../../Context/ShopContext';
import removeIcon from '../Assets/icons8-cancel-100.png'



const Cart = () => {

     const {data, cartItems, removeFromCart} = useContext(shopContext);
  return (
    <div className='cartItems'>
      <div className="format-main">
        <p>Rroducts</p>
         <p>Name</p>
          <p>Prize</p>
           <p>Quantity</p>
            <p>Total</p>
             <p>Remove</p>
        
        </div>    
        <hr></hr>
        
        {data.map((e) => {
          
          if(cartItems[e.id]>0){
        <div>
          <div className="cartItems-format">
            <img src={e.image} alt="" className="cartIcon" />
           <p>{e.name}</p>
           <p>php{e.newPrice}</p>

          <button className='quantity'>{cartItems[e.id]}</button>
          <p>{e.newPrice*cartItems[e.id]}</p>
            <img src={removeIcon} alt="" onClick={removeFromCart(e.id)} />

           </div>
        </div>    

          }
          return null;
          })}
    </div>
  )
}


export default Cart
