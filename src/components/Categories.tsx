import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';
import { setCurrentPage } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const pizzasCategories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

const Categories: React.FC = React.memo(() => {
  const currentCategoryIndex = useSelector((state: RootState) => state.filter.categoryIndexState);
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
});

export default Categories;
