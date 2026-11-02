import { products } from '../data/store.js';

export async function getProducts(req, res) {
  const search = (req.query.search || '').trim().toLowerCase();
  const category = req.query.category || '';

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search);

    const matchesCategory =
      !category || category === 'All' || product.category === category;

    return matchesSearch && matchesCategory;
  });

  res.json({ products: filteredProducts });
}

export async function getProductById(req, res) {
  const product = products.find(item => item._id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  res.json({ product: product });
}