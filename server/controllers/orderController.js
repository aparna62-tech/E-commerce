import { orders, products, makeId } from '../data/store.js';

export async function createOrder(req, res, next) {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    const requiredFields = ['fullName', 'phone', 'address', 'city', 'pincode'];

    if (!shippingAddress || requiredFields.some(field => !shippingAddress[field]?.trim())) {
      return res.status(400).json({ message: 'Please complete all delivery details.' });
    }

    if (!/^\d{10}$/.test(shippingAddress.phone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits.' });
    }

    if (!/^\d{6}$/.test(shippingAddress.pincode)) {
      return res.status(400).json({ message: 'PIN code must be 6 digits.' });
    }

    let totalAmount = 0;
    const savedItems = [];

    for (const item of items) {
      const quantity = Number(item.quantity);

      if (!item.productId || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: 'Invalid cart item.' });
      }

      const product = products.find(product => product._id === item.productId);

      if (!product) {
        return res.status(400).json({ message: 'Product is not available.' });
      }

      if (quantity > product.stock) {
        return res.status(400).json({
          message: `${product.name} has only ${product.stock} item(s) left.`
        });
      }

      totalAmount += product.price * quantity;

      savedItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantity
      });
    }

    const order = {
      _id: makeId(),
      user: req.user._id,
      items: savedItems,
      shippingAddress: shippingAddress,
      totalAmount: totalAmount,
      status: 'Placed',
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    for (const item of savedItems) {
      const product = products.find(product => product._id === item.product);
      product.stock -= item.quantity;
    }

    res.status(201).json({
      message: 'Order placed successfully!',
      order: order
    });

  } catch (error) {
    next(error);
  }
}

export async function getMyOrders(req, res) {
  const myOrders = orders
    .filter(order => order.user === req.user._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ orders: myOrders });
}