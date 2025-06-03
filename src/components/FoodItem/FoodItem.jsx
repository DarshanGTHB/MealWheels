import React from 'react'
import './FoodItem.css'

const FoodItem = ({food_item}) => {
    // console.log(" ", food_item)
    const {_id, name, image, price, description } = food_item
  return (
    <div className="food-item-card">
      <div className="food-img-wrap">
        <img src={image} alt={name} className="food-img" />
      </div>
      <div className="food-info">
        <h3 className="food-title">{name}</h3>
        <p className="food-desc">{description}</p>
        <div className="food-bottom">
          <span className="food-price">${price}</span>
          <button className="add-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default FoodItem