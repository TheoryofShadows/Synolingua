import { useState, useEffect } from "react";

function speak(text, lang = "es-ES") {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.82;
  window.speechSynthesis.speak(utter);
}

function shuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const UNITS = [
  {
    id: "basics",
    title: "The Basics",
    sub: "Small words, big power",
    emoji: "🧱",
    color: "#a8d8ea",
    lessons: [
      {
        id: "the",
        title: "the",
        emoji: "📌",
        en: ["the"],
        es: "el / la",
        pron: "ehl / lah",
        note: "Spanish has TWO words for 'the' — and there's a real reason why.",
        clusters: [
          { e: "the boy", s: "el niño", g: "m" },
          { e: "the girl", s: "la niña", g: "f" },
          { e: "the coffee", s: "el café", g: "m" },
          { e: "the music", s: "la música", g: "f" },
        ],
        placement: { en: ["the", "boy"], es: ["el", "niño"] },
        because: {
          title: 'Why two words for "the"?',
          explain:
            'Thousands of years ago, Latin sorted ALL nouns into two bins — like color-coded teams. They called them "masculine" and "feminine" but it has nothing to do with boy/girl. Think electrical plugs: Type A and Type B. The name is just a label.',
          key: 'Cheat code: words ending in -o go in the "el" bin. Words ending in -a go in the "la" bin.',
          fun: "German has THREE bins. English used to have them too but dropped them 800 years ago!",
          src: 'The real term is "grammatical gender." Linguists call it "noun class."',
        },
        practice: [
          { type: "pick", q: '"the boy" in Spanish…', a: "el niño", w: ["la niño", "el niña", "la niña"], h: "niño ends in -o → el" },
          { type: "pick", q: '"the music" — el or la?', a: "la música", w: ["el música", "un música", "el musica"], h: "música ends in -a → la" },
          { type: "match", q: "Match each phrase", pairs: [["the boy", "el niño"], ["the girl", "la niña"], ["the coffee", "el café"], ["the music", "la música"]] },
        ],
      },
      {
        id: "a_an",
        title: "a / an",
        emoji: "1️⃣",
        en: ["a", "an"],
        es: "un / una",
        pron: "oon / OO-nah",
        note: "Same two bins — different word.",
        clusters: [
          { e: "a boy", s: "un niño", g: "m" },
          { e: "a girl", s: "una niña", g: "f" },
          { e: "a cat", s: "un gato", g: "m" },
          { e: "a table", s: "una mesa", g: "f" },
        ],
        placement: { en: ["a", "cat"], es: ["un", "gato"] },
        because: {
          title: "Same bins, new word",
          explain: 'El-bin → "un." La-bin → "una." Same -o/-a cheat code.',
          key: '"Un" also means "one" — "un gato" = a cat OR one cat.',
          fun: "You now know FOUR words: el, la, un, una. Enough to label the world.",
          src: "Articles are the most common words in any language.",
        },
        practice: [
          { type: "pick", q: '"a cat"…', a: "un gato", w: ["una gato", "el gato", "una gata"], h: "gato → -o → un" },
          { type: "match", q: "Match them", pairs: [["a boy", "un niño"], ["a girl", "una niña"], ["a cat", "un gato"], ["a table", "una mesa"]] },
        ],
      },
      {
        id: "i_you",
        title: "I / you / he / she",
        emoji: "👤",
        en: ["I", "you", "he", "she"],
        es: "yo / tú / él / ella",
        pron: "yoh / too / ehl / EH-yah",
        note: "The core cast of any conversation.",
        clusters: [
          { e: "I", s: "yo" },
          { e: "you (casual)", s: "tú" },
          { e: "he", s: "él" },
          { e: "she", s: "ella" },
        ],
        because: {
          title: "Here's the twist",
          explain: 'In Spanish the verb ending tells you who — so they often skip the pronoun. "Como" already means "I eat."',
          key: 'They only say "yo" for emphasis — like "*I* did it."',
          fun: '"Yo quiero Taco Bell" — that yo is extra emphasis.',
          src: "Called a pro-drop language. Verbs carry so much info pronouns are optional.",
        },
        practice: [
          { type: "pick", q: '"I" in Spanish…', a: "yo", w: ["tú", "él", "ella"], h: "First person" },
          { type: "match", q: "Match pronouns", pairs: [["I", "yo"], ["you", "tú"], ["he", "él"], ["she", "ella"]] },
        ],
      },
      {
        id: "my_your",
        title: "my / your",
        emoji: "🏷️",
        en: ["my", "your"],
        es: "mi / tu",
        pron: "mee / too",
        note: "Claim your stuff.",
        clusters: [
          { e: "my house", s: "mi casa" },
          { e: "your name", s: "tu nombre" },
          { e: "my dog", s: "mi perro" },
          { e: "your mom", s: "tu mamá" },
        ],
        placement: { en: ["my", "house"], es: ["mi", "casa"] },
        because: {
          title: "Watch the accent",
          explain: '"Tú" (accent) = you. "Tu" (no accent) = your.',
          key: '"Mi" = my. "Tu" = your. No gender changes. Easy win!',
          fun: '"Mi casa es tu casa" — now you understand every word!',
          src: "With mi/tu + any noun you can talk about your world.",
        },
        practice: [
          { type: "pick", q: '"my house"…', a: "mi casa", w: ["tu casa", "mi nombre", "tu mamá"], h: "my = mi" },
          { type: "match", q: "Match", pairs: [["my house", "mi casa"], ["your name", "tu nombre"], ["my dog", "mi perro"], ["your mom", "tu mamá"]] },
        ],
      },
      {
        id: "this_that",
        title: "this / that",
        emoji: "👆",
        en: ["this", "that"],
        es: "este / ese",
        pron: "EHS-teh / EH-seh",
        note: "Point at things near and far.",
        clusters: [
          { e: "this book", s: "este libro", g: "m" },
          { e: "this house", s: "esta casa", g: "f" },
          { e: "that dog", s: "ese perro", g: "m" },
          { e: "that girl", s: "esa niña", g: "f" },
        ],
        because: {
          title: "Near vs. far + bins",
          explain: "Close = este/esta. Far = ese/esa. Same bin system.",
          key: "Close + el-bin = este. Close + la-bin = esta. Far + el-bin = ese. Far + la-bin = esa.",
          fun: "Spanish has THREE distances: este, ese, aquel (way over there)!",
          src: "This + that + right bin = point at anything.",
        },
        practice: [
          { type: "pick", q: '"this book" (libro = el-bin)…', a: "este libro", w: ["esta libro", "ese libro", "esa libro"], h: "Close + el-bin = este" },
          { type: "match", q: "Match", pairs: [["this book", "este libro"], ["this house", "esta casa"], ["that dog", "ese perro"], ["that girl", "esa niña"]] },
        ],
      },
    ],
  },
  {
    id: "connectors",
    title: "Connectors",
    sub: "Glue words together",
    emoji: "🔗",
    color: "#c4b5fd",
    lessons: [
      {
        id: "and_or",
        title: "and / or / but",
        emoji: "➕",
        en: ["and", "or", "but"],
        es: "y / o / pero",
        pron: "ee / oh / PEH-roh",
        note: "Three tiny words that unlock real thoughts.",
        clusters: [
          { e: "coffee and tea", s: "café y té" },
          { e: "yes or no", s: "sí o no" },
          { e: "small but strong", s: "pequeño pero fuerte" },
        ],
        placement: { en: ["coffee", "and", "tea"], es: ["café", "y", "té"] },
        because: {
          title: "Almost 1-to-1",
          explain: "No tricks. Plug them in same as English.",
          key: "Y = and. O = or. Pero = but.",
          fun: "Spanish hates repeated sounds — y becomes e before i-sounds, o becomes u before o-sounds!",
          src: "Universal logic. Combine any two ideas.",
        },
        practice: [
          { type: "pick", q: '"coffee AND tea" — which connector?', a: "y", w: ["o", "pero", "con"], h: "y = and" },
          { type: "match", q: "Match connectors", pairs: [["and", "y"], ["or", "o"], ["but", "pero"]] },
        ],
      },
      {
        id: "in_with",
        title: "in / on / with",
        emoji: "📍",
        en: ["in", "on", "with"],
        es: "en / con",
        pron: "ehn / kohn",
        note: "Where things are and who they're with.",
        clusters: [
          { e: "in the house", s: "en la casa" },
          { e: "on the table", s: "en la mesa" },
          { e: "with my friend", s: "con mi amigo" },
          { e: "coffee with milk", s: "café con leche" },
        ],
        placement: { en: ["coffee", "with", "milk"], es: ["café", "con", "leche"] },
        because: {
          title: "Two English words → one",
          explain: 'Both "in" and "on" = "en" in Spanish.',
          key: '"En" = in AND on. "Con" = with.',
          fun: "This is why Spanish speakers mix up in/on in English!",
          src: "Prepositions diverge the most between languages.",
        },
        practice: [
          { type: "pick", q: '"in the house" → "___ la casa"', a: "en", w: ["con", "el", "y"], h: "en = in" },
          { type: "match", q: "Match", pairs: [["in the house", "en la casa"], ["on the table", "en la mesa"], ["with my friend", "con mi amigo"], ["coffee with milk", "café con leche"]] },
        ],
      },
    ],
  },
  {
    id: "actions",
    title: "First Actions",
    sub: "Now you can DO things",
    emoji: "⚡",
    color: "#fbbf24",
    lessons: [
      {
        id: "is_are",
        title: "is / are",
        emoji: "🪞",
        en: ["is", "are"],
        es: "es / está",
        pron: "ehs / ehs-TAH",
        note: 'Two ways to say "is."',
        clusters: [
          { e: "She is tall.", s: "Ella es alta.", t: "always" },
          { e: "She is tired.", s: "Ella está cansada.", t: "now" },
          { e: "He is a doctor.", s: "Él es doctor.", t: "always" },
          { e: "He is sick.", s: "Él está enfermo.", t: "now" },
        ],
        placement: { en: ["She", "is", "tall"], es: ["Ella", "es", "alta"] },
        formula: {
          type: "decision",
          title: 'The "is" decision tree',
          question: "Always true — or just right now?",
          paths: [
            { label: "Always true (identity)", result: "ES", color: "#60a5fa", examples: ["She is tall → es alta", "He is a doctor → es doctor"] },
            { label: "Right now (state, mood)", result: "ESTÁ", color: "#fbbf24", examples: ["She is tired → está cansada", "He is sick → está enfermo"] },
          ],
        },
        because: {
          title: "The biggest mind-shift",
          explain: '"Es" = always true. "Está" = right now.',
          key: "Is this who they ARE, or how they HAPPEN TO BE? Always = es. Now = está.",
          fun: '"He is dead" uses ESTÁ — death is something that happened!',
          src: 'Latin "esse" (to exist) vs "stare" (to stand).',
        },
        practice: [
          { type: "pick", q: '"She is tall" (always) →', a: "es", w: ["está", "son", "están"], h: "Always = es" },
          { type: "pick", q: '"He is sick" (right now) →', a: "está", w: ["es", "son", "están"], h: "Temporary = está" },
          { type: "match", q: "Sort: ES vs ESTÁ", pairs: [["She is tall", "es (always)"], ["She is tired", "está (now)"], ["He is a doctor", "es (always)"], ["He is sick", "está (now)"]] },
        ],
      },
      {
        id: "want_need",
        title: "want / need",
        emoji: "🎯",
        en: ["want", "need"],
        es: "quiero / necesito",
        pron: "kee-EH-roh / neh-seh-SEE-toh",
        note: "Ask for things. Game-changer.",
        clusters: [
          { e: "I want water.", s: "Quiero agua." },
          { e: "I need help.", s: "Necesito ayuda." },
          { e: "I want to eat.", s: "Quiero comer." },
          { e: "I need to go.", s: "Necesito ir." },
        ],
        placement: { en: ["I", "want", "water"], es: ["Quiero", "agua"] },
        because: {
          title: "Survival verbs",
          explain: 'Straight like English: I want [thing]. Drop "yo" — the -o ending means "I."',
          key: '"Quiero" = I want. "Necesito" = I need. Stack verbs: "Quiero comer."',
          fun: '"Querer" also means to love — "Te quiero" = I love you.',
          src: "Nail these and you survive in any Spanish-speaking country.",
        },
        practice: [
          { type: "pick", q: '"I want water" — verb?', a: "Quiero", w: ["Necesito", "Tengo", "Estoy"], h: "want = quiero" },
          { type: "match", q: "Match", pairs: [["I want water", "Quiero agua"], ["I need help", "Necesito ayuda"], ["I want to eat", "Quiero comer"], ["I need to go", "Necesito ir"]] },
        ],
      },
      {
        id: "gustar",
        title: "like / enjoy",
        emoji: "☕",
        en: ["like", "enjoy"],
        es: "gustar",
        pron: "goos-TAHR",
        note: "This one works BACKWARDS.",
        clusters: [
          { e: "I like coffee.", s: "Me gusta el café." },
          { e: "You like music.", s: "Te gusta la música." },
          { e: "She likes dancing.", s: "A ella le gusta bailar." },
        ],
        placement: { en: ["I", "like", "coffee"], es: ["Me", "gusta", "el café"] },
        formula: {
          type: "flip",
          title: "The Flip Formula",
          enF: {
            label: "English: DOER → ACTION → THING",
            pieces: [
              { t: "I", r: "doer", c: "#60a5fa" },
              { t: "like", r: "action", c: "#c4b5fd" },
              { t: "coffee", r: "thing", c: "#fbbf24" },
            ],
          },
          esF: {
            label: "Spanish: RECEIVER → ACTION → DOER",
            pieces: [
              { t: "Me", r: "receiver", c: "#f472b6" },
              { t: "gusta", r: "action", c: "#c4b5fd" },
              { t: "el café", r: "doer!", c: "#fbbf24" },
            ],
          },
          rules: [
            "English: DOER → ACTION → THING",
            "Spanish: RECEIVER → ACTION → DOER",
            "Coffee does the action TO you",
            "You just receive it",
            "Verb matches the THING: gusta (1) / gustan (many)",
          ],
          examples: [
            { e: "I like dogs", s: "Me gustan los perros", n: "plural → gustan" },
            { e: "You like music", s: "Te gusta la música", n: "te = you receiving" },
            { e: "She likes dancing", s: "Le gusta bailar", n: "le = she receiving" },
          ],
        },
        because: {
          title: "The famous flip",
          explain: '"Me gusta el café" = Coffee does it for me. It gives you good vibes — you just receive it.',
          key: "Me (receiver) + gusta (does it for) + el café (the thing doing it).",
          fun: 'This is why Spanish speakers say "me like coffee" in English — receiver first!',
          src: 'From Latin "gustare" = to taste.',
        },
        becauseFlip: {
          title: "The English un-flip",
          explain: 'English "like" is direct — I do the liking. That\'s why you say "Me like" — now say "I like" every time.',
          key: "English: I (doer) + like (action) + coffee (thing). YOU are in charge.",
        },
        practice: [
          { type: "pick", q: "Who does the action in Spanish?", a: "Coffee (does it for me)", w: ["I (I do the liking)", "Nobody", "The barista"], h: "The THING does the action" },
          { type: "pick", q: '"I like coffee" →', a: "Me gusta el café", w: ["Yo gusto el café", "Yo gusta café", "Mi gusta café"], h: "me + gusta + el café" },
          { type: "match", q: "Match", pairs: [["I like coffee", "Me gusta el café"], ["You like music", "Te gusta la música"], ["She likes dancing", "Le gusta bailar"]] },
        ],
      },
      {
        id: "tener",
        title: "have / carry",
        emoji: "✊",
        en: ["have", "carry"],
        es: "tener",
        pron: "teh-NEHR",
        note: "You don't BE hungry — you CARRY it.",
        clusters: [
          { e: "I have a dog.", s: "Tengo un perro." },
          { e: "I'm hungry.", s: "Tengo hambre." },
          { e: "I'm 20 years old.", s: "Tengo 20 años." },
          { e: "I have to go.", s: "Tengo que ir." },
        ],
        placement: { en: ["I", "am", "hungry"], es: ["Tengo", "hambre"] },
        formula: {
          type: "flip",
          title: "The Carry Formula",
          enF: {
            label: "English: I + AM + adjective",
            pieces: [
              { t: "I", r: "doer", c: "#60a5fa" },
              { t: "am", r: "being", c: "#c4b5fd" },
              { t: "hungry", r: "adjective", c: "#fbbf24" },
            ],
          },
          esF: {
            label: "Spanish: I CARRY + noun",
            pieces: [
              { t: "Tengo", r: "I carry", c: "#60a5fa" },
              { t: "hambre", r: "hunger", c: "#fbbf24" },
            ],
          },
          rules: [
            "English: I + AM + [description]",
            "Spanish: I CARRY + [object]",
            "Hungry = an OBJECT you hold",
            "Same for: thirsty, afraid, cold, hot",
            "Age too: Tengo 20 años = carry 20 years",
          ],
          examples: [
            { e: "I'm thirsty", s: "Tengo sed", n: "carry thirst" },
            { e: "She's 25", s: "Tiene 25 años", n: "carries 25 years" },
            { e: "We have to leave", s: "Tenemos que ir", n: "carry obligation" },
          ],
        },
        because: {
          title: "You carry things",
          explain: "English: you ARE hungry. Spanish: you CARRY hunger — like holding it.",
          key: '"Tengo hambre" = carrying hunger. "Tengo 20 años" = carrying 20 years.',
          fun: 'This is why Spanish speakers say "I have hunger" in English!',
          src: 'Latin "tenēre" = to grip. Root of "tenant" and "tenacious."',
        },
        practice: [
          { type: "pick", q: '"I\'m hungry" uses…', a: "Tengo (carry)", w: ["Estoy (am)", "Soy (am)", "Quiero (want)"], h: "CARRY hunger" },
          { type: "match", q: "Match", pairs: [["I have a dog", "Tengo un perro"], ["I'm hungry", "Tengo hambre"], ["I'm 20", "Tengo 20 años"], ["I have to go", "Tengo que ir"]] },
        ],
      },
    ],
  },
];

