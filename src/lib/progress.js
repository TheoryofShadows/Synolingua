const KEY = "synolingua_progress";

// Storage shape has two versions:
//   v1 — a flat array of lesson ids, from when Spanish was the only course.
//   v2 — { [langId]: string[] }.
// Lesson ids are only unique *within* a language ("the" exists in both the
// Spanish and French courses), so v1 cannot survive a second language: marking
// Spanish "the" done would light up French "the" too. loadProgress migrates any
// v1 value into the "es" bucket on read.

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return { es: parsed.filter((id) => typeof id === "string") };
    if (parsed && typeof parsed === "object") {
      // Drop malformed buckets rather than letting one bad key break startup.
      return Object.fromEntries(
        Object.entries(parsed)
          .filter(([, ids]) => Array.isArray(ids))
          .map(([lang, ids]) => [lang, ids.filter((id) => typeof id === "string")])
      );
    }
    return {};
  } catch {
    return {};
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // storage quota exceeded or unavailable
  }
}

export function doneSet(progress, lang) {
  return new Set(progress[lang] || []);
}

export function markDone(progress, lang, lessonId) {
  const current = progress[lang] || [];
  if (current.includes(lessonId)) return progress;
  return { ...progress, [lang]: [...current, lessonId] };
}
