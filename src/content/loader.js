// Courses load per language on demand. Vite turns these globs into dynamic
// imports, so a Spanish learner never downloads the French corpus.
const courseFiles = import.meta.glob("./*/course.json");
const lessonFiles = import.meta.glob("./*/lessons/*.json");

const cache = new Map();

export async function loadCourse(lang) {
  if (cache.has(lang)) return cache.get(lang);

  const courseKey = `./${lang}/course.json`;
  if (!courseFiles[courseKey]) return null;

  const course = (await courseFiles[courseKey]()).default;
  const ids = course.units.flatMap((u) => u.lessons.map((l) => l.id));
  const loaded = await Promise.all(
    ids.map(async (id) => {
      const key = `./${lang}/lessons/${id}.json`;
      if (!lessonFiles[key]) throw new Error(`${lang}: course lists "${id}" but no lesson file exists`);
      return [id, (await lessonFiles[key]()).default];
    })
  );
  const byId = Object.fromEntries(loaded);

  const units = course.units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((entry) => ({ ...byId[entry.id], access: entry.access })),
  }));

  const result = { lang, units, total: ids.length };
  cache.set(lang, result);
  return result;
}
