import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

const pizzasCategories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

const Categories = () => {
  const currentCategoryIndex = useSelector((state) => state.filter.categoryIndex);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {pizzasCategories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(setCategory(index))}
              className={currentCategoryIndex === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
