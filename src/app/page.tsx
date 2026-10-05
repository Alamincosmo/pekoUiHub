"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Play,
  Search,
  Sparkles,
  Zap,
  Type,
  ArrowLeftRight,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AnimationPreviewRenderer from "@/components/previews/AnimationPreviewRenderer";
import {
  CATEGORIES,
  ANIMATION_ITEMS,
  CategoryType,
  AnimationCardItem,
} from "@/data/animations";

export default function PekoUiHubPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CategoryType | "all">(
    "all"
  );
  const [search, setSearch] = useState("");
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});

  const handleTriggerPlay = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent navigation when clicking play
    setPlayCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const filteredItems = ANIMATION_ITEMS.filter((item) => {
    const matchesCat =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categoriesToDisplay =
    activeCategory === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === activeCategory);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "text-animations":
        return <Type className="w-5 h-5 text-sky-500 shrink-0" />;
      case "slide-jump":
        return <Zap className="w-5 h-5 text-sky-500 shrink-0" />;
      case "transitions":
        return <ArrowLeftRight className="w-5 h-5 text-sky-500 shrink-0" />;
      case "elements":
        return <Layers className="w-5 h-5 text-sky-500 shrink-0" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-500 shrink-0" />;
    }
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-jost selection:bg-sky-100 selection:text-sky-900">
        {/* Ambient Diffused Snow-Sky Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-sky-100/50 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[160px]" />
        </div>

        {/* ── 1. LEFT SIDEBAR NAVIGATION ── */}
        <aside className="w-68 md:w-76 shrink-0 border-r border-slate-200/90 bg-white/95 backdrop-blur-xl h-screen sticky top-0 flex flex-col justify-between p-6 z-40 select-none shadow-xs">
          <div className="flex flex-col gap-7">
            {/* Logo from public/logo.png */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white p-1 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="pekoUiHub Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="font-prompt font-black text-xl text-slate-900 leading-none tracking-tight">
                  pekoUiHub
                </h1>
                <p className="text-xs font-jost text-slate-400 mt-1">
                  Motion &amp; Interaction Vault
                </p>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search animations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm font-jost text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:bg-white transition-all shadow-2xs"
              />
            </div>

            {/* Navigation Categories with Larger, Bolder Text & Icons */}
            <nav className="flex flex-col gap-2 pt-1">
              <span className="text-[11px] font-prompt font-bold uppercase tracking-wider text-slate-400 px-3.5 mb-0.5">
                Categories
              </span>

              {/* All Animations Button */}
              <button
                onClick={() => setActiveCategory("all")}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[14px] sm:text-[15px] font-prompt transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-sky-50 text-sky-600 font-bold border border-sky-200/80 shadow-xs"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>All Animations</span>
                </div>
                <span className="text-xs font-mono opacity-60 px-2 py-0.5 rounded-full bg-slate-100">
                  {ANIMATION_ITEMS.length}
                </span>
              </button>

              {/* Categorical Buttons */}
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[14px] sm:text-[15px] font-prompt transition-all cursor-pointer ${
                      isActive
                        ? "bg-sky-50 text-sky-600 font-bold border border-sky-200/80 shadow-xs"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(cat.id)}
                      <span className="capitalize">{cat.name}</span>
                    </div>
                    <span className="text-xs font-mono opacity-60 px-2 py-0.5 rounded-full bg-slate-100">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Footer Info */}
          <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/80 text-xs font-jost text-slate-500 flex flex-col gap-1">
            <span className="font-prompt font-bold text-slate-800 text-[12px]">
              Vault v1.0 • Pure Sans
            </span>
            <span className="text-[11px] text-slate-400">
              Next.js 16 • Tailwind v4 • Motion
            </span>
          </div>
        </aside>

        {/* ── 2. MAIN CONTENT AREA (NO HERO SECTION) ── */}
        <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            {categoriesToDisplay.map((category) => {
              const items = filteredItems.filter(
                (item) => item.category === category.id
              );
              if (items.length === 0) return null;

              return (
                <section key={category.id} className="flex flex-col gap-6">
                  {/* Category Title Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                      <h2 className="font-prompt font-black text-2xl text-slate-900 tracking-tight">
                        {category.name}
                      </h2>
                    </div>
                    <span className="text-xs font-jost text-slate-400 font-medium">
                      {items.length} Modules Ready • Click card to view code
                    </span>
                  </div>

                  {/* 3 CARDS PER ROW GRID (Strictly 3 cards on desktop!) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => router.push(`/cards/${item.id}`)}
                        className="snow-card rounded-3xl p-5 flex flex-col justify-between relative group overflow-hidden bg-white cursor-pointer hover:border-sky-300 transition-all"
                      >
                        {/* Top Bar: Tag & Sky Blue Play Button */}
                        <div className="flex items-center justify-between w-full mb-3 z-10">
                          <span className="text-[10px] font-prompt font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
                            {item.tag}
                          </span>

                          {/* Modern Clean Sky Blue Play Button */}
                          <button
                            onClick={(e) => handleTriggerPlay(e, item.id)}
                            className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25 transition-all hover:scale-105 active:scale-90 cursor-pointer"
                            title="Play Animation"
                          >
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </button>
                        </div>

                        {/* Card Body: Interactive Live Animation Preview */}
                        <div className="flex-1 flex items-center justify-center my-2">
                          <AnimationPreviewRenderer
                            id={item.id}
                            playCount={playCounts[item.id] || 0}
                          />
                        </div>

                        {/* Card Footer: Animation Name (Strictly <= 5 words) */}
                        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 mt-2">
                          <div>
                            <h3 className="font-prompt font-black text-base text-slate-900 leading-tight group-hover:text-sky-600 transition-colors">
                              {item.name}
                            </h3>
                          </div>
                          <div className="shrink-0 p-1.5 rounded-lg text-slate-400 group-hover:text-sky-600 group-hover:bg-sky-50 transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
