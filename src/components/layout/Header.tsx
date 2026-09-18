'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { exportToCSV } from '@/lib/dataService';
import {
  Menu,
  Download,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Database,
  TrendingUp,
} from 'lucide-react';

const pageMeta: Record<string, { section: string; title: string; subtitle: string }> = {
  '/': {
    section: 'Analytics',
    title: 'Food Waste Intelligence Dashboard',
    subtitle: 'Real-time empirical metrics computed from 5,000 global food wastage records',
  },
  '/predict': {
    section: 'AI Studio',
    title: 'AI Food Waste & Economic Loss Predictor',
    subtitle: 'Edge machine learning inference via trained Ridge Regression & UNEP carbon models',
  },
  '/insights': {
    section: 'Interventions',
    title: 'Waste Insights & Strategic Playbooks',
    subtitle: 'Targeted reduction playbooks formulated from empirical supply chain patterns',
  },
  '/data-explorer': {
    section: 'Data Explorer',
    title: 'Global Food Wastage Dataset Explorer',
    subtitle: 'Search, sort, filter, and export the comprehensive 5,000-record dataset',
  },
  '/model-performance': {
    section: 'Machine Learning',
    title: 'Model Performance & Benchmark Cockpit',
    subtitle: 'Empirical cross-validation: Ridge vs Random Forest vs Mean Baseline',
  },
  '/about': {
    section: 'Academic Defense',
    title: 'Academic Documentation & Presentation Deck',
    subtitle: 'System architecture, UN SDG 12.3 alignment, and interactive presentation mode',
  },
};

export default function Header({ setMobileOpen }: { setMobileOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  const {
    filteredRecords,
    filters,
    resetFilters,
    isCustomDataLoaded,
    resetToOriginalData,
    setToastMessage,
  } = useData();

  const current = pageMeta[pathname] || {
    section: 'WasteLess AI',
    title: 'Food Waste Intelligence',
    subtitle: 'Smart Food Waste Prediction & Prevention System',
  };

  const isFiltered =
    filters.countries.length > 0 ||
    filters.categories.length > 0 ||
    filters.yearMin > 2018 ||
    filters.yearMax < 2024 ||
    filters.wasteMin > 0 ||
    filters.wasteMax < 50000 ||
    filters.searchQuery !== '';

  const handleDownload = () => {
    exportToCSV(filteredRecords, `wasteless_dataset_${filteredRecords.length}_records.csv`);
    setToastMessage(`Exported ${filteredRecords.length} records to CSV.`);
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col justify-center px-4 sm:px-8 py-3.5 bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/15">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-slate-400 hover:text-white rounded-xl lg:hidden hover:bg-slate-900 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>WasteLess AI</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-emerald-400">{current.section}</span>
            </div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              {current.title}
            </h1>
          </div>
        </div>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Custom data indicator */}
          {isCustomDataLoaded && (
            <div className="flex items-center gap-2 px-2.5 py-1 text-xs rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <span className="font-semibold">Custom Dataset</span>
              <button
                onClick={resetToOriginalData}
                className="hover:underline text-[11px] font-bold text-amber-200"
              >
                Reset
              </button>
            </div>
          )}

          {/* Active Filter Pill */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-xl hover:bg-emerald-900/60 transition-all shadow-sm"
              title="Click to reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{filteredRecords.length.toLocaleString()} Active</span>
            </button>
          )}

          {/* Export CSV Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 rounded-xl transition-all shadow-glow hover:scale-[1.02] active:scale-[0.98]"
            title="Download currently filtered records as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
}
