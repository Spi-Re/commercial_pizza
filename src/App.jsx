import React from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './scss/app.scss';

// импорт страниц
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

// обёртка над всеми роутерами
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Main />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

// Финальное отображение router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
