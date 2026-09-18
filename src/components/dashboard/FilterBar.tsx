'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import {
  Search,
  Calendar,
  Layers,
  Globe,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const categoryIcons: Record<string, string> = {
  'Bakery Items': '🥖',
  'Beverages': '🧃',
  'Dairy Products': '🧀',
  'Frozen Food': '🧊',
  'Fruits & Vegetables': '🥦',
  'Grains & Cereals': '🌾',
  'Meat & Seafood': '🥩',
  'Prepared Food': '🍱',
};

export default function FilterBar() {
  const {
    filters,
    setFilters,
    resetFilters,
    allCountries,
    allCategories,
    yearBounds,
    wasteBounds,
    filteredRecords,
    records,
  } = useData();

  const [expanded, setExpanded] = useState(false);

  const toggleCountry = (country: string) => {
    setFilters((prev) => {
      const exists = prev.countries.includes(country);
      return {
        ...prev,
        countries: exists
          ? prev.countries.filter((c) => c !== country)
          : [...prev.countries, country],
      };
    });
  };

  const toggleCategory = (cat: string) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(cat);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== cat)
          : [...prev.categories, cat],
      };
    });
  };

  const isFiltered =
    filters.countries.length > 0 ||
    filters.categories.length > 0 ||
    filters.yearMin > yearBounds[0] ||
    filters.yearMax < yearBounds[1] ||
    filters.wasteMin > wasteBounds[0] ||
    filters.wasteMax < wasteBounds[1] ||
    filters.searchQuery !== '';

  return (
    <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-5 shadow-card backdrop-blur-xl space-y-4">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
          <input
            type="text"
            placeholder="Search by country, category, or year..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Telemetry Count & Expansion Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="text-xs text-slate-400">
            Cohort:{' '}
            <span className="font-extrabold text-emerald-400">
              {filteredRecords.length.toLocaleString()}
            </span>{' '}
            / <span className="font-semibold text-slate-300">{records.length.toLocaleString()}</span> rows
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-950/90 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-all shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Parameters</span>
            {isFiltered && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
            {expanded ? <ChevronUp className="w-3.5 h-3.5 ml-0.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-slate-400" />}
          </button>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 rounded-xl transition-all"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Food Categories
          </span>
          {filters.categories.length > 0 && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, categories: [] }))}
              className="text-[11px] font-semibold text-emerald-400 hover:underline"
            >
              Clear Category Filter
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => {
            const isSelected = filters.categories.includes(cat);
            const emoji = categoryIcons[cat] || '🍽️';
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-glow border border-emerald-400 scale-[1.02]'
                    : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{emoji}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Advanced Controls */}
      {expanded && (
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* Countries Selector */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Sovereign Nations ({allCountries.length} countries)
              </span>
              {filters.countries.length > 0 && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, countries: [] }))}
                  className="text-[11px] text-emerald-400 hover:underline"
                >
                  Clear Countries ({filters.countries.length})
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2.5 bg-slate-950/80 rounded-2xl border border-slate-800">
              {allCountries.map((c) => {
                const isSelected = filters.countries.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleCountry(c)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      isSelected
                        ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders Box */}
          <div className="space-y-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            {/* Year Range */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Reporting Years
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {filters.yearMin} – {filters.yearMax}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={yearBounds[0]}
                  max={yearBounds[1]}
                  value={filters.yearMin}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      yearMin: Math.min(Number(e.target.value), prev.yearMax),
                    }))
                  }
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <input
                  type="range"
                  min={yearBounds[0]}
                  max={yearBounds[1]}
                  value={filters.yearMax}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      yearMax: Math.max(Number(e.target.value), prev.yearMin),
                    }))
                  }
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Waste Volume Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-slate-300">Max Waste Volume</span>
                <span className="font-mono font-bold text-emerald-400">
                  ≤ {filters.wasteMax.toLocaleString()} Tons
                </span>
              </div>
              <input
                type="range"
                min={wasteBounds[0]}
                max={wasteBounds[1]}
                step={1000}
                value={filters.wasteMax}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    wasteMax: Number(e.target.value),
                  }))
                }
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
