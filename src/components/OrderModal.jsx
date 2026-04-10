// src/components/OrderModal.jsx
import { useState } from "react";
import { palette } from "../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";
import { createOrder } from "../services/api";

const VILLES_AUTRES = [
  "Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kisangani", "Bukavu",
  "Kananga", "Kolwezi", "Butembo", "Uvira", "Beni", "Autre",
];

function OrderModal({ product, selectedSize, onClose, cartItems, isCart }) {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isWeekend = [0, 6].includes(new Date().getDay());
  const items = isCart ? cartItems : [{ ...product, selectedSize, quantity: 1 }];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const multiDiscount = items.length >= 2 || items.reduce((sum, i) => sum + i.quantity, 0) >= 2;
  const discountMulti = multiDiscount ? subtotal * 0.05 : 0;
  const discountWeekend = isWeekend ? subtotal * 0.05 : 0;
  const totalDiscount = discountMulti + discountWeekend;
  const total = subtotal - totalDiscount;

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    city: "", address: "", quartier: "",
    paymentMethod: "", mobileNumber: "", mobileOperator: "", payAmount: "half",
  });
  const [errors, setErrors] = useState({});

  const isGoma = form.city === "Goma";
  const deliveryFee = isGoma ? 1 : 0;
  const finalTotal = total + deliveryFee;
  const amountToPay = form.payAmount === "half" ? Math.ceil(finalTotal / 2) : finalTotal;

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Requis";
    if (!form.lastName.trim()) e.lastName = "Requis";
    if (!form.phone.trim()) e.phone = "Requis";
    if (!form.city) e.city = "Choisissez une ville";
    if (!form.address.trim()) e.address = "Requis";
    if (!form.paymentMethod) e.paymentMethod = "Choisissez un mode de paiement";
    if (form.paymentMethod !== "cash" && !form.mobileNumber.trim()) e.mobileNumber = "Requis";
    if (form.paymentMethod !== "cash" && !form.mobileOperator) e.mobileOperator = "Requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppMessage = () => {
    let msg = "NOUVELLE COMMANDE — HATUA COLLECTION\n";
    msg += "━━━━━━━━━━━━━━━━━━━━━━\n\n";
    msg += "CLIENT\n";
    msg += "Nom: " + form.firstName + " " + form.lastName + "\n";
    msg += "Tel: " + form.phone + "\n";
    if (form.email) msg += "Email: " + form.email + "\n";
    msg += "\nLIVRAISON\n";
    msg += "Ville: " + form.city + "\n";
    msg += "Adresse: " + form.address + "\n";
    if (form.quartier) msg += "Quartier: " + form.quartier + "\n";
    msg += "\nARTICLES COMMANDES\n";
    items.forEach((item, i) => {
      msg += (i + 1) + ". " + item.name + "\n";
      msg += "   Taille: " + item.selectedSize + " | Qte: " + item.quantity + " | $" + (item.price * item.quantity) + "\n";
    });
    msg += "\nRESUME PAIEMENT\n";
    msg += "Sous-total: $" + subtotal + "\n";
    if (discountMulti > 0) msg += "Reduction 2 paires (-5%): -$" + discountMulti.toFixed(2) + "\n";
    if (discountWeekend > 0) msg += "Reduction weekend (-5%): -$" + discountWeekend.toFixed(2) + "\n";
    msg += "Livraison: $" + deliveryFee + "\n";
    msg += "TOTAL: $" + finalTotal.toFixed(2) + " USD\n\n";
    msg += "MODE DE PAIEMENT\n";
    if (form.paymentMethod === "cash") {
      msg += "Paiement a la livraison (Cash)\n";
    } else {
      msg += "Mobile Money — " + form.mobileOperator + "\n";
      msg += "Numero: " + form.mobileNumber + "\n";
      msg += "Montant: $" + amountToPay.toFixed(2) + " (" + (form.payAmount === "half" ? "50% avance" : "100%") + ")\n";
    }
    msg += "\n━━━━━━━━━━━━━━━━━━━━━━\nHatua Collection — Goma, Congo DRC";
    return encodeURIComponent(msg);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    for (const item of items) {
      await createOrder({
        productId: item._id, productName: item.name,
        productPrice: item.price, size: item.selectedSize,
        quantity: item.quantity,
        customerName: form.firstName + " " + form.lastName,
        customerPhone: form.phone,
        notes: "Ville: " + form.city + " | Adresse: " + form.address + " | Paiement: " + form.paymentMethod,
      });
    }
    window.open("https://wa.me/243977721625?text=" + buildWhatsAppMessage(), "_blank");
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    border: "1px solid " + theme.borderStrong,
    fontSize: "14px", fontFamily: '"DM Sans", sans-serif',
    outline: "none", boxSizing: "border-box",
    background: theme.bgInput, color: theme.text,
  };
  const labelStyle = {
    display: "block", fontSize: "11px", letterSpacing: "0.1em",
    textTransform: "uppercase", color: theme.textMuted,
    marginBottom: "6px", fontFamily: '"DM Sans", sans-serif', fontWeight: "600",
  };
  const errStyle = { fontSize: "11px", color: "#dc2626", marginTop: "4px", fontFamily: '"DM Sans", sans-serif' };

  if (submitted) {
    return (
      <ModalWrapper onClose={onClose} theme={theme}>
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ width: "64px", height: "64px", background: palette.brown800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={palette.brown100} strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "26px", color: theme.text, marginBottom: "12px" }}>
            Commande envoyee!
          </h2>
          <p style={{ color: theme.textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "8px", fontFamily: '"DM Sans", sans-serif' }}>
            Votre commande a ete transmise via WhatsApp. Nous vous contactons rapidement pour confirmer.
          </p>
          {isGoma && form.paymentMethod === "cash" && (
            <p style={{ color: palette.brown600, fontSize: "13px", fontWeight: "600", fontFamily: '"DM Sans", sans-serif', marginBottom: "24px" }}>
              Paiement a la livraison — livraison dans 24-48h a Goma
            </p>
          )}
          <button onClick={onClose}
            style={{ padding: "14px 40px", background: palette.brown800, color: palette.brown50, border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Fermer
          </button>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onClose={onClose} theme={theme}>
      <div style={{ background: palette.brown800, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "20px", color: palette.brown50, margin: 0 }}>Finaliser la commande</h2>
          <p style={{ color: palette.brown300, fontSize: "12px", margin: "4px 0 0", fontFamily: '"DM Sans", sans-serif' }}>Hatua Collection — Goma, Congo DRC</p>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: palette.brown400, fontSize: "22px", cursor: "pointer" }}>x</button>
      </div>

      <div style={{ padding: "24px 28px", maxHeight: "68vh", overflowY: "auto" }}>

        <div style={{ background: theme.bgSection, padding: "16px", marginBottom: "24px", borderLeft: "3px solid " + palette.gold }}>
          <h3 style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: theme.textMuted, marginBottom: "12px", marginTop: 0, fontFamily: '"DM Sans", sans-serif' }}>Resume de commande</h3>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {item.images && item.images[0] && (
                  <img src={item.images[0].url} alt="" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                )}
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "500", color: theme.text, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>{item.name}</p>
                  <p style={{ fontSize: "11px", color: theme.textLight, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Taille: {item.selectedSize} — Qte: {item.quantity}</p>
                </div>
              </div>
              <p style={{ fontSize: "13px", fontWeight: "600", color: theme.text, margin: 0 }}>${item.price * item.quantity}</p>
            </div>
          ))}
          <div style={{ borderTop: "1px solid " + theme.border, marginTop: "12px", paddingTop: "12px" }}>
            {discountMulti > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}><span style={{ fontSize: "12px", color: palette.brown600, fontFamily: '"DM Sans", sans-serif' }}>Reduction 2 paires (-5%)</span><span style={{ fontSize: "12px", color: palette.brown600, fontWeight: "600" }}>-${discountMulti.toFixed(2)}</span></div>}
            {discountWeekend > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}><span style={{ fontSize: "12px", color: palette.brown600, fontFamily: '"DM Sans", sans-serif' }}>Reduction weekend (-5%)</span><span style={{ fontSize: "12px", color: palette.brown600, fontWeight: "600" }}>-${discountWeekend.toFixed(2)}</span></div>}
            {isGoma && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}><span style={{ fontSize: "12px", color: theme.textMuted, fontFamily: '"DM Sans", sans-serif' }}>Livraison Goma</span><span style={{ fontSize: "12px", color: theme.text }}>$1</span></div>}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: "700", color: theme.text, fontFamily: '"DM Sans", sans-serif' }}>TOTAL</span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: palette.gold, fontFamily: '"DM Sans", sans-serif' }}>${finalTotal.toFixed(2)} USD</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: "16px", fontFamily: '"DM Sans", sans-serif', fontWeight: "700", borderBottom: "1px solid " + theme.border, paddingBottom: "8px" }}>1. Vos informations</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          <div><label style={labelStyle}>Prenom *</label><input style={{ ...inputStyle, borderColor: errors.firstName ? "#dc2626" : undefined }} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Jean" />{errors.firstName && <p style={errStyle}>{errors.firstName}</p>}</div>
          <div><label style={labelStyle}>Nom *</label><input style={{ ...inputStyle, borderColor: errors.lastName ? "#dc2626" : undefined }} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Dupont" />{errors.lastName && <p style={errStyle}>{errors.lastName}</p>}</div>
          <div><label style={labelStyle}>Telephone * (WhatsApp)</label><input style={{ ...inputStyle, borderColor: errors.phone ? "#dc2626" : undefined }} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+243 97X XXX XXX" />{errors.phone && <p style={errStyle}>{errors.phone}</p>}</div>
          <div><label style={labelStyle}>Email (optionnel)</label><input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@exemple.com" /></div>
        </div>

        <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: "16px", marginTop: "20px", fontFamily: '"DM Sans", sans-serif', fontWeight: "700", borderBottom: "1px solid " + theme.border, paddingBottom: "8px" }}>2. Livraison</p>

        <div style={{ marginBottom: "14px" }}>
          <label style={labelStyle}>Ville *</label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
            <button type="button" onClick={() => setForm({ ...form, city: "Goma", paymentMethod: "", payAmount: "half" })}
              style={{ padding: "10px 20px", border: form.city === "Goma" ? "2px solid " + palette.gold : "1px solid " + theme.borderStrong, background: form.city === "Goma" ? palette.brown800 : "transparent", color: form.city === "Goma" ? palette.brown50 : theme.textMuted, cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: '"DM Sans", sans-serif' }}>
              Goma (1$ — 24-48h)
            </button>
            <div style={{ flex: 1, minWidth: "160px" }}>
              <select value={VILLES_AUTRES.includes(form.city) ? form.city : ""} onChange={(e) => setForm({ ...form, city: e.target.value, paymentMethod: "mobile", payAmount: "full" })}
                style={{ ...inputStyle, borderColor: VILLES_AUTRES.includes(form.city) ? palette.gold : undefined }}>
                <option value="">Autre ville...</option>
                {VILLES_AUTRES.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          {errors.city && <p style={errStyle}>{errors.city}</p>}
          {!isGoma && form.city && <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", padding: "10px 14px", marginBottom: "10px" }}><p style={{ margin: 0, fontSize: "12px", color: "#92400e", fontFamily: '"DM Sans", sans-serif' }}>Hors Goma: paiement 100% requis avant livraison. Delai: 3-7 jours.</p></div>}
        </div>

        {form.city && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
            <div><label style={labelStyle}>Adresse precise *</label><input style={{ ...inputStyle, borderColor: errors.address ? "#dc2626" : undefined }} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Avenue, rue, numero..." />{errors.address && <p style={errStyle}>{errors.address}</p>}</div>
            <div><label style={labelStyle}>Quartier / Reference</label><input style={inputStyle} value={form.quartier} onChange={(e) => setForm({ ...form, quartier: e.target.value })} placeholder="ex: Rond-point..." /></div>
          </div>
        )}

        {form.city && (
          <>
            <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: "16px", fontFamily: '"DM Sans", sans-serif', fontWeight: "700", borderBottom: "1px solid " + theme.border, paddingBottom: "8px" }}>3. Mode de paiement</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
              {isGoma && (
                <button type="button" onClick={() => setForm({ ...form, paymentMethod: "cash" })}
                  style={{ padding: "12px 20px", border: form.paymentMethod === "cash" ? "2px solid " + palette.gold : "1px solid " + theme.borderStrong, background: form.paymentMethod === "cash" ? palette.brown800 : "transparent", color: form.paymentMethod === "cash" ? palette.brown50 : theme.textMuted, cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: '"DM Sans", sans-serif' }}>
                  Cash a la livraison
                </button>
              )}
              <button type="button" onClick={() => setForm({ ...form, paymentMethod: "mobile" })}
                style={{ padding: "12px 20px", border: form.paymentMethod === "mobile" ? "2px solid " + palette.gold : "1px solid " + theme.borderStrong, background: form.paymentMethod === "mobile" ? palette.brown800 : "transparent", color: form.paymentMethod === "mobile" ? palette.brown50 : theme.textMuted, cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: '"DM Sans", sans-serif' }}>
                Mobile Money
              </button>
            </div>
            {errors.paymentMethod && <p style={errStyle}>{errors.paymentMethod}</p>}

            {form.paymentMethod === "mobile" && (
              <div style={{ background: theme.bgSection, padding: "18px", marginBottom: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                  <div><label style={labelStyle}>Operateur *</label><select style={{ ...inputStyle, borderColor: errors.mobileOperator ? "#dc2626" : undefined }} value={form.mobileOperator} onChange={(e) => setForm({ ...form, mobileOperator: e.target.value })}><option value="">Choisir...</option><option value="Airtel Money">Airtel Money</option><option value="M-Pesa">M-Pesa</option><option value="Orange Money">Orange Money</option></select>{errors.mobileOperator && <p style={errStyle}>{errors.mobileOperator}</p>}</div>
                  <div><label style={labelStyle}>Numero *</label><input style={{ ...inputStyle, borderColor: errors.mobileNumber ? "#dc2626" : undefined }} value={form.mobileNumber} onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })} placeholder="+243 9XX XXX XXX" />{errors.mobileNumber && <p style={errStyle}>{errors.mobileNumber}</p>}</div>
                </div>
                {isGoma && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="button" onClick={() => setForm({ ...form, payAmount: "half" })} style={{ flex: 1, padding: "11px", border: form.payAmount === "half" ? "2px solid " + palette.gold : "1px solid " + theme.borderStrong, background: form.payAmount === "half" ? palette.brown800 : "transparent", color: form.payAmount === "half" ? palette.brown50 : theme.textMuted, cursor: "pointer", fontSize: "13px", fontFamily: '"DM Sans", sans-serif' }}>50% — ${(finalTotal / 2).toFixed(2)}</button>
                    <button type="button" onClick={() => setForm({ ...form, payAmount: "full" })} style={{ flex: 1, padding: "11px", border: form.payAmount === "full" ? "2px solid " + palette.gold : "1px solid " + theme.borderStrong, background: form.payAmount === "full" ? palette.brown800 : "transparent", color: form.payAmount === "full" ? palette.brown50 : theme.textMuted, cursor: "pointer", fontSize: "13px", fontFamily: '"DM Sans", sans-serif' }}>100% — ${finalTotal.toFixed(2)}</button>
                  </div>
                )}
                {!isGoma && <div style={{ background: "#dcfce7", padding: "10px 14px", marginTop: "10px" }}><p style={{ margin: 0, fontSize: "12px", color: "#166534", fontFamily: '"DM Sans", sans-serif', fontWeight: "600" }}>Montant: ${finalTotal.toFixed(2)} USD (100% requis hors Goma)</p></div>}
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ padding: "18px 28px", borderTop: "1px solid " + theme.border, background: theme.bgSection }}>
        <button onClick={handleSubmit} disabled={submitting}
          style={{ width: "100%", background: palette.brown800, color: palette.brown50, border: "none", padding: "17px", fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer", fontFamily: '"DM Sans", sans-serif', opacity: submitting ? 0.7 : 1, marginBottom: "8px" }}>
          {submitting ? "Envoi en cours..." : "Confirmer et envoyer via WhatsApp"}
        </button>
        <p style={{ fontSize: "11px", color: theme.textLight, textAlign: "center", margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
          Vous serez redirige vers WhatsApp avec tous vos details
        </p>
      </div>
    </ModalWrapper>
  );
}

function ModalWrapper({ children, onClose, theme }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: "620px", background: theme.bgCard, maxHeight: "92vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}>
        {children}
      </div>
    </div>
  );
}

export default OrderModal;
