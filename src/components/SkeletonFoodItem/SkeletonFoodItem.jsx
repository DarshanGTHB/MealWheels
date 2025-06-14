import React from 'react';
import './SkeletonFoodItem.css';

const SkeletonFoodItem = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-rating"></div>
        <div className="skeleton-desc"></div>
        <div className="skeleton-price"></div>
      </div>
    </div>
  );
};

export default SkeletonFoodItem;