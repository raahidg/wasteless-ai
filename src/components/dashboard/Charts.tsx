'use client';

import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import {
  getTrendData,
  getCategoryData,
  getCountryData,
  getHouseholdSplitData,
  getCorrelationScatterData,
  getCapitaHistogram,
} from '@/lib/dataService';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  Globe2,
  PieChart as PieIcon,
  Activity,
  Maximize2,
} from 'lucide-react';

const COLORS = ['#10b981', '#059669', '#047857', '#065f46', '#34d399', '#6ee7b7', '#a7f3d0', '#84cc16'];

export default function DashboardCharts() {
  const { filteredRecords } = useData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-slate-900/60 rounded-2xl border border-slate-800" />
        ))}
      </div>
    );
  }

  const trendData = getTrendData(filteredRecords);
  const categoryData = getCategoryData(filteredRecords);
  const countryData = getCountryData(filteredRecords, 8);
  const householdSplit = getHouseholdSplitData(filteredRecords);
  const scatterData = getCorrelationScatterData(filteredRecords, 100);
  const capitaHistogram = getCapitaHistogram(filteredRecords);

  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: '#065f46',
    borderRadius: '0.75rem',
    color: '#e2e8f0',
    fontSize: '0.75rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Trend Over Time */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Annual Waste & Loss Trajectory (2018–2024)
            </h4>
            <p className="text-xs text-slate-400">Total Waste (Tons) & Economic Loss ($M) over time</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis yAxisId="left" stroke="#10b981" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar yAxisId="left" dataKey="totalWasteTons" name="Waste (Tons)" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="economicLossMillion" name="Economic Loss ($M)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Waste by Food Category */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Waste Distribution by Food Category
            </h4>
            <p className="text-xs text-slate-400">Tonnage aggregated per food category</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="category" stroke="#94a3b8" fontSize={10} width={100} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="totalWasteTons" name="Waste (Tons)" fill="#059669" radius={[0, 6, 6, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Top Countries */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              Highest Waste Generating Countries (Top 8)
            </h4>
            <p className="text-xs text-slate-400">Aggregate recorded food waste volume by country</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countryData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="country" stroke="#64748b" fontSize={10} angle={-25} textAnchor="end" height={45} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="totalWasteTons" name="Waste (Tons)" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Household vs Supply Chain Split */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              Household vs. Supply Chain & Commercial
            </h4>
            <p className="text-xs text-slate-400">Domestic consumer waste vs upstream distribution loss</p>
          </div>
        </div>

        <div className="h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={householdSplit}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
              >
                {householdSplit.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} formatter={(val: any) => `${Number(val).toLocaleString()} Tons`} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Waste vs Loss Correlation (Scatter) */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Total Waste vs. Economic Loss Correlation
            </h4>
            <p className="text-xs text-slate-400">Empirical linear relationship (Pearson r = 0.9745)</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="waste" name="Waste (Tons)" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis dataKey="loss" name="Economic Loss ($M)" stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={customTooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Observations" data={scatterData} fill="#34d399" opacity={0.65} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Per Capita Distribution */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Avg Waste per Capita Distribution
            </h4>
            <p className="text-xs text-slate-400">Frequency of annual per-person waste quantities (Kg)</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={capitaHistogram} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="range" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="count" name="Records Count" fill="#047857" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
