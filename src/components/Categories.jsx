import React from 'react';

const Categories = ({ currentCategory, onChangeCategory }) => {
  const pizzasCategories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {pizzasCategories.map((category, categoryIndex) => {
          return (
            <li
              key={categoryIndex}
              onClick={() => onChangeCategory(categoryIndex)}
              className={currentCategory === categoryIndex ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
