// English is the base language for every course. The `becauseFlip` field on a
// lesson supplies a reverse-direction explanation for learners going the other
// way; supporting a non-English base is a separate product decision.
export const KNOWN_LANGUAGE = {
  id: "en",
  flag: "🇺🇸",
  name: "English",
  native: "English",
  ttsLocales: ["en-US", "en"],
};

// Romance-first: the etymology method transfers directly and shared Latin roots
// let explanation content cross-validate between courses.
//
// `dialect` is the pedagogical standard — it decides vocabulary and the written
// pronunciation guides, and Phase 2's generator inherits it rather than deciding
// per lesson. `ttsLocales` is a separate, ordered voice preference: the tags are
// listed by how likely a real device is to have that voice installed, not by how
// precisely they name the dialect. `es-419` is valid BCP-47 but is rarely exposed
// as a browser voice, so the widely-installed regional tags come first and it
// sits behind them. speak() falls back to the bare language prefix regardless.
export const LANGUAGES = [
  { id: "es", flag: "🇪🇸", name: "Spanish",    native: "Español",   dialect: "Latin American",      ttsLocales: ["es-MX", "es-US", "es-419", "es"], available: true  },
  { id: "fr", flag: "🇫🇷", name: "French",     native: "Français",  dialect: "Metropolitan French", ttsLocales: ["fr-FR", "fr"],                   available: false },
  { id: "it", flag: "🇮🇹", name: "Italian",    native: "Italiano",  dialect: "Standard Italian",    ttsLocales: ["it-IT", "it"],                   available: false },
  { id: "pt", flag: "🇧🇷", name: "Portuguese", native: "Português", dialect: "Brazilian",           ttsLocales: ["pt-BR", "pt"],                   available: false },
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
