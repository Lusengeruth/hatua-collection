// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { palette } from "../context/ThemeContext";

function ProductCard({ product }) {
  const { _id, name, price, category, images, badge, featured, createdAt } = product;
  const theme = useTheme();

  const imageUrl = images && images[0]
    ? images[0].url
    : "https://placehold.co/600x600/F0E8D8/9A7050?text=HATUA";

  const categoryLabel = category === "sneakers" ? "Sneakers" : "Formelles";

  const isNew = createdAt
    ? (Date.now() - new Date(createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000
    : false;

  const isWeekend = [0, 6].includes(new Date().getDay());
  const discountedPrice = isWeekend ? (price * 0.95).toFixed(0) : null;

  const badgeLabel = badge === "promo" ? "PROMO"
    : badge === "bestseller" ? "BEST SELLER"
    : (badge === "new" || isNew) ? "NOUVEAU"
    : null;

  return (
    <Link to={"/product/" + _id} style={{ textDecoration: "none", display: "block" }} className="group">

      <div style={{
        position: "relative", overflow: "hidden",
        background: theme.bgSection,
        aspectRatio: "1/1", marginBottom: "14px",
      }}>
        <img
          src={imageUrl} alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
          className="group-hover:scale-105"
          onError={(e) => { e.target.src = "https://placehold.co/600x600/F0E8D8/9A7050?text=HATUA"; }}
        />

        {/* BADGE */}
        {badgeLabel && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            background: badge === "promo" ? palette.brown800 : palette.gold,
            color: badge === "promo" ? palette.brown100 : palette.brown900,
            fontSize: "9px", fontWeight: "700", letterSpacing: "0.15em",
            padding: "4px 10px", fontFamily: '"DM Sans", sans-serif',
          }}>
            {badgeLabel}
          </div>
        )}

        {/* WEEKEND BADGE */}
        {isWeekend && !badgeLabel && (
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            background: palette.brown800, color: palette.gold,
            fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em",
            padding: "4px 8px", fontFamily: '"DM Sans", sans-serif',
          }}>
            -5%
          </div>
        )}

        {/* HOVER OVERLAY */}
        <div style={{
          position: "absolute", inset: 0,
          background: palette.brown900 + "00",
          transition: "background 0.3s",
          display: "flex", alignItems: "flex-end",
        }}
          className="group-hover:bg-[rgba(44,26,14,0.15)]"
        >
          <div style={{
            width: "100%", background: palette.brown800,
            padding: "13px", transform: "translateY(100%)",
            transition: "transform 0.3s ease",
          }}
            className="group-hover:translate-y-0"
          >
            <span style={{
              display: "block", textAlign: "center",
              color: palette.brown100, fontSize: "11px",
              fontWeight: "600", letterSpacing: "0.18em",
              textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif',
            }}>
              Voir Details
            </span>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <div>
          <h3 style={{
            fontSize: "14px", fontWeight: "500", color: theme.text,
            margin: "0 0 4px", fontFamily: '"DM Sans", sans-serif',
            transition: "color 0.2s",
          }}
            className="group-hover:text-opacity-60"
          >
            {name}
          </h3>
          <p style={{
            fontSize: "11px", color: theme.textLight,
            letterSpacing: "0.1em", textTransform: "uppercase",
            margin: 0, fontFamily: '"DM Sans", sans-serif',
          }}>
            {categoryLabel}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          {isWeekend ? (
            <>
              <p style={{ fontSize: "14px", fontWeight: "700", color: theme.text, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                ${discountedPrice}
              </p>
              <p style={{ fontSize: "12px", color: theme.textLight, textDecoration: "line-through", margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                ${price}
              </p>
            </>
          ) : (
            <p style={{ fontSize: "14px", fontWeight: "700", color: theme.text, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
              ${price}
            </p>
          )}
        </div>
      </div>

    </Link>
  );
}

export default ProductCard;
