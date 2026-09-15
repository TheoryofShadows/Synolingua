import { useState, useEffect } from "react";
import { styles } from "../ui/styles.js";

export default function Because({ lesson, dir, onNext }) {
  const isFlipped = dir === "reverse" && lesson.becauseFlip;
  const bec = isFlipped ? lesson.becauseFlip : lesson.because;
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(raf);
  }, [step]);

  const screens = [];
  screens.push(<div key="0"><div style={styles.becTitle}>{bec.title}</div><div style={styles.explainBox}><p style={styles.bodyText}>{bec.explain}</p></div></div>);
  if (bec.key || bec.fun) {
    screens.push(
      <div key="1">
        {bec.key && <div style={styles.keyBox}><div style={{ fontSize: 16, marginBottom: 8 }}>🔑</div><p style={styles.bodyText}>{bec.key}</p></div>}
        {bec.fun && <div style={styles.funBox}><div style={{ fontSize: 14, marginBottom: 6 }}>💡</div><p style={{ ...styles.bodyText, color: "#e8d8a8" }}>{bec.fun}</p></div>}
      </div>
    );
  }
  if (bec.src) {
    screens.push(<div key="2"><div style={styles.srcBox}><div style={{ fontSize: 18, marginBottom: 8 }}>🧭</div><p style={styles.bodyText}>{bec.src}</p></div></div>);
  }

  return (
    <div style={{ ...styles.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "all 0.4s ease" }}>
      <div style={styles.tag}>BECAUSE…</div>
      {isFlipped && <div style={{ textAlign: "center", fontSize: 11, color: "#f472b6", marginBottom: 10, fontWeight: 600 }}>🇪🇸→🇺🇸 Flipped for Spanish speakers</div>}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 16 }}>
        {screens.map((_, i) => <div key={i} style={{ width: i === step ? 22 : 8, height: 8, borderRadius: 4, background: i <= step ? "#a8d8ea" : "#2a3a4a", transition: "all 0.3s" }} />)}
      </div>
      {screens[step]}
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "center" }}>
        {step > 0 && <button style={styles.ghostBtn} onClick={() => setStep(step - 1)}>← Back</button>}
        {step < screens.length - 1
          ? <button style={styles.primaryBtn} onClick={() => setStep(step + 1)}>Continue →</button>
          : <button style={styles.primaryBtn} onClick={onNext}>Next →</button>}
      </div>
    </div>
  );
}
