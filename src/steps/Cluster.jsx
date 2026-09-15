import { Fade } from "../ui/Fade.jsx";
import { styles } from "../ui/styles.js";
import { speak } from "../lib/speech.js";
import { resolveDirection } from "../content/languages.js";

// Badge colours by kind. `gender-*` came from the old cluster.g, `note` from
// the old cluster.t; both collapsed into one badge field in Phase 1.
const BADGE_STYLES = {
  "gender-m": { background: "rgba(96,165,250,0.12)", color: "#60a5fa" },
  "gender-f": { background: "rgba(244,114,182,0.12)", color: "#f472b6" },
  note: { background: "rgba(168,216,234,0.08)", color: "#a8d8ea" },
};

export default function Cluster({ lesson, lang, dir, onNext }) {
  const { from, to, flipped } = resolveDirection(lang, dir);
  const knownLabel = from.name;
  const targetLabel = to.name;
  const knownText = flipped ? lesson.target : lesson.known.join(" / ");
  const targetText = flipped ? lesson.known.join(" / ") : lesson.target;
  const audioText = flipped ? lesson.known.join(", ") : lesson.target.split(" / ")[0];
  const audioLang = to.ttsLocale;

  return (
    <Fade id={lesson.id + "c"}>
      <div style={styles.card}>
        <div style={styles.tag}>MEANING CLUSTER</div>
        <div style={styles.langLabel}>{knownLabel}</div>
        <div style={{ textAlign: "center", fontSize: 26, fontWeight: 300, color: "#e8f0f8", fontFamily: "'Fraunces', serif", marginBottom: 4 }}>{knownText}</div>
        <div style={{ textAlign: "center", margin: "6px 0" }}>
          <svg width="18" height="32" viewBox="0 0 18 32"><path d="M9 2L9 26M4 20L9 28L14 20" stroke="#a8d8ea" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
        </div>
        <div style={styles.langLabel}>{targetLabel}</div>
        <button aria-label={`Tap to hear: ${audioText}`} onClick={() => speak(audioText, audioLang)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: "100%", background: "rgba(168,216,234,0.04)", border: "1px solid rgba(168,216,234,0.12)", borderRadius: 14, cursor: "pointer", padding: "14px 12px", marginBottom: 14 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#a8d8ea", fontFamily: "'Fraunces', serif" }}>{targetText}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5a8aa0", letterSpacing: 0.8 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 010 7.07" /></svg>
            {lesson.pron}
          </span>
        </button>
        {lesson.note && <p style={{ fontSize: 13, color: "#7a8a9a", textAlign: "center", lineHeight: 1.6, fontStyle: "italic" }}>💡 {lesson.note}</p>}
        <div style={{ marginTop: 14, marginBottom: 16 }}>
          {lesson.clusters.map((c, i) => (
            <button key={i} aria-label={`Listen to ${flipped ? c.known : c.target}`} onClick={() => speak(flipped ? c.known : c.target, to.ttsLocale)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(168,216,234,0.03)", borderRadius: 10, marginBottom: 5, border: "1px solid rgba(168,216,234,0.05)", flexWrap: "wrap", width: "100%", cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ fontSize: 13, color: "#7a8a9a", minWidth: 85 }}>{flipped ? c.target : c.known}</span>
              <span style={{ color: "#3a4a5a", fontSize: 11 }}>→</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#e8f0f8", flex: 1 }}>{flipped ? c.known : c.target}</span>
              {c.badge && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: c.badge.kind === "note" ? 0 : 1, padding: "2px 7px", borderRadius: 5, textTransform: c.badge.kind === "note" ? "none" : "uppercase", ...BADGE_STYLES[c.badge.kind] }}>{c.badge.label}</span>}
              <span style={{ fontSize: 12, opacity: 0.4 }}>🔊</span>
            </button>
          ))}
        </div>
        <button style={styles.primaryBtn} onClick={onNext}>Continue →</button>
      </div>
    </Fade>
  );
}
