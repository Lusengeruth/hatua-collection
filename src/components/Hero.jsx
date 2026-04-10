// src/components/Hero.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SLIDES = [
  "/images/hero/slide-1.jpg",
  "/images/hero/slide-2.jpg",
  "/images/hero/slide-3.jpg",
  "/images/hero/slide-4.jpg",
];

function Hero() {
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [videoWorks, setVideoWorks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  useEffect(() => {
    if (videoWorks) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [videoWorks]);

  const goToCategory = (category) => {
    navigate("/?category=" + category);
    setTimeout(() => {
      const section = document.getElementById("catalog");
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 150);
  };

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      background: "#2C1A0E",
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
    }}>

      {/* VIDEO — objectFit scale-down pour dézoomer */}
      <video
        autoPlay muted loop playsInline
        onCanPlay={() => setVideoWorks(true)}
        onError={() => setVideoWorks(false)}
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          opacity: videoWorks ? 0.7 : 0,
          transition: "opacity 0.8s",
          transform: "scale(0.90)",
          transformOrigin: "center center",
        }}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* SLIDESHOW fallback */}
      {!videoWorks && SLIDES.map((img, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "url('" + img + "')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: slide === i ? 0.75 : 0,
          transition: "opacity 1.5s ease",
        }} />
      ))}

      {/* FALLBACK */}
      {!videoWorks && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "url('/images/hero-shoe.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.65,
        }} />
      )}

      {/* GRADIENT */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to top, rgba(44,26,14,0.92) 0%, rgba(44,26,14,0.35) 55%, rgba(44,26,14,0.05) 100%)",
      }} />

      {/* SLIDE DOTS */}
      {!videoWorks && (
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              style={{ width: slide === i ? "32px" : "8px", height: "4px", background: slide === i ? "#C9A96E" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.4s ease", padding: 0 }} />
          ))}
        </div>
      )}

      {/* CONTENT */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "1280px",
        margin: "0 auto", padding: "0 32px 100px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s ease 0.2s",
      }}>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "20px", fontFamily: '"DM Sans", sans-serif', fontWeight: "500" }}>
          Goma, Congo DRC — Nouvelle Collection
        </p>

        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: "clamp(52px, 9vw, 110px)", fontWeight: "700", color: "#fff", lineHeight: "1.0", marginBottom: "24px", letterSpacing: "-0.02em" }}>
          Chaque
          <br />
          <em style={{ fontStyle: "italic", fontWeight: "400", color: "rgba(255,255,255,0.82)" }}>
            Pas Compte.
          </em>
        </h1>

        <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: '"DM Sans", sans-serif', fontSize: "16px", lineHeight: "1.8", marginBottom: "40px", maxWidth: "480px" }}>
          Sneakers et chaussures formelles selectionnees pour ceux qui avancent avec determination. Livraison a Goma en 24h.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button onClick={() => goToCategory("sneakers")}
            style={{ background: "#fff", color: "#2C1A0E", padding: "16px 40px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "background 0.3s", fontFamily: '"DM Sans", sans-serif' }}
            onMouseEnter={(e) => e.target.style.background = "#EDE0CC"}
            onMouseLeave={(e) => e.target.style.background = "#fff"}
          >
            Voir Sneakers
          </button>
          <button onClick={() => goToCategory("formal")}
            style={{ background: "transparent", color: "#fff", padding: "16px 40px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.3s", fontFamily: '"DM Sans", sans-serif' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            Voir Formelles
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", right: "32px", bottom: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", animation: "heroScroll 2s infinite", zIndex: 10 }}>
        <div style={{ width: "1px", height: "48px", background: "rgba(255,255,255,0.2)" }} />
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', writingMode: "vertical-rl" }}>
          Decouvrir
        </span>
      </div>

      <style>{`@keyframes heroScroll { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
    </section>
  );
}

export default Hero;
