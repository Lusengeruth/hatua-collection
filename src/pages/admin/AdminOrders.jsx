// src/pages/admin/AdminOrders.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../../services/api";

const statusColors = { pending: "#f59e0b", confirmed: "#3b82f6", delivered: "#22c55e", cancelled: "#ef4444" };
const statusLabels = { pending: "En attente", confirmed: "Confirmee", delivered: "Livree", cancelled: "Annulee" };
const statusBg = { pending: "#fef3c7", confirmed: "#dbeafe", delivered: "#dcfce7", cancelled: "#fee2e2" };

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("hatua_admin_token");

  useEffect(() => {
    if (!token) { navigate("/admin"); return; }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getOrders(token);
    if (res.success) setOrders(res.orders);
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    const res = await updateOrderStatus(id, status, token);
    if (res.success) {
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
      setMessage({ text: "Statut mis a jour", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F8F8', fontFamily: '"DM Sans", sans-serif' }}>

      <nav style={{ background: '#0A0A0A', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: '700', color: '#fff', letterSpacing: '0.15em' }}>HATUA</span>
          <span style={{ fontSize: '11px', color: '#9A9A9A', marginLeft: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/admin/dashboard" style={{ color: '#9A9A9A', textDecoration: 'none', fontSize: '13px' }}>Dashboard</Link>
          <Link to="/admin/products" style={{ color: '#9A9A9A', textDecoration: 'none', fontSize: '13px' }}>Produits</Link>
          <Link to="/" style={{ color: '#9A9A9A', textDecoration: 'none', fontSize: '13px' }}>Voir site</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px' }}>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: '700', margin: '0 0 4px' }}>Commandes</h1>
          <p style={{ color: '#9A9A9A', fontSize: '14px', margin: 0 }}>{orders.length} commande{orders.length > 1 ? "s" : ""} au total</p>
        </div>

        {message.text && (
          <div style={{ padding: '14px 20px', marginBottom: '20px', background: '#dcfce7', border: '1px solid #86efac' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#16a34a' }}>{message.text}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { key: "all", label: "Toutes" },
            { key: "pending", label: "En attente" },
            { key: "confirmed", label: "Confirmees" },
            { key: "delivered", label: "Livrees" },
            { key: "cancelled", label: "Annulees" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '8px 18px',
                border: filter === tab.key ? '1px solid #0A0A0A' : '1px solid #E0E0E0',
                background: filter === tab.key ? '#0A0A0A' : '#fff',
                color: filter === tab.key ? '#fff' : '#5A5A5A',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              {tab.label} ({counts[tab.key]})
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: '#9A9A9A' }}>Chargement...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: '#fff', border: '1px solid #F0F0F0' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📦</p>
            <p style={{ color: '#9A9A9A', fontSize: '15px' }}>Aucune commande</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((order) => (
              <div key={order._id} style={{ background: '#fff', border: '1px solid #F0F0F0', padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '56px', height: '56px', background: '#F0F0F0', overflow: 'hidden', flexShrink: 0 }}>
                      {order.product && order.product.images && order.product.images[0] ? (
                        <img src={order.product.images[0].url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👟</div>
                      )}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 4px' }}>{order.productName}</h3>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <p style={{ fontSize: '13px', color: '#9A9A9A', margin: 0 }}>Taille: {order.size || "Non specifie"}</p>
                        <p style={{ fontSize: '13px', color: '#9A9A9A', margin: 0 }}>Qte: {order.quantity}</p>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#0A0A0A', margin: 0 }}>{"$" + order.productPrice}</p>
                        <p style={{ fontSize: '12px', color: '#BBBBBB', margin: 0 }}>
                          {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', background: statusBg[order.status], color: statusColors[order.status], borderRadius: '20px' }}>
                      {statusLabels[order.status]}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      style={{ padding: '8px 12px', border: '1px solid #E0E0E0', fontSize: '12px', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', outline: 'none', background: '#fff' }}
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmer</option>
                      <option value="delivered">Livree</option>
                      <option value="cancelled">Annulee</option>
                    </select>
                    {order.customerPhone && (
                      <a
                        href={"https://wa.me/" + order.customerPhone.replace(/\D/g, '')}
                        target="_blank"
                        rel="noreferrer"
                        style={{ padding: '8px 14px', background: '#25D366', color: '#fff', textDecoration: 'none', fontSize: '12px', fontWeight: '500', fontFamily: '"DM Sans", sans-serif' }}
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
