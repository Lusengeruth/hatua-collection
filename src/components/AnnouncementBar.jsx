// src/components/AnnouncementBar.jsx
import { palette } from "../context/ThemeContext";

const MESSAGES = [
  "Livraison a Goma en 24-48h — 1$ seulement",
  "2 paires achetees = 5% de reduction automatique",
  "Weekend special — 5% de reduction sur tous vos achats",
  "Livraison disponible partout au Congo DRC",
  "Paiement a la livraison disponible a Goma",
  "Airtel Money — M-Pesa — Orange Money acceptes",
];

function AnnouncementBar() {
  return (
    <div style={{
      background: palette.brown900,
      color: palette.brown300,
      height: "36px",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      position: "relative",
      zIndex: 60,
    }}>
      <div style={{
        display: "flex",
        whiteSpace: "nowrap",
        animation: "marquee 35s linear infinite",
      }}>
        {[0, 1].map((copy) => (
          <span key={copy} style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: "500",
            paddingRight: "80px",
          }}>
            {MESSAGES.map((msg, i) => (
              <span key={i}>
                <span style={{ color: palette.brown100 }}>{msg}</span>
                <span style={{ color: palette.brown600, margin: "0 20px" }}>////</span>
              </span>
            ))}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default AnnouncementBar;
