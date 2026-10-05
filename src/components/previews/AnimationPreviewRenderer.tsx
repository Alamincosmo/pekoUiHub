"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Briefcase,
  User,
  Send,
  Sparkles,
  Layers,
  ChevronRight,
  MoveRight,
} from "lucide-react";
import gsap from "gsap";

export default function AnimationPreviewRenderer({
  id,
  playCount,
}: {
  id: string;
  playCount: number;
}) {
  return (
    <div className="w-full h-full min-h-[190px] flex items-center justify-center p-3 relative overflow-hidden rounded-2xl bg-[#F8FAFC] border border-slate-100 select-none">
      {id === "zipper-text" && <ZipperMini playCount={playCount} />}
      {id === "masked-pop" && <MaskedPopMini playCount={playCount} />}
      {id === "kinetic-kick" && <KineticKickMini playCount={playCount} />}
      {id === "skew-velocity" && <SkewVelocityMini playCount={playCount} />}
      {id === "tile-docking" && <TileDockingMini playCount={playCount} />}
      {id === "toaster-lift" && <ToasterLiftMini playCount={playCount} />}
      {id === "bouncing-pill" && <BouncingPillMini playCount={playCount} />}
      {id === "magnetic-snap" && <MagneticSnapMini playCount={playCount} />}
      {id === "curtain-drawer" && <CurtainDrawerMini playCount={playCount} />}
      {id === "liquid-morph" && <LiquidMorphMini playCount={playCount} />}
      {id === "staggered-page" && <StaggeredPageMini playCount={playCount} />}
      {id === "auto-book-close" && <AutoBookCloseMini playCount={playCount} />}
      {id === "cylinder-carousel" && <CylinderMini playCount={playCount} />}
      {id === "book-stage" && <BookStageMini playCount={playCount} />}
      {id === "macaw-ribbons" && <MacawRibbonsMini playCount={playCount} />}
      {id === "water-rings" && <WaterRingsMini playCount={playCount} />}
    </div>
  );
}

// 1. Zipper Mini
function ZipperMini({ playCount }: { playCount: number }) {
  const [progress, setProgress] = useState(0.2);

  useEffect(() => {
    if (playCount === 0) return;
    const obj = { p: 0 };
    gsap.to(obj, {
      p: 1,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => setProgress(obj.p),
      yoyo: true,
      repeat: 1,
    });
  }, [playCount]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div className="w-full max-w-[240px] h-20 bg-white rounded-xl border border-slate-200/80 shadow-xs relative flex items-center justify-center px-4 overflow-hidden">
        {/* Teeth */}
        <div
          className="absolute inset-x-0 h-2 flex items-center"
          style={{ clipPath: `inset(0 0 0 ${progress * 100}%)` }}
        >
          <div className="w-full h-0.5 bg-slate-300 border-t border-dashed border-slate-400" />
        </div>
        {/* Text */}
        <div
          className="relative z-10 text-center font-prompt font-black text-sm uppercase tracking-tight text-slate-800"
          style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}
        >
          <span className="text-sky-500">LET'S KNOW</span>
          <br />
          <span>ABOUT ME</span>
        </div>
        {/* Slider */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-9 bg-white rounded-lg shadow-md border border-sky-200 flex items-center justify-center z-20"
          style={{ left: `${progress * 100}%` }}
        >
          <Compass className="w-3.5 h-3.5 text-sky-500" />
        </div>
      </div>
    </div>
  );
}

