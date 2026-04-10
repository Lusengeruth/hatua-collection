// src/pages/HowToOrderPage.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import AnnouncementBar from "../components/AnnouncementBar";
import ChatWidget from "../components/ChatWidget";
import { Link } from "react-router-dom";
import { palette } from "../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";

// SVG Icons propres
const IconShoe = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z" />
  </svg>
);
const IconRuler = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l3 3m0 0l3-3m-3 3V4m0 14v-3m0 0l-3-3m3 3l3-3M21 17l-3-3m0 0l-3 3m3-3V20m0-14v3m0 0l3 3m-3-3l-3 3" />
  </svg>
);
const IconCart = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const IconChat = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
const IconCard = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
const IconTruck = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h4l3 4v5h-7m0 0a2 2 0 01-4 0m4 0a2 2 0 00-4 0" />
  </svg>
);
const IconCity = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const IconMap = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={palette.brown500} strokeWidth="1.3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const steps = [
  { number: "01", icon: <IconShoe />, title: "Choisissez vos chaussures", desc: "Parcourez notre collection de sneakers et chaussures formelles. Cliquez sur un produit pour voir les details, les photos et les tailles disponibles." },
  { number: "02", icon: <IconRuler />, title: "Selectionnez votre taille", desc: "Sur la page du produit, choisissez votre pointure parmi les tailles disponibles. En cas de doute, contactez-nous sur WhatsApp pour vous conseiller." },
  { number: "03", icon: <IconCart />, title: "Ajoutez au panier", desc: "Cliquez sur 'Ajouter au panier'. Vous pouvez ajouter plusieurs articles avant de passer commande. Votre panier est visible en haut a droite." },
  { number: "04", icon: <IconChat />, title: "Confirmez votre commande", desc: "Remplissez vos informations: nom, telephone, adresse. Choisissez votre mode de paiement et confirmez. Nous recevons votre commande instantanement." },
  { number: "05", icon: <IconCard />, title: "Payez et confirmez", desc: "A Goma: payez 50% ou 100% en avance, ou a la livraison (cash). Ailleurs au Congo: 100% requis avant livraison via Mobile Money." },
  { number: "06", icon: <IconTruck />, title: "Recevez votre commande", desc: "A Goma: livraison en 24-48h pour seulement 1$. Autres provinces: livraison en 3-7 jours, frais a la charge du client selon la destination." },
];

const faqs = [
  { q: "Comment payer?", a: "Nous acceptons Mobile Money (Airtel Money, M-Pesa, Orange Money), et paiement a la livraison (Goma uniquement). Payez 50% en avance ou la totalite." },
  { q: "Puis-je payer a la livraison?", a: "Oui, le paiement a la livraison est disponible uniquement a Goma. Pour les autres provinces, un paiement en avance (50% minimum) est requis." },
  { q: "Combien coute la livraison?", a: "A Goma: seulement 1$ de frais de livraison. Dans les autres provinces: les frais varient selon la destination, a la charge du client." },
  { q: "Quels sont les delais?", a: "Goma: 24h a 48h apres confirmation. Autres villes du Congo: entre 3 et 7 jours maximum selon la destination." },
  { q: "Et si ma taille n est pas disponible?", a: "Contactez-nous sur WhatsApp. Nous faisons tout notre possible pour trouver votre taille ou vous proposer une alternative." },
  { q: "Puis-je retourner un article?", a: "Oui, les retours sont acceptes dans les 48h apres reception si l article est dans son etat original. Contactez-nous sur WhatsApp pour initier un retour." },
];

