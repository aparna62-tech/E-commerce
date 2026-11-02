
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';

function Checkout() {

  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  // Store delivery form details
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 
  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

 
  async function submit(e) {

    e.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);

    try {

      const orderData = {
        shippingAddress: form,
        items: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity
        }))
      };

      const response = await api.post('/orders', orderData);

      
      clearCart();

     
      navigate('/orders', {
        state: {
          message: response.data.message
        }
      });

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Could not place your order.'
      );

    } finally {
      setLoading(false);
    }
  }

 
  if (items.length === 0) {
    return (
      <div className="page-message">
        Your cart is empty.
        <Link to="/"> Go shopping</Link>
      </div>
    );
  }

  return (
    <section className="standard-page">

      
      <div className="section-heading">
        <div>
          <span className="eyebrow">ALMOST THERE</span>
          <h1>Delivery Details</h1>
        </div>
      </div>

      <div className="checkout-layout">

       
        <form className="checkout-form" onSubmit={submit}>

          <h2>Where should we send it?</h2>

          {error && (
            <div className="notice error">
              {error}
            </div>
          )}

          <div className="form-stack">

            <label>
              Full Name

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={change}
                required
                minLength="2"
              />
            </label>

            <label>
              Phone Number

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={change}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="10 digit mobile number"
              />
            </label>

            <label>
              Full Address

              <textarea
                name="address"
                value={form.address}
                onChange={change}
                required
                rows="3"
                placeholder="House number, street, area"
              />
            </label>

            <div className="two-fields">

              <label>
                City

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={change}
                  required
                />
              </label>

              <label>
                PIN Code

                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={change}
                  required
                  pattern="[0-9]{6}"
                  maxLength="6"
                  placeholder="6 digits"
                />
              </label>

            </div>

            <button
              type="submit"
              className="primary-button full-button"
              disabled={loading}
            >
              {loading
                ? 'Placing Order...'
                : `Place Order - ₹${total}`}
            </button>

            <p className="muted small-note">
              Demo checkout only. No real payment or card details are collected.
            </p>

          </div>
        </form>

        
        <aside className="summary-card">

          <h2>Your Items</h2>

          {items.map((item) => (
            <div className="checkout-item" key={item._id}>

              <img src={item.image} alt={item.name} />

              <div>
                <strong>{item.name}</strong>
                <span>Qty: {item.quantity}</span>
              </div>

              <b>
                ₹{item.price * item.quantity}
              </b>

            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

        </aside>

      </div>
    </section>
  );
}

export default Checkout;
