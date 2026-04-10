// src/context/ThemeContext.jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const palette = {
  brown900: "#2C1A0E",
  brown800: "#3D2410",
  brown700: "#4A2E18",
  brown600: "#5C3A20",
  brown500: "#7A5230",
  brown400: "#9A7050",
  brown300: "#BFA080",
  brown200: "#D9C4A8",
  brown100: "#EDE0CC",
  brown50:  "#F7F2EA",
  cream:    "#F9F5EE",
  creamDark:"#F0E8D8",
  gold:     "#C9A96E",
  goldLight:"#E8D5A8",
  white:    "#FFFFFF",
  offWhite: "#FDFAF5",
};

const lightTheme = {
  dark: false,
  toggle: () => {},
  bg: palette.cream,
  bgCard: palette.white,
  bgSection: palette.creamDark,
  bgHover: palette.brown100,
  bgInput: palette.white,
  text: palette.brown900,
  textMuted: palette.brown500,
  textLight: palette.brown400,
  border: palette.brown200,
  borderStrong: palette.brown300,
  navBg: palette.brown800,
  navText: palette.brown100,
  navTextMuted: palette.brown300,
  navBorder: palette.brown700,
  btnBg: palette.brown800,
  btnText: palette.white,
  btnOutlineBg: "transparent",
  btnOutlineText: palette.brown800,
  btnOutlineBorder: palette.brown300,
  gold: palette.gold,
  goldLight: palette.goldLight,
};

export function ThemeProvider({ children }) {
  // Always light mode - set body styles once
  if (typeof document !== "undefined") {
    document.body.style.background = palette.cream;
    document.body.style.color = palette.brown900;
  }

  return (
    <ThemeContext.Provider value={lightTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
