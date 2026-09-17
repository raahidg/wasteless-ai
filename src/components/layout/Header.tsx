'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { exportToCSV } from '@/lib/dataService';
import {
  Menu,
  Download,
  RotateCcw,
  SlidersHorizontal,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': {
    title: 'Food Waste Intelligence Dashboard',
    subtitle: 'Real-time empirical analytics from 5,000 global food wastage records',
  },
  '/predict': {
    title: 'AI Food Waste & Economic Loss Predictor',
    subtitle: 'Machine learning inference using trained Ridge Regression & UNEP carbon models',
  },
  '/insights': {
    title: 'Waste Insights & Reduction Strategies',
    subtitle: 'Evidence-backed interventions derived from global supply-chain loss patterns',
  },
  '/data-explorer': {
    title: 'Global Food Wastage Dataset Explorer',
    subtitle: 'Search, filter, analyze, and export the comprehensive 5,000-record dataset',
  },
  '/model-performance': {
    title: 'Machine Learning Model Performance',
    subtitle: 'Rigorous empirical evaluation: Ridge vs Random Forest vs Mean Baseline',
  },
  '/about': {
    title: 'Academic Project & Research Documentation',
    subtitle: 'WasteLess AI architecture, methodology, formulas, and deployment specifications',
  },
};

export default function Header({ setMobileOpen }: HeaderProps) {
  const pathname = usePathname();
  const {
    filteredRecords,
    filters,
    resetFilters,
    isCustomDataLoaded,
    resetToOriginalData,
    kpis,
    setToastMessage,
  } = useData();

  const currentPage = pageTitles[pathname] || {
    title: 'WasteLess AI',
    subtitle: 'Smart Food Waste Prediction & Prevention System',
  };

  const hasActiveFilters =
    filters.countries.length > 0 ||
    filters.categories.length > 0 ||
    filters.yearMin > 2018 ||
    filters.yearMax < 2024 ||
    filters.wasteMin > 0 ||
    filters.wasteMax < 50000 ||
    filters.searchQuery !== '';

  const handleDownload = () => {
    exportToCSV(filteredRecords, `wasteless_data_${filteredRecords.length}_records.csv`);
    setToastMessage(`Exported ${filteredRecords.length} records to CSV.`);
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col justify-center px-4 sm:px-8 py-4 bg-slate-950/80 backdrop-blur-md border-b border-emerald-900/20">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-slate-400 hover:text-white rounded-lg lg:hidden hover:bg-slate-900 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              {currentPage.title}
            </h1>
            <p className="hidden sm:block text-xs text-slate-400 mt-0.5">
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Actions & Status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Custom data indicator */}
          {isCustomDataLoaded && (
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 text-xs rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <span>Custom Dataset Active</span>
              <button
                onClick={resetToOriginalData}
                className="hover:underline font-semibold text-amber-200"
              >
                Reset
              </button>
            </div>
          )}

          {/* Filter Status Badge */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-700/50 rounded-lg hover:bg-emerald-900/60 transition-colors"
              title="Click to reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ({filteredRecords.length} filtered)</span>
            </button>
          )}

          {/* Export CSV Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors shadow-sm"
            title="Download currently filtered records as CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
}
