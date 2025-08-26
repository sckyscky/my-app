import React, { useContext } from 'react'
import './Item.css'
import { shopContext } from '../../Context/ShopContext'

// Item component
const Item = (props) => {
    const { addToCart } = useContext(shopContext);

    const handleAddToCart = () => {
        addToCart(props.id);
    };

    return (
        <div className='item'>
            <img src={props.image} alt="" />
            <div className="item-bottom">
                <div className="item-prices">
                    <div className="item-name">{props.name}</div>
                    <div>
                        <span className="item-old">php {props.oldPrice}</span>
                        <span className="item-new">php {props.newPrice}</span>
                    </div>
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Item