import { useState, useEffect } from "react";
import { styles } from "../ui/styles.js";
import { KNOWN_LANGUAGE, LANGUAGES } from "../content/languages.js";

export default function Home({ onPick, prog, dir, toggleDir, targetLang, onLangChange, units, total, loading }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  const activeLang = LANGUAGES.find((l) => l.id === targetLang) || LANGUAGES[0];

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", width: "100%" }}>
      <div style={styles.card}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 34, fontWeight: 800, fontFamily: "'Fraunces', serif", color: "#e8f0f8", letterSpacing: -1 }}>
            Syno<span style={{ color: "#a8d8ea" }}>Lingua</span>
          </div>
          <p style={{ color: "#5a7a8a", fontSize: 13, marginTop: 6 }}>Don't memorize — understand.</p>
        </div>

        {/* Language picker */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#5a7a8a", textTransform: "uppercase", textAlign: "center", marginBottom: 10 }}>Choose a language</div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {LANGUAGES.map((lang) => {
              const selected = lang.id === targetLang;
              return (
                <button
                  key={lang.id}
                  aria-label={`Learn ${lang.name}${lang.available ? "" : " (coming soon)"}`}
                  aria-pressed={selected}
                  onClick={() => onLangChange(lang.id)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    padding: "10px 12px", borderRadius: 12, minWidth: 68,
                    background: selected ? "rgba(168,216,234,0.12)" : "rgba(168,216,234,0.03)",
                    border: `1px solid ${selected ? "rgba(168,216,234,0.35)" : "rgba(168,216,234,0.07)"}`,
                    cursor: "pointer", transition: "all 0.18s", position: "relative",
                    opacity: lang.available ? 1 : 0.55,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{lang.flag}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: selected ? "#a8d8ea" : "#7a8a9a", letterSpacing: 0.3 }}>{lang.name}</span>
                  <span style={{ fontSize: 10, color: selected ? "#6aa8c0" : "#3a4a5a" }}>{lang.native}</span>
                  {!lang.available && (
                    <span style={{ position: "absolute", top: 4, right: 4, fontSize: 8, fontWeight: 700, letterSpacing: 0.8, background: "rgba(251,191,36,0.12)", color: "#fbbf24", padding: "1px 5px", borderRadius: 4, textTransform: "uppercase" }}>soon</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Coming-soon panel for unavailable languages */}
        {!activeLang.available ? (
          <div style={{ textAlign: "center", padding: "30px 16px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{activeLang.flag}</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Fraunces', serif", color: "#e8f0f8", marginBottom: 8 }}>{activeLang.name} is coming soon</div>
            <p style={{ fontSize: 13, color: "#5a7a8a", lineHeight: 1.7 }}>We're building the full {activeLang.name} course with the same depth as Spanish. Check back soon!</p>
          </div>
        ) : (
          <>
            <button aria-label={`Switch learning direction, currently ${dir === "forward" ? `${KNOWN_LANGUAGE.name} to ${activeLang.name}` : `${activeLang.name} to ${KNOWN_LANGUAGE.name}`}`} onClick={toggleDir} style={{ margin: "0 auto 16px", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: "rgba(168,216,234,0.06)", border: "1px solid rgba(168,216,234,0.12)", color: "#a8d8ea", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              {dir === "forward"
                ? `${KNOWN_LANGUAGE.flag} ${KNOWN_LANGUAGE.name} → ${activeLang.flag} ${activeLang.name}`
                : `${activeLang.flag} ${activeLang.name} → ${KNOWN_LANGUAGE.flag} ${KNOWN_LANGUAGE.name}`}
            </button>
            {prog.size > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ width: "100%", height: 8, background: "#1a2a3a", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(prog.size / total) * 100}%`, background: "linear-gradient(90deg, #a8d8ea, #4ade80)", borderRadius: 6, transition: "width 0.5s" }} />
                </div>
                <div style={{ fontSize: 11, color: "#4a6a7a", marginTop: 6 }}>{prog.size}/{total} lessons</div>
              </div>
            )}

        {loading && <div style={{ textAlign: "center", padding: "30px 0", color: "#4a6a7a", fontSize: 13 }}>Loading lessons…</div>}
        {units.map((unit, ui) => {
          const prevDone = ui === 0 || units[ui - 1].lessons.every((l) => prog.has(l.id));
          return (
            <div key={unit.id} style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>{unit.emoji}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#e8f0f8", fontFamily: "'Fraunces', serif" }}>{unit.title}</div>
                  <div style={{ fontSize: 11, color: "#5a6a7a" }}>{unit.sub}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {unit.lessons.map((lesson) => {
                  const done = prog.has(lesson.id);
                  const locked = !prevDone;
                  return (
                    <button key={lesson.id} onClick={() => !locked && onPick(lesson.id)} disabled={locked}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: done ? "rgba(74,222,128,0.04)" : "rgba(168,216,234,0.03)", border: `1px solid ${done ? "rgba(74,222,128,0.12)" : "rgba(168,216,234,0.06)"}`, borderLeft: `3px solid ${done ? "#4ade80" : locked ? "#1a2a3a" : unit.color}`, borderRadius: 12, fontFamily: "'DM Sans', sans-serif", width: "100%", textAlign: "left", cursor: locked ? "not-allowed" : "pointer", opacity: locked ? 0.35 : 1, transition: "all 0.15s" }}>
                      <span style={{ fontSize: 18, width: 28, textAlign: "center" }}>{done ? <span style={{ color: "#4ade80" }}>✓</span> : locked ? "🔒" : lesson.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: done ? "#4ade80" : "#e8f0f8" }}>{lesson.title}</div>
                        <div style={{ fontSize: 11, color: "#4a5a6a", marginTop: 2 }}>{lesson.known.join(", ")} → {lesson.target}</div>
                      </div>
                      {!locked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a4a5a" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
          </>
        )}
      </div>
    </div>
  );
}
