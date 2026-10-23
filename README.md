# MY LOVE — A Cinematic 29th Birthday Experience for Natasha Rosaline

An interactive, nine-act romantic digital film created by **Robertus Agung Pradana (Robert)** for his wife, **Natasha Rosaline** ("Boss" & "Sayang"), celebrating her **29th Birthday on October 23, 2026**.

## Creative Direction
**The Velvet Rose Sanctuary + Sacred Constellation of Us**
- **Palette:** Velvet Maroon (`#310815`), Obsidian Burgundy (`#110307`), Champagne Gold (`#E5C384`), Candlelight Amber (`#F5B958`), and Silk Ivory (`#FAF3EB`).
- **3D WebGL & Mathematical Symbolism:** Features a Three.js starlight field, floating candlelight embers, and a 3D **Mathematical Rose Curve (*Rhodonea*, $r = a \cos(k\theta)$)** honoring Natasha's middle name (*Rosaline*), her favorite maroon rose, and their shared journey through **SMAN 4 Bekasi → OSN Matematika → Matematika Universitas Indonesia → August 10, 2024 Marriage Covenant**.
- **Scripture Anchor:** **Amsal 3:5–6** (*"Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu."*)

---

## Scene Map (Acts I – IX)

| Act | Title | Narrative Focus |
| :--- | :--- | :--- |
| **ACT I** | *The Invitation* | Flickering candlelight in velvet maroon darkness; invites Natasha to begin and unlocks the Web Audio API Grand Piano & Cello soundscape. |
| **ACT II** | *The Velvet Rose Sanctuary* | Reveals Natasha's solo candlelight rose portrait (`natasha-rose.jpg`) with 3D tilt parallax and the equation $\forall t \in \text{Hidupku} : \text{Syukurku}(\text{Natasha}) \to \infty$. |
| **ACT III** | *When Our Worlds Met* | Interactive 5-chapter journey: SMAN 4 Bekasi, OSN Matematika, Matematika UI & graduating together, the hilarious UI class-running collision memory, and their August 10, 2024 wedding covenant. |
| **ACT IV** | *The Memory Constellation* | Interactive star map (`STELLA ROSA`, `STELLA VERITAS`, `STELLA FIDELIS`) showcasing Natasha's solo portraits and reflections. |
| **ACT V** | *The Little Things I Love About You* | Celebrates Natasha's spiritual devotion, independence ("60% Boss, 40% Sayang"), mathematical brilliance, attention to detail, love for family, and faithfulness. |
| **ACT VI** | *The Sacred Letter* | Robert's personal birthday letter with progressive reading controls and the golden plaque of **Amsal 3:5–6**. |
| **ACT VII** | *Make a 29th Birthday Wish* | Interactive 29th birthday candle with touch-to-wish and optional microphone blow detection, triggering a golden starburst celebration and **Bilangan 6:24–26** blessing. |
| **ACT VIII** | *One Last Surprise* | Interactive wax-sealed velvet envelope containing Robert's 5 Sacred Husband Promises and a birthday prayer in Jesus' name. |
| **ACT IX** | *Forever, My Love* | Closing dedication with dual solo portraits, replay controls, and quick chapter navigation. |

---

## How to Edit Personal Content, Photos & Audio

### 1. Editing Romantic Messages, Chapters & Bible Verses
All text, dates, milestones, letters, and promises are centralized and strictly typed in:
- [`src/data/storyContent.ts`](./src/data/storyContent.ts)

Edit any field inside `STORY_CONTENT` and save—no animation or Three.js code needs to be modified.

### 2. Replacing Photographs
Solo portrait assets of Natasha are stored in `public/images/`:
- `public/images/natasha-rose.jpg` — Primary candlelight & red rose portrait (Act II & Act IX)
- `public/images/natasha-closeup.jpg` — Close-up portrait (Act IV)
- `public/images/natasha-smile.jpg` — Warm smile solo portrait (Act IV & Act IX)

To replace any photograph, overwrite the file in `public/images/` or update the path in `STORY_CONTENT.portraits` inside `src/data/storyContent.ts`.

### 3. Customizing Audio
The experience uses a custom Web Audio API **Grand Piano & Warm Cello/Strings** synthesizer (`src/audio/soundscapeEngine.ts`) that evolves dynamically across Acts I–IX without any external copyright restrictions or MP3 loading delays.

---

## Local Development & Verification

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check with TypeScript
npm run lint

# Build production bundle (output in dist/)
npm run build
```

## Deployment (GitHub + Vercel Auto-Deployment)
- **GitHub Repository:** `https://github.com/robertusagungp/My-Love.git`
- **Production Branch:** `main`
- **Framework Preset:** `Vite` (`npm run build` → `dist`)
