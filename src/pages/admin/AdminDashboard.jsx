// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStats } from "../../services/api";
import { palette } from "../../context/ThemeContext";

// SVG Icons propres - pas d'emojis
const IconShoe = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={palette.brown400} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z" />
  </svg>
);
const IconRun = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={palette.brown400} strokeWidth="1.5">
    <circle cx="12" cy="5" r="1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l2-5 3 2 2-4M6 10l2-2 4 1 3-2" />
  </svg>
);
const IconFormal = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={palette.brown400} strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="10" rx="1" /><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);
const IconBox = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={palette.brown400} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
const IconClock = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={palette.brown400} strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 3" />
  </svg>
);
const IconCheck = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={palette.brown400} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconTruck = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={palette.brown400} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h4l3 4v5h-7m0 0a2 2 0 01-4 0m4 0a2 2 0 00-4 0" />
  </svg>
);

const statusColors = { pending: "#f59e0b", confirmed: "#3b82f6", delivered: "#22c55e", cancelled: "#ef4444" };
const statusLabels = { pending: "En attente", confirmed: "Confirmee", delivered: "Livree", cancelled: "Annulee" };
const statusBg = { pending: "#fef3c7", confirmed: "#dbeafe", delivered: "#dcfce7", cancelled: "#fee2e2" };

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("hatua_admin_token");

  useEffect(() => {
    if (!token) { navigate("/admin"); return; }
    const fetchStats = async () => {
      const res = await getStats(token);
      if (res.success) setStats(res.stats);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hatua_admin_token");
    navigate("/admin");
  };

  const statCards = stats ? [
    { label: "Produits Total", value: stats.totalProducts, icon: <IconShoe />, color: palette.brown500 },
    { label: "Sneakers", value: stats.sneakersCount, icon: <IconRun />, color: palette.brown600 },
    { label: "Formelles", value: stats.formalCount, icon: <IconFormal />, color: palette.brown700 },
    { label: "Commandes", value: stats.totalOrders, icon: <IconBox />, color: palette.gold },
    { label: "En attente", value: stats.pendingOrders, icon: <IconClock />, color: "#f59e0b" },
    { label: "Confirmees", value: stats.confirmedOrders, icon: <IconCheck />, color: "#3b82f6" },
    { label: "Livrees", value: stats.deliveredOrders, icon: <IconTruck />, color: "#22c55e" },
  ] : [];

  return (
    <div style={{ minHeight: "100vh", background: "#F9F5EE", fontFamily: '"DM Sans", sans-serif' }}>

      <nav style={{ background: palette.brown800, padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: "18px", fontWeight: "700", color: palette.brown50, letterSpacing: "0.2em" }}>HATUA</span>
          <span style={{ fontSize: "11px", color: palette.brown400, letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link to="/admin/products" style={{ color: palette.brown300, textDecoration: "none", fontSize: "13px" }}>Produits</Link>
          <Link to="/admin/orders" style={{ color: palette.brown300, textDecoration: "none", fontSize: "13px" }}>Commandes</Link>
          <Link to="/" style={{ color: palette.brown300, textDecoration: "none", fontSize: "13px" }}>Voir site</Link>
          <button onClick={handleLogout}
            style={{ background: palette.brown700, color: palette.brown200, border: "none", padding: "8px 16px", fontSize: "12px", cursor: "pointer", letterSpacing: "0.06em" }}>
            Deconnexion
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px" }}>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: "32px", fontWeight: "700", color: palette.brown900, margin: "0 0 8px" }}>
            Tableau de bord
          </h1>
          <p style={{ color: palette.brown400, fontSize: "14px", margin: 0 }}>
            Bienvenue sur le panel Hatua Collection
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p style={{ color: palette.brown400 }}>Chargement...</p>
          </div>
        ) : (
          <>
            {/* STAT CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "12px", marginBottom: "48px" }} className="stats-grid">
              {statCards.map((card) => (
                <div key={card.label} style={{
                  background: "#fff", padding: "20px 16px",
                  border: "1px solid #EDE0CC",
                  borderTop: "3px solid " + card.color,
                  display: "flex", flexDirection: "column", gap: "10px",
                }}>
                  <div style={{ color: palette.brown400 }}>{card.icon}</div>
                  <p style={{ fontSize: "28px", fontWeight: "800", color: palette.brown900, margin: 0, fontFamily: '"Playfair Display", serif' }}>
                    {card.value}
                  </p>
                  <p style={{ fontSize: "10px", color: palette.brown400, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {card.label}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

              {/* RECENT ORDERS */}
              <div style={{ background: "#fff", border: "1px solid #EDE0CC", padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: "700", margin: 0, color: palette.brown900 }}>
                    Dernieres commandes
                  </h2>
                  <Link to="/admin/orders" style={{ fontSize: "12px", color: palette.brown400, textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Voir tout
                  </Link>
                </div>
                {stats.recentOrders && stats.recentOrders.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {stats.recentOrders.map((order) => (
                      <div key={order._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#FDFAF5", border: "1px solid #F0E8D8" }}>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: "500", margin: "0 0 2px", color: palette.brown900 }}>
                            {order.product ? order.product.name : order.productName}
                          </p>
                          <p style={{ fontSize: "11px", color: palette.brown400, margin: 0 }}>
                            {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "600", padding: "4px 10px", background: statusBg[order.status], color: statusColors[order.status] }}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: palette.brown400, fontSize: "14px", textAlign: "center", padding: "24px 0" }}>
                    Aucune commande pour le moment
                  </p>
                )}
              </div>

              {/* QUICK ACTIONS */}
              <div style={{ background: "#fff", border: "1px solid #EDE0CC", padding: "24px" }}>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: "700", margin: "0 0 24px", color: palette.brown900 }}>
                  Actions rapides
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Link to="/admin/products" style={{
                    display: "block", padding: "16px 20px", background: palette.brown800, color: "#fff",
                    textDecoration: "none", fontSize: "13px", fontWeight: "600",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={(e) => e.target.style.background = palette.brown700}
                    onMouseLeave={(e) => e.target.style.background = palette.brown800}
                  >
                    + Ajouter un produit
                  </Link>
                  <Link to="/admin/orders" style={{
                    display: "block", padding: "16px 20px", border: "1px solid #D9C4A8", color: palette.brown800,
                    textDecoration: "none", fontSize: "13px", fontWeight: "600",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>
                    Gerer les commandes
                  </Link>
                  <Link to="/" style={{
                    display: "block", padding: "16px 20px", border: "1px solid #D9C4A8", color: palette.brown800,
                    textDecoration: "none", fontSize: "13px", fontWeight: "600",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>
                    Voir la boutique
                  </Link>
                </div>

                {/* REVENUE ESTIMATE */}
                <div style={{ marginTop: "24px", padding: "16px", background: "#FDFAF5", border: "1px solid " + palette.gold }}>
                  <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: palette.brown400, margin: "0 0 8px" }}>
                    Valeur du catalogue
                  </p>
                  <p style={{ fontSize: "24px", fontWeight: "800", color: palette.brown900, margin: 0, fontFamily: '"Playfair Display", serif' }}>
                    ${stats && stats.totalProducts > 0 ? "—" : "0"}
                  </p>
                </div>
              </div>

            </div>
          </>
        )}
      </div>

      <style>{`
        @media(max-width:1024px){ .stats-grid { grid-template-columns: repeat(4,1fr) !important; } }
        @media(max-width:640px){ .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
