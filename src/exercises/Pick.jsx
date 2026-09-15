import { useState } from "react";
import { styles } from "../ui/styles.js";
import { shuffle } from "../lib/shuffle.js";

export default function PickExercise({ item, onOk, onFail }) {
  const [selected, setSelected] = useState(null);
  const [options] = useState(() => shuffle([item.a, ...item.w]));

  const pick = (opt) => {
    setSelected(opt);
    if (opt === item.a) setTimeout(onOk, 600);
    else setTimeout(onFail, 1000);
  };

  return (
    <div>
      <div style={styles.promptBox}><p style={{ fontSize: 16, fontWeight: 600, color: "#e8f0f8", fontFamily: "'Fraunces', serif", margin: 0 }}>{item.q}</p></div>
      {item.h && <div style={{ textAlign: "center", fontSize: 12, color: "#5a6a7a", fontStyle: "italic", marginBottom: 6 }}>💭 {item.h}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 10 }}>
        {options.map((opt, i) => {
          const isRight = selected && opt === item.a;
          const isWrong = selected === opt && opt !== item.a;
          return (
            <button key={i} onClick={() => !selected && pick(opt)} style={{
              padding: "12px 16px", borderRadius: 12, fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textAlign: "left", cursor: selected ? "default" : "pointer", transition: "all 0.2s",
              background: isRight ? "rgba(74,222,128,0.12)" : isWrong ? "rgba(248,113,113,0.12)" : "rgba(168,216,234,0.04)",
              border: `2px solid ${isRight ? "#4ade80" : isWrong ? "#f87171" : "rgba(168,216,234,0.1)"}`,
              color: isRight ? "#4ade80" : isWrong ? "#f87171" : "#c8d8e8",
            }}>
              {opt}
              {isRight && <span style={{ float: "right" }}>✓</span>}
              {isWrong && <span style={{ float: "right" }}>✗</span>}
            </button>
          );
        })}
      </div>
      {selected && selected !== item.a && <div style={{ textAlign: "center", marginTop: 10, color: "#f87171", fontSize: 13 }}>Answer: <strong style={{ color: "#4ade80" }}>{item.a}</strong></div>}
    </div>
  );
}
