// src/components/ChatWidget.jsx
import { useState } from "react";
import { palette } from "../context/ThemeContext";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    const url = "https://wa.me/243977721625?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
    setMessage("");
    setOpen(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 999 }}>

      {/* CHAT POPUP */}
      {open && (
        <div style={{
          position: "absolute", bottom: "70px", right: 0,
          width: "300px", background: "#fff",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ background: palette.brown800, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", background: palette.brown600, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" fill={palette.brown100} viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.168 1.542 5.963L0 24l6.18-1.517A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.077-1.413l-.364-.215-3.67.9.938-3.588-.238-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, color: palette.brown100, fontSize: "13px", fontWeight: "700", fontFamily: '"DM Sans", sans-serif' }}>
                  Hatua Collection
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <span style={{ width: "7px", height: "7px", background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
                  <span style={{ fontSize: "11px", color: palette.brown300, fontFamily: '"DM Sans", sans-serif' }}>
                    Nous repondons rapidement
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: palette.brown400, cursor: "pointer", fontSize: "18px", lineHeight: 1 }}>
              x
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "16px 18px", background: palette.cream, minHeight: "80px", display: "flex", alignItems: "center" }}>
            <div style={{ background: "#fff", padding: "12px 14px", maxWidth: "220px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <p style={{ margin: 0, fontSize: "13px", color: palette.brown800, fontFamily: '"DM Sans", sans-serif', lineHeight: "1.5" }}>
                Bonjour! Comment pouvons-nous vous aider aujourd'hui?
              </p>
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "12px 14px", borderTop: "1px solid " + palette.brown100, display: "flex", gap: "8px", background: "#fff" }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ecrivez votre message..."
              style={{
                flex: 1, padding: "8px 12px", border: "1px solid " + palette.brown200,
                fontSize: "13px", fontFamily: '"DM Sans", sans-serif',
                outline: "none", background: palette.cream,
              }}
            />
            <button onClick={sendMessage}
              style={{
                width: "36px", height: "36px", background: palette.brown800,
                border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={palette.brown100} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "52px", height: "52px",
          background: palette.brown800,
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        {open ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={palette.brown100} strokeWidth="2">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" fill={palette.brown100} viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.168 1.542 5.963L0 24l6.18-1.517A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.077-1.413l-.364-.215-3.67.9.938-3.588-.238-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default ChatWidget;
