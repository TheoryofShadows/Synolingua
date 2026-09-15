import { UNITS as esUnits } from "./es.js";

// Course registry. Phase 1 replaces these static imports with lazy per-language
// JSON loading so a Spanish learner never downloads the French corpus.
const COURSES = { es: esUnits };

export function getCourse(lang) {
  return COURSES[lang] || null;
}

export function totalLessons(lang) {
  const units = COURSES[lang];
  if (!units) return 0;
  return units.reduce((acc, unit) => acc + unit.lessons.length, 0);
}

export function findLesson(lang, lessonId) {
  const units = COURSES[lang];
  if (!units) return null;
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
