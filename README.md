# ⚡ pekoUiHub - Interactive Motion & UI Animation Library

> Your personal vault for high-end web animations, kinetic typography, 3D spatial stages, and interactive UX components.

Built on the latest modern web stack (2026):
- **Next.js**: `16.3.8` (App Router + Turbopack)
- **React**: `19.2.8`
- **Tailwind CSS**: `v4.3.3`
- **GSAP**: `3.15.0`
- **Framer Motion / Motion**: `14.0.0`
- **Lenis**: `1.3.26` (Smooth scrolling engine)
- **Lucide Icons**: `1.52.0`

---

## 🚀 Getting Started

```bash
# 1. Open the project
cd pekoUiHub

# 2. Run the development server
npm run dev

# 3. Open in browser
# Visit http://localhost:3000
```

---

## 📦 What's Inside pekoUiHub

| Component Name | Category | Tech Stack | Description |
|---|---|---|---|
| **Kinetic Zipper Reveal** | Text Animation | GSAP, Clip-Path, Lucide | Interactive horizontal pull-tab slider unmasking typography with real-time `clipPath` math. |
| **Physical Kick & 3D Tilt** | Text Animation | Motion, GSAP | Physics collision where central tile knocks words out, followed by a 3D `rotateX` tilt reveal. |
| **Masked Slide Pop-up** | Text Animation | Motion, Cubic-Bezier | Overflow-hidden line reveal with 3 presets: Apple Editorial, Spring Pop-up, and Kinetic Skew. |
| **3D Cylinder Rotary Drum** | 3D & Spatial | CSS 3D, GSAP | Cylindrical carousel adhering to the Zero-Degree Focus Rule (center at 0deg, sides at ±32deg). |
| **3D Book Spread & Close** | 3D & Spatial | CSS 3D, GSAP, Lenis | Real 3D spatial book flips with Z-depth stacking, ribbon bookmarks, and auto-closing back cover. |

---

## 🛠️ How to Save New Animations Here

1. **Create the component:**
   Add your new animation component inside `src/components/animations/YourAnimation.tsx`.

2. **Register it in the vault catalog:**
   Open `src/data/animations.ts` and append a new entry to the `ANIMATIONS` array with its title, tags, description, and code snippet.

3. **Map it in `src/app/page.tsx`:**
   Add it to the `renderComponent` switch case so it displays automatically with live preview, code inspection, and search support!
