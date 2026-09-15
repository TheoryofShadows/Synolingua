const store = {};
globalThis.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
};
const { loadProgress, saveProgress, doneSet, markDone } = await import("../src/lib/progress.js");

let fail = 0;
const check = (name, cond) => { console.log((cond ? "PASS  " : "FAIL  ") + name); if (!cond) fail++; };

// v1 migration: a legacy flat array becomes the Spanish bucket.
store.synolingua_progress = JSON.stringify(["the", "a_an"]);
check("v1 flat array migrates into es", JSON.stringify(loadProgress()) === JSON.stringify({ es: ["the", "a_an"] }));

// THE BUG THIS PHASE FIXES: same lesson id in two languages must not collide.
let p = { es: ["the"], fr: [] };
p = markDone(p, "fr", "the");
check("marking fr/the leaves es untouched", doneSet(p, "es").has("the") && doneSet(p, "fr").has("the"));
let q = markDone({ fr: [] }, "fr", "the");
check("marking fr/the does NOT mark es/the", !doneSet(q, "es").has("the"));

// Idempotence + immutability.
const before = { es: ["the"] };
check("re-marking is a no-op", markDone(before, "es", "the") === before);
check("markDone does not mutate input", (markDone(before, "es", "a_an"), before.es.length === 1));

// Corrupt data must not break startup.
store.synolingua_progress = JSON.stringify({ es: ["the"], bogus: 42 });
check("malformed bucket dropped", JSON.stringify(loadProgress()) === JSON.stringify({ es: ["the"] }));
store.synolingua_progress = "not json{{";
check("unparseable value yields empty", JSON.stringify(loadProgress()) === "{}");
store.synolingua_progress = JSON.stringify({ es: ["the", 7, null] });
check("non-string ids filtered", JSON.stringify(loadProgress()) === JSON.stringify({ es: ["the"] }));

// Round trip.
saveProgress({ es: ["the"], fr: ["le"] });
check("save/load round trip", JSON.stringify(loadProgress()) === JSON.stringify({ es: ["the"], fr: ["le"] }));

console.log(fail === 0 ? "\nALL PASSED" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
