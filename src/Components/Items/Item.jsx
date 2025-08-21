import React from 'react'
import './Item.css'

// Item component
const Item = (props) => {
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
        <button className="add-to-cart-btn">Add</button>
      </div>
    </div>
  )
}

export default Item