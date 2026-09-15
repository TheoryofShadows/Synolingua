import { useState } from "react";
import { Fade } from "../ui/Fade.jsx";
import { styles } from "../ui/styles.js";
import { speak } from "../lib/speech.js";
import { shuffle } from "../lib/shuffle.js";

export default function Placement({ lesson, dir, onNext }) {
  const pl = lesson.placement;
  const flipped = dir === "es-en";
  // Reference = the language the learner already knows (shown as static chips)
  // Target = the language they're arranging into the correct order
  const refWords = flipped ? pl.es : pl.en;
  const targetWords = flipped ? pl.en : pl.es;
  const refLabel = flipped ? "Spanish" : "English";
  const targetLabel = flipped ? "English — tap to arrange" : "Spanish — tap to arrange";
  const targetLang = flipped ? "en-US" : "es-ES";

  const [placed, setPlaced] = useState(Array(targetWords.length).fill(null));
  const [bank, setBank] = useState(() => shuffle([...targetWords]));
  const [correct, setCorrect] = useState(false);

  const tapBank = (word) => {
    const slot = placed.indexOf(null);
    if (slot === -1) return;
    const newPlaced = [...placed];
    newPlaced[slot] = word;
    const idx = bank.indexOf(word);
    const newBank = [...bank];
    newBank.splice(idx, 1);
    setPlaced(newPlaced);
    setBank(newBank);
    if (newPlaced.every((w, i) => w === targetWords[i])) {
      setTimeout(() => { setCorrect(true); speak(targetWords.join(" "), targetLang); }, 300);
    }
  };

  const tapSlot = (i) => {
    if (placed[i] === null || correct) return;
    setBank((b) => [...b, placed[i]]);
    setPlaced((p) => { const n = [...p]; n[i] = null; return n; });
  };

  return (
    <Fade id={lesson.id + "pl"}>
      <div style={styles.card}>
        <div style={styles.tag}>PLACEMENT WEAVER</div>
        <div style={styles.langLabel}>{refLabel}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {refWords.map((w, i) => <span key={i} style={{ padding: "8px 14px", background: "rgba(168,216,234,0.06)", borderRadius: 10, fontSize: 15, fontWeight: 500, color: "#e8f0f8", border: "1px solid rgba(168,216,234,0.08)" }}>{w}</span>)}
        </div>
        <div style={styles.langLabel}>{targetLabel}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {targetWords.map((_, i) => (
            <button key={i} onClick={() => tapSlot(i)} aria-label={placed[i] ? `Remove ${placed[i]} from slot ${i + 1}` : `Empty slot ${i + 1}`} disabled={!placed[i] || correct} style={{ minWidth: 55, minHeight: 40, padding: "8px 14px", borderRadius: 10, border: `2px dashed ${placed[i] ? (correct ? "#4ade80" : "#a8d8ea") : "#3a4a5a"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, color: "#a8d8ea", background: placed[i] ? "rgba(168,216,234,0.08)" : "rgba(30,40,55,0.5)", cursor: placed[i] && !correct ? "pointer" : "default", transition: "all 0.2s" }}>
              {placed[i] || ""}
            </button>
          ))}
        </div>
        {!correct && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 14 }}>
            {bank.map((w, i) => (
              <button key={`${i}-${w}`} onClick={() => tapBank(w)} style={{ padding: "10px 16px", background: "rgba(168,216,234,0.12)", border: "1px solid rgba(168,216,234,0.25)", borderRadius: 12, color: "#a8d8ea", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{w}</button>
            ))}
          </div>
        )}
        {correct && (
          <>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>✓</div>
              <div style={{ color: "#4ade80", fontSize: 14, fontWeight: 600 }}>Perfect!</div>
            </div>
            <button style={styles.primaryBtn} onClick={onNext}>Continue →</button>
          </>
        )}
      </div>
    </Fade>
  );
}
