// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import AnnouncementBar from "../components/AnnouncementBar";
import FeaturesBar from "../components/FeaturesBar";
import ChatWidget from "../components/ChatWidget";
import { getProducts } from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { palette } from "../context/ThemeContext";

function HomePage() {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const theme = useTheme();
  const isWeekend = [0, 6].includes(new Date().getDay());

  useEffect(() => {
    const category = searchParams.get("category");
    setActiveFilter(category || "all");
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts({ category: activeFilter, search, sort });
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [activeFilter, search, sort]);

  const handleSearch = (e) => { e.preventDefault(); setSearch(searchInput); };

  const sectionTitle = activeFilter === "all" ? "Toute la Collection"
    : activeFilter === "sneakers" ? "Sneakers"
    : "Chaussures Formelles";

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, transition: "background 0.3s" }}>
      <AnnouncementBar />
      <Navbar />
      <Cart />
      <ChatWidget />

      <div style={{ paddingTop: "100px" }}>
        <Hero />
      </div>

      {/* WEEKEND PROMO BANNER */}
      {isWeekend && (
        <div style={{ background: palette.brown800, padding: "20px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ margin: 0, fontFamily: '"DM Sans", sans-serif', fontSize: "13px", fontWeight: "700", color: palette.gold, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Weekend Special
              </p>
              <p style={{ margin: "4px 0 0", fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: palette.brown200 }}>
                5% de reduction sur tous vos achats aujourd'hui et demain
              </p>
            </div>
            <div style={{ background: palette.gold, color: palette.brown900, padding: "6px 20px", fontSize: "20px", fontWeight: "900", fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.05em" }}>
              -5%
            </div>
          </div>
        </div>
      )}

      <FeaturesBar />

      <section id="catalog" style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 80px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: palette.gold, marginBottom: "6px", fontFamily: '"DM Sans", sans-serif', fontWeight: "700" }}>
                Notre Collection
              </p>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "clamp(26px, 4vw, 38px)", fontWeight: "700", color: theme.text, margin: 0 }}>
                {sectionTitle}
              </h2>
            </div>
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <form onSubmit={handleSearch} style={{ display: "flex", flex: 1, minWidth: "200px", maxWidth: "360px" }}>
              <input type="text" placeholder="Rechercher un modele..."
                value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  flex: 1, padding: "10px 14px",
                  border: "1px solid " + theme.borderStrong,
                  fontSize: "13px", fontFamily: '"DM Sans", sans-serif',
                  outline: "none", background: theme.bgInput, color: theme.text,
                }}
              />
              <button type="submit" style={{
                padding: "10px 18px", background: palette.brown800, color: palette.brown100,
                border: "none", fontSize: "12px", fontWeight: "600",
                cursor: "pointer", fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.06em",
              }}>
                Chercher
              </button>
            </form>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              style={{
                padding: "10px 14px", border: "1px solid " + theme.borderStrong,
                fontSize: "13px", fontFamily: '"DM Sans", sans-serif',
                background: theme.bgInput, cursor: "pointer", outline: "none", color: theme.textMuted,
              }}>
              <option value="newest">Nouveautes</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix decroissant</option>
              <option value="popular">Plus populaires</option>
            </select>
            {search && (
              <button onClick={() => { setSearch(""); setSearchInput(""); }}
                style={{ padding: "10px 14px", border: "1px solid " + theme.border, background: theme.bgCard, fontSize: "12px", cursor: "pointer", color: theme.textLight, fontFamily: '"DM Sans", sans-serif' }}>
                Effacer la recherche
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ width: "36px", height: "36px", border: "2px solid " + theme.border, borderTop: "2px solid " + palette.gold, borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: theme.textLight, fontSize: "13px", fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.08em" }}>Chargement...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: "24px", color: theme.textMuted, marginBottom: "8px" }}>
              Aucun produit trouve
            </p>
            <p style={{ color: theme.textLight, fontSize: "13px", fontFamily: '"DM Sans", sans-serif' }}>
              {search ? 'Aucun resultat pour "' + search + '"' : "La collection sera bientot disponible"}
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}

      </section>

      {/* PROMO BANNER */}
      <div style={{ background: palette.brown800, padding: "64px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px", textAlign: "center" }}
          className="promo-grid">
          <div style={{ padding: "48px 32px", background: palette.brown700, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "36px", fontWeight: "900", color: palette.gold, margin: 0, letterSpacing: "-0.02em" }}>5%</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", fontWeight: "700", color: palette.brown200, margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>2 Paires ou plus</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: palette.brown400, margin: 0 }}>Reduction automatique</p>
          </div>
          <div style={{ padding: "48px 32px", background: palette.brown600, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "36px", fontWeight: "900", color: palette.gold, margin: 0, letterSpacing: "-0.02em" }}>5%</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", fontWeight: "700", color: palette.brown200, margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>Weekend Special</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: palette.brown400, margin: 0 }}>Samedi & Dimanche</p>
          </div>
          <div style={{ padding: "48px 32px", background: palette.brown700, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "36px", fontWeight: "900", color: palette.gold, margin: 0, letterSpacing: "-0.02em" }}>1$</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", fontWeight: "700", color: palette.brown200, margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>Livraison Goma</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: palette.brown400, margin: 0 }}>En 24 a 48 heures</p>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`@media(max-width:640px){.promo-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}

export default HomePage;
