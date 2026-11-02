
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

 
  useEffect(() => {

    api.get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
          'Could not load this product.'
        );
      });

  }, [id]);

 
  if (error) {
    return (
      <div className="page-message">
        {error}
        <Link to="/"> Go back</Link>
      </div>
    );
  }

 
  if (!product) {
    return (
      <div className="page-message">
        Loading product...
      </div>
    );
  }

 
  return (
    <section className="detail-page">

      <Link to="/" className="back-link">
        Back to Products
      </Link>

      <div className="detail-layout">

       
        <div className="detail-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

       
        <div className="detail-copy">

          <span className="category-label">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="detail-price">
            ₹{product.price}
          </div>

          <p>{product.description}</p>

          
          <p className="stock-text">
            {product.stock > 0
              ? `${product.stock} available`
              : 'Out of stock'}
          </p>

         
          <button
            className="primary-button"
            disabled={product.stock < 1}
            onClick={() => {
              addToCart(product);
              setAdded(true);
            }}
          >
            Add to Cart
          </button>

        
          {added && (
            <p className="success-text">
              Added to your cart.
            </p>
          )}

        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
