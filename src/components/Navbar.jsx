// src/components/Navbar.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { palette } from "../context/ThemeContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { setMenuOpen(false); }, [location]);

  // Navigation vers categorie + scroll vers catalogue
  const goToCategory = (path) => {
    navigate(path);
    setTimeout(() => {
      const section = document.getElementById("catalog");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  const navLinks = [
    { label: "Accueil", path: "/", onClick: () => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
    { label: "Sneakers", path: "/?category=sneakers", onClick: () => goToCategory("/?category=sneakers") },
    { label: "Formelles", path: "/?category=formal", onClick: () => goToCategory("/?category=formal") },
    { label: "Commander", path: "/how-to-order", onClick: () => navigate("/how-to-order") },
    { label: "A Propos", path: "/about", onClick: () => navigate("/about") },
  ];

  return (
    <nav style={{
      position: "fixed", top: "36px", left: 0, right: 0, zIndex: 50,
      background: palette.brown800,
      borderBottom: "1px solid " + palette.brown700,
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 32px",
        height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* LOGO */}
        <button onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", lineHeight: 1, padding: 0 }}>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: "700", letterSpacing: "0.35em", color: palette.brown50, textTransform: "uppercase" }}>
            HATUA
          </div>
          <div style={{ fontSize: "8px", letterSpacing: "0.35em", color: palette.brown400, textTransform: "uppercase", marginTop: "-2px", fontFamily: '"DM Sans", sans-serif' }}>
            COLLECTION
          </div>
        </button>

        {/* DESKTOP NAV */}
        <ul style={{ display: "none", alignItems: "center", gap: "32px", listStyle: "none", margin: 0, padding: 0 }} className="md:flex hidden">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path.split("?")[0] && !link.path.includes("?");
            return (
              <li key={link.label}>
                <button
                  onClick={link.onClick}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: isActive ? palette.brown100 : palette.brown300,
                    fontSize: "12px", fontWeight: "500",
                    letterSpacing: "0.1em", fontFamily: '"DM Sans", sans-serif',
                    textTransform: "uppercase", transition: "color 0.2s",
                    borderBottom: isActive ? "1px solid " + palette.gold : "1px solid transparent",
                    paddingBottom: "2px", padding: "0 0 2px 0",
                  }}
                  onMouseEnter={(e) => e.target.style.color = palette.brown100}
                  onMouseLeave={(e) => e.target.style.color = isActive ? palette.brown100 : palette.brown300}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          <button onClick={() => setCartOpen(true)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={palette.brown200} strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: "-2px", right: "-4px",
                background: palette.gold, color: palette.brown900,
                borderRadius: "50%", width: "17px", height: "17px",
                fontSize: "10px", fontWeight: "700",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: '"DM Sans", sans-serif',
              }}>
                {totalItems}
              </span>
            )}
          </button>

          <a href="https://wa.me/243977721625" target="_blank" rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: palette.brown700, color: palette.brown100,
              padding: "8px 18px", textDecoration: "none",
              fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em",
              fontFamily: '"DM Sans", sans-serif', textTransform: "uppercase",
              border: "1px solid " + palette.brown600, transition: "background 0.2s",
            }}
            className="hidden md:flex"
            onMouseEnter={(e) => e.currentTarget.style.background = palette.brown600}
            onMouseLeave={(e) => e.currentTarget.style.background = palette.brown700}
          >
            <svg width="14" height="14" fill={palette.brown200} viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.168 1.542 5.963L0 24l6.18-1.517A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.077-1.413l-.364-.215-3.67.9.938-3.588-.238-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
            WhatsApp
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            className="md:hidden">
            {menuOpen ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={palette.brown200} strokeWidth="1.5"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={palette.brown200} strokeWidth="1.5"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ background: palette.brown800, borderTop: "1px solid " + palette.brown700, padding: "24px 32px", display: "flex", flexDirection: "column", gap: "18px" }}>
          {navLinks.map((link) => (
            <button key={link.label}
              onClick={() => { link.onClick(); setMenuOpen(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: palette.brown200, fontSize: "13px", fontWeight: "500", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', textAlign: "left", padding: 0 }}>
              {link.label}
            </button>
          ))}
          <a href="https://wa.me/243977721625" target="_blank" rel="noreferrer"
            style={{ color: palette.brown300, textDecoration: "none", fontSize: "13px", fontFamily: '"DM Sans", sans-serif' }}>
            +243 977 721 625
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
