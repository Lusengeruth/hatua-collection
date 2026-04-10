// src/components/Footer.jsx

import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { palette } from "../context/ThemeContext";

// Mettez vos vrais liens ici
const SOCIAL = {
  instagram: "https://www.instagram.com/hatuacollection243?igsh=MWozZzMxNXVvY29pNw%3D%3D&utm_source=qr",
  facebook:  "https://www.facebook.com/share/1Ck8TZ9GGm/?mibextid=wwXIfr",
  tiktok:    "https://www.tiktok.com/@hatuacollection243?_r=1&_t=ZS-95IAjAEJnvx",
};

function Footer() {
  const theme = useTheme();

  return (
    <footer style={{ background: theme.bgSection, borderTop: "1px solid " + theme.border }}>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "48px" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: "700", letterSpacing: "0.3em", color: theme.text, margin: 0, textTransform: "uppercase" }}>HATUA</p>
              <p style={{ fontSize: "8px", letterSpacing: "0.3em", color: theme.textLight, margin: "2px 0 0", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}>COLLECTION</p>
            </div>
            <p style={{ color: theme.textMuted, fontSize: "13px", lineHeight: "1.8", maxWidth: "220px", margin: "0 0 20px", fontFamily: '"DM Sans", sans-serif' }}>
              Chaussures premium pour chaque occasion. Depuis Goma, Congo DRC.
            </p>

            {/* Social Icons — cliquables */}
            <div style={{ display: "flex", gap: "10px" }}>
              <a href={SOCIAL.instagram} target="_blank" rel="noreferrer"
                title="Instagram"
                style={{ width: "36px", height: "36px", background: theme.text, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s", textDecoration: "none" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <svg width="16" height="16" fill={theme.bg} viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a href={SOCIAL.facebook} target="_blank" rel="noreferrer"
                title="Facebook"
                style={{ width: "36px", height: "36px", background: theme.text, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s", textDecoration: "none" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <svg width="16" height="16" fill={theme.bg} viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a href={SOCIAL.tiktok} target="_blank" rel="noreferrer"
                title="TikTok"
                style={{ width: "36px", height: "36px", background: theme.text, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s", textDecoration: "none" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <svg width="16" height="16" fill={theme.bg} viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.text, marginBottom: "20px", marginTop: 0, fontFamily: '"DM Sans", sans-serif', fontWeight: "700" }}>Boutique</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Tous les produits", path: "/" },
                { label: "Sneakers", path: "/?category=sneakers" },
                { label: "Chaussures Formelles", path: "/?category=formal" },
              ].map((link) => (
                <Link key={link.label} to={link.path}
                  style={{ fontSize: "13px", color: theme.textMuted, textDecoration: "none", fontFamily: '"DM Sans", sans-serif', transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.target.style.color = theme.text}
                  onMouseLeave={(e) => e.target.style.color = theme.textMuted}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.text, marginBottom: "20px", marginTop: 0, fontFamily: '"DM Sans", sans-serif', fontWeight: "700" }}>Informations</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Qui sommes-nous", path: "/about" },
                { label: "Comment commander", path: "/how-to-order" },
                { label: "Livraison et Retours", path: "/how-to-order" },
              ].map((link) => (
                <Link key={link.label} to={link.path}
                  style={{ fontSize: "13px", color: theme.textMuted, textDecoration: "none", fontFamily: '"DM Sans", sans-serif', transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.target.style.color = theme.text}
                  onMouseLeave={(e) => e.target.style.color = theme.textMuted}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.text, marginBottom: "20px", marginTop: 0, fontFamily: '"DM Sans", sans-serif', fontWeight: "700" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "13px", color: theme.textMuted, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Goma, Nord-Kivu</p>
              <p style={{ fontSize: "13px", color: theme.textMuted, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Congo DRC</p>
              <a href="https://wa.me/243977721625" target="_blank" rel="noreferrer"
                style={{ fontSize: "13px", color: theme.text, textDecoration: "none", fontFamily: '"DM Sans", sans-serif', fontWeight: "600" }}>
                +243 977 721 625
              </a>
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderTop: "1px solid " + theme.border, padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", maxWidth: "1280px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", color: theme.textLight, margin: 0, fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.06em" }}>
          Copyright 2026 Hatua Collection. Tous droits reserves.
        </p>
        <p style={{ fontSize: "11px", color: theme.textLight, margin: 0, fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Goma, Congo DRC
        </p>
      </div>

      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr !important;gap:32px !important;}}`}</style>
    </footer>
  );
}

export default Footer;
