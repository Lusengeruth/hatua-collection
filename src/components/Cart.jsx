// src/components/Cart.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { palette } from "../context/ThemeContext";
import OrderModal from "./OrderModal";

function Cart() {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const theme = useTheme();
  const [showOrder, setShowOrder] = useState(false);

  const isWeekend = [0, 6].includes(new Date().getDay());
  const multiDiscount = cartItems.length >= 2 || cartItems.reduce((s, i) => s + i.quantity, 0) >= 2;
  const discountMulti = multiDiscount ? totalPrice * 0.05 : 0;
  const discountWeekend = isWeekend ? totalPrice * 0.05 : 0;
  const totalDiscount = discountMulti + discountWeekend;
  const finalTotal = totalPrice - totalDiscount;

  if (!cartOpen) return null;

  return (
    <>
      {showOrder && (
        <OrderModal
          cartItems={cartItems}
          isCart={true}
          onClose={() => { setShowOrder(false); setCartOpen(false); }}
        />
      )}

      <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
        <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />

        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "100%", maxWidth: "440px",
          background: theme.bgCard, display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.2)",
        }}>

          <div style={{ background: palette.brown800, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: "700", margin: 0, color: palette.brown50 }}>Mon Panier</h2>
              <p style={{ fontSize: "12px", color: palette.brown300, margin: "4px 0 0", fontFamily: '"DM Sans", sans-serif' }}>{totalItems} article{totalItems > 1 ? "s" : ""}</p>
            </div>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: palette.brown300, fontSize: "22px", lineHeight: 1 }}>x</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: "center", paddingTop: "60px" }}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke={theme.textLight} strokeWidth="1" style={{ margin: "0 auto 16px", display: "block" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p style={{ color: theme.textLight, fontSize: "14px", fontFamily: '"DM Sans", sans-serif' }}>Votre panier est vide</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {multiDiscount && (
                  <div style={{ background: palette.brown100, border: "1px solid " + palette.brown200, padding: "10px 14px" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: palette.brown700, fontFamily: '"DM Sans", sans-serif', fontWeight: "600", letterSpacing: "0.05em" }}>
                      Reduction 2 paires -5% appliquee
                    </p>
                  </div>
                )}
                {isWeekend && (
                  <div style={{ background: palette.gold + "20", border: "1px solid " + palette.gold, padding: "10px 14px" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: palette.brown700, fontFamily: '"DM Sans", sans-serif', fontWeight: "600", letterSpacing: "0.05em" }}>
                      Reduction weekend -5% appliquee
                    </p>
                  </div>
                )}
                {cartItems.map((item) => (
                  <div key={item._id + item.selectedSize} style={{ display: "flex", gap: "14px", paddingBottom: "16px", borderBottom: "1px solid " + theme.border }}>
                    <div style={{ width: "76px", height: "76px", background: theme.bgSection, flexShrink: 0, overflow: "hidden" }}>
                      <img src={item.images && item.images[0] ? item.images[0].url : "https://placehold.co/80x80/F0E8D8/9A7050?text=H"} alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", fontWeight: "500", margin: "0 0 4px", color: theme.text }}>{item.name}</h4>
                      <p style={{ fontSize: "12px", color: theme.textLight, margin: "0 0 10px", fontFamily: '"DM Sans", sans-serif' }}>Taille: {item.selectedSize}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid " + theme.borderStrong }}>
                          <button onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity - 1)}
                            style={{ width: "30px", height: "30px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: theme.text }}>-</button>
                          <span style={{ width: "30px", textAlign: "center", fontSize: "13px", color: theme.text, fontFamily: '"DM Sans", sans-serif' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity + 1)}
                            style={{ width: "30px", height: "30px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: theme.text }}>+</button>
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: "700", color: theme.text, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>{"$" + item.price * item.quantity}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item._id, item.selectedSize)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: theme.textLight, fontSize: "18px", alignSelf: "flex-start" }}>x</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div style={{ padding: "20px", borderTop: "1px solid " + theme.border, background: theme.bgSection }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: theme.textMuted, fontSize: "13px", fontFamily: '"DM Sans", sans-serif' }}>Sous-total</span>
                  <span style={{ color: theme.text, fontSize: "13px", fontFamily: '"DM Sans", sans-serif' }}>${totalPrice}</span>
                </div>
                {totalDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: palette.brown600, fontSize: "13px", fontFamily: '"DM Sans", sans-serif' }}>Reductions</span>
                    <span style={{ color: palette.brown600, fontSize: "13px", fontWeight: "600", fontFamily: '"DM Sans", sans-serif' }}>-${totalDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid " + theme.border }}>
                  <span style={{ color: theme.text, fontSize: "15px", fontWeight: "700", fontFamily: '"DM Sans", sans-serif' }}>Total</span>
                  <span style={{ color: palette.gold, fontSize: "18px", fontWeight: "700", fontFamily: '"DM Sans", sans-serif' }}>${finalTotal.toFixed(2)} USD</span>
                </div>
              </div>
              <button onClick={() => setShowOrder(true)}
                style={{
                  width: "100%", background: palette.brown800, color: palette.brown50,
                  border: "none", padding: "16px", fontSize: "13px", fontWeight: "700",
                  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                  fontFamily: '"DM Sans", sans-serif', marginBottom: "8px",
                }}>
                Commander le panier
              </button>
              <p style={{ fontSize: "11px", color: theme.textLight, textAlign: "center", margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                Livraison 1$ a Goma — Partout au Congo DRC
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
