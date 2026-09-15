# Monetizing SynoLingua

## The short answer

Yes — but not yet, and not as a subscription.

Sell it as a **one-time course purchase at $29**, not $7/month. The blocker is
content volume: 11 lessons is roughly one sitting, and no pricing model fixes
that. Get to ~45 lessons and this is a real product with ~96% gross margin.

---

## What you're actually selling

Not Spanish lessons. Those are free everywhere.

You're selling the **explanation layer** — the `because` and `formula` screens:

> "Thousands of years ago, Latin sorted ALL nouns into two bins — like
> color-coded teams. Think electrical plugs: Type A and Type B. The name is
> just a label."

> Spanish: RECEIVER → ACTION → DOER. Coffee does the action TO you.

Duolingo deliberately doesn't do this — "why" doesn't gamify, doesn't drive
streaks, and doesn't fit a 90-second session. That gap is the whole business.
Every monetization decision below follows from one fact: **people pay for the
moment something finally makes sense, not for daily practice.**

---

## Why one-time, not subscription

Subscription is the reflex answer and it's wrong here.

A subscription sells a *habit*. SynoLingua delivers *insight*. Insight is
consumed once — someone who understands `gustar` doesn't need to re-buy that
understanding next month. Ship a subscription against 11 lessons and you get
near-total churn after month one, plus billing infrastructure, dunning, and
refund support you'd rather not own.

The right comparison isn't Duolingo. It's **Michel Thomas**, which sells finite
courses as one-time purchases for $100+, for exactly this reason.

| | One-time $29 | Subscription $7/mo |
|---|---|---|
| Net per customer | **$27.86** | ~$20 (at a generous 3-month average) |
| Churn risk | none | the entire business |
| Infrastructure | one payment, one entitlement check | billing, dunning, cancellation, proration |
| Support load | refunds only | refunds + billing disputes |
| Fits the product | a course you finish | a habit this app doesn't build |

One-time wins on every row. It also nets *more* per customer than a
subscription that survives three months, which most wouldn't.

---

## Pricing

- **$29** — complete Spanish course, one-time, lifetime access including
  future Spanish lessons.
- **$29 each** for French / German / Japanese / Italian as they ship.
- **$79** — all languages, including ones not yet built.

$29 sits in the impulse band for a self-directed adult: above the $5 app-store
noise floor where nothing is taken seriously, well under Michel Thomas. It
needs no deliberation and no manager's approval.

**Sell on the web, not in an app store.** Apple takes 30% (15% under the Small
Business Program) — that's $4.35 of every $29 for a payment you can process
yourself. If you later wrap this in a native shell, keep purchase on the web.

---

## What's free vs. paid

Free tier: **Unit 1 — The Basics** (5 lessons) *plus* the `like / enjoy` lesson
from Unit 3.

That second one is the important part, and it's counterintuitive: give away
your single best lesson. The Flip Formula — *coffee does the liking to you* —
is the most shareable thing in the product and the clearest demonstration that
this app does something the others don't. It is the sales pitch. Bury it behind
the paywall and nobody discovers the reason to pay.

Gate at the *lesson* boundary, never mid-lesson. Interrupting someone at the
`because` screen sours the exact feeling you're selling.

---

## Unit economics

Costs are effectively zero: static site on a CDN, no server, speech via the
browser's built-in Web Speech API. The only variable cost is payment
processing.

```
Price                $29.00
Stripe (2.9% + 30¢)  -$1.14
─────────────────────────────
Net                  $27.86      (96.1% margin)

1,000 sales      →   $27,860
1,795 sales      →   ~$50,000
```

There's no per-user cost to manage and no infrastructure that scales with
usage. That margin is the strongest thing about this business — protect it by
staying off app-store rails and out of a server-heavy architecture.

---

## What must be built before charging

Ordered by what actually blocks a sale.

**1. Content: 11 → ~45 lessons.** *This is the real work and the only true
blocker.* A "complete Spanish foundations course" for $29 is roughly 45
lessons; you have 11. Budget 1–2 hours per lesson — the `because` copy is
hand-authored and its quality *is* the product, so it doesn't survive being
mass-generated. Call it 35–70 hours. Everything else on this list is a
weekend.

**2. Progress that survives.** Progress lives in `localStorage` under
`synolingua_progress`. Clearing the browser wipes it. That's tolerable for a
free prototype and unacceptable the moment money changes hands — it's a refund
and a one-star review. Minimum viable: a license key that carries entitlement
plus export/import of progress. Better: real accounts.

**3. Purchase and entitlement.** Simplest path that works, no accounts needed:
Stripe Payment Link → emailed license key → one serverless function validates
it → entitlement cached locally. A few hours of work.

**4. A landing page.** `index.html` is a bare Vite shell. There is currently no
product page, no pricing, no way to buy, and nothing to send traffic to. Lead
with the Flip Formula.

**5. Skip anti-piracy.** The bundle is client-side JavaScript; anyone
determined will extract it. At $29 that friction costs more in complexity and
false positives than it recovers. Validate the key, move on.

Also: the language picker advertises French, German, Japanese, and Italian as
coming. That's fine while free. Once money is involved it needs explicit
"not yet available" framing, or it's a chargeback.

---

## The competitive reality

Be clear-eyed about one thing: **Language Transfer is free and does exactly
this.** Mihalis Eleftheriou's "thinking method" derives Spanish from English
through etymology and reasoning — the same core insight — at zero cost, funded
by donations. Anyone researching before buying will find it.

The honest differentiation is real but narrow:

- LT is **audio-only**. No visual representation of the formulas, and the
  color-coded DOER → ACTION → THING breakdown is genuinely better seen than
  heard.
- LT has **no practice**. No pick, match, or word-placement exercises.
- LT has **no progress tracking** and no structure to return to.
- LT is a **45-hour linear commitment**. SynoLingua is browsable — you can
  jump straight to the `gustar` lesson because that's the thing confusing you.

Position as *visual, interactive thinking-method instruction*, and expect to be
compared to LT. Don't compete with Duolingo on gamification or content volume;
that fight is unwinnable and it isn't the one you want.

---

## Considered and rejected

- **Ads** — destroys the premium feel and needs traffic volume you don't have.
  At realistic numbers it earns less than a handful of $29 sales.
- **Freemium subscription** — see above. Wrong shape for insight-based content.
- **Schools / B2B** — real money (classroom site licenses at $200–500), but it
  needs teacher dashboards, rosters, and a months-long sales cycle. Revisit
  once the consumer course is proven.
- **Licensing the explanation corpus** — the `because`/`formula` content is the
  genuinely valuable asset, but licensing it before you've established its
  value sells it cheap.

---

## Sequence

1. **Write lessons.** Get to 45. Nothing else matters until this is done.
2. **Fix persistence.** Entitlement plus progress that survives a cache clear.
3. **Landing page + Stripe Payment Link.** Lead with the Flip Formula.
4. **Ship at $29.** Free tier: Unit 1 + `like / enjoy`.
5. **Watch one number:** free-to-paid conversion. Below ~2% the problem is the
   free tier or the landing page, not the price.
6. **Then** add the second language — proof the format travels beyond Spanish.

The pricing question is settled. The content question isn't, and that's the one
standing between this and revenue.
