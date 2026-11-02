
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">

      
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      
      <div className="product-info">

        <p className="category-label">
          {product.category}
        </p>

        <Link
          to={`/products/${product._id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        
        <div className="product-bottom">

          <strong>
            ₹{product.price}
          </strong>

          <button
            className="small-add"
            onClick={() => addToCart(product)}
            disabled={product.stock < 1}
          >
            {product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
