import { useEffect, useState } from "react";
import { loadCourse } from "./loader.js";

// Loads a language's course. Returns { units, total, loading }; `units` is empty
// while loading and for languages that have no course yet.
export function useCourse(lang) {
  const [state, setState] = useState({ units: [], total: 0, loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ units: [], total: 0, loading: true });
    loadCourse(lang)
      .then((course) => {
        if (cancelled) return;
        setState({ units: course?.units || [], total: course?.total || 0, loading: false });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ units: [], total: 0, loading: false });
      });
    return () => { cancelled = true; };
  }, [lang]);

  return state;
}

export function findLesson(units, lessonId) {
  for (const unit of units) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

// Lesson flow: which step screens this lesson has, in order.
export function getSteps(lesson) {
  if (!lesson) return [];
  const steps = ["cluster"];
  if (lesson.placement) steps.push("placement");
  steps.push("because");
  if (lesson.formula) steps.push("formula");
  steps.push("practice");
  return steps;
}
