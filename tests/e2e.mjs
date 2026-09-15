import { chromium } from "playwright";
const B = process.env.BASE_URL || "http://localhost:4173";
let fail = 0;
let btn;
const check = (n, c) => { console.log((c ? "PASS  " : "FAIL  ") + n); if (!c) fail++; };

// CHROME_PATH lets this run against a preinstalled browser; omit it to use
// Playwright's own download.
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
);
const page = await browser.newPage();
btn = (name) => page.getByRole("button", { name, exact: true });
page.on("pageerror", (e) => { console.log("PAGE ERROR: " + e.message); fail++; });

// 1. Root redirects to the default language.
await page.goto(B + "/");
await page.waitForLoadState("networkidle");
check("/ redirects to /es", new URL(page.url()).pathname === "/es");

// 2. A legacy v1 flat array migrates on real load.
await page.evaluate(() => localStorage.setItem("synolingua_progress", JSON.stringify(["the", "a_an"])));
await page.reload();
await page.waitForLoadState("networkidle");
check("migrated progress renders as 2/11", await page.getByText("2/11 lessons").isVisible());
const stored = await page.evaluate(() => localStorage.getItem("synolingua_progress"));
check("storage rewritten to v2 shape", stored === JSON.stringify({ es: ["the", "a_an"] }));

// 3. Deep link straight into a lesson (the monetization plan needs this shareable).
await page.goto(B + "/es/lesson/gustar");
await page.waitForLoadState("networkidle");
check("deep link renders the lesson", await page.getByText("MEANING CLUSTER").isVisible());
check("deep link shows gustar", await page.getByText("gustar", { exact: true }).first().isVisible());

// 4. Unknown lesson id falls back to the course home.
await page.goto(B + "/es/lesson/does-not-exist");
await page.waitForLoadState("networkidle");
check("unknown lesson redirects home", new URL(page.url()).pathname === "/es");

// 5. Switching language navigates by URL.
await page.getByRole("button", { name: /Learn French/ }).click();
check("language chip navigates to /fr", new URL(page.url()).pathname === "/fr");
await page.getByText("French is coming soon").waitFor({ timeout: 5000 });
check("unavailable language shows coming soon", await page.getByText("French is coming soon").isVisible());

// 6. Complete a full lesson and confirm it persists.
await page.evaluate(() => localStorage.removeItem("synolingua_progress"));
await page.goto(B + "/es/lesson/the");
await page.waitForLoadState("networkidle");
await page.getByRole("button", { name: /Continue/ }).click();          // cluster
await btn("el").click(); await btn("niño").click();                    // placement
await page.getByRole("button", { name: /Continue/ }).click();
for (let i = 0; i < 2; i++) { await page.getByRole("button", { name: /Continue/ }).click(); }  // because
await page.getByRole("button", { name: /Next/ }).click();
await btn("el niño").click();                                          // practice: pick 1
await page.getByRole("button", { name: /Next/ }).click();
await btn("la música").click();                                        // practice: pick 2
await page.getByRole("button", { name: /Next/ }).click();
for (const [l, r] of [["the boy","el niño"],["the girl","la niña"],["the coffee","el café"],["the music","la música"]]) {
  await btn(l).click(); await btn(r).click();
}
await page.getByRole("button", { name: /Finish/ }).click();
await btn("Back to lessons →").click();
await page.waitForLoadState("networkidle");
check("finished lesson returns home", new URL(page.url()).pathname === "/es");
try { await page.getByText("1/11 lessons").waitFor({ timeout: 5000 }); } catch { console.log("   body says: " + (await page.locator("body").innerText()).split("\n").filter(t => t.includes("lesson")).join(" | ")); }
check("completion shows 1/11", await page.getByText("1/11 lessons").isVisible());
const after = await page.evaluate(() => localStorage.getItem("synolingua_progress"));
check("completion persisted under es", after === JSON.stringify({ es: ["the"] }));

// 7. Badge rendering — the Phase 1 rename collapsed cluster.g (gender) and
// cluster.t (semantic tag) into one badge field; both kinds must still show.
await page.goto(B + "/es/lesson/the");
await page.waitForLoadState("networkidle");
await page.getByText("MEANING CLUSTER").waitFor({ timeout: 5000 });
const genderBadges = await page.locator("span").filter({ hasText: /^[mf]$/ }).count();
check("gender badges render (the)", genderBadges >= 4);

await page.goto(B + "/es/lesson/is_are");
await page.waitForLoadState("networkidle");
await page.getByText("MEANING CLUSTER").waitFor({ timeout: 5000 });
check("note badge 'always' renders (is_are)", await page.getByText("always", { exact: true }).first().isVisible());
check("note badge 'now' renders (is_are)", await page.getByText("now", { exact: true }).first().isVisible());

// 8. Formula step still renders after the rename (gustar is the marquee lesson).
await page.goto(B + "/es/lesson/gustar");
await page.waitForLoadState("networkidle");
await page.getByText("MEANING CLUSTER").waitFor({ timeout: 5000 });
await page.getByRole("button", { name: /Continue/ }).click();                  // cluster
for (const w of ["Me", "gusta", "el café"]) await btn(w).click();              // placement
await page.getByRole("button", { name: /Continue/ }).click();
for (let i = 0; i < 2; i++) await page.getByRole("button", { name: /Continue/ }).click();
await page.getByRole("button", { name: /Next/ }).click();                      // because -> formula
await page.getByText("The Flip Formula").waitFor({ timeout: 5000 });
check("flip formula renders", await page.getByText("The Flip Formula").isVisible());
check("formula shows the reversed roles", await page.getByText("doer!", { exact: true }).isVisible());

// 9. Direction toggle flips known/target labels (forward <-> reverse).
await page.goto(B + "/es");
await page.waitForLoadState("networkidle");
check("default direction is English to Spanish", await page.getByText("🇺🇸 English → 🇪🇸 Spanish").isVisible());
await page.getByRole("button", { name: /Switch learning direction/ }).click();
await page.getByText("🇪🇸 Spanish → 🇺🇸 English").waitFor({ timeout: 5000 });
check("toggled direction is Spanish to English", await page.getByText("🇪🇸 Spanish → 🇺🇸 English").isVisible());

await browser.close();
console.log(fail === 0 ? "\nALL PASSED" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
