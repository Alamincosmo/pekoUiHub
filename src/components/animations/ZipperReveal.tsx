"use client";

import { useState, useRef } from "react";
import { Compass, Sparkles } from "lucide-react";
import gsap from "gsap";

interface ZipperRevealProps {
  text?: string;
  subtext?: string;
}

export default function ZipperReveal({
  text = "LET'S KNOW ABOUT",
  subtext = "ME & MY WORK",
}: ZipperRevealProps) {
  const [progress, setProgress] = useState(0.15);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updatePosition = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const rawP = Math.max(0, Math.min(1, relativeX / rect.width));
    setProgress(rawP);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const triggerAuto = () => {
    const obj = { p: progress };
    gsap.to(obj, {
      p: 1,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setProgress(obj.p),
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-white/80 rounded-3xl border border-slate-200/90 shadow-sm relative select-none font-prompt">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-xs font-medium tracking-wider text-sky-600 uppercase font-prompt">
            Kinetic Zipper Unmasking
          </span>
        </div>
        <button
          onClick={triggerAuto}
          className="px-3.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 hover:text-sky-700 text-xs font-semibold rounded-full border border-sky-200 transition-all shadow-xs"
        >
          Auto Play
        </button>
      </div>

      <div
        ref={trackRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full max-w-xl h-36 relative flex flex-col justify-center items-center cursor-ew-resize overflow-hidden rounded-2xl bg-[#F8FAFC] border border-slate-200/80 px-6 shadow-inner"
      >
        {/* Closed metallic zipper teeth (Right side) */}
        <div
          className="absolute inset-x-0 h-6 flex items-center pointer-events-none transition-all"
          style={{
            clipPath: `inset(0 0 0 ${progress * 100}%)`,
          }}
        >
          <div className="w-full h-1 bg-slate-300 dashed border-t border-b border-dashed border-slate-400/50" />
        </div>

        {/* Unzipped Typography (revealed by clip-path) */}
        <div
          className="relative z-10 flex flex-col items-center text-center font-black tracking-tight uppercase"
          style={{
            clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
          }}
        >
          <h2 className="text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 font-prompt">
            {text}
          </h2>
          <span className="text-xl sm:text-2xl text-slate-700 font-bold mt-1 font-prompt">
            {subtext}
          </span>
        </div>

        {/* Pull Tab Slider Handle (Snow White with Sky Blue Accent) */}
        <div
          ref={sliderRef}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-14 bg-white rounded-xl shadow-[0_6px_20px_rgba(14,165,233,0.15)] border border-sky-100 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-30 transition-transform hover:scale-105 active:scale-95"
          style={{
            left: `${progress * 100}%`,
          }}
        >
          <div className="w-2 h-3.5 rounded-full bg-sky-200 mb-1" />
          <Compass className="w-5 h-5 text-sky-500" />
          <div className="absolute -bottom-2 w-3 h-2 bg-slate-200 rounded-b" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between w-full text-xs text-slate-500 font-prompt">
        <span className="font-merienda text-sky-600 text-[13px]">
          ✦ Drag slider smoothly across the track
        </span>
        <span className="font-mono text-slate-400 font-medium">
          {Math.round(progress * 100)}% unzipped
        </span>
      </div>
    </div>
  );
}
