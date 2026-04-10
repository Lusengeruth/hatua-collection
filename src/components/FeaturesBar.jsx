// src/components/FeaturesBar.jsx
import { useTheme } from "../context/ThemeContext";
import { palette } from "../context/ThemeContext";

const features = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Livraison rapide",
    desc: "Goma en 24-48h",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: "Livraison Congo",
    desc: "Partout en 3-7 jours",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Mobile Money",
    desc: "Airtel, M-Pesa, Orange",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Qualite garantie",
    desc: "Chaussures selectionnees",
  },
];

function FeaturesBar() {
  const theme = useTheme();

  return (
    <div style={{
      background: theme.bgCard,
      borderTop: "1px solid " + theme.border,
      borderBottom: "1px solid " + theme.border,
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px",
      }} className="features-grid">
        {features.map((f) => (
          <div key={f.title} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center", gap: "12px", padding: "16px",
          }}>
            <div style={{ color: theme.textMuted }}>{f.icon}</div>
            <div>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: "14px",
                fontWeight: "700", color: theme.text, margin: "0 0 4px",
                letterSpacing: "0.02em",
              }}>
                {f.title}
              </p>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: "12px",
                color: theme.textLight, margin: 0, letterSpacing: "0.02em",
              }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media(max-width:768px){
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

export default FeaturesBar;