const TOTAL_LESSONS = UNITS.reduce((acc, u) => acc + u.lessons.length, 0);

const LANGUAGES = [
  { id: "es", flag: "🇪🇸", name: "Spanish",  native: "Español",   available: true  },
  { id: "fr", flag: "🇫🇷", name: "French",   native: "Français",  available: false },
  { id: "de", flag: "🇩🇪", name: "German",   native: "Deutsch",   available: false },
  { id: "ja", flag: "🇯🇵", name: "Japanese", native: "日本語",     available: false },
  { id: "it", flag: "🇮🇹", name: "Italian",  native: "Italiano",  available: false },
];

function Fade({ children, id }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [id]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

function Home({ onPick, prog, dir, toggleDir, targetLang, onLangChange }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  const activeLang = LANGUAGES.find((l) => l.id === targetLang) || LANGUAGES[0];

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", width: "100%" }}>
      <div style={styles.card}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 34, fontWeight: 800, fontFamily: "'Fraunces', serif", color: "#e8f0f8", letterSpacing: -1 }}>
            Syno<span style={{ color: "#a8d8ea" }}>Lingua</span>
          </div>
          <p style={{ color: "#5a7a8a", fontSize: 13, marginTop: 6 }}>Don't memorize — understand.</p>
        </div>

        {/* Language picker */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#5a7a8a", textTransform: "uppercase", textAlign: "center", marginBottom: 10 }}>Choose a language</div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {LANGUAGES.map((lang) => {
              const selected = lang.id === targetLang;
              return (
                <button
                  key={lang.id}
                  aria-label={`Learn ${lang.name}${lang.available ? "" : " (coming soon)"}`}
                  aria-pressed={selected}
                  onClick={() => onLangChange(lang.id)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    padding: "10px 12px", borderRadius: 12, minWidth: 68,
                    background: selected ? "rgba(168,216,234,0.12)" : "rgba(168,216,234,0.03)",
                    border: `1px solid ${selected ? "rgba(168,216,234,0.35)" : "rgba(168,216,234,0.07)"}`,
                    cursor: "pointer", transition: "all 0.18s", position: "relative",
                    opacity: lang.available ? 1 : 0.55,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{lang.flag}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: selected ? "#a8d8ea" : "#7a8a9a", letterSpacing: 0.3 }}>{lang.name}</span>
                  <span style={{ fontSize: 10, color: selected ? "#6aa8c0" : "#3a4a5a" }}>{lang.native}</span>
                  {!lang.available && (
                    <span style={{ position: "absolute", top: 4, right: 4, fontSize: 8, fontWeight: 700, letterSpacing: 0.8, background: "rgba(251,191,36,0.12)", color: "#fbbf24", padding: "1px 5px", borderRadius: 4, textTransform: "uppercase" }}>soon</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Coming-soon panel for unavailable languages */}
        {!activeLang.available ? (
          <div style={{ textAlign: "center", padding: "30px 16px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{activeLang.flag}</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Fraunces', serif", color: "#e8f0f8", marginBottom: 8 }}>{activeLang.name} is coming soon</div>
            <p style={{ fontSize: 13, color: "#5a7a8a", lineHeight: 1.7 }}>We're building the full {activeLang.name} course with the same depth as Spanish. Check back soon!</p>
          </div>
        ) : (
          <>
            <button aria-label={`Switch learning direction, currently ${dir === "en-es" ? "English to Spanish" : "Spanish to English"}`} onClick={toggleDir} style={{ margin: "0 auto 16px", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: "rgba(168,216,234,0.06)", border: "1px solid rgba(168,216,234,0.12)", color: "#a8d8ea", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              {dir === "en-es" ? "🇺🇸 English → 🇪🇸 Spanish" : "🇪🇸 Spanish → 🇺🇸 English"}
            </button>
            {prog.size > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ width: "100%", height: 8, background: "#1a2a3a", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(prog.size / TOTAL_LESSONS) * 100}%`, background: "linear-gradient(90deg, #a8d8ea, #4ade80)", borderRadius: 6, transition: "width 0.5s" }} />
                </div>
                <div style={{ fontSize: 11, color: "#4a6a7a", marginTop: 6 }}>{prog.size}/{TOTAL_LESSONS} lessons</div>
              </div>
            )}

        {UNITS.map((unit, ui) => {
          const prevDone = ui === 0 || UNITS[ui - 1].lessons.every((l) => prog.has(l.id));
          return (
            <div key={unit.id} style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>{unit.emoji}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#e8f0f8", fontFamily: "'Fraunces', serif" }}>{unit.title}</div>
                  <div style={{ fontSize: 11, color: "#5a6a7a" }}>{unit.sub}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {unit.lessons.map((lesson) => {
                  const done = prog.has(lesson.id);
                  const locked = !prevDone;
                  return (
                    <button key={lesson.id} onClick={() => !locked && onPick(unit.id, lesson.id)} disabled={locked}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: done ? "rgba(74,222,128,0.04)" : "rgba(168,216,234,0.03)", border: `1px solid ${done ? "rgba(74,222,128,0.12)" : "rgba(168,216,234,0.06)"}`, borderLeft: `3px solid ${done ? "#4ade80" : locked ? "#1a2a3a" : unit.color}`, borderRadius: 12, fontFamily: "'DM Sans', sans-serif", width: "100%", textAlign: "left", cursor: locked ? "not-allowed" : "pointer", opacity: locked ? 0.35 : 1, transition: "all 0.15s" }}>
                      <span style={{ fontSize: 18, width: 28, textAlign: "center" }}>{done ? <span style={{ color: "#4ade80" }}>✓</span> : locked ? "🔒" : lesson.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: done ? "#4ade80" : "#e8f0f8" }}>{lesson.title}</div>
                        <div style={{ fontSize: 11, color: "#4a5a6a", marginTop: 2 }}>{lesson.en.join(", ")} → {lesson.es}</div>
                      </div>
                      {!locked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a4a5a" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
          </>
        )}
      </div>
    </div>
  );
}

function Cluster({ lesson, dir, onNext }) {
  const flipped = dir === "es-en";
  const knownLabel = flipped ? "Spanish" : "English";
  const targetLabel = flipped ? "English" : "Spanish";
  const knownText = flipped ? lesson.es : lesson.en.join(" / ");
  const targetText = flipped ? lesson.en.join(" / ") : lesson.es;
  const audioText = flipped ? lesson.en.join(", ") : lesson.es.split(" / ")[0];
  const audioLang = flipped ? "en-US" : "es-ES";

  return (
    <Fade id={lesson.id + "c"}>
      <div style={styles.card}>
        <div style={styles.tag}>MEANING CLUSTER</div>
        <div style={styles.langLabel}>{knownLabel}</div>
        <div style={{ textAlign: "center", fontSize: 26, fontWeight: 300, color: "#e8f0f8", fontFamily: "'Fraunces', serif", marginBottom: 4 }}>{knownText}</div>
        <div style={{ textAlign: "center", margin: "6px 0" }}>
          <svg width="18" height="32" viewBox="0 0 18 32"><path d="M9 2L9 26M4 20L9 28L14 20" stroke="#a8d8ea" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
        </div>
        <div style={styles.langLabel}>{targetLabel}</div>
        <button aria-label={`Listen to pronunciation: ${audioText}`} onClick={() => speak(audioText, audioLang)} style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "center", fontSize: 28, fontWeight: 700, color: "#a8d8ea", fontFamily: "'Fraunces', serif", marginBottom: 14, padding: 0 }}>{targetText}</button>
        <button aria-label={`Listen to pronunciation: ${audioText}`} style={styles.audioBtn} onClick={() => speak(audioText, audioLang)}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 010 7.07" /></svg>
          <span style={{ marginLeft: 8, fontSize: 13, letterSpacing: 0.8 }}>{lesson.pron}</span>
        </button>
        {lesson.note && <p style={{ fontSize: 13, color: "#7a8a9a", textAlign: "center", lineHeight: 1.6, fontStyle: "italic" }}>💡 {lesson.note}</p>}
        <div style={{ marginTop: 14, marginBottom: 16 }}>
          {lesson.clusters.map((c, i) => (
            <button key={i} aria-label={`Listen to ${flipped ? c.e : c.s}`} onClick={() => speak(flipped ? c.e : c.s, flipped ? "en-US" : "es-ES")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(168,216,234,0.03)", borderRadius: 10, marginBottom: 5, border: "1px solid rgba(168,216,234,0.05)", flexWrap: "wrap", width: "100%", cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ fontSize: 13, color: "#7a8a9a", minWidth: 85 }}>{flipped ? c.s : c.e}</span>
              <span style={{ color: "#3a4a5a", fontSize: 11 }}>→</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#e8f0f8", flex: 1 }}>{flipped ? c.e : c.s}</span>
              {c.g && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, padding: "2px 7px", borderRadius: 5, textTransform: "uppercase", background: c.g === "m" ? "rgba(96,165,250,0.12)" : "rgba(244,114,182,0.12)", color: c.g === "m" ? "#60a5fa" : "#f472b6" }}>{c.g === "m" ? "m" : "f"}</span>}
              {c.t && <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 5, background: "rgba(168,216,234,0.08)", color: "#a8d8ea" }}>{c.t}</span>}
              <span style={{ fontSize: 12, opacity: 0.4 }}>🔊</span>
            </button>
          ))}
        </div>
        <button style={styles.primaryBtn} onClick={onNext}>Continue →</button>
      </div>
    </Fade>
  );
}

function Placement({ lesson, dir, onNext }) {
  const pl = lesson.placement;
  const flipped = dir === "es-en";
  // Reference = the language the learner already knows (shown as static chips)
  // Target = the language they're arranging into the correct order
  const refWords = flipped ? pl.es : pl.en;
  const targetWords = flipped ? pl.en : pl.es;
  const refLabel = flipped ? "Spanish" : "English";
  const targetLabel = flipped ? "English — tap to arrange" : "Spanish — tap to arrange";
  const targetLang = flipped ? "en-US" : "es-ES";

  const [placed, setPlaced] = useState(Array(targetWords.length).fill(null));
  const [bank, setBank] = useState(() => shuffle([...targetWords]));
  const [correct, setCorrect] = useState(false);

  const tapBank = (word) => {
    const slot = placed.indexOf(null);
    if (slot === -1) return;
    const newPlaced = [...placed];
    newPlaced[slot] = word;
    const idx = bank.indexOf(word);
    const newBank = [...bank];
    newBank.splice(idx, 1);
    setPlaced(newPlaced);
    setBank(newBank);
    if (newPlaced.every((w, i) => w === targetWords[i])) {
      setTimeout(() => { setCorrect(true); speak(targetWords.join(" "), targetLang); }, 300);
    }
  };

  const tapSlot = (i) => {
    if (placed[i] === null || correct) return;
    setBank((b) => [...b, placed[i]]);
    setPlaced((p) => { const n = [...p]; n[i] = null; return n; });
  };

  return (
    <Fade id={lesson.id + "pl"}>
      <div style={styles.card}>
        <div style={styles.tag}>PLACEMENT WEAVER</div>
        <div style={styles.langLabel}>{refLabel}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {refWords.map((w, i) => <span key={i} style={{ padding: "8px 14px", background: "rgba(168,216,234,0.06)", borderRadius: 10, fontSize: 15, fontWeight: 500, color: "#e8f0f8", border: "1px solid rgba(168,216,234,0.08)" }}>{w}</span>)}
        </div>
        <div style={styles.langLabel}>{targetLabel}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {targetWords.map((_, i) => (
            <div key={i} onClick={() => tapSlot(i)} style={{ minWidth: 55, minHeight: 40, padding: "8px 14px", borderRadius: 10, border: `2px dashed ${placed[i] ? (correct ? "#4ade80" : "#a8d8ea") : "#3a4a5a"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, color: "#a8d8ea", background: placed[i] ? "rgba(168,216,234,0.08)" : "rgba(30,40,55,0.5)", cursor: placed[i] ? "pointer" : "default", transition: "all 0.2s" }}>
              {placed[i] || ""}
            </div>
          ))}
        </div>
        {!correct && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 14 }}>
            {bank.map((w, i) => (
              <button key={`${i}-${w}`} onClick={() => tapBank(w)} style={{ padding: "10px 16px", background: "rgba(168,216,234,0.12)", border: "1px solid rgba(168,216,234,0.25)", borderRadius: 12, color: "#a8d8ea", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{w}</button>
            ))}
          </div>
        )}
        {correct && (
          <>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>✓</div>
              <div style={{ color: "#4ade80", fontSize: 14, fontWeight: 600 }}>Perfect!</div>
            </div>
            <button style={styles.primaryBtn} onClick={onNext}>Continue →</button>
          </>
        )}
      </div>
    </Fade>
  );
}

