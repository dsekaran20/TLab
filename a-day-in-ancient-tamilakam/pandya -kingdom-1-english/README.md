# The Pearl and the Poem

A small, single-page interactive prototype set in Sangam-era Tamilakam. The player is Ilavan, a young courier carrying a sealed pearl pouch and a short verse from the pearl shore at Korkai inland to the Pandya royal hall at Madurai.

Six scenes, three choices each, four meters (Reputation, Pearls, Stamina, Wisdom), six possible endings.

## Files

```
pandya-prototype/
├── index.html      # Markup + structure (test IDs on every interactive element)
├── styles.css      # Palm-leaf manuscript design system (sand / indigo / pearl / gold)
└── game.js         # Scene graph, meters, choice handling, endings
```

No build step, no dependencies, no backend. Plain HTML / CSS / JS. Two fonts are loaded from Google Fonts CDN (Cormorant Garamond for display, Inter for body).

## Run locally

From the project root:

```bash
cd pandya-prototype
python3 -m http.server 8765
# open http://localhost:8765/index.html
```

Any static file server will work — e.g. `npx serve .`.

## Deploy

Call `deploy_website(project_path="/home/user/workspace/pandya-prototype")`.

## Design notes

- **Palette:** warm sand (`#f5ecd7`) ground, deep indigo (`#131a36`) display type, pearl off-white card surface with horizontal manuscript-style rule lines, muted gold (`#c9a14a`) accents, terra and palm-leaf-green meter colors. No emoji.
- **Texture:** the palm-leaf grain is pure CSS (repeating-linear-gradients + radial wash).
- **Layout:** narrative card + sticky right rail (Courier / Ledger / Pouch / Disclaimer). Collapses to a single column under 880px.
- **Motion:** subtle fade-up on scene change, animated meter fills. Respects `prefers-reduced-motion`.
- **Accessibility:** WCAG-AA contrast, `aria-live` narrative region, semantic buttons, visible focus rings, keyboard-operable.
- **Test IDs:** every interactive control and dynamic surface has a `data-testid` attribute (e.g. `button-reset`, `button-choice-korkai_shore-1`, `meter-pearls`, `text-ending-banner`, `container-ending-summary`).
- **Disclaimer:** visible in the rail — "Historical fiction prototype inspired by Sangam-era Tamilakam."

## Mechanics

- Each choice mutates one or more meters and advances to the next scene.
- Two scenes (Vaigai ford and Royal hall) include a `wisdom`-gated branch — if the player lacks the requirement, a failure variant is taken instead (still advances, but with different effects).
- The ending is selected by combining the four final meters; six distinct endings are possible.
- A reset / replay button is present in the top bar throughout, and a "Walk the road again" button appears at the end.
