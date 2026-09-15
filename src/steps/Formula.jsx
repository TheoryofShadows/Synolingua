import { useState, useEffect } from "react";
import { styles } from "../ui/styles.js";

export default function FormulaView({ lesson, onNext }) {
  const form = lesson.formula;
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(raf);
  }, [step]);

  if (form.type === "decision") {
    return (
      <div style={{ ...styles.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "all 0.4s ease" }}>
        <div style={styles.tag}>THE FORMULA</div>
        <div style={styles.becTitle}>{form.title}</div>
        <div style={{ textAlign: "center", fontSize: 15, color: "#e8f0f8", fontWeight: 600, marginBottom: 16, padding: "14px 16px", background: "rgba(168,216,234,0.06)", borderRadius: 12, border: "1px solid rgba(168,216,234,0.1)" }}>
          🤔 {form.question}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {form.paths.map((path, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 14, border: `2px solid ${path.color}33`, background: `${path.color}08` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#8a9aaa" }}>{i === 0 ? "↙" : "↘"}</span>
                <span style={{ fontSize: 13, color: "#c8d8e8", flex: 1 }}>{path.label}</span>
                <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Fraunces', serif", color: path.color }}>{path.result}</span>
              </div>
              {path.examples.map((ex, j) => <div key={j} style={{ fontSize: 12, color: "#7a8a9a", paddingLeft: 20, marginTop: 3 }}>• {ex}</div>)}
            </div>
          ))}
        </div>
        <button style={{ ...styles.primaryBtn, marginTop: 20 }} onClick={onNext}>Practice now →</button>
      </div>
    );
  }

  const Piece = ({ piece }) => (
    <div style={{ padding: "10px 14px", borderRadius: 12, background: `${piece.c}15`, border: `2px solid ${piece.c}40` }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: piece.c, fontFamily: "'Fraunces', serif" }}>{piece.t}</div>
      <div style={{ fontSize: 9, color: "#6a7a8a", letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>{piece.r}</div>
    </div>
  );

  const screens = [
    <div key="0">
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#5a7a8a", textTransform: "uppercase", marginBottom: 10 }}>{form.enF.label}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>{form.enF.pieces.map((p, i) => <Piece key={i} piece={p} />)}</div>
      </div>
      <div style={{ textAlign: "center", fontSize: 20, color: "#3a4a5a", margin: "8px 0" }}>↕</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#5a7a8a", textTransform: "uppercase", marginBottom: 10 }}>{form.esF.label}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>{form.esF.pieces.map((p, i) => <Piece key={i} piece={p} />)}</div>
      </div>
    </div>,
    <div key="1">
      <div style={styles.explainBox}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#e8f0f8", marginBottom: 10, textAlign: "center" }}>The math</div>
        {form.rules.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#a8d8ea", fontWeight: 700, minWidth: 18 }}>{i + 1}.</span>
            <span style={{ fontSize: 13, color: "#c8d8e8", lineHeight: 1.6 }}>{line}</span>
          </div>
        ))}
      </div>
    </div>,
    <div key="2">
      <div style={{ fontSize: 14, fontWeight: 700, color: "#e8f0f8", marginBottom: 12, textAlign: "center" }}>See it in action</div>
      {form.examples.map((ex, i) => (
        <div key={i} style={{ padding: 12, borderRadius: 12, background: "rgba(168,216,234,0.03)", border: "1px solid rgba(168,216,234,0.06)", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <span style={{ fontSize: 13, color: "#8a9aaa" }}>{ex.e}</span>
            <span style={{ fontSize: 11, color: "#3a4a5a" }}>→</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#a8d8ea" }}>{ex.s}</span>
          </div>
          <div style={{ fontSize: 11, color: "#5a7a8a", marginTop: 4, fontStyle: "italic" }}>{ex.n}</div>
        </div>
      ))}
    </div>,
  ];

  return (
    <div style={{ ...styles.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "all 0.4s ease" }}>
      <div style={styles.tag}>THE FORMULA</div>
      <div style={styles.becTitle}>{form.title}</div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 16 }}>
        {screens.map((_, i) => <div key={i} style={{ width: i === step ? 22 : 8, height: 8, borderRadius: 4, background: i <= step ? "#a8d8ea" : "#2a3a4a", transition: "all 0.3s" }} />)}
      </div>
      {screens[step]}
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "center" }}>
        {step > 0 && <button style={styles.ghostBtn} onClick={() => setStep(step - 1)}>← Back</button>}
        {step < screens.length - 1
          ? <button style={styles.primaryBtn} onClick={() => setStep(step + 1)}>Continue →</button>
          : <button style={styles.primaryBtn} onClick={onNext}>Practice now →</button>}
      </div>
    </div>
  );
}
