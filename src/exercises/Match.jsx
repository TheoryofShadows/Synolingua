import { useState } from "react";
import { styles } from "../ui/styles.js";
import { shuffle } from "../lib/shuffle.js";

export default function MatchExercise({ item, onOk }) {
  const pairs = item.pairs;
  const [leftOrder] = useState(() => shuffle(pairs.map((_, i) => i)));
  const [rightOrder] = useState(() => shuffle(pairs.map((_, i) => i)));
  const [selLeft, setSelLeft] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState(null);

  const tapLeft = (i) => { if (!matched.has(i)) setSelLeft(i); };
  const tapRight = (i) => {
    if (selLeft === null || matched.has(i)) return;
    if (selLeft === i) {
      const next = new Set([...matched, i]);
      setMatched(next);
      setSelLeft(null);
      setWrong(null);
      if (next.size === pairs.length) setTimeout(onOk, 400);
    } else {
      setWrong({ l: selLeft, r: i });
      setTimeout(() => { setWrong(null); setSelLeft(null); }, 600);
    }
  };

  return (
    <div>
      <div style={styles.promptBox}><p style={{ fontSize: 14, fontWeight: 600, color: "#e8f0f8", fontFamily: "'Fraunces', serif", margin: 0 }}>{item.q}</p></div>
      <div style={{ fontSize: 11, color: "#4a6a7a", textAlign: "center", marginBottom: 10 }}>Tap left → then match on right</div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          {leftOrder.map((i) => {
            const done = matched.has(i);
            const active = selLeft === i;
            const isWrong = wrong?.l === i;
            return (
              <button key={i} onClick={() => tapLeft(i)} style={{
                padding: "10px", borderRadius: 9, fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textAlign: "center", cursor: done ? "default" : "pointer",
                background: done ? "rgba(74,222,128,0.08)" : active ? "rgba(168,216,234,0.15)" : isWrong ? "rgba(248,113,113,0.1)" : "rgba(168,216,234,0.04)",
                border: `2px solid ${done ? "#4ade80" : active ? "#a8d8ea" : isWrong ? "#f87171" : "rgba(168,216,234,0.08)"}`,
                color: done ? "#4ade8088" : "#c8d8e8", opacity: done ? 0.5 : 1, transition: "all 0.2s",
              }}>{pairs[i][0]}</button>
            );
          })}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          {rightOrder.map((i) => {
            const done = matched.has(i);
            const isWrong = wrong?.r === i;
            return (
              <button key={i} onClick={() => tapRight(i)} style={{
                padding: "10px", borderRadius: 9, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textAlign: "center", cursor: done ? "default" : "pointer",
                background: done ? "rgba(74,222,128,0.08)" : isWrong ? "rgba(248,113,113,0.1)" : "rgba(168,216,234,0.04)",
                border: `2px solid ${done ? "#4ade80" : isWrong ? "#f87171" : "rgba(168,216,234,0.08)"}`,
                color: done ? "#4ade8088" : "#a8d8ea", opacity: done ? 0.5 : 1, transition: "all 0.2s",
              }}>{pairs[i][1]}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
