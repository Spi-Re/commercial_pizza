import React from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Main from './pages/Main';
import NotFound from './pages/NotFound/NotFoundPage';
import RootLayout from './layouts/RootLayout';

import './scss/app.scss';

const Cart = React.lazy(() => import('./pages/Cart'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Main />} />
      <Route
        path="cart"
        element={
          <React.Suspense fallback={<div className="loading-words">Wait please...</div>}>
            <Cart />
          </React.Suspense>
        }
      />
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
