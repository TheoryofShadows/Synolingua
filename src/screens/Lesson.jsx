import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { findLesson, getSteps } from "../content/index.js";
import { styles } from "../ui/styles.js";
import Cluster from "../steps/Cluster.jsx";
import Placement from "../steps/Placement.jsx";
import Because from "../steps/Because.jsx";
import FormulaView from "../steps/Formula.jsx";
import PracticeScreen from "../steps/Practice.jsx";

export default function Lesson({ dir, onComplete }) {
  const { lang, lessonId } = useParams();
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);

  // Navigating between two lessons reuses this component (same route pattern,
  // different param), so the step index has to be reset explicitly.
  useEffect(() => setStepIdx(0), [lang, lessonId]);

  const lesson = findLesson(lang, lessonId);
  if (!lesson) return <Navigate to={`/${lang}`} replace />;

  const steps = getSteps(lesson);
  const currentStep = steps[stepIdx];
  const nextStep = () => setStepIdx((i) => Math.min(i + 1, steps.length - 1));

  const finish = () => {
    onComplete(lang, lesson.id);
    navigate(`/${lang}`);
  };

  return (
    <>
      <div style={styles.lessonHeader}>
        <button
          aria-label="Back to lessons"
          style={{ background: "none", border: "none", color: "#a8d8ea", fontSize: 14, fontWeight: 600 }}
          onClick={() => navigate(`/${lang}`)}
        >
          ← Back
        </button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: i === stepIdx ? 22 : 8, height: 8, borderRadius: 4, background: i <= stepIdx ? "#a8d8ea" : "#2a3a4a", transition: "all 0.3s" }} />
          ))}
        </div>
        <div style={{ width: 50 }} />
      </div>
      <div style={styles.page}>
        {currentStep === "cluster" && <Cluster lesson={lesson} dir={dir} onNext={nextStep} />}
        {currentStep === "placement" && <Placement key={lesson.id + "pl"} lesson={lesson} dir={dir} onNext={nextStep} />}
        {currentStep === "because" && <Because key={lesson.id + "b"} lesson={lesson} dir={dir} onNext={nextStep} />}
        {currentStep === "formula" && <FormulaView key={lesson.id + "f"} lesson={lesson} onNext={nextStep} />}
        {currentStep === "practice" && <PracticeScreen key={lesson.id + "p"} lesson={lesson} onDone={finish} />}
      </div>
    </>
  );
}
