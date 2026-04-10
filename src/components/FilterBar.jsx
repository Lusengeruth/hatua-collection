// src/components/FilterBar.jsx
import { useTheme } from "../context/ThemeContext";
import { palette } from "../context/ThemeContext";

const filters = [
  { label: "Tous", value: "all" },
  { label: "Sneakers", value: "sneakers" },
  { label: "Formelles", value: "formal" },
];

function FilterBar({ active, onChange }) {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          style={{
            padding: "9px 22px",
            fontSize: "11px", fontWeight: "600",
            letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: '"DM Sans", sans-serif', cursor: "pointer",
            transition: "all 0.2s ease",
            background: active === filter.value ? palette.brown800 : "transparent",
            color: active === filter.value ? palette.brown100 : theme.textMuted,
            border: active === filter.value
              ? "1px solid " + palette.brown800
              : "1px solid " + theme.borderStrong,
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
