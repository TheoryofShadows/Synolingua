// Voice selection is what makes the dialect decision safe: the app asks for a
// Latin American voice, but which regional tags a device actually exposes is
// outside our control. These cover the cases that would otherwise fail silently.

globalThis.window = { speechSynthesis: { getVoices: () => [], cancel() {}, speak() {} } };
const setVoices = (langs) => {
  globalThis.window.speechSynthesis.getVoices = () => langs.map((lang) => ({ lang, name: lang }));
};

const { pickVoice, speak } = await import("../src/lib/speech.js");

let fail = 0;
const check = (name, cond) => { console.log((cond ? "PASS  " : "FAIL  ") + name); if (!cond) fail++; };

setVoices(["en-US", "es-MX", "es-ES"]);
check("exact tag match wins", pickVoice(["es-MX"])?.lang === "es-MX");
check("preference order is respected", pickVoice(["es-MX", "es-US"])?.lang === "es-MX");
check("falls through to the next preference", pickVoice(["es-419", "es-ES"])?.lang === "es-ES");

// Android reports es_MX with an underscore; naive string equality misses it.
setVoices(["es_MX", "en_US"]);
check("android underscore form matches", pickVoice(["es-MX"])?.lang === "es_MX");
check("underscore form matches via prefix too", pickVoice(["es-419"])?.lang === "es_MX");

// The prefix pass is what makes es-419 uncertainty stop mattering.
setVoices(["en-US", "es-AR"]);
check("unlisted region still yields a Spanish voice", pickVoice(["es-MX", "es-US", "es-419", "es"])?.lang === "es-AR");

setVoices(["en-US", "de-DE"]);
check("no Spanish voice returns null", pickVoice(["es-MX", "es"]) === null);

setVoices([]);
check("empty voice list returns null", pickVoice(["es-MX"]) === null);

check("case-insensitive tag match", (setVoices(["ES-mx"]), pickVoice(["es-MX"])?.lang === "ES-mx"));

// Must not throw where speech synthesis is unavailable or blocked.
let threw = false;
globalThis.window = {};
try { speak("hola", ["es-MX"]); } catch { threw = true; }
check("missing speechSynthesis does not throw", !threw);

globalThis.window = { speechSynthesis: { getVoices: () => { throw new Error("blocked"); }, cancel() {}, speak() {} } };
threw = false;
try { threw = pickVoice(["es-MX"]) !== null; } catch { threw = true; }
check("throwing getVoices is handled", !threw);

console.log(fail === 0 ? "\nALL PASSED" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
