import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { getCourse, totalLessons } from "./content/index.js";
import { LANGUAGES } from "./content/languages.js";
import { doneSet, loadProgress, markDone, saveProgress } from "./lib/progress.js";
import { styles } from "./ui/styles.js";
import Home from "./screens/Home.jsx";
import Lesson from "./screens/Lesson.jsx";

const DEFAULT_LANG = "es";
const GLOBAL_CSS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,700;9..144,800&family=DM+Sans:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } button { cursor: pointer; font-family: 'DM Sans', sans-serif; } button:active { transform: scale(0.97); } button:focus-visible { outline: 2px solid #a8d8ea; outline-offset: 2px; } @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }`;

function HomeRoute({ progress, dir, toggleDir }) {
  const { lang } = useParams();
  const navigate = useNavigate();

  if (!LANGUAGES.some((l) => l.id === lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }

  return (
    <div style={styles.page}>
      <Home
        units={getCourse(lang) || []}
        total={totalLessons(lang)}
        prog={doneSet(progress, lang)}
        targetLang={lang}
        onLangChange={(next) => navigate(`/${next}`)}
        onPick={(lessonId) => navigate(`/${lang}/lesson/${lessonId}`)}
        dir={dir}
        toggleDir={toggleDir}
      />
    </div>
  );
}

export default function SynoLingua() {
  const [progress, setProgress] = useState(loadProgress);
  const [direction, setDirection] = useState("en-es");

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const toggleDir = () => setDirection((d) => (d === "en-es" ? "es-en" : "en-es"));
  const completeLesson = (lang, lessonId) =>
    setProgress((p) => markDone(p, lang, lessonId));

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0c1220, #131d2e 40%, #0f1a28)", fontFamily: "'DM Sans', sans-serif", color: "#c8d8e8", position: "relative" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
          <Route
            path="/:lang"
            element={<HomeRoute progress={progress} dir={direction} toggleDir={toggleDir} />}
          />
          <Route
            path="/:lang/lesson/:lessonId"
            element={<Lesson dir={direction} onComplete={completeLesson} />}
          />
          <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
        </Routes>
      </div>
    </div>
  );
}
