import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setCategory } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';

const pizzasCategories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

export const Categories: React.FC = React.memo(() => {
  const { categoryIndex } = useSelector(selectFilter);
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
              className={categoryIndex === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
