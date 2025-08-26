import React, { useState } from 'react';
import './ItemList.css';
import data from '../Assets/data.js';
import Item from '../Items/Item.jsx';

const categories = [
  "All",
  "Figurine",
  "Thing",
  "Food",
  
];

const ItemList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter items based on selected category
  const filteredItems = selectedCategory === "All"
    ? data
    : data.filter(item =>
        item.category &&
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className="itemlist-layout">
      <aside className="sidebar">
        <h2>Categories</h2>
        <ul>
          {categories.map(cat => (
            <li key={cat}>
              <button
                className={selectedCategory === cat ? "active-category" : ""}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  color: "#350dba",
                  cursor: "pointer",
                  fontWeight: selectedCategory === cat ? "bold" : "normal"
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className='item-list'>
        <div className="container">
          <h1>Shop now</h1>
          <hr />
          <div className="items">
  {filteredItems.map((item, index) => (
    <Item
      key={item.id || index}
      id={item.id}
      name={item.name}
      image={item.image}
      oldPrice={item.oldPrice}
      newPrice={item.newPrice}
    />
  ))}
  {/* Add placeholders if less than 3 items */}
  {Array.from({ length: Math.max(0, 3 - filteredItems.length) }).map((_, idx) => (
    <div key={`placeholder-${idx}`} style={{ visibility: 'hidden' }} />
  ))}
</div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;