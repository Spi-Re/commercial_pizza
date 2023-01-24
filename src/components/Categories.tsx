import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';
import { setCurrentPage } from '../redux/slices/paginationSlice';

const pizzasCategories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

const Categories: React.FC = () => {
  //@ts-ignore
  const currentCategoryIndex = useSelector((state) => state.filter.categoryIndexState);
  const dispatch = useDispatch();

  const handleChangeCategories = (index: number) => {
    dispatch(setCurrentPage(1));
    dispatch(setCategory(index));
  };
  return (
    <div className="categories">
      <ul>
        {pizzasCategories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => handleChangeCategories(index)}
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
