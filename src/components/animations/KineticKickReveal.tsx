"use client";

import { useState } from "react";
import { Briefcase, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function KineticKickReveal() {
  const [phase, setPhase] = useState<"idle" | "kickLeft" | "kickRight" | "revealFirst">("idle");

  const runSequence = async () => {
    setPhase("kickLeft");
    await new Promise((r) => setTimeout(r, 600));
    setPhase("kickRight");
    await new Promise((r) => setTimeout(r, 600));
    setPhase("revealFirst");
  };

  const reset = () => {
    setPhase("idle");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-white/80 rounded-3xl border border-slate-200/90 shadow-sm relative select-none font-prompt">
      <div className="flex items-center justify-between w-full mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-500" />
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider font-prompt">
            Physical Kick &amp; 3D Perspective Reveal
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={runSequence}
            className="px-4 py-1.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold shadow-md shadow-sky-500/25 transition-all active:scale-95 cursor-pointer"
          >
            Trigger Kick
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[220px] w-full bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80">
        {/* Top Row: Client + Box + Work */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {/* Word 1: Client */}
          <div className="overflow-hidden py-2 px-1">
            <motion.span
              animate={{
                x: phase === "idle" ? 80 : 0,
                opacity: phase === "idle" ? 0 : 1,
                filter: phase === "idle" ? "blur(12px)" : "blur(0px)",
              }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="inline-block font-black text-4xl sm:text-6xl uppercase tracking-tighter text-slate-900 font-prompt"
            >
              Client
            </motion.span>
          </div>

          {/* Impacting Central Box */}
          <motion.div
            animate={{
              rotate:
                phase === "kickLeft" ? -14 : phase === "kickRight" ? 14 : 0,
              x: phase === "kickLeft" ? -18 : phase === "kickRight" ? 18 : 0,
              scale: phase === "idle" ? 0.9 : 1,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-[0_8px_25px_rgba(14,165,233,0.15)] flex items-center justify-center border border-sky-100"
          >
            <Briefcase className="w-8 h-8 text-sky-500" />
          </motion.div>

          {/* Word 2: Work */}
          <div className="overflow-hidden py-2 px-1">
            <motion.span
              animate={{
                x: phase === "idle" || phase === "kickLeft" ? -80 : 0,
                opacity: phase === "idle" || phase === "kickLeft" ? 0 : 1,
                filter:
                  phase === "idle" || phase === "kickLeft"
                    ? "blur(12px)"
                    : "blur(0px)",
              }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="inline-block font-black text-4xl sm:text-6xl uppercase tracking-tighter text-slate-900 font-prompt"
            >
              Work
            </motion.span>
          </div>
        </div>

        {/* Bottom Row: First (3D Tilt Masked Reveal) */}
        <div className="overflow-hidden py-2 px-2 mt-2" style={{ perspective: 800 }}>
          <motion.span
            animate={{
              y: phase === "revealFirst" ? 0 : 70,
              rotateX: phase === "revealFirst" ? 0 : -35,
              opacity: phase === "revealFirst" ? 1 : 0,
              filter: phase === "revealFirst" ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="inline-block font-black text-5xl sm:text-7xl uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 font-prompt"
          >
            First
          </motion.span>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-5 font-merienda">
        ✦ Physical impulse transfer: knocking words out of hidden clipping masks.
      </p>
    </div>
  );
}
