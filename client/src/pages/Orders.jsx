
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();

 
  useEffect(() => {

    api.get('/orders/my-orders')
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
          'Could not load orders.'
        );
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  return (
    <section className="standard-page">

    
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR ACCOUNT</span>
          <h1>My Orders</h1>
        </div>
      </div>

    
      {location.state?.message && (
        <div className="notice success">
          {location.state.message}
        </div>
      )}

      
      {loading ? (

        <div className="page-message">
          Loading orders...
        </div>

      ) : error ? (

       
        <div className="notice error">
          {error}
        </div>

      ) : orders.length === 0 ? (

       
        <div className="empty-state">

          <h2>No Orders Yet</h2>

          <p>
            Your placed orders will show up here.
          </p>

          <Link to="/" className="primary-button">
            Browse Products
          </Link>

        </div>

      ) : (

       
        <div className="orders-list">

          {orders.map((order) => (

            <article className="order-card" key={order._id}>

              
              <div className="order-top">

                <div>
                  <span className="muted">
                    Order Placed
                  </span>

                  <strong>
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </strong>
                </div>

                <div>
                  <span className="muted">
                    Order Number
                  </span>

                  <strong>
                    #{order._id.slice(-7).toUpperCase()}
                  </strong>
                </div>

                <span className="status-pill">
                  {order.status}
                </span>

              </div>

              
              <div className="order-products">

                {order.items.map((item, index) => (

                  <div
                    className="order-product"
                    key={index}
                  >

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

              </div>

             
              <div className="order-bottom">

                <span>
                  Delivering to: {order.shippingAddress.city},
                  {' '}{order.shippingAddress.pincode}
                </span>

                <strong>
                  Total: ₹{order.totalAmount}
                </strong>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>
  );
}

export default Orders;
