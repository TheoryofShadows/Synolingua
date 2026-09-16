const FALLBACK_LOCALES = ["en-US", "en"];

// Android reports voice tags with an underscore ("es_ES") while desktop browsers
// and BCP-47 use a hyphen ("es-ES"). Comparing raw strings silently matches
// nothing on Android, so normalize before every comparison.
const normalize = (tag) => String(tag || "").toLowerCase().replace(/_/g, "-");

// getVoices() returns [] until the voiceschanged event fires in several browsers,
// so read through this rather than caching a snapshot at module load.
function availableVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  try {
    return window.speechSynthesis.getVoices() || [];
  } catch {
    return [];
  }
}

// Exact tag match first, then the bare language prefix. The prefix pass is what
// makes this correct regardless of which regional tags a given device exposes —
// a device carrying only es-AR still gets a Spanish voice instead of the
// system default reading Spanish text with an English voice.
export function pickVoice(locales) {
  const voices = availableVoices();
  if (!voices.length) return null;

  for (const locale of locales) {
    const want = normalize(locale);
    const exact = voices.find((v) => normalize(v.lang) === want);
    if (exact) return exact;
  }
  for (const locale of locales) {
    const prefix = normalize(locale).split("-")[0];
    const loose = voices.find((v) => normalize(v.lang).split("-")[0] === prefix);
    if (loose) return loose;
  }
  return null;
}

// `locales` is a language registry entry's ttsLocales — an ordered preference
// list, not a single tag.
export function speak(text, locales = FALLBACK_LOCALES) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const list = Array.isArray(locales) ? locales : [locales];
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = pickVoice(list);
    if (voice) utter.voice = voice;
    // Set lang either way: when no voice matched it is the only steer we have,
    // and when one did it keeps the two settings consistent.
    utter.lang = voice ? voice.lang : list[0];
    utter.rate = 0.82;
    window.speechSynthesis.speak(utter);
  } catch {
    // speech synthesis unavailable or blocked
  }
}