function Because({ lesson, dir, onNext }) {
  const isFlipped = dir === "es-en" && lesson.becauseFlip;
  const bec = isFlipped ? lesson.becauseFlip : lesson.because;
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(raf);
  }, [step]);

  const screens = [];
  screens.push(<div key="0"><div style={styles.becTitle}>{bec.title}</div><div style={styles.explainBox}><p style={styles.bodyText}>{bec.explain}</p></div></div>);
  if (bec.key || bec.fun) {
    screens.push(
      <div key="1">
        {bec.key && <div style={styles.keyBox}><div style={{ fontSize: 16, marginBottom: 8 }}>🔑</div><p style={styles.bodyText}>{bec.key}</p></div>}
        {bec.fun && <div style={styles.funBox}><div style={{ fontSize: 14, marginBottom: 6 }}>💡</div><p style={{ ...styles.bodyText, color: "#e8d8a8" }}>{bec.fun}</p></div>}
      </div>
    );
  }
  if (bec.src) {
    screens.push(<div key="2"><div style={styles.srcBox}><div style={{ fontSize: 18, marginBottom: 8 }}>🧭</div><p style={styles.bodyText}>{bec.src}</p></div></div>);
  }

  return (
    <div style={{ ...styles.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "all 0.4s ease" }}>
      <div style={styles.tag}>BECAUSE…</div>
      {isFlipped && <div style={{ textAlign: "center", fontSize: 11, color: "#f472b6", marginBottom: 10, fontWeight: 600 }}>🇪🇸→🇺🇸 Flipped for Spanish speakers</div>}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 16 }}>
        {screens.map((_, i) => <div key={i} style={{ width: i === step ? 22 : 8, height: 8, borderRadius: 4, background: i <= step ? "#a8d8ea" : "#2a3a4a", transition: "all 0.3s" }} />)}
      </div>
      {screens[step]}
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "center" }}>
        {step > 0 && <button style={styles.ghostBtn} onClick={() => setStep(step - 1)}>← Back</button>}
        {step < screens.length - 1
          ? <button style={styles.primaryBtn} onClick={() => setStep(step + 1)}>Continue →</button>
          : <button style={styles.primaryBtn} onClick={onNext}>Next →</button>}
      </div>
    </div>
  );
}

