export const styles = {
  card: { background: "rgba(18,28,42,0.7)", border: "1px solid rgba(168,216,234,0.1)", borderRadius: 20, padding: "26px 22px", width: "100%", maxWidth: 420, backdropFilter: "blur(16px)", boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(168,216,234,0.04)" },
  tag: { fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#a8d8ea", textAlign: "center", marginBottom: 16, textTransform: "uppercase" },
  langLabel: { fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#5a7a8a", textTransform: "uppercase", textAlign: "center", marginBottom: 6 },
  audioBtn: { display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", background: "rgba(168,216,234,0.08)", border: "1px solid rgba(168,216,234,0.18)", borderRadius: 12, padding: "10px 20px", color: "#a8d8ea", fontSize: 14 },
  primaryBtn: { display: "block", margin: "0 auto", padding: "12px 28px", background: "linear-gradient(135deg, #a8d8ea, #7ab8d4)", border: "none", borderRadius: 12, color: "#0c1220", fontSize: 15, fontWeight: 700, letterSpacing: 0.3, boxShadow: "0 4px 16px rgba(168,216,234,0.2)", transition: "all 0.15s" },
  ghostBtn: { padding: "12px 24px", background: "rgba(168,216,234,0.08)", border: "1px solid rgba(168,216,234,0.18)", borderRadius: 12, color: "#a8d8ea", fontSize: 14, fontWeight: 600 },
  becTitle: { fontSize: 20, fontWeight: 700, fontFamily: "'Fraunces', serif", color: "#e8f0f8", textAlign: "center", marginBottom: 14 },
  explainBox: { background: "rgba(168,216,234,0.04)", border: "1px solid rgba(168,216,234,0.08)", borderRadius: 14, padding: 18 },
  keyBox: { background: "rgba(168,216,234,0.05)", border: "1px solid rgba(168,216,234,0.1)", borderRadius: 14, padding: 18, marginBottom: 12, textAlign: "center" },
  funBox: { background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.12)", borderRadius: 14, padding: 16 },
  srcBox: { background: "rgba(196,181,253,0.05)", border: "1px solid rgba(196,181,253,0.1)", borderRadius: 14, padding: 18, textAlign: "center" },
  bodyText: { fontSize: 14, lineHeight: 1.8, color: "#c8d8e8", margin: 0 },
  promptBox: { textAlign: "center", background: "rgba(168,216,234,0.04)", border: "1px solid rgba(168,216,234,0.08)", borderRadius: 14, padding: "14px 14px", marginBottom: 10 },
};

// Layout styles lifted out of the old root component during the Phase 0 split.
styles.page = { padding: "20px 16px 80px", display: "flex", flexDirection: "column", alignItems: "center" };
styles.lessonHeader = { position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "rgba(12,18,32,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(168,216,234,0.06)" };
