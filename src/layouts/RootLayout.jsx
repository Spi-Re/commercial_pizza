import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

function RootLayout() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Outlet context={searchValue} />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
