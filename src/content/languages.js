// English is the base language for every course. The `becauseFlip` field on a
// lesson supplies a reverse-direction explanation for learners going the other
// way; supporting a non-English base is a separate product decision.
export const KNOWN_LANGUAGE = {
  id: "en",
  flag: "🇺🇸",
  name: "English",
  native: "English",
  ttsLocale: "en-US",
};

// Romance-first: the etymology method transfers directly and shared Latin roots
// let explanation content cross-validate between courses.
export const LANGUAGES = [
  { id: "es", flag: "🇪🇸", name: "Spanish",    native: "Español",    ttsLocale: "es-ES", available: true  },
  { id: "fr", flag: "🇫🇷", name: "French",     native: "Français",   ttsLocale: "fr-FR", available: false },
  { id: "it", flag: "🇮🇹", name: "Italian",    native: "Italiano",   ttsLocale: "it-IT", available: false },
  { id: "pt", flag: "🇵🇹", name: "Portuguese", native: "Português",  ttsLocale: "pt-PT", available: false },
];

export function getLanguage(id) {
  return LANGUAGES.find((l) => l.id === id) || null;
}

// Direction is "forward" (known -> target) or "reverse". Components ask for the
// resolved pair rather than comparing language ids themselves.
export function resolveDirection(langId, direction) {
  const target = getLanguage(langId) || LANGUAGES[0];
  const flipped = direction === "reverse";
  return {
    from: flipped ? target : KNOWN_LANGUAGE,
    to: flipped ? KNOWN_LANGUAGE : target,
    flipped,
  };
}
