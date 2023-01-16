import React from 'react';

const Categories = () => {
  const [chosenCategory, setChosenCategory] = React.useState(0);

  const pizzasCategories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {pizzasCategories.map((category, categoryIndex) => {
          return (
            <li
              key={categoryIndex}
              onClick={() => setChosenCategory(categoryIndex)}
              className={chosenCategory === categoryIndex ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
