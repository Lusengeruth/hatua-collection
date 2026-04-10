// src/pages/admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await adminLogin(email, password);
    if (res.success) {
      localStorage.setItem("hatua_admin_token", res.token);
      navigate("/admin/dashboard");
    } else {
      setError(res.message || "Email ou mot de passe incorrect");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      <div style={{ width: '100%', maxWidth: '400px' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>
            HATUA
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.25em', color: '#9A9A9A', textTransform: 'uppercase' }}>
            Panel Administration
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '12px 16px', borderRadius: '2px' }}>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#dc2626', margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9A9A', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@hatuacollection.com"
              style={{ width: '100%', padding: '14px 16px', background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#fff', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9A9A', marginBottom: '8px' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width: '100%', padding: '14px 16px', background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#fff', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '16px', background: '#fff', color: '#0A0A0A', border: 'none', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

        <p style={{ textAlign: 'center', marginTop: '32px', fontFamily: '"DM Sans", sans-serif', fontSize: '12px', color: '#5A5A5A' }}>
          Hatua Collection — Administration
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;
