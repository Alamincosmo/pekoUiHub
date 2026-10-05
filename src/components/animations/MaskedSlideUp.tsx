"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

type StyleMode = "editorial" | "bouncy" | "skew";

export default function MaskedSlideUp() {
  const [styleMode, setStyleMode] = useState<StyleMode>("editorial");
  const [key, setKey] = useState(0);

  const replay = () => {
    setKey((prev) => prev + 1);
  };

  const words = ["Crafting", "Scalable", "Digital", "Experiences"];

  const getVariants = (mode: StyleMode): import("framer-motion").Variants => {
    switch (mode) {
      case "editorial":
        return {
          initial: { y: "110%", opacity: 0 },
          animate: (i: number) => ({
            y: "0%",
            opacity: 1,
            transition: {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1] as const, // Apple Luxury ease
              delay: i * 0.1,
            },
          }),
        };
      case "bouncy":
        return {
          initial: { y: "120%", scale: 0.8, opacity: 0 },
          animate: (i: number) => ({
            y: "0%",
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 220,
              damping: 12,
              delay: i * 0.08,
            },
          }),
        };
      case "skew":
        return {
          initial: { y: "130%", skewY: 10, opacity: 0 },
          animate: (i: number) => ({
            y: "0%",
            skewY: 0,
            opacity: 1,
            transition: {
              duration: 0.65,
              ease: [0.25, 1, 0.5, 1] as const,
              delay: i * 0.09,
            },
          }),
        };
    }
  };

  const variants = getVariants(styleMode);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-white/80 rounded-3xl border border-slate-200/90 shadow-sm relative select-none font-prompt">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-500" />
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider font-prompt">
            Masked Slide-Up &amp; Pop-Up Reveal
          </span>
        </div>

        {/* Style Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
          {(["editorial", "bouncy", "skew"] as StyleMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setStyleMode(mode);
                replay();
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                styleMode === mode
                  ? "bg-white text-sky-600 shadow-sm border border-slate-200/60"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {mode}
            </button>
          ))}
          <button
            onClick={replay}
            className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-white transition-colors ml-1 cursor-pointer"
            title="Replay"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* Masked Text Display Area */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 min-h-[160px] max-w-xl text-center bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 w-full">
        <AnimatePresence mode="wait">
          <div key={key} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {words.map((word, i) => (
              <div key={word} className="overflow-hidden py-1">
                <motion.span
                  custom={i}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  className={`inline-block font-black text-3xl sm:text-5xl md:text-6xl tracking-tight font-prompt ${
                    i === 1 || i === 3
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600"
                      : "text-slate-900"
                  }`}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between w-full mt-5 text-xs text-slate-500 border-t border-slate-100 pt-4 font-prompt">
        <span className="font-merienda text-sky-600">
          ✦ Preset: <strong className="capitalize">{styleMode}</strong>
        </span>
        <span className="font-mono text-slate-400">
          Parent: <code className="text-sky-600">overflow: hidden</code>
        </span>
      </div>
    </div>
  );
}
