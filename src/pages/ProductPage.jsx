// src/pages/ProductPage.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import AnnouncementBar from "../components/AnnouncementBar";
import OrderModal from "../components/OrderModal";
import { getProduct, getProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { palette } from "../context/ThemeContext";
import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();
  const theme = useTheme();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getProduct(id);
      setProduct(data);
      if (data) {
        const rel = await getProducts({ category: data.category });
        setRelated(rel.filter((p) => p._id !== id).slice(0, 3));
      }
      setLoading(false);
    };
    fetch();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return; }
    addToCart(product, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleOrder = () => {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return; }
    setShowOrder(true);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: theme.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "2px solid " + theme.border, borderTop: "2px solid " + palette.gold, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: theme.bg, display: "flex", flexDirection: "column" }}>
        <AnnouncementBar />
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", paddingTop: "100px" }}>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: "32px", color: theme.text }}>Produit introuvable</p>
          <Link to="/" style={{ color: theme.textLight, textDecoration: "underline", fontFamily: '"DM Sans", sans-serif' }}>Retour a la boutique</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ url: "https://placehold.co/800x800/F0E8D8/9A7050?text=Hatua" }];

  const isWeekend = [0, 6].includes(new Date().getDay());
  const weekendPrice = isWeekend ? (product.price * 0.95).toFixed(2) : null;

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, transition: "background 0.3s" }}>
      <AnnouncementBar />
      <Navbar />
      <Cart />

      {showOrder && (
        <OrderModal
          product={product}
          selectedSize={selectedSize}
          onClose={() => setShowOrder(false)}
          isCart={false}
        />
      )}

      {zoomed && (
        <div onClick={() => setZoomed(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}>
          <img src={images[selectedImage].url} alt="" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }} />
          <button onClick={() => setZoomed(false)} style={{ position: "absolute", top: "24px", right: "32px", background: "none", border: "none", color: "#fff", fontSize: "32px", cursor: "pointer" }}>x</button>
        </div>
      )}

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "120px 24px 80px" }}>

        <Link to="/" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textLight, textDecoration: "none", marginBottom: "40px", display: "inline-block", fontFamily: '"DM Sans", sans-serif' }}>
          Retour a la collection
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start", marginTop: "24px" }} className="product-detail-grid">

          <div>
            <div onClick={() => setZoomed(true)} style={{ background: theme.bgSection, aspectRatio: "1/1", overflow: "hidden", marginBottom: "12px", cursor: "zoom-in", position: "relative" }}>
              <img
                src={images[selectedImage].url}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                onError={(e) => { e.target.src = "https://placehold.co/800x800/F0E8D8/9A7050?text=Hatua"; }}
              />
              <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(44,26,14,0.75)", color: "#fff", padding: "6px 12px", fontSize: "11px", fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.08em" }}>
                ZOOM +
              </div>
              {isWeekend && (
                <div style={{ position: "absolute", top: "12px", left: "12px", background: palette.gold, color: palette.brown900, padding: "6px 14px", fontSize: "11px", fontWeight: "700", fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.1em" }}>
                  -5% WEEKEND
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    style={{ width: "72px", height: "72px", background: theme.bgSection, border: selectedImage === i ? "2px solid " + palette.gold : "2px solid transparent", cursor: "pointer", padding: 0, overflow: "hidden", opacity: selectedImage === i ? 1 : 0.6, transition: "all 0.2s" }}>
                    <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>

            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: palette.gold, marginBottom: "8px", fontFamily: '"DM Sans", sans-serif', fontWeight: "600" }}>
              {product.category === "sneakers" ? "Sneakers" : "Chaussures Formelles"}
            </p>

            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "700", color: theme.text, lineHeight: "1.15", marginBottom: "16px", marginTop: 0 }}>
              {product.name}
            </h1>

            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
              <p style={{ fontSize: "32px", fontWeight: "700", color: theme.text, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                {isWeekend ? "$" + weekendPrice : "$" + product.price}
                <span style={{ fontSize: "14px", fontWeight: "400", color: theme.textLight, marginLeft: "6px" }}>USD</span>
              </p>
              {isWeekend && (
                <p style={{ fontSize: "18px", color: theme.textLight, textDecoration: "line-through", margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                  ${product.price}
                </p>
              )}
            </div>

            {product.description && (
              <p style={{ fontFamily: '"DM Sans", sans-serif', color: theme.textMuted, lineHeight: "1.8", marginBottom: "28px", fontSize: "15px" }}>
                {product.description}
              </p>
            )}

            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: sizeError ? "#dc2626" : theme.textMuted, marginBottom: "12px", fontFamily: '"DM Sans", sans-serif', fontWeight: "600", transition: "color 0.2s" }}>
                {sizeError ? "Choisissez une taille!" : "Choisir la taille"}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(product.sizes || [38, 39, 40, 41, 42, 43, 44, 45]).map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    style={{
                      width: "52px", height: "52px",
                      border: selectedSize === size ? "2px solid " + palette.gold : "1px solid " + theme.borderStrong,
                      background: selectedSize === size ? palette.brown800 : theme.bgCard,
                      color: selectedSize === size ? palette.brown50 : theme.textMuted,
                      fontSize: "13px", fontWeight: "500", cursor: "pointer",
                      fontFamily: '"DM Sans", sans-serif', transition: "all 0.15s",
                    }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleOrder}
              style={{
                width: "100%", background: palette.brown800, color: palette.brown50,
                border: "none", padding: "18px", fontSize: "14px", fontWeight: "700",
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                fontFamily: '"DM Sans", sans-serif', marginBottom: "12px", transition: "background 0.3s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = palette.brown700}
              onMouseLeave={(e) => e.currentTarget.style.background = palette.brown800}
            >
              Commander maintenant
            </button>

            <button onClick={handleAddToCart}
              style={{
                width: "100%",
                background: addedToCart ? "#22c55e" : "transparent",
                color: addedToCart ? "#fff" : theme.text,
                border: "1px solid " + (addedToCart ? "#22c55e" : theme.borderStrong),
                padding: "16px", fontSize: "13px", fontWeight: "600",
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: '"DM Sans", sans-serif',
                marginBottom: "24px", transition: "all 0.3s",
              }}>
              {addedToCart ? "Ajoute au panier!" : "Ajouter au panier"}
            </button>

            <div style={{ padding: "18px 20px", background: theme.bgSection, borderLeft: "3px solid " + palette.gold }}>
              <h4 style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.textLight, marginBottom: "10px", fontFamily: '"DM Sans", sans-serif', marginTop: 0 }}>
                Livraison et Paiement
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={{ fontSize: "13px", color: theme.textMuted, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Goma: 24-48h — 1$ — Cash ou Mobile Money</p>
                <p style={{ fontSize: "13px", color: theme.textMuted, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Autres provinces: 3-7 jours — 100% avance</p>
                <p style={{ fontSize: "13px", color: theme.textMuted, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Airtel Money, M-Pesa, Orange Money</p>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid " + theme.border }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "28px", fontWeight: "700", color: theme.text, marginBottom: "32px" }}>
              Vous aimerez aussi
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
              {related.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}

      </div>

      <Footer />
      <style>{`@media(max-width:768px){.product-detail-grid{grid-template-columns:1fr !important;gap:40px !important;}}`}</style>
    </div>
  );
}

export default ProductPage;
