import React from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// импорт страниц
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import RootLayout from './layouts/RootLayout';

import './scss/app.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Main />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
