export type CategoryType =
  | "slide-jump"
  | "text-animations"
  | "transitions"
  | "elements";

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  count: number;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "text-animations", name: "Text Animations", count: 4 },
  { id: "slide-jump", name: "Slide & Jump Animations", count: 4 },
  { id: "transitions", name: "Transitions", count: 4 },
  { id: "elements", name: "Elements", count: 4 },
];

export interface CodeLanguageTab {
  label: string;
  lang: string;
  code: string;
}

export interface AnimationCardItem {
  id: string;
  name: string; // Strictly <= 5 words!
  category: CategoryType;
  categoryLabel: string;
  tag: string;
  description: string;
  codeLanguages: CodeLanguageTab[];
}

export const ANIMATION_ITEMS: AnimationCardItem[] = [
  // ── 1. Text Animations (4 cards) ──
  {
    id: "zipper-text",
    name: "Kinetic Zipper Text Reveal",
    category: "text-animations",
    categoryLabel: "Text Animations",
    tag: "GSAP • ClipPath",
    description: "Interactive horizontal pull-tab slider that dynamically unzips metallic teeth while unmasking typography.",
    codeLanguages: [
      {
        label: "React / TSX",
        lang: "tsx",
        code: `"use client";
import React, { useState, useRef } from "react";
import { Compass } from "lucide-react";
import gsap from "gsap";

export function ZipperReveal({ text = "LET'S KNOW ABOUT ME" }) {
  const [progress, setProgress] = useState(0.2);
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setProgress(p);
  };

  return (
    <div
      ref={trackRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-32 flex items-center justify-center overflow-hidden rounded-2xl bg-white border border-slate-200"
    >
      <div
        className="absolute inset-0 flex items-center justify-center font-black text-2xl uppercase tracking-tight text-slate-900"
        style={{ clipPath: \`inset(0 \${100 - progress * 100}% 0 0)\` }}
      >
        <span className="text-sky-500">{text}</span>
      </div>

      <div
        className="absolute top-1/2 -translate-y-1/2 w-10 h-12 bg-white rounded-xl shadow-lg border border-sky-200 flex items-center justify-center z-20"
        style={{ left: \`\${progress * 100}%\` }}
      >
        <Compass className="w-5 h-5 text-sky-500" />
      </div>
    </div>
  );
}`,
      },
      {
        label: "Tailwind CSS",
        lang: "html",
        code: `<!-- Tailwind classes for track and slider -->
<div class="relative w-full h-32 flex items-center justify-center overflow-hidden rounded-2xl bg-white border border-slate-200">
  <div class="absolute inset-0 flex items-center justify-center font-black text-2xl uppercase tracking-tight text-slate-900">
    <span class="text-sky-500">LET'S KNOW ABOUT ME</span>
  </div>
  <div class="absolute top-1/2 -translate-y-1/2 w-10 h-12 bg-white rounded-xl shadow-lg border border-sky-200 flex items-center justify-center z-20">
    <svg class="w-5 h-5 text-sky-500"></svg>
  </div>
</div>`,
      },
      {
        label: "GSAP Math",
        lang: "js",
        code: `// GSAP real-time unmasking animation
const obj = { progress: 0 };
gsap.to(obj, {
  progress: 1,
  duration: 1.5,
  ease: "power2.inOut",
  onUpdate: () => {
    trackText.style.clipPath = \`inset(0 \${100 - obj.progress * 100}% 0 0)\`;
    slider.style.left = \`\${obj.progress * 100}%\`;
  }
});`,
      },
      {
        label: "CSS ClipPath",
        lang: "css",
        code: `/* Dynamic Inset Slicing */
.unzipped-text {
  clip-path: inset(0 calc(100% - var(--progress)) 0 0);
  transition: clip-path 0.05s linear;
}
.closed-seam {
  clip-path: inset(0 0 0 var(--progress));
}`,
      },
    ],
  },
  {
    id: "masked-pop",
    name: "Masked Line Slide Pop-up",
    category: "text-animations",
    categoryLabel: "Text Animations",
    tag: "Framer Motion",
    description: "The classic luxury & Awwwards text reveal. Words emerge from behind an overflow-hidden mask with spring bounce.",
    codeLanguages: [
      {
        label: "React / Motion",
        lang: "tsx",
        code: `"use client";
import { motion } from "framer-motion";

export function MaskedPopUp({ words = ["Crafting", "Scalable", "Software"] }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {words.map((word, i) => (
        <div key={word} className="overflow-hidden py-1">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 14,
              delay: i * 0.1,
            }}
            className="inline-block font-black text-3xl sm:text-5xl text-slate-900"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}`,
      },
      {
        label: "Tailwind CSS",
        lang: "html",
        code: `<!-- Masked Container -->
<div class="overflow-hidden py-1">
  <span class="inline-block font-black text-3xl sm:text-5xl tracking-tight text-slate-900">
    Crafting Scalable Software
  </span>
</div>`,
      },
      {
        label: "CSS Keyframes",
        lang: "css",
        code: `@keyframes slidePopUp {
  0% {
    transform: translateY(115%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

.masked-line {
  overflow: hidden;
}

.masked-line span {
  display: inline-block;
  animation: slidePopUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}`,
      },
    ],
  },
  {
    id: "kinetic-kick",
    name: "Physical Kick 3D Reveal",
    category: "text-animations",
    categoryLabel: "Text Animations",
    tag: "Physics • GSAP",
    description: "Physics collision where central tile knocks words out, followed by a 3D rotateX perspective slide-up.",
    codeLanguages: [
      {
        label: "React / TSX",
        lang: "tsx",
        code: `"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export function KineticKick() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <motion.span animate={{ x: [30, 0] }} className="font-black text-3xl">
          Client
        </motion.span>
        <motion.div animate={{ rotate: [-15, 0] }} className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-sky-500" />
        </motion.div>
        <motion.span animate={{ x: [-30, 0] }} className="font-black text-3xl">
          Work
        </motion.span>
      </div>
      <motion.span animate={{ y: [40, 0], rotateX: [-35, 0] }} className="font-black text-4xl text-sky-500">
        First
      </motion.span>
    </div>
  );
}`,
      },
      {
        label: "Tailwind CSS",
        lang: "html",
        code: `<div class="flex items-center gap-4 font-prompt font-black text-3xl text-slate-900">
  <span>Client</span>
  <div class="w-12 h-12 bg-white rounded-2xl shadow-lg border border-sky-100 flex items-center justify-center">
    <svg class="w-6 h-6 text-sky-500"></svg>
  </div>
  <span>Work</span>
</div>`,
      },
    ],
  },
  {
    id: "skew-velocity",
    name: "Kinetic Skew Velocity Slide",
    category: "text-animations",
    categoryLabel: "Text Animations",
    tag: "Motion • Skew",
    description: "High-speed typography slide that retains dynamic italicized skew in motion before snapping upright.",
    codeLanguages: [
      {
        label: "React / Motion",
        lang: "tsx",
        code: `<motion.div
  initial={{ y: "120%", skewY: 12, opacity: 0 }}
  animate={{ y: "0%", skewY: 0, opacity: 1 }}
  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
  className="font-black text-4xl text-slate-900"
>
  Dynamic Velocity
</motion.div>`,
      },
    ],
  },

  // ── 2. Slide & Jump Animations (4 cards) ──
  {
    id: "tile-docking",
    name: "Tile Jump Docking Sequence",
    category: "slide-jump",
    categoryLabel: "Slide & Jump",
    tag: "GSAP • Matrix",
    description: "Calculated trajectory jump docking an element from outside the screen snug into a recessed cavity.",
    codeLanguages: [
      {
        label: "React / TSX",
        lang: "tsx",
        code: `// Snug docking into slot
gsap.to(flyingTileRef.current, {
  x: targetX,
  y: targetY,
  scale: 1.0,
  ease: "power3.inOut",
  duration: 1.2
});`,
      },
      {
        label: "Tailwind CSS",
        lang: "html",
        code: `<!-- Cavity Slot -->
<div class="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center">
  <div class="w-14 h-14 rounded-xl border border-dashed border-sky-400"></div>
</div>`,
      },
    ],
  },
  {
    id: "toaster-lift",
    name: "3D Toaster Lift Pop-out",
    category: "slide-jump",
    categoryLabel: "Slide & Jump",
    tag: "Z-Depth • GSAP",
    description: "3D element popping vertically out of a surface slit with real Z-axis depth and back easing.",
    codeLanguages: [
      {
        label: "React / TSX",
        lang: "tsx",
        code: `img.style.transform = \`translateY(\${100 - liftEased * 100}%) translateZ(40px)\`;`,
      },
    ],
  },
  {
    id: "bouncing-pill",
    name: "Elastic Bouncing Scroll Indicator",
    category: "slide-jump",
    categoryLabel: "Slide & Jump",
    tag: "CSS Keyframes",
    description: "Smooth pulsing mouse pill indicator prompting user interaction.",
    codeLanguages: [
      {
        label: "Tailwind / CSS",
        lang: "html",
        code: `<div class="w-6 h-11 rounded-full border-2 border-slate-300 bg-white shadow-xs flex justify-center pt-2">
  <div class="w-1.5 h-2.5 bg-sky-500 rounded-full animate-bounce"></div>
</div>`,
      },
    ],
  },
  {
    id: "magnetic-snap",
    name: "Magnetic Spring Snap Dock",
    category: "slide-jump",
    categoryLabel: "Slide & Jump",
    tag: "Framer Motion",
    description: "Magnetic attraction pulling an interactive tile toward an anchor with damped spring physics.",
    codeLanguages: [
      {
        label: "React / Motion",
        lang: "tsx",
        code: `<motion.div
  animate={{ scale: snapped ? 1 : 0.8 }}
  transition={{ type: "spring", stiffness: 350, damping: 15 }}
  className="w-16 h-16 rounded-2xl bg-white shadow-md border border-sky-200"
/>`,
      },
    ],
  },

  // ── 3. Transitions (4 cards) ──
  {
    id: "curtain-drawer",
    name: "Curtain Drag Section Reveal",
    category: "transitions",
    categoryLabel: "Transitions",
    tag: "GSAP Scroll",
    description: "Full section dragging in from the off-canvas left border anchored to a leading pull handle.",
    codeLanguages: [
      {
        label: "React / GSAP",
        lang: "tsx",
        code: `panel.style.transform = \`translate3d(\${(-1 + progress) * 100}%, 0, 0)\`;`,
      },
    ],
  },
  {
    id: "liquid-morph",
    name: "Liquid Whirlpool Icon Morph",
    category: "transitions",
    categoryLabel: "Transitions",
    tag: "SVG Morph",
    description: "Seamless 4-icon rotational crossfade with scale dilation and zero snapping.",
    codeLanguages: [
      {
        label: "React / TSX",
        lang: "tsx",
        code: `<AnimatePresence mode="wait">
  <motion.div
    key={currentIconIndex}
    initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    exit={{ scale: 0.5, rotate: 30, opacity: 0 }}
  >
    <ActiveIcon className="w-7 h-7 text-sky-500" />
  </motion.div>
</AnimatePresence>`,
      },
    ],
  },
  {
    id: "staggered-page",
    name: "Smooth Staggered Page Turn",
    category: "transitions",
    categoryLabel: "Transitions",
    tag: "CSS 3D RotateY",
    description: "Realistic paper page turning in 3D perspective with dynamic Z-depth arching.",
    codeLanguages: [
      {
        label: "CSS 3D",
        lang: "css",
        code: `.page-leaf {
  transform-style: preserve-3d;
  transform-origin: left center;
  transform: translateZ(calc(var(--currentZ) + var(--archZ))) rotateY(var(--angle));
}`,
      },
    ],
  },
  {
    id: "auto-book-close",
    name: "Auto Seal Book Close",
    category: "transitions",
    categoryLabel: "Transitions",
    tag: "3D Z-Lift Close",
    description: "Back cover swinging 180 degrees over all stacked inner pages with positive Z-depth priority.",
    codeLanguages: [
      {
        label: "React / GSAP",
        lang: "tsx",
        code: `backCover.style.transform = \`translateZ(\${closeZ}px) rotateY(\${closeAngle}deg)\`;
backCover.style.zIndex = closeProgress > 0.5 ? "50" : "0";`,
      },
    ],
  },

  // ── 4. Elements (4 cards) ──
  {
    id: "cylinder-carousel",
    name: "3D Cylinder Rotary Carousel",
    category: "elements",
    categoryLabel: "Elements",
    tag: "Zero-Degree Focus",
    description: "Cylindrical carousel adhering to the Zero-Degree Focus Rule: Center is 0deg flat, sides curve into depth.",
    codeLanguages: [
      {
        label: "CSS / JS Math",
        lang: "js",
        code: `const rotateY = offset * 32;
const translateZ = isCenter ? 40 : -Math.abs(offset) * 110;
const translateX = offset * 180;
const scale = isCenter ? 1.05 : 0.88;`,
      },
    ],
  },
  {
    id: "book-stage",
    name: "3D Spatial Book Stage",
    category: "elements",
    categoryLabel: "Elements",
    tag: "Preserve-3D",
    description: "Complete 3D angled book stage with flippable pages, shadows, and interior spreads.",
    codeLanguages: [
      {
        label: "React / TSX",
        lang: "tsx",
        code: `<div style={{ transform: "rotateX(45deg) rotateZ(-20deg) scale(1.15)", transformStyle: "preserve-3d" }}>
  {/* Left Spread, Right Spread, Inner Leaves */}
</div>`,
      },
    ],
  },
  {
    id: "macaw-ribbons",
    name: "Macaw Blue Ribbon Bookmarks",
    category: "elements",
    categoryLabel: "Elements",
    tag: "CSS Clip-Path",
    description: "Hanging ribbon bookmarks with Macaw Blue background and custom angled bottom notch.",
    codeLanguages: [
      {
        label: "Tailwind / CSS",
        lang: "html",
        code: `<div 
  class="w-12 h-16 bg-[#0284c7] shadow-lg flex justify-center pt-3 text-white font-black text-xl"
  style="clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)"
>
  01
</div>`,
      },
    ],
  },
  {
    id: "water-rings",
    name: "Water Drop Wave Rings",
    category: "elements",
    categoryLabel: "Elements",
    tag: "GSAP Ripple",
    description: "Concentric liquid ripple rings expanding upon impact and fading into transparency.",
    codeLanguages: [
      {
        label: "GSAP Timeline",
        lang: "js",
        code: `gsap.to(rippleRing, {
  scale: 2.4,
  opacity: 0,
  duration: 1.2,
  ease: "power2.out"
});`,
      },
    ],
  },
];
