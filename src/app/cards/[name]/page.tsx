"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Play,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AnimationPreviewRenderer from "@/components/previews/AnimationPreviewRenderer";
import { ANIMATION_ITEMS, AnimationCardItem } from "@/data/animations";

export default function AnimationDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = use(params);
  const item = ANIMATION_ITEMS.find((a) => a.id === resolvedParams.name);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center font-jost">
        <h2 className="font-prompt font-black text-2xl text-slate-900 mb-2">
          Animation Not Found
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          The requested animation module does not exist in the vault.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-sky-500 text-white font-prompt font-semibold text-xs shadow-md shadow-sky-500/25"
        >
          Back to pekoUiHub
        </Link>
      </div>
    );
  }

  return <AnimationDetailContent item={item} />;
}

function AnimationDetailContent({ item }: { item: AnimationCardItem }) {
  const [playCount, setPlayCount] = useState(1);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeTab = item.codeLanguages[activeTabIdx] || item.codeLanguages[0];

  const handlePlay = () => {
    setPlayCount((p) => p + 1);
  };

  const handleCopy = () => {
    if (!activeTab) return;
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-jost selection:bg-sky-100 selection:text-sky-900 pb-20">
        {/* Soft Ambient Snow-Sky Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 right-1/4 w-[700px] h-[450px] bg-sky-100/50 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[160px]" />
        </div>

        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 px-6 sm:px-12 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-prompt font-semibold text-slate-600 hover:text-sky-600 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-sky-50 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-sky-600" />
              </div>
              <span>Back to Vault</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-prompt">
              <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 font-semibold uppercase text-[10px]">
                {item.categoryLabel}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-mono text-[11px]">{item.tag}</span>
            </div>
          </div>
        </header>

        {/* Main Content: Split Grid */}
        <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ── LEFT COLUMN: LARGE HERO UI PREVIEW ── */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="snow-card rounded-3xl p-6 sm:p-8 bg-white relative overflow-hidden flex flex-col justify-between">
                {/* Top Bar: Title & Play Button */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[11px] font-prompt font-semibold uppercase tracking-wider text-sky-600 block mb-1">
                      Live Component Preview
                    </span>
                    <h1 className="font-prompt font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                      {item.name}
                    </h1>
                  </div>

                  {/* Clean Modern Sky Blue Play Button */}
                  <button
                    onClick={handlePlay}
                    className="w-11 h-11 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                    title="Play Animation"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Big Live Canvas Stage */}
                <div className="w-full min-h-[360px] sm:min-h-[420px] rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-6 flex items-center justify-center shadow-inner relative overflow-hidden">
                  <AnimationPreviewRenderer id={item.id} playCount={playCount} />
                </div>

                {/* Bottom Description */}
                <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col gap-2">
                  <span className="text-xs font-prompt font-semibold text-slate-900">
                    Behavior &amp; Architecture:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-jost">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: LANGUAGE NAVBAR & EXPANDABLE CODE CARD ── */}
            <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
              <div className="snow-card rounded-3xl p-6 bg-white flex flex-col gap-4 border border-slate-200/90 shadow-sm">
                {/* Navbar / Language Tabs */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-prompt font-bold text-slate-900">
                      Implementation Code
                    </span>
                    <span className="text-[11px] font-jost text-slate-400">
                      {item.codeLanguages.length} Languages Available
                    </span>
                  </div>

                  {/* Tabs Navbar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
                    {item.codeLanguages.map((tab, idx) => (
                      <button
                        key={tab.label}
                        onClick={() => {
                          setActiveTabIdx(idx);
                          setIsExpanded(false);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-prompt font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          activeTabIdx === idx
                            ? "bg-sky-500 text-white shadow-xs shadow-sky-500/25"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Code Box Area */}
                <div className="relative bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-800">
                  {/* Top Bar with Copy Button */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span className="text-[11px] text-sky-400 font-semibold font-prompt">
                      {activeTab.label}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-[11px] font-prompt font-semibold border border-sky-500/40 transition-all cursor-pointer active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Snippet with Conditional Overflow */}
                  <div
                    className={`p-4 font-mono text-xs text-sky-200 overflow-x-auto transition-all duration-300 ${
                      isExpanded ? "max-h-[620px] overflow-y-auto" : "max-h-64 overflow-hidden"
                    }`}
                  >
                    <pre className="text-slate-200 leading-relaxed font-mono">
                      <code>{activeTab.code}</code>
                    </pre>
                  </div>

                  {/* Floating "See All" Overlay when collapsed */}
                  {!isExpanded && (
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-transparent flex items-end justify-center pb-3">
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="px-4 py-1.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-prompt font-semibold shadow-lg shadow-sky-500/30 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>See All Code</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* "Show Less" toggle when expanded */}
                  {isExpanded && (
                    <div className="p-2 bg-slate-900 border-t border-slate-800 flex justify-center">
                      <button
                        onClick={() => setIsExpanded(false)}
                        className="text-xs font-prompt font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer py-1"
                      >
                        <span>Collapse Code</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] font-jost text-slate-400 px-1">
                  <span>Click language tabs above to view specific syntax</span>
                  <span>Pure Sans-Serif</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
