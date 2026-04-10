// src/pages/AboutPage.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import AnnouncementBar from "../components/AnnouncementBar";
import ChatWidget from "../components/ChatWidget";
import { Link } from "react-router-dom";
import { palette } from "../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";

const IconShield = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconTruck = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h4l3 4v5h-7m0 0a2 2 0 01-4 0m4 0a2 2 0 00-4 0" />
  </svg>
);
const IconChat = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

function AboutPage() {
  const theme = useTheme();

  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <AnnouncementBar />
      <Navbar />
      <Cart />
      <ChatWidget />

      {/* HERO */}
      <section style={{ background: palette.brown800, paddingTop: "140px", paddingBottom: "80px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: palette.brown400, marginBottom: "16px", fontFamily: '"DM Sans", sans-serif' }}>
          Goma, Congo DRC
        </p>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: "clamp(36px, 6vw, 64px)", fontWeight: "700", color: palette.brown50, margin: "0 0 24px", lineHeight: 1.1 }}>
          Qui sommes-nous?
        </h1>
        <p style={{ color: palette.brown300, fontSize: "16px", lineHeight: "1.8", maxWidth: "560px", margin: "0 auto", fontFamily: '"DM Sans", sans-serif' }}>
          Hatua Collection — votre boutique de chaussures premium basee a Goma, livrant partout au Congo DRC.
        </p>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "80px 24px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", marginBottom: "80px" }} className="about-grid">
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: palette.gold, marginBottom: "12px", fontFamily: '"DM Sans", sans-serif', fontWeight: "700" }}>
              Notre mission
            </p>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "32px", fontWeight: "700", color: theme.text, margin: "0 0 20px", lineHeight: 1.2 }}>
              Des chaussures premium accessibles a Goma
            </h2>
            <p style={{ color: theme.textMuted, lineHeight: "1.8", fontSize: "15px", marginBottom: "16px", fontFamily: '"DM Sans", sans-serif' }}>
              Hatua Collection est une boutique en ligne specialisee dans la vente de chaussures de qualite — sneakers et chaussures formelles — pour hommes et femmes a Goma et partout au Congo DRC.
            </p>
            <p style={{ color: theme.textMuted, lineHeight: "1.8", fontSize: "15px", fontFamily: '"DM Sans", sans-serif' }}>
              Notre mission est simple: vous offrir des chaussures stylees, confortables et durables, livrees directement chez vous avec rapidite et securite.
            </p>
          </div>
          <div style={{ background: palette.creamDark, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke={palette.brown300} strokeWidth="0.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z" />
            </svg>
          </div>
        </div>

        {/* VALUES */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "80px" }} className="values-grid">
          {[
            { icon: <IconShield />, title: "Qualite garantie", desc: "Chaque chaussure est selectionnee avec soin pour vous offrir le meilleur rapport qualite-prix." },
            { icon: <IconTruck />, title: "Livraison rapide", desc: "Livraison a Goma en 24-48h. Partout au Congo entre 3 et 7 jours maximum." },
            { icon: <IconChat />, title: "Service client", desc: "Notre equipe est disponible sur WhatsApp pour repondre a toutes vos questions." },
          ].map((item) => (
            <div key={item.title} style={{ textAlign: "center", padding: "32px 20px", border: "1px solid " + theme.border, background: theme.bgCard }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>{item.icon}</div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: "18px", fontWeight: "700", marginBottom: "12px", color: theme.text, marginTop: 0 }}>{item.title}</h3>
              <p style={{ color: theme.textMuted, fontSize: "14px", lineHeight: "1.7", margin: 0, fontFamily: '"DM Sans", sans-serif' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "48px", background: palette.brown800 }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "28px", fontWeight: "700", color: palette.brown50, marginBottom: "16px" }}>
            Pret a commander?
          </h2>
          <p style={{ color: palette.brown300, marginBottom: "32px", fontSize: "15px", fontFamily: '"DM Sans", sans-serif' }}>
            Decouvrez notre collection et commandez facilement via WhatsApp.
          </p>
          <Link to="/" style={{ display: "inline-block", background: palette.brown50, color: palette.brown900, padding: "16px 40px", fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
            Voir la collection
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @media(max-width:768px){
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default AboutPage;
