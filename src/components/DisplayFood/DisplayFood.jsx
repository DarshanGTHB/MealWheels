import React, { useContext } from "react";
import "./DisplayFood.css";
import StoreContext from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";
import SkeletonFoodItem from "../SkeletonFoodItem/SkeletonFoodItem";

export const DisplayFood = ({ category }) => {
  let { foodList, loading } = useContext(StoreContext);

  if (loading) {
    return (
      <div className="food-display">
        <ul className="food-list">
          {[...Array(8)].map((_, index) => (
            <SkeletonFoodItem key={index} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="food-display">
      <ul className="food-list">
        {foodList.map((tup, id) => {
          if (category === "ALL" || category === tup.category)
            return <FoodItem food_item={tup} key={id} />;
        })}
      </ul>
    </div>
  );
};