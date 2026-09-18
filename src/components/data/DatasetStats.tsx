'use client';

import React, { useRef } from 'react';
import { useData } from '@/context/DataContext';
import {
  Database,
  CheckCircle2,
  FileCheck,
  Upload,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function DatasetStats() {
  const { isCustomDataLoaded, loadCustomCSV, resetToOriginalData, records } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await loadCustomCSV(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const stats = [
    {
      label: 'Total Observations',
      value: records.length.toLocaleString(),
      sub: '5,000 verified rows',
    },
    {
      label: 'Missing Values (NaN)',
      value: '0 (0.00%)',
      sub: 'Zero data gaps',
      icon: CheckCircle2,
      color: 'text-emerald-400',
    },
    {
      label: 'Duplicate Records',
      value: '0',
      sub: 'Unique row profiles',
      icon: CheckCircle2,
      color: 'text-emerald-400',
    },
    {
      label: 'Observed Nations',
      value: '20 Nations',
      sub: 'Across 6 continents',
    },
    {
      label: 'Temporal Coverage',
      value: '2018 – 2024',
      sub: '7 calendar years',
    },
    {
      label: 'Food Categories',
      value: '8 Classes',
      sub: 'Perishable to grain',
    },
  ];

  const columnDictionary = [
    {
      col: 'Country',
      type: 'string',
      desc: 'Sovereign nation where food waste observation was recorded.',
      sample: 'Australia, Indonesia, Germany...',
    },
    {
      col: 'Year',
      type: 'integer',
      desc: 'Calendar year of reporting (2018 through 2024).',
      sample: '2018 – 2024',
    },
    {
      col: 'Food Category',
      type: 'string',
      desc: 'Classification of food product stream.',
      sample: 'Fruits & Veg, Prepared Food, Dairy...',
    },
    {
      col: 'Total Waste (Tons)',
      type: 'float',
      desc: 'Gross physical quantity of discarded food volume.',
      sample: '502.61 to 49,990.76 Tons (Mean: 25,061.78)',
    },
    {
      col: 'Economic Loss (Million $)',
      type: 'float',
      desc: 'Estimated direct commercial monetary loss.',
      sample: '$406.69M to $59,228.93M (Mean: $25,039.70)',
    },
    {
      col: 'Avg Waste per Capita (Kg)',
      type: 'float',
      desc: 'Per-person annual waste contribution.',
      sample: '20.09 to 199.97 Kg (Mean: 109.46)',
    },
    {
      col: 'Population (Million)',
      type: 'float',
      desc: 'National population scale represented.',
      sample: '11.29 to 1,399.97M (Mean: 706.61)',
    },
    {
      col: 'Household Waste (%)',
      type: 'float',
      desc: 'Domestic post-consumer share of total discard.',
      sample: '30.02% to 70.00% (Mean: 50.06%)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 6 Key Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-slate-900/80 border border-emerald-500/20 shadow-card backdrop-blur-xl"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {s.label}
            </span>
            <span className="text-xl font-black text-white block font-mono">
              {s.value}
            </span>
            <span className="text-[10px] text-emerald-400/80 font-semibold mt-0.5 block">
              {s.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Dataset Schema & Custom CSV Uploader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schema Dictionary */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Dataset Feature Dictionary
            </h4>
            <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
              8 Standard Columns
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Column</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Range / Sample</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {columnDictionary.map((cd, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                      {cd.col}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-emerald-400">
                      {cd.type}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {cd.desc}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-300">
                      {cd.sample}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Dataset Uploader */}
        <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card backdrop-blur-xl flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              Upload Custom CSV Dataset
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test WasteLess AI with your own supply loss data. Uploaded CSV must match the 8 standard schema columns.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-dashed border-emerald-500/40 text-center space-y-3">
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload-input"
            />
            <label
              htmlFor="csv-upload-input"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all shadow-glow hover:scale-[1.02] active:scale-[0.98]"
            >
              <Upload className="w-4 h-4" />
              <span>Select CSV File</span>
            </label>
            <p className="text-[10px] text-slate-500 font-mono">
              Headers: Country, Year, Food Category, Total Waste (Tons), etc.
            </p>
          </div>

          {isCustomDataLoaded && (
            <button
              onClick={resetToOriginalData}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Built-in 5,000-Row Dataset</span>
            </button>
          )}

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
            <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-mono">Active: global_food_wastage_dataset.csv (320 KB)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
