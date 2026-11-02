
import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 
  const categories = [
    'All',
    'Accessories',
    'Clothing',
    'Electronics',
    'Footwear',
    'Home'
  ];

  
  useEffect(() => {

    setLoading(true);
    setError('');

    api.get('/products', {
      params: {
        search: search,
        category: category
      }
    })
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
          'Could not load products. Please check that the server is running.'
        );
      })
      .finally(() => {
        setLoading(false);
      });

  }, [search, category]);

  return (
    <>

     
      <section className="hero">

        <div className="hero-copy">

          <span className="eyebrow">
            A LITTLE SOMETHING FOR EVERY DAY
          </span>

          <h1>
            Good finds.
            <br />
            <em>Better days.</em>
          </h1>

          <p>
            Useful things, simple prices and an easy way to shop.
          </p>

          <a href="#products" className="primary-button">
            Explore Products
          </a>

        </div>

        <div className="hero-art">

          <div className="hero-circle"></div>

          <div className="hero-note">
            <span>
              Little things
              <br />
              make a difference.
            </span>
          </div>

          <div className="hero-emoji">
            🛍️
          </div>

        </div>

      </section>

      
      <section id="products" className="products-section">

        <div className="section-heading">

          <div>
            <span className="eyebrow">OUR COLLECTION</span>
            <h2>Find Your Favourite</h2>
          </div>

          <span className="result-count">
            {products.length} products
          </span>

        </div>

        
        <div className="filter-row">

          <div className="search-box">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
            />

          </div>

         
          <div className="category-list">

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item
                    ? 'category-chip active'
                    : 'category-chip'
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        
        {loading ? (

          <div className="page-message">
            Loading Products...
          </div>

        ) : error ? (

          <div className="notice error">
            {error}
          </div>

        ) : products.length > 0 ? (

          <div className="product-grid">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        ) : (

          <div className="empty-state">
            <h3>No Products Found</h3>
            <p>Try another search or category.</p>
          </div>

        )}

      </section>

    </>
  );
}

export default Home;
