import { useState } from "react";
import { Fade } from "../ui/Fade.jsx";
import { styles } from "../ui/styles.js";
import PickExercise from "../exercises/Pick.jsx";
import MatchExercise from "../exercises/Match.jsx";

export default function PracticeScreen({ lesson, onDone }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const items = lesson.practice;
  const done = idx >= items.length;

  const handleOk = () => { setScore((s) => s + 1); setShowNext(true); };
  const handleFail = () => { setShowNext(true); };
  const advance = () => { setIdx((i) => i + 1); setShowNext(false); };

  if (done) {
    return (
      <Fade id="done">
        <div style={styles.card}>
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{score === items.length ? "🎉" : "💪"}</div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Fraunces', serif", color: "#e8f0f8", marginBottom: 6 }}>
              {score === items.length ? "Perfect!" : "Lesson Complete!"}
            </div>
            <div style={{ fontSize: 14, color: "#5a7a8a", marginBottom: 22 }}>{score}/{items.length} correct</div>
            <button style={styles.primaryBtn} onClick={onDone}>Back to lessons →</button>
          </div>
        </div>
      </Fade>
    );
  }

  const item = items[idx];
  return (
    <Fade id={lesson.id + "p" + idx}>
      <div style={styles.card}>
        <div style={styles.tag}>PRACTICE</div>
        <div style={{ width: "100%", height: 6, background: "#1a2a3a", borderRadius: 4, marginBottom: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(idx / items.length) * 100}%`, background: "linear-gradient(90deg, #a8d8ea, #4ade80)", borderRadius: 4, transition: "width 0.4s" }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "#3a4a5a", letterSpacing: 1, marginBottom: 12 }}>{idx + 1}/{items.length}</div>
        {item.type === "pick" && <PickExercise key={idx} item={item} onOk={handleOk} onFail={handleFail} />}
        {item.type === "match" && <MatchExercise key={idx} item={item} onOk={handleOk} />}
        {showNext && (
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button style={styles.primaryBtn} onClick={advance}>{idx < items.length - 1 ? "Next →" : "Finish →"}</button>
          </div>
        )}
      </div>
    </Fade>
  );
}