function FormulaView({ lesson, onNext }) {
  const form = lesson.formula;
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(raf);
  }, [step]);

  if (form.type === "decision") {
    return (
      <div style={{ ...styles.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "all 0.4s ease" }}>
        <div style={styles.tag}>THE FORMULA</div>
        <div style={styles.becTitle}>{form.title}</div>
        <div style={{ textAlign: "center", fontSize: 15, color: "#e8f0f8", fontWeight: 600, marginBottom: 16, padding: "14px 16px", background: "rgba(168,216,234,0.06)", borderRadius: 12, border: "1px solid rgba(168,216,234,0.1)" }}>
          🤔 {form.question}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {form.paths.map((path, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 14, border: `2px solid ${path.color}33`, background: `${path.color}08` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#8a9aaa" }}>{i === 0 ? "↙" : "↘"}</span>
                <span style={{ fontSize: 13, color: "#c8d8e8", flex: 1 }}>{path.label}</span>
                <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Fraunces', serif", color: path.color }}>{path.result}</span>
              </div>
              {path.examples.map((ex, j) => <div key={j} style={{ fontSize: 12, color: "#7a8a9a", paddingLeft: 20, marginTop: 3 }}>• {ex}</div>)}
            </div>
          ))}
        </div>
        <button style={{ ...styles.primaryBtn, marginTop: 20 }} onClick={onNext}>Practice now →</button>
      </div>
    );
  }

  const Piece = ({ piece }) => (
    <div style={{ padding: "10px 14px", borderRadius: 12, background: `${piece.c}15`, border: `2px solid ${piece.c}40` }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: piece.c, fontFamily: "'Fraunces', serif" }}>{piece.t}</div>
      <div style={{ fontSize: 9, color: "#6a7a8a", letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>{piece.r}</div>
    </div>
  );

  const screens = [
    <div key="0">
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#5a7a8a", textTransform: "uppercase", marginBottom: 10 }}>{form.enF.label}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>{form.enF.pieces.map((p, i) => <Piece key={i} piece={p} />)}</div>
      </div>
      <div style={{ textAlign: "center", fontSize: 20, color: "#3a4a5a", margin: "8px 0" }}>↕</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#5a7a8a", textTransform: "uppercase", marginBottom: 10 }}>{form.esF.label}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>{form.esF.pieces.map((p, i) => <Piece key={i} piece={p} />)}</div>
      </div>
    </div>,
    <div key="1">
      <div style={styles.explainBox}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#e8f0f8", marginBottom: 10, textAlign: "center" }}>The math</div>
        {form.rules.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#a8d8ea", fontWeight: 700, minWidth: 18 }}>{i + 1}.</span>
            <span style={{ fontSize: 13, color: "#c8d8e8", lineHeight: 1.6 }}>{line}</span>
          </div>
        ))}
      </div>
    </div>,
    <div key="2">
      <div style={{ fontSize: 14, fontWeight: 700, color: "#e8f0f8", marginBottom: 12, textAlign: "center" }}>See it in action</div>
      {form.examples.map((ex, i) => (
        <div key={i} style={{ padding: 12, borderRadius: 12, background: "rgba(168,216,234,0.03)", border: "1px solid rgba(168,216,234,0.06)", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <span style={{ fontSize: 13, color: "#8a9aaa" }}>{ex.e}</span>
            <span style={{ fontSize: 11, color: "#3a4a5a" }}>→</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#a8d8ea" }}>{ex.s}</span>
          </div>
          <div style={{ fontSize: 11, color: "#5a7a8a", marginTop: 4, fontStyle: "italic" }}>{ex.n}</div>
        </div>
      ))}
    </div>,
  ];

  return (
    <div style={{ ...styles.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "all 0.4s ease" }}>
      <div style={styles.tag}>THE FORMULA</div>
      <div style={styles.becTitle}>{form.title}</div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 16 }}>
        {screens.map((_, i) => <div key={i} style={{ width: i === step ? 22 : 8, height: 8, borderRadius: 4, background: i <= step ? "#a8d8ea" : "#2a3a4a", transition: "all 0.3s" }} />)}
      </div>
      {screens[step]}
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "center" }}>
        {step > 0 && <button style={styles.ghostBtn} onClick={() => setStep(step - 1)}>← Back</button>}
        {step < screens.length - 1
          ? <button style={styles.primaryBtn} onClick={() => setStep(step + 1)}>Continue →</button>
          : <button style={styles.primaryBtn} onClick={onNext}>Practice now →</button>}
      </div>
    </div>
  );
}

