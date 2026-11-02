
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Cart() {

  const {
    items,
    total,
    updateQuantity,
    removeFromCart
  } = useCart();

  const { user } = useAuth();

 
  if (items.length === 0) {
    return (
      <section className="empty-state cart-empty">
        <h2>Your cart is empty</h2>

        <p>
          Looks like you have not added anything yet.
        </p>

        <Link to="/" className="primary-button">
          Start Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="standard-page">

     
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR BAG</span>
          <h1>Shopping Cart</h1>
        </div>

        <span className="result-count">
          {items.length} items
        </span>
      </div>

      <div className="cart-layout">

       
        <div className="cart-items">

          {items.map((item) => (
            <article className="cart-item" key={item._id}>

              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">

                <Link to={`/products/${item._id}`}>
                  {item.name}
                </Link>

                <span>₹{item.price}</span>

                <small>{item.category}</small>

              </div>

              
              <div className="quantity-control">

                <button
                  onClick={() =>
                    updateQuantity(item._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item._id, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>

              </div>

             
              <strong className="line-total">
                ₹{item.price * item.quantity}
              </strong>

             
              <button
                className="remove-button"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>

            </article>
          ))}

        </div>

        
        <aside className="summary-card">

          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>₹{total}</strong>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <strong className="free-text">Free</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

         
          {user ? (
            <Link to="/checkout" className="primary-button full-button">
              Continue to Checkout
            </Link>
          ) : (
            <Link
              to="/login"
              state={{ from: '/checkout' }}
              className="primary-button full-button"
            >
              Login to Checkout
            </Link>
          )}

          <Link to="/" className="continue-link">
            Continue Shopping
          </Link>

        </aside>
      </div>
    </section>
  );
}

export default Cart;
