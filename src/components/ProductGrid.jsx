// src/components/ProductGrid.jsx
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <p style={{ fontFamily: '"DM Sans", sans-serif', color: "#9A9A9A", fontSize: "14px", letterSpacing: "0.08em" }}>
          Aucun produit trouve
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "32px 24px",
    }}
      className="product-grid-responsive"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      <style>{`
        @media (max-width: 1024px) { .product-grid-responsive { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px)  { .product-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px)  { .product-grid-responsive { grid-template-columns: repeat(1, 1fr) !important; } }
      `}</style>
    </div>
  );
}

export default ProductGrid;