// 2. Masked Pop Mini
function MaskedPopMini({ playCount }: { playCount: number }) {
  const words = ["Crafting", "Scalable", "Software"];
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <AnimatePresence mode="wait">
        <div key={playCount} className="flex flex-col items-center">
          {words.map((w, i) => (
            <div key={w} className="overflow-hidden py-0.5">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 14,
                  delay: i * 0.1,
                }}
                className={`inline-block font-prompt font-black text-lg sm:text-xl tracking-tight leading-tight ${
                  i === 1 ? "text-sky-500" : "text-slate-900"
                }`}
              >
                {w}
              </motion.span>
            </div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

// 3. Kinetic Kick Mini
function KineticKickMini({ playCount }: { playCount: number }) {
  const [phase, setPhase] = useState<"idle" | "kick">("idle");

  useEffect(() => {
    if (playCount === 0) return;
    setPhase("kick");
    const t = setTimeout(() => setPhase("idle"), 1200);
    return () => clearTimeout(t);
  }, [playCount]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-3">
        <div className="overflow-hidden py-1">
          <motion.span
            animate={{
              x: phase === "kick" ? 0 : 35,
              opacity: phase === "kick" ? 1 : 0.2,
              filter: phase === "kick" ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className="font-prompt font-black text-base text-slate-800"
          >
            Client
          </motion.span>
        </div>
        <motion.div
          animate={{
            rotate: phase === "kick" ? -12 : 0,
            x: phase === "kick" ? -8 : 0,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 14 }}
          className="w-10 h-10 rounded-xl bg-white shadow-md border border-sky-100 flex items-center justify-center"
        >
          <Briefcase className="w-5 h-5 text-sky-500" />
        </motion.div>
        <div className="overflow-hidden py-1">
          <motion.span
            animate={{
              x: phase === "kick" ? 0 : -35,
              opacity: phase === "kick" ? 1 : 0.2,
              filter: phase === "kick" ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className="font-prompt font-black text-base text-slate-800"
          >
            Work
          </motion.span>
        </div>
      </div>
      <div className="overflow-hidden" style={{ perspective: 600 }}>
        <motion.span
          animate={{
            y: phase === "kick" ? 0 : 25,
            rotateX: phase === "kick" ? 0 : -35,
            opacity: phase === "kick" ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 }}
          className="font-prompt font-black text-xl text-sky-500 block"
        >
          First
        </motion.span>
      </div>
    </div>
  );
}

// 4. Skew Velocity Mini
function SkewVelocityMini({ playCount }: { playCount: number }) {
  return (
    <div className="overflow-hidden py-2 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={playCount}
          initial={{ y: "120%", skewY: 12, opacity: 0 }}
          animate={{ y: "0%", skewY: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
          className="font-prompt font-black text-xl sm:text-2xl text-slate-900 tracking-tight"
        >
          Dynamic <span className="text-sky-500">Velocity</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// 5. Tile Jump Docking Mini
function TileDockingMini({ playCount }: { playCount: number }) {
  const [docked, setDocked] = useState(true);

  useEffect(() => {
    if (playCount === 0) return;
    setDocked(false);
    const t = setTimeout(() => setDocked(true), 150);
    return () => clearTimeout(t);
  }, [playCount]);

  return (
    <div className="relative w-48 h-28 flex items-center justify-center">
      {/* Target Slot */}
      <div className="w-14 h-14 rounded-2xl bg-slate-200/60 border border-slate-300/80 shadow-inner flex items-center justify-center relative">
        <div className="w-12 h-12 rounded-xl border border-dashed border-sky-400/60" />
      </div>
      {/* Flying Tile */}
      <motion.div
        animate={{
          x: docked ? 0 : 70,
          y: docked ? 0 : -35,
          scale: docked ? 1 : 0.8,
          opacity: docked ? 1 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="absolute w-14 h-14 rounded-2xl bg-white shadow-lg border border-sky-200 flex items-center justify-center z-10"
      >
        <Send className="w-6 h-6 text-sky-500" />
      </motion.div>
    </div>
  );
}

// 6. Toaster Lift Mini
function ToasterLiftMini({ playCount }: { playCount: number }) {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    if (playCount === 0) return;
    setLifted(true);
    const t = setTimeout(() => setLifted(false), 1400);
    return () => clearTimeout(t);
  }, [playCount]);

  return (
    <div className="relative w-48 h-32 flex flex-col items-center justify-end overflow-hidden pb-2" style={{ perspective: 800 }}>
      {/* Popping 3D Object */}
      <motion.div
        animate={{
          y: lifted ? -10 : 45,
          rotateX: lifted ? 0 : 25,
          scale: lifted ? 1 : 0.85,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="w-24 h-20 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 shadow-xl flex items-center justify-center text-white font-prompt font-bold text-xs"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      {/* Slit */}
      <div className="w-36 h-3 bg-slate-300 rounded-full shadow-inner border border-slate-400/40 z-20" />
    </div>
  );
}

// 7. Bouncing Pill Mini
function BouncingPillMini({ playCount }: { playCount: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-6 h-11 rounded-full border-2 border-slate-300 bg-white shadow-xs flex justify-center pt-2">
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="w-1.5 h-2.5 bg-sky-500 rounded-full"
        />
      </div>
      <span className="text-[11px] font-jost text-slate-400">Scroll Pulse</span>
    </div>
  );
}

// 8. Magnetic Snap Mini
function MagneticSnapMini({ playCount }: { playCount: number }) {
  const [snapped, setSnapped] = useState(true);

  useEffect(() => {
    if (playCount === 0) return;
    setSnapped(false);
    const t = setTimeout(() => setSnapped(true), 200);
    return () => clearTimeout(t);
  }, [playCount]);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{
          scale: snapped ? 1 : 0.75,
          rotate: snapped ? 0 : 45,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 15 }}
        className="w-16 h-16 rounded-2xl bg-white border border-sky-200 shadow-md flex items-center justify-center"
      >
        <Send className="w-7 h-7 text-sky-500" />
      </motion.div>
    </div>
  );
}

// 9. Curtain Drawer Mini
function CurtainDrawerMini({ playCount }: { playCount: number }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (playCount === 0) return;
    setOpen(true);
    const t = setTimeout(() => setOpen(false), 1400);
    return () => clearTimeout(t);
  }, [playCount]);

  return (
    <div className="relative w-48 h-24 bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
      <div className="absolute inset-0 flex items-center justify-center text-xs font-jost font-semibold text-slate-500">
        Background
      </div>
      <motion.div
        animate={{ x: open ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="absolute inset-0 bg-white border-r border-sky-300 shadow-lg flex items-center justify-center text-xs font-prompt font-bold text-sky-600"
      >
        Off-Canvas Slide
      </motion.div>
    </div>
  );
}

// 10. Liquid Morph Mini
function LiquidMorphMini({ playCount }: { playCount: number }) {
  const icons = [Briefcase, Compass, User, Send];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (playCount === 0) return;
    setIdx((curr) => (curr + 1) % icons.length);
  }, [playCount]);

  const ActiveIcon = icons[idx];

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.5, rotate: 30, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center"
        >
          <ActiveIcon className="w-7 h-7 text-sky-500" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// 11. Staggered Page Mini
function StaggeredPageMini({ playCount }: { playCount: number }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (playCount === 0) return;
    setFlipped(!flipped);
  }, [playCount]);

  return (
    <div className="relative w-44 h-28 flex items-center justify-center" style={{ perspective: 800 }}>
      {/* Base */}
      <div className="w-40 h-24 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-end pr-4 text-xs font-jost text-slate-400">
        Page 02
      </div>
      {/* Flipping Leaf */}
      <motion.div
        animate={{ rotateY: flipped ? -180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute right-2 top-2 bottom-2 w-20 origin-left bg-sky-50 rounded-r-xl border border-sky-200 shadow-md flex items-center justify-center text-xs font-prompt font-bold text-sky-600"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div style={{ backfaceVisibility: "hidden" }}>01</div>
      </motion.div>
    </div>
  );
}

// 12. Auto Book Close Mini
function AutoBookCloseMini({ playCount }: { playCount: number }) {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (playCount === 0) return;
    setClosed(true);
    const t = setTimeout(() => setClosed(false), 1400);
    return () => clearTimeout(t);
  }, [playCount]);

  return (
    <div className="relative w-44 h-28 flex items-center justify-center" style={{ perspective: 800 }}>
      <div className="w-40 h-24 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-center text-xs text-slate-400">
        Inside Pages
      </div>
      <motion.div
        animate={{ rotateY: closed ? -180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="absolute right-2 top-2 bottom-2 w-20 origin-left bg-sky-500 rounded-r-xl border border-sky-400 shadow-xl flex items-center justify-center text-xs font-prompt font-black text-white"
        style={{ transformStyle: "preserve-3d" }}
      >
        <span style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
          THE END
        </span>
      </motion.div>
    </div>
  );
}

// 13. Cylinder Mini
function CylinderMini({ playCount }: { playCount: number }) {
  const [rot, setRot] = useState(0);

  useEffect(() => {
    if (playCount === 0) return;
    setRot((r) => r + 36);
  }, [playCount]);

  return (
    <div className="w-full flex items-center justify-center" style={{ perspective: 800 }}>
      <motion.div
        animate={{ rotateY: rot }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-28 h-24 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-20 h-24 bg-white rounded-xl border border-sky-400 shadow-md flex items-center justify-center text-xs font-prompt font-bold text-sky-600" style={{ transform: "translateZ(40px)" }}>
          Center 0°
        </div>
        <div className="absolute w-20 h-24 bg-slate-100 rounded-xl border border-slate-200 opacity-60 flex items-center justify-center text-[10px] text-slate-500" style={{ transform: "translateX(35px) translateZ(-20px) rotateY(32deg)" }}>
          +32°
        </div>
        <div className="absolute w-20 h-24 bg-slate-100 rounded-xl border border-slate-200 opacity-60 flex items-center justify-center text-[10px] text-slate-500" style={{ transform: "translateX(-35px) translateZ(-20px) rotateY(-32deg)" }}>
          -32°
        </div>
      </motion.div>
    </div>
  );
}

// 14. Book Stage Mini
function BookStageMini({ playCount }: { playCount: number }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (playCount === 0) return;
    setOpen(!open);
  }, [playCount]);

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: 800 }}>
      <div
        className="relative w-36 h-24 transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(30deg) rotateZ(-15deg)",
        }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white rounded-r-lg border border-slate-200 shadow-sm" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-100 rounded-l-lg border border-slate-200 shadow-xs" />
        <motion.div
          animate={{ rotateY: open ? -180 : 0 }}
          transition={{ duration: 0.7 }}
          className="absolute top-0 right-0 w-1/2 h-full origin-left bg-sky-100 rounded-r-lg border border-sky-200 shadow-md flex items-center justify-center font-prompt font-bold text-[10px] text-sky-600"
          style={{ transformStyle: "preserve-3d" }}
        >
          Cover
        </motion.div>
      </div>
    </div>
  );
}

// 15. Macaw Ribbons Mini
function MacawRibbonsMini({ playCount }: { playCount: number }) {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3].map((num) => (
        <motion.div
          key={num}
          whileHover={{ y: 3 }}
          className="w-8 h-12 bg-[#0284c7] shadow-md flex justify-center pt-2 text-white font-prompt font-bold text-xs"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
        >
          0{num}
        </motion.div>
      ))}
    </div>
  );
}

// 16. Water Rings Mini
function WaterRingsMini({ playCount }: { playCount: number }) {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-sky-500 z-10" />
      <motion.div
        key={`r1-${playCount}`}
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="absolute w-12 h-12 rounded-full border-2 border-sky-400"
      />
      <motion.div
        key={`r2-${playCount}`}
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
        className="absolute w-12 h-12 rounded-full border border-sky-300"
      />
    </div>
  );
}
