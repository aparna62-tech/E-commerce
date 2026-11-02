
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';


const CartContext = createContext(null);


function CartProvider({ children }) {

 
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem('shopease_cart');

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });

 
  useEffect(() => {
    localStorage.setItem('shopease_cart', JSON.stringify(items));
  }, [items]);

  
  function addToCart(product) {

    const existingItem = items.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      setItems(
        items.map((item) => {
          if (item._id === product._id) {
            return {
              ...item,
              quantity: Math.min(item.quantity + 1, product.stock)
            };
          }

          return item;
        })
      );
    } else {
      setItems([
        ...items,
        { ...product, quantity: 1 }
      ]);
    }
  }

 
  function updateQuantity(id, quantity) {

    if (quantity < 1) {
      return;
    }

    setItems(
      items.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: Math.min(quantity, item.stock)
          };
        }

        return item;
      })
    );
  }

 
  function removeFromCart(id) {
    setItems(
      items.filter((item) => item._id !== id)
    );
  }

 
  function clearCart() {
    setItems([]);
  }


  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  const count = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        count,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
