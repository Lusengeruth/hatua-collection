import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product, size) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item._id === product._id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item._id === productId && item.selectedSize === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateWhatsAppMessage = () => {
    let msg = "Bonjour! Je souhaite commander les articles suivants chez Hatua Collection:\n\n";
    cartItems.forEach((item, i) => {
      msg += (i + 1) + ". *" + item.name + "*\n";
      msg += "   Taille: " + item.selectedSize + "\n";
      msg += "   Quantite: " + item.quantity + "\n";
      msg += "   Prix: $" + (item.price * item.quantity) + "\n\n";
    });
    msg += "TOTAL: $" + totalPrice + " USD\n\n";
    msg += "Merci de confirmer la disponibilite et la livraison a Goma.";
    return encodeURIComponent(msg);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