function HowToOrderPage() {
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
          Simple et rapide
        </p>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: "clamp(32px, 5vw, 60px)", fontWeight: "700", color: palette.brown50, margin: "0 0 20px", lineHeight: 1.1 }}>
          Comment commander?
        </h1>
        <p style={{ color: palette.brown300, fontSize: "16px", lineHeight: "1.8", maxWidth: "560px", margin: "0 auto", fontFamily: '"DM Sans", sans-serif' }}>
          Commander chez Hatua Collection est simple. Suivez ces etapes et recevez vos chaussures rapidement.
        </p>
      </section>

      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px" }}>

        {/* STEPS */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "80px" }}>
          {steps.map((step, i) => (
            <div key={step.number} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "32px", paddingBottom: i < steps.length - 1 ? "48px" : 0, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "52px", height: "52px", background: palette.brown800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: palette.brown100, fontWeight: "700", fontSize: "13px", letterSpacing: "0.05em", fontFamily: '"DM Sans", sans-serif' }}>{step.number}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: "1px", flex: 1, background: theme.border, marginTop: "8px" }} />}
              </div>
              <div style={{ paddingTop: "12px" }}>
                <div style={{ marginBottom: "10px" }}>{step.icon}</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: "22px", fontWeight: "700", color: theme.text, marginBottom: "10px", marginTop: 0 }}>
                  {step.title}
                </h3>
                <p style={{ color: theme.textMuted, lineHeight: "1.8", fontSize: "15px", margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DELIVERY INFO */}
        <div style={{ background: theme.bgSection, padding: "40px", marginBottom: "80px", borderLeft: "4px solid " + palette.gold }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "28px", fontWeight: "700", color: theme.text, marginBottom: "32px", marginTop: 0 }}>
            Informations de livraison
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="delivery-grid">
            <div style={{ background: theme.bgCard, padding: "24px", border: "1px solid " + theme.border }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <IconCity />
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: "18px", fontWeight: "700", margin: 0, color: theme.text }}>Goma</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Delai", value: "24h - 48h", color: "#22c55e" },
                  { label: "Frais de livraison", value: "1$ seulement", color: theme.text },
                  { label: "Paiement", value: "A la livraison OK", color: theme.text },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid " + theme.border }}>
                    <span style={{ fontSize: "13px", color: theme.textMuted, fontFamily: '"DM Sans", sans-serif' }}>{row.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: row.color, fontFamily: '"DM Sans", sans-serif' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: theme.bgCard, padding: "24px", border: "1px solid " + theme.border }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <IconMap />
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: "18px", fontWeight: "700", margin: 0, color: theme.text }}>Autres provinces</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Delai", value: "3 - 7 jours", color: "#f59e0b" },
                  { label: "Frais de livraison", value: "Selon destination", color: theme.text },
                  { label: "Paiement", value: "50% avance requis", color: theme.text },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid " + theme.border }}>
                    <span style={{ fontSize: "13px", color: theme.textMuted, fontFamily: '"DM Sans", sans-serif' }}>{row.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: row.color, fontFamily: '"DM Sans", sans-serif' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: "80px" }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "32px", fontWeight: "700", color: theme.text, marginBottom: "40px", textAlign: "center" }}>
            Questions frequentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ border: "1px solid " + theme.border, padding: "20px 24px", background: theme.bgCard }}>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: theme.text, margin: "0 0 8px", fontFamily: '"DM Sans", sans-serif' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: "14px", color: theme.textMuted, lineHeight: "1.7", margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "48px", background: palette.brown800 }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "24px", fontWeight: "700", color: palette.brown50, marginBottom: "12px" }}>
            Des questions? Contactez-nous!
          </h2>
          <p style={{ color: palette.brown300, marginBottom: "28px", fontSize: "14px", fontFamily: '"DM Sans", sans-serif' }}>
            Notre equipe repond rapidement sur WhatsApp.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/243977721625" target="_blank" rel="noreferrer"
              style={{ display: "inline-block", background: palette.brown600, color: palette.brown50, padding: "14px 32px", fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid " + palette.brown500 }}>
              WhatsApp: +243 977 721 625
            </a>
            <Link to="/" style={{ display: "inline-block", background: palette.brown50, color: palette.brown900, padding: "14px 32px", fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Voir la collection
            </Link>
          </div>
        </div>

      </section>

      <Footer />
      <style>{`@media(max-width:640px){.delivery-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}

export default HowToOrderPage;
