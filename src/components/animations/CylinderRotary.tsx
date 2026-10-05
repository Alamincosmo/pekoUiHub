"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";

const CARDS = [
  { id: 1, title: "Hardware IoT", tag: "2017-2020", color: "from-sky-400 to-blue-500" },
  { id: 2, title: "Raw Coding", tag: "2021-2023", color: "from-blue-500 to-indigo-600" },
  { id: 3, title: "Enterprise SaaS", tag: "2023-2025", color: "from-sky-500 to-cyan-500" },
  { id: 4, title: "AI & Health-Tech", tag: "2024-Present", color: "from-teal-400 to-sky-500" },
  { id: 5, title: "Future Vision", tag: "Beyond", color: "from-indigo-400 to-sky-400" },
];

export default function CylinderRotary() {
  const [activeIndex, setActiveIndex] = useState(2);

  const prev = () => {
    setActiveIndex((curr) => (curr === 0 ? CARDS.length - 1 : curr - 1));
  };

  const next = () => {
    setActiveIndex((curr) => (curr === CARDS.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-white/80 rounded-3xl border border-slate-200/90 shadow-sm relative select-none overflow-hidden font-prompt">
      <div className="flex items-center justify-between w-full mb-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-500" />
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider font-prompt">
            3D Cylinder Rotary Drum Carousel
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Drum Stage */}
      <div
        className="relative w-full h-[280px] flex items-center justify-center bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-4"
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d",
        }}
      >
        {CARDS.map((card, idx) => {
          const offset = idx - activeIndex;
          const isCenter = offset === 0;

          const rotateY = offset * 32;
          const translateZ = isCenter ? 40 : -Math.abs(offset) * 110;
          const translateX = offset * 180;
          const opacity = Math.max(0.35, 1 - Math.abs(offset) * 0.3);
          const scale = isCenter ? 1.05 : 0.88;

          return (
            <div
              key={card.id}
              onClick={() => setActiveIndex(idx)}
              className={`absolute w-52 h-60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer border transition-all duration-500 ease-out ${
                isCenter
                  ? "border-sky-400 shadow-[0_15px_35px_rgba(14,165,233,0.18)] bg-white"
                  : "border-slate-200 bg-white/70 blur-[1px] hover:blur-0"
              }`}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex: 10 - Math.abs(offset),
              }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-600 block mb-1">
                  {card.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-prompt">{card.title}</h3>
              </div>

              <div className={`h-20 w-full rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-inner`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between w-full text-xs text-slate-500 font-prompt">
        <span className="font-merienda text-sky-600">
          ✦ Zero-Degree Focus: Center stays flat (0°), side cards curve
        </span>
        <span className="font-mono text-slate-400">
          Selected: {CARDS[activeIndex].title}
        </span>
      </div>
    </div>
  );
}
