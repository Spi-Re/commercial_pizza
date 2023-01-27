import React from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { setSortOrder, setSortType, setCurrentPage } from '../redux/filter/slice';
import { ISortType, ISortOrder } from '../redux/filter/types';
import { selectFilter } from '../redux/filter/selectors';

export const sortTypes: ISortType[] = [
  { name: 'popularity', type: 'rating' },
  { name: 'price', type: 'price' },
  { name: 'alphabetically', type: 'title' },
];

const orderTypes = {
  desc: 'asc',
  asc: 'desc',
};

export const Sort: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const { sortOrder, sortType } = useSelector(selectFilter);
  const { name: chosenSortTypeName } = sortType;

  const handleSortOrder = () => {
    const order = orderTypes[sortOrder] as ISortOrder;
    dispatch(setSortOrder(order));
  };

  const handleSortChange = (sortType: ISortType) => {
    dispatch(setSortType(sortType));
    dispatch(setCurrentPage(1));
  };

  const handlerClosePopup = (event: Event) => {
    const _event = event.target as HTMLElement;
    !_event.closest('.sort') && setIsVisible(false);
  };

  const handlerSortVisibility = (event: React.PointerEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).closest('.for-selection') &&
      setIsVisible((visible) => !visible);
  };

  React.useEffect(() => {
    document.addEventListener('click', handlerClosePopup, true);
    return () => {
      document.removeEventListener('click', handlerClosePopup, true);
    };
  }, []);

  return (
    <div className="sort" onClick={handlerSortVisibility}>
      <div className="sort__label">
        <svg
          onClick={handleSortOrder}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span className="for-selection">{chosenSortTypeName}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((sortType, index) => {
              return (
                <li
                  key={index}
                  onPointerUp={() => handleSortChange(sortType)}
                  className={
                    chosenSortTypeName === sortType.name ? `active for-selection` : `for-selection`
                  }>
                  {sortType.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
