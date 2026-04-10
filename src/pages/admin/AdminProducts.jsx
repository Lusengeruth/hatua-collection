// src/pages/admin/AdminProducts.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/api";
import { palette } from "../../context/ThemeContext";

const SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

const emptyForm = {
  name: "", description: "", price: "",
  category: "sneakers", stock: "10",
  featured: false, badge: "",
  sizes: [38, 39, 40, 41, 42, 43, 44, 45],
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("hatua_admin_token");

  const [form, setForm] = useState(emptyForm);
  const [allImages, setAllImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (!token) { navigate("/admin"); return; }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts({});
    setProducts(data);
    setLoading(false);
  };

  const openCreate = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setAllImages([]);
    setPreviews([]);
    setExistingImages([]);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      category: product.category,
      stock: String(product.stock),
      featured: product.featured,
      badge: product.badge || "",
      sizes: product.sizes || [38, 39, 40, 41, 42, 43, 44, 45],
    });
    setExistingImages(product.images || []);
    setAllImages([]);
    setPreviews([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
    setAllImages([]);
    setPreviews([]);
    setExistingImages([]);
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalExisting = existingImages.length + allImages.length;
    if (totalExisting + newFiles.length > 8) {
      setMessage({ text: "Maximum 8 photos par produit", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }
    setAllImages([...allImages, ...newFiles]);
    setPreviews([...previews, ...newFiles.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const removeNewImage = (index) => {
    setAllImages(allImages.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!editingProduct;

    if (!isEdit && allImages.length === 0) {
      setMessage({ text: "Veuillez ajouter au moins une photo", type: "error" });
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("featured", form.featured);
    formData.append("badge", form.badge);
    formData.append("sizes", JSON.stringify(form.sizes));
    allImages.forEach((img) => formData.append("images", img));

    let res;
    if (isEdit) {
      // Send which images to keep (existing ones not removed)
      const keptIds = existingImages.map((img) => img.public_id).filter(Boolean);
      // We'll handle this by sending remaining images list
      formData.append("keepImages", JSON.stringify(existingImages));
      res = await updateProduct(editingProduct._id, formData, token);
    } else {
      res = await createProduct(formData, token);
    }

    if (res.success) {
      setMessage({ text: isEdit ? "Produit modifie!" : "Produit cree!", type: "success" });
      closeForm();
      fetchProducts();
    } else {
      setMessage({ text: res.message || "Erreur", type: "error" });
    }
    setSubmitting(false);
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm("Supprimer " + name + "?")) return;
    const res = await deleteProduct(id, token);
    if (res.success) {
      setMessage({ text: "Produit supprime", type: "success" });
      fetchProducts();
    }
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    border: "1px solid #D9C4A8", fontSize: "14px",
    fontFamily: '"DM Sans", sans-serif',
    outline: "none", boxSizing: "border-box", background: "#fff",
  };
  const labelStyle = {
    display: "block", fontSize: "11px", letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#7A5230",
    marginBottom: "6px", fontFamily: '"DM Sans", sans-serif', fontWeight: "600",
  };

  const badgeOptions = [
    { value: "", label: "Aucun badge" },
    { value: "new", label: "NOUVEAU" },
    { value: "promo", label: "PROMO" },
    { value: "bestseller", label: "BESTSELLER" },
  ];

  const totalPhotos = existingImages.length + allImages.length;

  return (
    <div style={{ minHeight: "100vh", background: "#F9F5EE", fontFamily: '"DM Sans", sans-serif' }}>

      <nav style={{ background: palette.brown800, padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: "18px", fontWeight: "700", color: palette.brown50, letterSpacing: "0.15em" }}>HATUA</span>
          <span style={{ fontSize: "11px", color: palette.brown400, letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link to="/admin/dashboard" style={{ color: palette.brown300, textDecoration: "none", fontSize: "13px" }}>Dashboard</Link>
          <Link to="/admin/orders" style={{ color: palette.brown300, textDecoration: "none", fontSize: "13px" }}>Commandes</Link>
          <Link to="/" style={{ color: palette.brown300, textDecoration: "none", fontSize: "13px" }}>Voir site</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: "28px", fontWeight: "700", margin: "0 0 4px", color: palette.brown900 }}>Produits</h1>
            <p style={{ color: palette.brown400, fontSize: "14px", margin: 0 }}>{products.length} produit{products.length > 1 ? "s" : ""}</p>
          </div>
          {!showForm && (
            <button onClick={openCreate}
              style={{ padding: "12px 24px", background: palette.brown800, color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              + Nouveau produit
            </button>
          )}
        </div>

        {message.text && (
          <div style={{ padding: "14px 20px", marginBottom: "24px", background: message.type === "success" ? "#dcfce7" : "#fee2e2", border: "1px solid " + (message.type === "success" ? "#86efac" : "#fca5a5") }}>
            <p style={{ margin: 0, fontSize: "14px", color: message.type === "success" ? "#16a34a" : "#dc2626" }}>{message.text}</p>
          </div>
        )}

        {showForm && (
          <div style={{ background: "#fff", border: "1px solid #EDE0CC", padding: "32px", marginBottom: "32px" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "22px", fontWeight: "700", margin: 0, color: palette.brown900 }}>
                {editingProduct ? "Modifier — " + editingProduct.name : "Nouveau produit"}
              </h2>
              <button onClick={closeForm}
                style={{ background: "none", border: "none", cursor: "pointer", color: palette.brown400, fontSize: "22px", lineHeight: 1 }}>x</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={labelStyle}>Nom *</label>
                  <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="ex: Adidas Samba" />
                </div>
                <div>
                  <label style={labelStyle}>Categorie *</label>
                  <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="sneakers">Sneakers</option>
                    <option value="formal">Chaussures Formelles</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Prix (USD) *</label>
                  <input style={inputStyle} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min="0" placeholder="85" />
                </div>
                <div>
                  <label style={labelStyle}>Stock</label>
                  <input style={inputStyle} type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} min="0" placeholder="10" />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Description (optionnelle)</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Decrivez la chaussure..." />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Badge</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {badgeOptions.map((b) => (
                    <button key={b.value} type="button" onClick={() => setForm({ ...form, badge: b.value })}
                      style={{ padding: "8px 18px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: '"DM Sans", sans-serif', border: form.badge === b.value ? "2px solid " + palette.brown800 : "1px solid #D9C4A8", background: form.badge === b.value ? palette.brown800 : "#fff", color: form.badge === b.value ? "#fff" : palette.brown500 }}>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Tailles</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {SIZES.map((size) => (
                    <button key={size} type="button" onClick={() => toggleSize(size)}
                      style={{ width: "48px", height: "40px", cursor: "pointer", border: form.sizes.includes(size) ? "2px solid " + palette.brown800 : "1px solid #D9C4A8", background: form.sizes.includes(size) ? palette.brown800 : "#fff", color: form.sizes.includes(size) ? "#fff" : palette.brown500, fontSize: "13px", fontFamily: '"DM Sans", sans-serif' }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* PHOTOS */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Photos — {totalPhotos}/8</label>

                {/* Photos existantes (mode edit) */}
                {existingImages.length > 0 && (
                  <div style={{ marginBottom: "12px" }}>
                    <p style={{ fontSize: "11px", color: palette.brown400, marginBottom: "8px", fontFamily: '"DM Sans", sans-serif', textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Photos actuelles
                    </p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {existingImages.map((img, i) => (
                        <div key={i} style={{ position: "relative" }}>
                          <img src={img.url} alt="" style={{ width: "90px", height: "90px", objectFit: "cover", border: "2px solid #D9C4A8" }} />
                          {i === 0 && (
                            <span style={{ position: "absolute", bottom: "2px", left: "2px", background: palette.brown800, color: "#fff", fontSize: "9px", padding: "2px 6px" }}>PRINCIPALE</span>
                          )}
                          <button type="button" onClick={() => removeExistingImage(i)}
                            style={{ position: "absolute", top: "-8px", right: "-8px", width: "20px", height: "20px", borderRadius: "50%", background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nouvelles photos */}
                {previews.length > 0 && (
                  <div style={{ marginBottom: "12px" }}>
                    <p style={{ fontSize: "11px", color: palette.brown400, marginBottom: "8px", fontFamily: '"DM Sans", sans-serif', textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Nouvelles photos
                    </p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {previews.map((url, i) => (
                        <div key={i} style={{ position: "relative" }}>
                          <img src={url} alt="" style={{ width: "90px", height: "90px", objectFit: "cover", border: "2px solid " + palette.gold }} />
                          <button type="button" onClick={() => removeNewImage(i)}
                            style={{ position: "absolute", top: "-8px", right: "-8px", width: "20px", height: "20px", borderRadius: "50%", background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {totalPhotos < 8 && (
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: palette.brown800, color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter des photos
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                  </label>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                <label htmlFor="featured" style={{ fontSize: "14px", color: palette.brown500, cursor: "pointer", fontFamily: '"DM Sans", sans-serif' }}>Produit mis en avant (featured)</label>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button type="submit" disabled={submitting}
                  style={{ padding: "16px 40px", background: palette.brown800, color: "#fff", border: "none", fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Enregistrement..." : editingProduct ? "Enregistrer les modifications" : "Creer le produit"}
                </button>
                <button type="button" onClick={closeForm}
                  style={{ padding: "16px 24px", background: "#F0E8D8", color: palette.brown800, border: "none", fontSize: "13px", cursor: "pointer" }}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p style={{ color: palette.brown400 }}>Chargement...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", background: "#fff", border: "1px solid #EDE0CC" }}>
            <p style={{ color: palette.brown400, fontSize: "15px", marginBottom: "24px" }}>Aucun produit. Ajoutez votre premier produit!</p>
            <button onClick={openCreate}
              style={{ padding: "14px 32px", background: palette.brown800, color: "#fff", border: "none", fontSize: "13px", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              + Ajouter un produit
            </button>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid #EDE0CC", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #EDE0CC" }}>
                  {["Photo", "Nom", "Photos", "Categorie", "Prix", "Stock", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: palette.brown400, fontWeight: "600" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} style={{ borderBottom: "1px solid #F7F2EA" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#FDFAF5"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ width: "56px", height: "56px", background: "#F0E8D8", overflow: "hidden" }}>
                        <img src={product.images && product.images[0] ? product.images[0].url : "https://placehold.co/56x56/F0E8D8/9A7050?text=H"} alt={product.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500", color: palette.brown900 }}>
                      {product.name}
                      {product.badge && <span style={{ marginLeft: "6px", fontSize: "10px", background: palette.brown800, color: "#fff", padding: "2px 8px" }}>{product.badge.toUpperCase()}</span>}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "3px" }}>
                        {product.images && product.images.slice(0, 3).map((img, i) => (
                          <img key={i} src={img.url} alt="" style={{ width: "28px", height: "28px", objectFit: "cover", border: "1px solid #EDE0CC" }} />
                        ))}
                      </div>
                      <p style={{ fontSize: "11px", color: palette.brown400, margin: "4px 0 0" }}>{product.images ? product.images.length : 0} photo{product.images && product.images.length > 1 ? "s" : ""}</p>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: palette.brown400, textTransform: "uppercase", letterSpacing: "0.08em" }}>{product.category}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "700", color: palette.brown900 }}>${product.price}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: product.stock < 3 ? "#ef4444" : "#22c55e", fontWeight: "600" }}>{product.stock}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => openEdit(product)}
                          style={{ padding: "6px 14px", background: palette.brown100, border: "1px solid " + palette.brown300, color: palette.brown800, fontSize: "12px", cursor: "pointer", fontWeight: "600" }}>
                          Modifier
                        </button>
                        <button onClick={() => handleDelete(product._id, product.name)}
                          style={{ padding: "6px 14px", background: "#fee2e2", border: "1px solid #fca5a5", color: "#dc2626", fontSize: "12px", cursor: "pointer" }}>
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
