
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="navbar">
      <div className="nav-inner">

        
        <Link to="/" className="brand">
          ShopEase
        </Link>

        
        <nav className="nav-links">
          <Link to="/">Home</Link>

          {user && (
            <Link to="/orders">My Orders</Link>
          )}
        </nav>

       
        <div className="nav-actions">

          <Link to="/cart" className="cart-link">
            Cart ({count})
          </Link>

          {user ? (
            <>
              <span className="welcome">
                Welcome, {user.name}
              </span>

              <button
                className="nav-logout"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;
