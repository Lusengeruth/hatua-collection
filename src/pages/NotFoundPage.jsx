// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { palette } from "../context/ThemeContext";

function NotFoundPage() {
  return (
    <div style={{
      minHeight: "100vh", background: palette.cream,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "24px", textAlign: "center",
    }}>

      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: "120px", fontWeight: "700", color: palette.brown200, margin: 0, lineHeight: 1 }}>
          404
        </p>
      </div>

      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: "32px", fontWeight: "700", color: palette.brown900, margin: "0 0 16px" }}>
        Page introuvable
      </h1>

      <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "16px", color: palette.brown400, margin: "0 0 40px", maxWidth: "400px", lineHeight: "1.7" }}>
        La page que vous cherchez n'existe pas ou a ete deplacee.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/" style={{
          display: "inline-block", background: palette.brown800, color: "#fff",
          padding: "14px 36px", fontSize: "13px", fontWeight: "700",
          letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
        }}>
          Retour a l'accueil
        </Link>
        <a href="https://wa.me/243977721625" target="_blank" rel="noreferrer"
          style={{
            display: "inline-block", background: "transparent",
            color: palette.brown800, border: "1px solid " + palette.brown300,
            padding: "14px 36px", fontSize: "13px", fontWeight: "700",
            letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
          }}>
          Nous contacter
        </a>
      </div>

      <div style={{ marginTop: "64px" }}>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: "18px", fontWeight: "700", letterSpacing: "0.3em", color: palette.brown800, textTransform: "uppercase" }}>
          HATUA
        </p>
        <p style={{ fontSize: "9px", letterSpacing: "0.3em", color: palette.brown400, textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}>
          COLLECTION
        </p>
      </div>

    </div>
  );
}

export default NotFoundPage;
