// One-time migration: src/content/es.js (Spanish-shaped JS literal) ->
// src/content/es/{course.json, lessons/*.json} (language-neutral schema).
//
//   node tools/migrate-content.mjs          write the JSON files
//   node tools/migrate-content.mjs --check  assert the JSON matches es.js
//
// Run with --check before deleting es.js. All 11 lessons pass through this
// script at once, so the check is what stands between a transform bug and
// silently corrupted content.

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src/content/es");
const check = process.argv.includes("--check");

const legacy = join(root, "src/content/es.js");
if (!existsSync(legacy)) {
  // The migration is one-time and already applied; src/content/es/ is now the
  // source of truth. Kept for the audit trail — es.js is recoverable from git.
  console.log("src/content/es.js is gone: migration already applied, nothing to do.");
  process.exit(0);
}
const { UNITS } = await import(legacy);

// Free tier per MONETIZATION.md: all of Unit 1, plus the Flip Formula lesson,
// which is the sales pitch and has to be reachable without paying.
const FREE_UNITS = new Set(["basics"]);
const FREE_LESSONS = new Set(["gustar"]);

function toBadge(cluster, lessonId) {
  // `g` was gender (m/f); `t` was an unrelated semantic tag ("always"/"now").
  // Two fields doing the same job; they collapse into one `badge`.
  if (cluster.g && cluster.t) {
    throw new Error(`${lessonId}: cluster has both g and t, cannot collapse into one badge`);
  }
  if (cluster.g) return { label: cluster.g, kind: cluster.g === "m" ? "gender-m" : "gender-f" };
  if (cluster.t) return { label: cluster.t, kind: "note" };
  return undefined;
}

function convertLesson(lesson) {
  const out = {
    id: lesson.id,
    title: lesson.title,
    emoji: lesson.emoji,
    known: lesson.en,
    target: lesson.es,
    pron: lesson.pron,
  };
  if (lesson.note) out.note = lesson.note;
  out.clusters = lesson.clusters.map((c) => {
    const badge = toBadge(c, lesson.id);
    const converted = { known: c.e, target: c.s };
    if (badge) converted.badge = badge;
    return converted;
  });
  if (lesson.placement) {
    out.placement = { known: lesson.placement.en, target: lesson.placement.es };
  }
  if (lesson.formula) out.formula = lesson.formula;
  out.because = lesson.because;
  if (lesson.becauseFlip) out.becauseFlip = lesson.becauseFlip;
  out.practice = lesson.practice;
  return out;
}

const course = {
  lang: "es",
  units: UNITS.map((unit) => ({
    id: unit.id,
    title: unit.title,
    sub: unit.sub,
    emoji: unit.emoji,
    color: unit.color,
    lessons: unit.lessons.map((l) => ({
      id: l.id,
      access: FREE_UNITS.has(unit.id) || FREE_LESSONS.has(l.id) ? "free" : "paid",
    })),
  })),
};

const lessons = UNITS.flatMap((u) => u.lessons).map(convertLesson);

if (check) {
  let fail = 0;
  const assert = (name, cond) => { if (!cond) { console.log("FAIL  " + name); fail++; } };
  const original = UNITS.flatMap((u) => u.lessons);

  assert("course.json exists", existsSync(join(outDir, "course.json")));
  const onDisk = JSON.parse(readFileSync(join(outDir, "course.json"), "utf8"));
  assert("unit count matches", onDisk.units.length === UNITS.length);
  assert("lesson ids and order match",
    JSON.stringify(onDisk.units.map((u) => u.lessons.map((l) => l.id))) ===
    JSON.stringify(UNITS.map((u) => u.lessons.map((l) => l.id))));

  for (const src of original) {
    const path = join(outDir, "lessons", `${src.id}.json`);
    if (!existsSync(path)) { assert(`${src.id}.json exists`, false); continue; }
    const got = JSON.parse(readFileSync(path, "utf8"));
    assert(`${src.id}: known preserved`, JSON.stringify(got.known) === JSON.stringify(src.en));
    assert(`${src.id}: target preserved`, got.target === src.es);
    assert(`${src.id}: cluster count`, got.clusters.length === src.clusters.length);
    src.clusters.forEach((c, i) => {
      assert(`${src.id}: cluster ${i} known`, got.clusters[i].known === c.e);
      assert(`${src.id}: cluster ${i} target`, got.clusters[i].target === c.s);
      const expected = c.g ? c.g : c.t ? c.t : undefined;
      assert(`${src.id}: cluster ${i} badge label`, got.clusters[i].badge?.label === expected);
    });
    assert(`${src.id}: placement known`,
      JSON.stringify(got.placement?.known) === JSON.stringify(src.placement?.en));
    assert(`${src.id}: placement target`,
      JSON.stringify(got.placement?.target) === JSON.stringify(src.placement?.es));
    assert(`${src.id}: because verbatim`, JSON.stringify(got.because) === JSON.stringify(src.because));
    assert(`${src.id}: formula verbatim`, JSON.stringify(got.formula) === JSON.stringify(src.formula));
    assert(`${src.id}: practice verbatim`, JSON.stringify(got.practice) === JSON.stringify(src.practice));
  }
  console.log(fail === 0 ? `ALL EQUIVALENT (${original.length} lessons)` : `${fail} MISMATCHES`);
  process.exit(fail === 0 ? 0 : 1);
}

mkdirSync(join(outDir, "lessons"), { recursive: true });
writeFileSync(join(outDir, "course.json"), JSON.stringify(course, null, 2) + "\n");
for (const lesson of lessons) {
  writeFileSync(join(outDir, "lessons", `${lesson.id}.json`), JSON.stringify(lesson, null, 2) + "\n");
}
console.log(`wrote course.json + ${lessons.length} lessons to src/content/es/`);
