"use client";

import { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export default function BookFlip3D() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 4;

  const nextPage = () => {
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
  };

  const prevPage = () => {
    setCurrentPage((p) => Math.max(0, p - 1));
  };

  const reset = () => {
    setCurrentPage(0);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-white/80 rounded-3xl border border-slate-200/90 shadow-sm relative select-none font-prompt">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-500" />
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider font-prompt">
            3D Spatial Book Flip Stage
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs rounded-lg transition-colors cursor-pointer"
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Next
          </button>
        </div>
      </div>

      {/* Book 3D Wrapper */}
      <div
        className="w-full h-[260px] flex items-center justify-center py-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/80"
        style={{ perspective: 1200 }}
      >
        <div
          className="relative w-80 sm:w-96 h-52 transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(25deg) rotateZ(-10deg)",
          }}
        >
          {/* Base Book Block (Right side) */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full bg-white rounded-r-2xl border border-slate-200 p-4 text-slate-900 shadow-md flex flex-col justify-between"
            style={{ transformStyle: "preserve-3d" }}
          >
            {currentPage === 3 ? (
              <div className="h-full flex items-center justify-center">
                <span className="font-yeseva text-2xl text-sky-600 uppercase">
                  THE END
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider font-mono">
                  Page 0{currentPage * 2 + 1}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1 font-prompt">
                  Interactive Spread
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  Real 3D spatial rotation on Z-axis with physical depth and realistic shadows.
                </p>
              </div>
            )}
          </div>

          {/* Left Landing Area */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[#F1F5F9] rounded-l-2xl border border-slate-200 p-4 text-slate-900 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              {currentPage > 0 ? `Page 0${currentPage * 2}` : "Inside Spine"}
            </span>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                3D Era
              </div>
            </div>
          </div>

          {/* Flipping Front Cover */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full origin-left rounded-r-2xl transition-transform duration-700 ease-in-out shadow-xl flex items-center justify-center text-center p-4 border border-sky-100"
            style={{
              backgroundColor: "#edf6fd",
              transformStyle: "preserve-3d",
              transform: currentPage === 0 ? "rotateY(0deg)" : "rotateY(-180deg)",
              zIndex: 30,
            }}
          >
            {/* Front Side */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <h3 className="font-bold text-lg text-sky-500 uppercase tracking-tight font-prompt">
                My<br />Journey
              </h3>
              <div className="w-7 h-7 rounded-lg bg-sky-200/60 mt-3 border border-sky-300" />
            </div>

            {/* Back Side */}
            <div
              className="absolute inset-0 bg-slate-50 rounded-l-2xl flex items-center justify-center p-3 text-slate-800"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <span className="text-xs font-semibold text-slate-500 font-prompt">Inside Cover</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-5 text-xs text-slate-500 border-t border-slate-100 pt-4 font-prompt">
        <span className="font-merienda text-sky-600">
          ✦ State: {currentPage === 0 ? "Closed Front Cover" : currentPage === 3 ? "Closed Back Cover" : `Spread ${currentPage}`}
        </span>
        <span className="text-slate-400 font-mono">Use Prev/Next buttons</span>
      </div>
    </div>
  );
}
