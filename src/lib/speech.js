export function speak(text, lang = "es-ES") {
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.82;
    window.speechSynthesis.speak(utter);
  } catch {
    // speech synthesis unavailable or blocked
  }
}
