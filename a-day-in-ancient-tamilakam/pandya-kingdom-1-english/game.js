/* ============================================================
   The Pearl and the Poem
   Six-scene interactive prototype set in Sangam-era Tamilakam
   ============================================================ */

(function () {
  "use strict";

  // ---------- State ----------
  const initialState = () => ({
    sceneId: "korkai_shore",
    meters: {
      reputation: 4, // standing with the court and patrons
      pearls: 3,     // wealth carried in the pouch
      stamina: 6,    // physical reserve for the road
      wisdom: 2,     // grasp of court etiquette and Sangam poetics
    },
    inventory: [
      { id: "pouch", glyph: "P", name: "Sealed pearl pouch" },
      { id: "verse", glyph: "V", name: "Verse on palm-leaf" },
      { id: "water", glyph: "W", name: "Gourd of well water" },
    ],
    visited: [],
  });

  let state = initialState();

  // ---------- Meter metadata ----------
  const METER_DEFS = [
    { key: "reputation", label: "Reputation at court", max: 10 },
    { key: "pearls", label: "Pearls in the pouch", max: 10 },
    { key: "stamina", label: "Stamina on the road", max: 10 },
    { key: "wisdom", label: "Wisdom of verse", max: 10 },
  ];

  // ---------- Route markers (visible journey progress) ----------
  const ROUTE = [
    { id: "korkai_shore", label: "Korkai" },
    { id: "salt_road", label: "Salt road" },
    { id: "vaigai_ford", label: "Vaigai ford" },
    { id: "grove_camp", label: "Toddy grove" },
    { id: "city_gate", label: "Madurai gate" },
    { id: "royal_hall", label: "Royal hall" },
  ];

  // ---------- Scenes ----------
  // Each scene has: title, place, text (may include verse via {verse: "..."}),
  // and choices that produce delta state and a next scene id.
  const SCENES = {
    korkai_shore: {
      title: "The tide brings a charge",
      place: "Korkai, the pearl shore",
      text: [
        "Salt wind moves through your hair as the divers return with the dawn catch. The headwoman, Andai of the boat-people, presses a small linen pouch into your palm. Three pearls, she says — milky as a heron's eye — are tribute for the Pandya court at Madurai.",
        "She also hands you a thin palm-leaf strip. A poet of the shore has scratched a verse onto it in her careful hand.",
        { verse: "\"The conch keeps its quiet pearl;\nlet the king keep his quiet justice.\"" },
        "You must carry pouch and poem inland, across the salt road and the Vaigai, to the gathering of bards in the king's hall.",
      ],
      choices: [
        {
          label: "Bow low and accept both with formal thanks.",
          effects: { reputation: +1, wisdom: +1, stamina: -1 },
          hint: "+ reputation, + wisdom, − stamina",
          next: "salt_road",
        },
        {
          label: "Ask Andai to teach you the verse aloud before you go.",
          effects: { wisdom: +2, stamina: -1 },
          hint: "+ + wisdom, − stamina",
          next: "salt_road",
        },
        {
          label: "Pocket the pouch quickly and set off at once.",
          effects: { stamina: +1, reputation: -1 },
          hint: "+ stamina, − reputation",
          next: "salt_road",
        },
      ],
    },

    salt_road: {
      title: "Salt road, midday glare",
      place: "The pan-salt flats between coast and inland",
      text: [
        "The salt road is a white scar between low scrub. The sun hammers the flats and your shadow shrinks to nothing beneath you. A merchant's bullock cart trundles ahead, its driver, Marudan, calling out songs of trade to keep himself awake.",
        "He spots your courier's belt and slows. 'Ride with me to the Vaigai,' he offers, 'and tell me one thing of the court in return. Or sell me one of your pearls — I will pay above weight.'",
      ],
      choices: [
        {
          label: "Climb aboard and trade road talk, no court secrets.",
          effects: { stamina: +2, reputation: +0 },
          hint: "+ + stamina",
          next: "vaigai_ford",
        },
        {
          label: "Sell one pearl quietly. Coin will travel further than feet.",
          effects: { pearls: -1, stamina: +1, wisdom: +1 },
          hint: "− pearl, + stamina, + wisdom",
          next: "vaigai_ford",
        },
        {
          label: "Walk past, alone. The pouch is not for haggling.",
          effects: { reputation: +2, stamina: -2 },
          hint: "+ + reputation, − − stamina",
          next: "vaigai_ford",
        },
      ],
    },

    vaigai_ford: {
      title: "The Vaigai is running high",
      place: "A shallow crossing of the Vaigai river",
      text: [
        "By late afternoon you reach the Vaigai. The river runs higher than the season should allow — late rains in the western hills, perhaps. Reeds bend in the brown current. A ferryman, Kollan, leans on his pole on the far bank, considering you across the water.",
        "He shouts that he will cross for a pearl, or for a verse 'good enough to sing tomorrow,' or you may try the upper ford alone, where the bed is rough and the stones turn underfoot.",
      ],
      choices: [
        {
          label: "Offer a pearl. A wet pouch is a worse loss than a light one.",
          effects: { pearls: -1, stamina: +1 },
          hint: "− pearl, + stamina",
          next: "grove_camp",
        },
        {
          label: "Recite the shore poet's verse for passage.",
          effects: { wisdom: +1, reputation: +1, pearls: 0 },
          hint: "+ wisdom, + reputation",
          requires: { wisdom: 3 },
          fail: {
            label: "(You fumble the meter; Kollan laughs and refuses.)",
            effects: { wisdom: +1, stamina: -2 },
            next: "grove_camp",
          },
          next: "grove_camp",
        },
        {
          label: "Wade the upper ford yourself.",
          effects: { stamina: -3, reputation: +1 },
          hint: "− − − stamina, + reputation",
          next: "grove_camp",
        },
      ],
    },

    grove_camp: {
      title: "Night in the toddy grove",
      place: "A palm grove south of the city",
      text: [
        "You make camp under a stand of palmyra palms. Tappers' ladders lean against the trunks; the sap-pots have been brought down for the night. Two travellers share the fire: a wandering bard, Velli, with a small yāl harp on her lap, and a soldier, Pulli, returning to his garrison with his shield slung at his back.",
        "Velli asks if you carry anything worth a song. Pulli warns that gate-keepers at Madurai have been turning back couriers who arrive disheveled and rude.",
      ],
      choices: [
        {
          label: "Share the verse with Velli; let her improvise around it.",
          effects: { wisdom: +2, reputation: +1, stamina: -1 },
          hint: "+ + wisdom, + reputation",
          next: "city_gate",
        },
        {
          label: "Sit with Pulli and learn the manners of the gate.",
          effects: { wisdom: +1, reputation: +2 },
          hint: "+ wisdom, + + reputation",
          next: "city_gate",
        },
        {
          label: "Sleep early. The pouch is your only concern.",
          effects: { stamina: +3, wisdom: -1 },
          hint: "+ + + stamina, − wisdom",
          next: "city_gate",
        },
      ],
    },

    city_gate: {
      title: "Beneath the gate of Madurai",
      place: "The southern gate of the Pandya capital",
      text: [
        "Madurai rises in the morning: ramparts of packed earth and brick, banners of indigo and sand, the smell of cardamom from the market street. A line of petitioners waits at the gate. A captain in a fish-emblem cloak — the Pandya sign — eyes each in turn.",
        "When your turn comes, he asks plainly: 'What do you bring, courier, and from whom?'",
      ],
      choices: [
        {
          label: "Name Andai of Korkai and present the pouch openly.",
          effects: { reputation: +2 },
          hint: "+ + reputation",
          next: "royal_hall",
        },
        {
          label: "Speak the verse first, then name your senders.",
          effects: { reputation: +3, wisdom: +1 },
          hint: "+ + + reputation, + wisdom",
          requires: { wisdom: 4 },
          fail: {
            label: "(You stumble; the captain waves you through with a frown.)",
            effects: { reputation: -1 },
            next: "royal_hall",
          },
          next: "royal_hall",
        },
        {
          label: "Offer a pearl to be seen quickly. Time is short.",
          effects: { pearls: -1, reputation: -1, stamina: +1 },
          hint: "− pearl, − reputation, + stamina",
          next: "royal_hall",
        },
      ],
    },

    royal_hall: {
      title: "The hall of bards and the king",
      place: "The Pandya royal pavilion, Madurai",
      text: [
        "The hall is long and cool. Mats of woven palm cover the floor; bards sit in a half-circle around a low dais of dark wood. The Pandya king listens with his eyes closed, the way old kings are said to listen — to the meter beneath the words.",
        "When a steward calls you forward, the whole hall turns. You hold the pouch in one hand and the palm-leaf in the other.",
      ],
      choices: [
        {
          label: "Place the pouch first, then speak the verse from memory.",
          effects: { reputation: +2, wisdom: +1 },
          hint: "+ + reputation, + wisdom",
          next: "ending",
        },
        {
          label: "Read the verse first, then offer the pouch as its echo.",
          effects: { reputation: +3, wisdom: +2 },
          hint: "+ + + reputation, + + wisdom",
          requires: { wisdom: 5 },
          fail: {
            label: "(Your voice cracks at the second line; you set the pouch down in haste.)",
            effects: { reputation: -1, wisdom: +1 },
            next: "ending",
          },
          next: "ending",
        },
        {
          label: "Quietly hand the pouch and step back, letting the verse rest on the leaf alone.",
          effects: { reputation: +1, wisdom: -1 },
          hint: "+ reputation, − wisdom",
          next: "ending",
        },
      ],
    },
  };

  // ---------- Endings ----------
  // Selection: combine final meters into a ranking.
  function pickEnding(m) {
    const total = m.reputation + m.pearls + m.stamina + m.wisdom;

    // Specific endings first
    if (m.reputation >= 9 && m.wisdom >= 5) {
      return ENDINGS.bard_of_the_road;
    }
    if (m.pearls <= 1 && m.wisdom >= 5) {
      return ENDINGS.poet_courier;
    }
    if (m.pearls >= 4 && m.reputation <= 4) {
      return ENDINGS.cautious_merchant;
    }
    if (m.stamina <= 2) {
      return ENDINGS.weary_arrival;
    }
    if (total >= 22) {
      return ENDINGS.honored_courier;
    }
    return ENDINGS.quiet_return;
  }

  const ENDINGS = {
    bard_of_the_road: {
      banner: "A name remembered",
      title: "The court calls you back",
      text: [
        "The king opens his eyes only after your final syllable. He nods once. A steward writes your name on a strip of palm-leaf — Ilavan, of the shore village — and the court bard touches your shoulder in the old way.",
        "You leave the hall with an invitation to return at the next gathering. Andai's pouch was small. The verse, it turns out, was the real tribute.",
      ],
    },
    poet_courier: {
      banner: "Verse over wealth",
      title: "Light pouch, full mouth",
      text: [
        "Few pearls remain. You spent them along the road as the road asked. But the verse arrived unbroken, and the king repeats its second line aloud, so that the bards may take it down.",
        "Andai will hear of this before the next tide turns. She will not mind the missing pearls.",
      ],
    },
    cautious_merchant: {
      banner: "A safe delivery",
      title: "Counted and clean",
      text: [
        "You return to Korkai with most of your pearls intact and a steward's seal on your wrist. Andai inspects the pouch and is pleased. The court took the verse politely; no bard sang it that night, but no insult was given.",
        "A merchant's life suits some couriers better than a poet's. You have learned which one suits you.",
      ],
    },
    weary_arrival: {
      banner: "Body spent, errand done",
      title: "The road took its share",
      text: [
        "You reach the hall on swollen feet, voice thinned, eyes raw. The pouch is delivered; the verse is read for you by the steward. The king's attention is brief but kind.",
        "Walking back, you sleep three days in a roadside shrine. The road remembers couriers who do not pace themselves.",
      ],
    },
    honored_courier: {
      banner: "A balanced journey",
      title: "Pouch and poem, both arrive",
      text: [
        "You stand at the door of the hall and feel the city beyond it: markets opening, river running, divers walking out into the morning sea at Korkai. Pouch handed over. Verse spoken. Body still strong enough to make the return road.",
        "Some couriers brag of harder journeys. You will not — but the bards have noted your name.",
      ],
    },
    quiet_return: {
      banner: "An unremarked errand",
      title: "Nothing lost, little gained",
      text: [
        "The pouch is given. The verse is read. The court is busy with larger matters that day; your name does not travel beyond the steward's ledger.",
        "You take the salt road home in the cool of evening. Sometimes a courier's best work is simply to arrive.",
      ],
    },
  };

  // ---------- DOM helpers ----------
  const $ = (id) => document.getElementById(id);

  function clampMeters(m) {
    for (const def of METER_DEFS) {
      m[def.key] = Math.max(0, Math.min(def.max, m[def.key]));
    }
  }

  function applyEffects(effects) {
    if (!effects) return;
    for (const key of Object.keys(effects)) {
      if (state.meters[key] !== undefined) {
        state.meters[key] += effects[key];
      }
    }
    clampMeters(state.meters);
  }

  function meetsRequirement(req) {
    if (!req) return true;
    for (const k of Object.keys(req)) {
      if ((state.meters[k] ?? 0) < req[k]) return false;
    }
    return true;
  }

  // ---------- Renderers ----------
  function renderMeters() {
    const ul = $("meters");
    ul.innerHTML = "";
    for (const def of METER_DEFS) {
      const val = state.meters[def.key];
      const li = document.createElement("li");
      li.className = "meter";
      li.setAttribute("data-testid", `meter-${def.key}`);
      const pct = Math.round((val / def.max) * 100);
      li.innerHTML = `
        <span class="meter-label">${def.label}</span>
        <span class="meter-value" data-testid="value-${def.key}">${val} / ${def.max}</span>
        <div class="meter-bar"><div class="meter-fill ${def.key}" style="width:${pct}%"></div></div>
      `;
      ul.appendChild(li);
    }
  }

  function renderInventory() {
    const ul = $("inventory");
    ul.innerHTML = "";
    if (!state.inventory.length) {
      const li = document.createElement("li");
      li.className = "inv-empty";
      li.textContent = "The pouch is empty.";
      ul.appendChild(li);
      return;
    }
    for (const item of state.inventory) {
      const li = document.createElement("li");
      li.className = "inv-item";
      li.setAttribute("data-testid", `inv-${item.id}`);
      li.innerHTML = `<span class="glyph" aria-hidden="true">${item.glyph}</span><span>${item.name}</span>`;
      ul.appendChild(li);
    }
  }

  function renderRoute() {
    const ol = $("routeMarkers");
    ol.innerHTML = "";
    const currentIdx = ROUTE.findIndex((r) => r.id === state.sceneId);
    ROUTE.forEach((r, i) => {
      const li = document.createElement("li");
      if (i < currentIdx || (state.sceneId === "ending" && i <= ROUTE.length - 1)) {
        li.classList.add("done");
      }
      if (r.id === state.sceneId) {
        li.classList.add("current");
      }
      li.setAttribute("data-testid", `route-${r.id}`);
      li.innerHTML = `<div class="dot"></div><span>${r.label}</span>`;
      ol.appendChild(li);
    });
  }

  function renderSceneText(textArr, container) {
    container.innerHTML = "";
    for (const part of textArr) {
      if (typeof part === "string") {
        const p = document.createElement("p");
        p.style.margin = "0 0 14px";
        p.textContent = part;
        container.appendChild(p);
      } else if (part && part.verse) {
        const v = document.createElement("span");
        v.className = "verse";
        v.textContent = part.verse;
        container.appendChild(v);
      }
    }
  }

  function renderScene(id) {
    state.sceneId = id;
    if (!state.visited.includes(id)) state.visited.push(id);

    const card = document.querySelector(".scene-card");
    card.classList.remove("scene-enter");
    // re-trigger animation
    void card.offsetWidth;
    card.classList.add("scene-enter");

    if (id === "ending") {
      renderEnding();
      renderMeters();
      renderInventory();
      renderRoute();
      return;
    }

    const scene = SCENES[id];
    const idx = ROUTE.findIndex((r) => r.id === id);
    $("sceneNo").textContent = `Scene ${String(idx + 1).padStart(2, "0")}`;
    $("scenePlace").textContent = scene.place;
    $("sceneTitle").textContent = scene.title;

    renderSceneText(scene.text, $("sceneText"));

    const choicesEl = $("choices");
    choicesEl.innerHTML = "";
    scene.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.type = "button";
      btn.setAttribute(
        "data-testid",
        `button-choice-${id}-${i + 1}`
      );
      btn.innerHTML = `
        <span>${choice.label}</span>
        ${choice.hint ? `<span class="choice-effects">${choice.hint}</span>` : ""}
      `;
      btn.addEventListener("click", () => onChoice(choice));
      choicesEl.appendChild(btn);
    });

    renderMeters();
    renderInventory();
    renderRoute();
  }

  function onChoice(choice) {
    // Handle wisdom / stat-gated branches: if requirement not met, use fail branch
    if (choice.requires && !meetsRequirement(choice.requires)) {
      const fb = choice.fail;
      if (fb) {
        applyEffects(fb.effects);
        // Show a brief flash before navigating? Simplest: just proceed.
        renderScene(fb.next || choice.next);
        return;
      }
    }
    applyEffects(choice.effects);
    renderScene(choice.next);
  }

  function renderEnding() {
    const m = state.meters;
    const ending = pickEnding(m);
    const card = document.querySelector(".scene-card");

    $("sceneNo").textContent = "Final scene";
    $("scenePlace").textContent = "After the hall";

    const titleEl = $("sceneTitle");
    titleEl.textContent = ending.title;

    const textEl = $("sceneText");
    textEl.innerHTML = "";

    // banner
    const banner = document.createElement("span");
    banner.className = "ending-banner";
    banner.setAttribute("data-testid", "text-ending-banner");
    banner.textContent = ending.banner;
    textEl.appendChild(banner);

    for (const para of ending.text) {
      const p = document.createElement("p");
      p.style.margin = "12px 0";
      p.textContent = para;
      textEl.appendChild(p);
    }

    // Summary block
    const summary = document.createElement("div");
    summary.className = "ending-summary";
    summary.setAttribute("data-testid", "container-ending-summary");
    const total = m.reputation + m.pearls + m.stamina + m.wisdom;
    summary.innerHTML = `
      <h3>Final ledger</h3>
      <ul>
        <li>Reputation at court: <strong>${m.reputation}/10</strong></li>
        <li>Pearls remaining: <strong>${m.pearls}/10</strong></li>
        <li>Stamina on arrival: <strong>${m.stamina}/10</strong></li>
        <li>Wisdom of verse: <strong>${m.wisdom}/10</strong></li>
        <li>Combined standing: <strong>${total}/40</strong></li>
      </ul>
    `;
    textEl.appendChild(summary);

    // Choices area becomes replay actions
    const choicesEl = $("choices");
    choicesEl.innerHTML = "";
    const actions = document.createElement("div");
    actions.className = "ending-actions";

    const replay = document.createElement("button");
    replay.className = "solid-btn";
    replay.type = "button";
    replay.setAttribute("data-testid", "button-replay");
    replay.textContent = "Walk the road again";
    replay.addEventListener("click", restart);
    actions.appendChild(replay);

    const share = document.createElement("button");
    share.className = "ghost-btn";
    share.type = "button";
    share.setAttribute("data-testid", "button-copy-result");
    share.textContent = "Copy my ending";
    share.addEventListener("click", () => copyResult(ending, m));
    actions.appendChild(share);

    choicesEl.appendChild(actions);

    card.classList.add("ending");
  }

  function copyResult(ending, m) {
    const text =
      `The Pearl and the Poem — ${ending.title}\n` +
      `${ending.banner}\n\n` +
      `Reputation ${m.reputation}/10 · Pearls ${m.pearls}/10 · ` +
      `Stamina ${m.stamina}/10 · Wisdom ${m.wisdom}/10`;
    try {
      navigator.clipboard.writeText(text);
      const btn = document.querySelector('[data-testid="button-copy-result"]');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = orig), 1400);
      }
    } catch (e) {
      // no-op
    }
  }

  function restart() {
    state = initialState();
    document.querySelector(".scene-card").classList.remove("ending");
    renderScene(state.sceneId);
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    $("resetBtn").addEventListener("click", restart);
    renderScene(state.sceneId);
  });
})();
