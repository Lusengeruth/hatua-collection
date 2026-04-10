// src/services/api.js
// Central API service - all backend calls go through here

const BASE_URL = "http://localhost:5000/api";

// ==================== PRODUCTS ====================

export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== "all") params.append("category", filters.category);
    if (filters.search) params.append("search", filters.search);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.sort) params.append("sort", filters.sort);

    const res = await fetch(BASE_URL + "/products?" + params.toString());
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.error("Erreur getProducts:", err);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const res = await fetch(BASE_URL + "/products/" + id);
    const data = await res.json();
    return data.product || null;
  } catch (err) {
    console.error("Erreur getProduct:", err);
    return null;
  }
};

export const createProduct = async (formData, token) => {
  try {
    const res = await fetch(BASE_URL + "/products", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur createProduct:", err);
    return { success: false, message: err.message };
  }
};

export const updateProduct = async (id, formData, token) => {
  try {
    const res = await fetch(BASE_URL + "/products/" + id, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur updateProduct:", err);
    return { success: false, message: err.message };
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const res = await fetch(BASE_URL + "/products/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur deleteProduct:", err);
    return { success: false, message: err.message };
  }
};

// ==================== ORDERS ====================

export const createOrder = async (orderData) => {
  try {
    const res = await fetch(BASE_URL + "/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur createOrder:", err);
    return { success: false, message: err.message };
  }
};

export const getOrders = async (token) => {
  try {
    const res = await fetch(BASE_URL + "/orders", {
      headers: { Authorization: "Bearer " + token },
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur getOrders:", err);
    return { success: false, orders: [] };
  }
};

export const updateOrderStatus = async (id, status, token) => {
  try {
    const res = await fetch(BASE_URL + "/orders/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur updateOrderStatus:", err);
    return { success: false, message: err.message };
  }
};

// ==================== ADMIN ====================

export const adminLogin = async (email, password) => {
  try {
    const res = await fetch(BASE_URL + "/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur adminLogin:", err);
    return { success: false, message: err.message };
  }
};

export const getStats = async (token) => {
  try {
    const res = await fetch(BASE_URL + "/admin/stats", {
      headers: { Authorization: "Bearer " + token },
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur getStats:", err);
    return { success: false };
  }
};
