import { randomUUID } from 'node:crypto';

export const products = [
  {
    _id: 'p1',
    name: 'Everyday Backpack',
    description: 'A simple, roomy backpack for college, work and short trips. It has a padded laptop sleeve and comfortable shoulder straps.',
    price: 1299,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900',
    stock: 18
  },
  {
    _id: 'p2',
    name: 'Classic White Sneakers',
    description: 'Clean everyday sneakers that work with almost any casual outfit. Lightweight and easy to style.',
    price: 1899,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900',
    stock: 15
  },
  {
    _id: 'p3',
    name: 'Wireless Headphones',
    description: 'Comfortable over-ear headphones for music, online classes and calls. Includes simple on-ear controls.',
    price: 2499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900',
    stock: 12
  },
  {
    _id: 'p4',
    name: 'Minimal Desk Lamp',
    description: 'A neat desk lamp for late-night reading and study sessions. Its compact shape fits on a small desk.',
    price: 999,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900',
    stock: 20
  },
  {
    _id: 'p5',
    name: 'Ceramic Coffee Mug',
    description: 'A sturdy ceramic mug for your morning coffee, tea or hot chocolate. Simple design and easy to clean.',
    price: 349,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900',
    stock: 30
  },
  {
    _id: 'p6',
    name: 'Classic Wrist Watch',
    description: 'A minimal everyday watch with a clean dial and comfortable strap. A simple addition to casual outfits.',
    price: 1599,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900',
    stock: 10
  },
  {
    _id: 'p7',
    name: 'Cotton T-Shirt',
    description: 'A soft cotton t-shirt with a relaxed fit. Comfortable for everyday wear.',
    price: 599,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900',
    stock: 25
  },
  {
    _id: 'p8',
    name: 'Running Shoes',
    description: 'Lightweight shoes for a daily walk or a quick run. Cushioned sole for everyday comfort.',
    price: 2199,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900',
    stock: 14
  }
];

export const users = [];
export const orders = [];

export function makeId() {
  return randomUUID();
}