const KNOWN_LANGUAGE_LOCALE = "en-US";

// `locale` is a BCP-47 tag from the language registry (e.g. "es-ES", "fr-FR").
export function speak(text, locale = KNOWN_LANGUAGE_LOCALE) {
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = locale;
    utter.rate = 0.82;
    window.speechSynthesis.speak(utter);
  } catch {
    // speech synthesis unavailable or blocked
  }
}
