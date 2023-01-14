import React from 'react';

const Categories = () => {
  const [chosenCategory, setChosenCategory] = React.useState(0);

  const pizzasCategories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {pizzasCategories.map((category, categoryId) => {
          return (
            <li
              key={categoryId}
              onClick={() => setChosenCategory(categoryId)}
              className={chosenCategory === categoryId ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
