
import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

import './styles.css';

function App() {

  return (
    <>

     
      <Navbar />

      <main className="main-content">

        
        <Routes>

          
          <Route
            path="/"
            element={<Home />}
          />

         
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          
          <Route
            path="/login"
            element={<Login />}
          />

         
          <Route
            path="/register"
            element={<Register />}
          />

          
          <Route
            path="/cart"
            element={<Cart />}
          />

         
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

         
          <Route
            path="*"
            element={
              <div className="page-message">
                Page not found.
              </div>
            }
          />

        </Routes>

      </main>

     
      <footer className="footer">
        Made for everyday shopping
        <span> · </span>
        ShopEase
      </footer>

    </>
  );
}

export default App;
