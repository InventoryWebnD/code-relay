# DESIGN.md — Code-Relay Futuristic Hackathon

## 1. Design Vision & Aesthetic Direction
**Code-Relay** merges the atmospheric, editorial layout of the *Gravity/KRAI* reference with a high-contrast, cyberpunk-inspired 3D isometric universe. Instead of a deep indigo wilderness, the site immerses hackers in a rich **Crimson & Slate-Blue Digital Citadel**. 

### Core Visual Pillars
* **Editorial Tech-Noir:** Sharp, structured grids, vertical side-rail micro-labels, and numbered section indices (`01 / Tracks`, `02 / Schedule`) paired with glowing 3D isometric tech artifacts.
* **Warm-Dark Immersion:** Rather than generic pitch-black/neon-green cyberpunk, the base canvas uses deep wine (`#22020a` to `#160207`), illuminated by burgundy glows (`#b82a4f`), slate-blue holographic accents (`#657aa8`), and crisp ivory typography (`#f6f0e8`).
* **Circular Vignette Framing:** 3D decorative assets sit inside circular or pill-shaped gradient portals on cards, breaking slightly out of their bounds to create 3D depth.

---

## 2. Color System & Atmospheric Polarity

### CSS Custom Properties
```css
:root {
  /* Core Palette */
  --color-burgundy: #991b3d;
  --color-burgundy-light: #b82a4f;
  --color-burgundy-dark: #7a122e;

  --color-wine: #620821;
  --color-wine-dark: #380412;
  --color-wine-deepest: #22020a;

  --color-ivory: #f6f0e8;
  --color-ivory-card: #fffdfa;
  --color-ivory-tint: #ede5da;
  --color-ivory-dark: #e0d4c3;

  --color-slate-blue: #4b5d86;
  --color-slate-blue-light: #657aa8;
  --color-slate-blue-dark: #364464;

  --color-white: #ffffff;
  --color-black: #160207;

  /* Semantic Design Tokens */
  --color-brand-primary: var(--color-burgundy);
  --color-brand-deep: var(--color-wine);
  --color-surface: var(--color-ivory);
  --color-surface-card: var(--color-ivory-card);
  --color-accent-secondary: var(--color-slate-blue);

  /* Typography / Text Tokens */
  --text-dark-primary: #1e030a;
  --text-dark-secondary: #48232c;
  --text-dark-muted: #6d4b54;

  --text-light-primary: #ffffff;
  --text-light-secondary: #f6f0e8;
  --text-light-muted: #d6c6cc;

  /* Borders & Shadows */
  --border-brand: #620821;
  --border-dark: #160207;
  --shadow-color: #620821;
  --shadow-color-dark: #160207;

  /* Derived Gradients & Glows */
  --bg-canvas-gradient: linear-gradient(180deg, var(--color-black) 0%, var(--color-wine-deepest) 45%, var(--color-wine-dark) 100%);
  --card-surface-gradient: linear-gradient(180deg, rgba(98, 8, 33, 0.45) 0%, rgba(56, 4, 18, 0.85) 100%);
  --portal-glow-gradient: radial-gradient(circle, var(--color-burgundy-light) 0%, var(--color-slate-blue-dark) 60%, transparent 75%);
}