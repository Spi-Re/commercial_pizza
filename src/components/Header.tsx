import LogoSVG from '../assets/img/pizza-logo.svg';
import cartSVG from '../assets/img/cart.svg';

import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchBar from './SearchBar';
import { RootState, useAppDispatch } from '../redux/store';
import { stateReset } from '../redux/filter/slice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { totalPizzas, orderPrice } = useSelector((state: RootState) => state.cart);

  const handleLogoClick = () => {
    dispatch(stateReset());
  };

  return (
    <div className="header">
      <div className="container">
        <Link to={'/'}>
          <div onClick={handleLogoClick} className="header__logo">
            <img width="38" src={LogoSVG} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>The best pizza in the world!!!11</p>
            </div>
          </div>
        </Link>
        <div className="header__cart">
          {pathname === '/' && (
            <Link to="/cart" className="button button--cart">
              <span>${orderPrice}</span>
              <div className="button__delimiter"></div>
              <img src={cartSVG} alt="cart" />
              <span>{totalPizzas}</span>
            </Link>
          )}
        </div>
      </div>
      {pathname === '/' && <SearchBar />}
    </div>
  );
};
