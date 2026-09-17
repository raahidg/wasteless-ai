'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import {
  Filter,
  RotateCcw,
  Search,
  Calendar,
  Layers,
  Globe,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

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
    <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card backdrop-blur-sm space-y-4">
      {/* Top Row: Search & Quick Toggle */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by country, category, or year..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Count & Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="text-xs text-slate-400">
            Showing{' '}
            <span className="font-semibold text-emerald-400">
              {filteredRecords.length.toLocaleString()}
            </span>{' '}
            of <span className="font-semibold text-slate-300">{records.length.toLocaleString()}</span> records
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filters {isFiltered && `(${filters.countries.length + filters.categories.length + (filters.searchQuery ? 1 : 0)})`}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </button>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Always accessible on desktop/tablets) */}
      <div className="pt-2 border-t border-slate-800/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Food Categories
          </span>
          {filters.categories.length > 0 && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, categories: [] }))}
              className="text-[11px] text-slate-400 hover:text-emerald-300"
            >
              Select All
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((cat) => {
            const isSelected = filters.categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500'
                    : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapsible Advanced Filters: Countries & Sliders */}
      {expanded && (
        <div className="pt-4 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* Countries Selector */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Countries ({allCountries.length} available)
              </span>
              {filters.countries.length > 0 && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, countries: [] }))}
                  className="text-[11px] text-slate-400 hover:text-emerald-300"
                >
                  Clear Countries
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-950/60 rounded-xl border border-slate-800">
              {allCountries.map((c) => {
                const isSelected = filters.countries.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleCountry(c)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Range Sliders */}
          <div className="space-y-4 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {/* Year Range */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" /> Year Range
                </span>
                <span className="font-semibold text-emerald-400">
                  {filters.yearMin} - {filters.yearMax}
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

            {/* Waste Volume Limit */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Max Waste Volume</span>
                <span className="font-semibold text-emerald-400">
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
