import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

import Header from './components/Header';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