function PickExercise({ item, onOk, onFail }) {
  const [selected, setSelected] = useState(null);
  const [options] = useState(() => shuffle([item.a, ...item.w]));

  const pick = (opt) => {
    setSelected(opt);
    if (opt === item.a) setTimeout(onOk, 600);
    else setTimeout(onFail, 1000);
  };

  return (
    <div>
      <div style={styles.promptBox}><p style={{ fontSize: 16, fontWeight: 600, color: "#e8f0f8", fontFamily: "'Fraunces', serif", margin: 0 }}>{item.q}</p></div>
      {item.h && <div style={{ textAlign: "center", fontSize: 12, color: "#5a6a7a", fontStyle: "italic", marginBottom: 6 }}>💭 {item.h}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 10 }}>
        {options.map((opt, i) => {
          const isRight = selected && opt === item.a;
          const isWrong = selected === opt && opt !== item.a;
          return (
            <button key={i} onClick={() => !selected && pick(opt)} style={{
              padding: "12px 16px", borderRadius: 12, fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textAlign: "left", cursor: selected ? "default" : "pointer", transition: "all 0.2s",
              background: isRight ? "rgba(74,222,128,0.12)" : isWrong ? "rgba(248,113,113,0.12)" : "rgba(168,216,234,0.04)",
              border: `2px solid ${isRight ? "#4ade80" : isWrong ? "#f87171" : "rgba(168,216,234,0.1)"}`,
              color: isRight ? "#4ade80" : isWrong ? "#f87171" : "#c8d8e8",
            }}>
              {opt}
              {isRight && <span style={{ float: "right" }}>✓</span>}
              {isWrong && <span style={{ float: "right" }}>✗</span>}
            </button>
          );
        })}
      </div>
      {selected && selected !== item.a && <div style={{ textAlign: "center", marginTop: 10, color: "#f87171", fontSize: 13 }}>Answer: <strong style={{ color: "#4ade80" }}>{item.a}</strong></div>}
    </div>
  );
}

