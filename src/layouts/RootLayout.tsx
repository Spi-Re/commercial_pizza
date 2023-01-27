import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components';

const RootLayout: React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