function MatchExercise({ item, onOk }) {
  const pairs = item.pairs;
  const [leftOrder] = useState(() => shuffle(pairs.map((_, i) => i)));
  const [rightOrder] = useState(() => shuffle(pairs.map((_, i) => i)));
  const [selLeft, setSelLeft] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState(null);

  const tapLeft = (i) => { if (!matched.has(i)) setSelLeft(i); };
  const tapRight = (i) => {
    if (selLeft === null || matched.has(i)) return;
    if (selLeft === i) {
      const next = new Set([...matched, i]);
      setMatched(next);
      setSelLeft(null);
      setWrong(null);
      if (next.size === pairs.length) setTimeout(onOk, 400);
    } else {
      setWrong({ l: selLeft, r: i });
      setTimeout(() => { setWrong(null); setSelLeft(null); }, 600);
    }
  };

  return (
    <div>
      <div style={styles.promptBox}><p style={{ fontSize: 14, fontWeight: 600, color: "#e8f0f8", fontFamily: "'Fraunces', serif", margin: 0 }}>{item.q}</p></div>
      <div style={{ fontSize: 11, color: "#4a6a7a", textAlign: "center", marginBottom: 10 }}>Tap left → then match on right</div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          {leftOrder.map((i) => {
            const done = matched.has(i);
            const active = selLeft === i;
            const isWrong = wrong?.l === i;
            return (
              <button key={i} onClick={() => tapLeft(i)} style={{
                padding: "10px", borderRadius: 9, fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textAlign: "center", cursor: done ? "default" : "pointer",
                background: done ? "rgba(74,222,128,0.08)" : active ? "rgba(168,216,234,0.15)" : isWrong ? "rgba(248,113,113,0.1)" : "rgba(168,216,234,0.04)",
                border: `2px solid ${done ? "#4ade80" : active ? "#a8d8ea" : isWrong ? "#f87171" : "rgba(168,216,234,0.08)"}`,
                color: done ? "#4ade8088" : "#c8d8e8", opacity: done ? 0.5 : 1, transition: "all 0.2s",
              }}>{pairs[i][0]}</button>
            );
          })}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          {rightOrder.map((i) => {
            const done = matched.has(i);
            const isWrong = wrong?.r === i;
            return (
              <button key={i} onClick={() => tapRight(i)} style={{
                padding: "10px", borderRadius: 9, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textAlign: "center", cursor: done ? "default" : "pointer",
                background: done ? "rgba(74,222,128,0.08)" : isWrong ? "rgba(248,113,113,0.1)" : "rgba(168,216,234,0.04)",
                border: `2px solid ${done ? "#4ade80" : isWrong ? "#f87171" : "rgba(168,216,234,0.08)"}`,
                color: done ? "#4ade8088" : "#a8d8ea", opacity: done ? 0.5 : 1, transition: "all 0.2s",
              }}>{pairs[i][1]}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PracticeScreen({ lesson, onDone }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const items = lesson.practice;
  const done = idx >= items.length;

  const handleOk = () => { setScore((s) => s + 1); setShowNext(true); };
  const handleFail = () => { setShowNext(true); };
  const advance = () => { setIdx((i) => i + 1); setShowNext(false); };

  if (done) {
    return (
      <Fade id="done">
        <div style={styles.card}>
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{score === items.length ? "🎉" : "💪"}</div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Fraunces', serif", color: "#e8f0f8", marginBottom: 6 }}>
              {score === items.length ? "Perfect!" : "Lesson Complete!"}
            </div>
            <div style={{ fontSize: 14, color: "#5a7a8a", marginBottom: 22 }}>{score}/{items.length} correct</div>
            <button style={styles.primaryBtn} onClick={onDone}>Back to lessons →</button>
          </div>
        </div>
      </Fade>
    );
  }

  const item = items[idx];
  return (
    <Fade id={lesson.id + "p" + idx}>
      <div style={styles.card}>
        <div style={styles.tag}>PRACTICE</div>
        <div style={{ width: "100%", height: 6, background: "#1a2a3a", borderRadius: 4, marginBottom: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(idx / items.length) * 100}%`, background: "linear-gradient(90deg, #a8d8ea, #4ade80)", borderRadius: 4, transition: "width 0.4s" }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "#3a4a5a", letterSpacing: 1, marginBottom: 12 }}>{idx + 1}/{items.length}</div>
        {item.type === "pick" && <PickExercise key={idx} item={item} onOk={handleOk} onFail={handleFail} />}
        {item.type === "match" && <MatchExercise key={idx} item={item} onOk={handleOk} />}
        {showNext && (
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button style={styles.primaryBtn} onClick={advance}>{idx < items.length - 1 ? "Next →" : "Finish →"}</button>
          </div>
        )}
      </div>
    </Fade>
  );
}

export default function SynoLingua() {
  const [view, setView] = useState("home");
  const [lesson, setLesson] = useState(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem("synolingua_progress");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });
  const [direction, setDirection] = useState("en-es");
  const [targetLang, setTargetLang] = useState("es");

  useEffect(() => {
    localStorage.setItem("synolingua_progress", JSON.stringify([...progress]));
  }, [progress]);

  const getSteps = (les) => {
    if (!les) return [];
    const steps = ["cluster"];
    if (les.placement) steps.push("placement");
    steps.push("because");
    if (les.formula) steps.push("formula");
    steps.push("practice");
    return steps;
  };

  const visibleSteps = getSteps(lesson);
  const currentStep = visibleSteps[stepIdx];

  const startLesson = (unitId, lessonId) => {
    const unit = UNITS.find((u) => u.id === unitId);
    const les = unit?.lessons.find((l) => l.id === lessonId);
    if (les) { setLesson(les); setStepIdx(0); setView("lesson"); }
  };

  const nextStep = () => setStepIdx((i) => Math.min(i + 1, visibleSteps.length - 1));

  const completeLesson = () => {
    if (lesson) setProgress((p) => new Set([...p, lesson.id]));
    setView("home");
    setLesson(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0c1220, #131d2e 40%, #0f1a28)", fontFamily: "'DM Sans', sans-serif", color: "#c8d8e8", position: "relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,700;9..144,800&family=DM+Sans:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } button { cursor: pointer; font-family: 'DM Sans', sans-serif; } button:active { transform: scale(0.97); }`}</style>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", minHeight: "100vh" }}>
        {view === "lesson" && lesson && (
          <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "rgba(12,18,32,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(168,216,234,0.06)" }}>
            <button aria-label="Back to lessons" style={{ background: "none", border: "none", color: "#a8d8ea", fontSize: 14, fontWeight: 600 }} onClick={() => { setView("home"); setLesson(null); }}>← Back</button>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {visibleSteps.map((_, i) => <div key={i} style={{ width: i === stepIdx ? 22 : 8, height: 8, borderRadius: 4, background: i <= stepIdx ? "#a8d8ea" : "#2a3a4a", transition: "all 0.3s" }} />)}
            </div>
            <div style={{ width: 50 }} />
          </div>
        )}
        <div style={{ padding: "20px 16px 80px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {view === "home" && <Home onPick={startLesson} prog={progress} dir={direction} toggleDir={() => setDirection((d) => d === "en-es" ? "es-en" : "en-es")} targetLang={targetLang} onLangChange={setTargetLang} />}
          {view === "lesson" && lesson && currentStep === "cluster" && <Cluster lesson={lesson} dir={direction} onNext={nextStep} />}
          {view === "lesson" && lesson && currentStep === "placement" && <Placement key={lesson.id + "pl"} lesson={lesson} dir={direction} onNext={nextStep} />}
          {view === "lesson" && lesson && currentStep === "because" && <Because key={lesson.id + "b"} lesson={lesson} dir={direction} onNext={nextStep} />}
          {view === "lesson" && lesson && currentStep === "formula" && <FormulaView key={lesson.id + "f"} lesson={lesson} onNext={nextStep} />}
          {view === "lesson" && lesson && currentStep === "practice" && <PracticeScreen key={lesson.id + "p"} lesson={lesson} onDone={completeLesson} />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { background: "rgba(18,28,42,0.7)", border: "1px solid rgba(168,216,234,0.1)", borderRadius: 20, padding: "26px 22px", width: "100%", maxWidth: 420, backdropFilter: "blur(16px)", boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(168,216,234,0.04)" },
  tag: { fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#a8d8ea", textAlign: "center", marginBottom: 16, textTransform: "uppercase" },
  langLabel: { fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#5a7a8a", textTransform: "uppercase", textAlign: "center", marginBottom: 6 },
  audioBtn: { display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", background: "rgba(168,216,234,0.08)", border: "1px solid rgba(168,216,234,0.18)", borderRadius: 12, padding: "10px 20px", color: "#a8d8ea", fontSize: 14 },
  primaryBtn: { display: "block", margin: "0 auto", padding: "12px 28px", background: "linear-gradient(135deg, #a8d8ea, #7ab8d4)", border: "none", borderRadius: 12, color: "#0c1220", fontSize: 15, fontWeight: 700, letterSpacing: 0.3, boxShadow: "0 4px 16px rgba(168,216,234,0.2)", transition: "all 0.15s" },
  ghostBtn: { padding: "12px 24px", background: "rgba(168,216,234,0.08)", border: "1px solid rgba(168,216,234,0.18)", borderRadius: 12, color: "#a8d8ea", fontSize: 14, fontWeight: 600 },
  becTitle: { fontSize: 20, fontWeight: 700, fontFamily: "'Fraunces', serif", color: "#e8f0f8", textAlign: "center", marginBottom: 14 },
  explainBox: { background: "rgba(168,216,234,0.04)", border: "1px solid rgba(168,216,234,0.08)", borderRadius: 14, padding: 18 },
  keyBox: { background: "rgba(168,216,234,0.05)", border: "1px solid rgba(168,216,234,0.1)", borderRadius: 14, padding: 18, marginBottom: 12, textAlign: "center" },
  funBox: { background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.12)", borderRadius: 14, padding: 16 },
  srcBox: { background: "rgba(196,181,253,0.05)", border: "1px solid rgba(196,181,253,0.1)", borderRadius: 14, padding: 18, textAlign: "center" },
  bodyText: { fontSize: 14, lineHeight: 1.8, color: "#c8d8e8", margin: 0 },
  promptBox: { textAlign: "center", background: "rgba(168,216,234,0.04)", border: "1px solid rgba(168,216,234,0.08)", borderRadius: 14, padding: "14px 14px", marginBottom: 10 },
};
