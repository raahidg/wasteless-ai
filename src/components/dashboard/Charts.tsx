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
  Area,
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  Globe2,
  PieChart as PieIcon,
  Activity,
  Maximize2,
  Layers,
} from 'lucide-react';

const GRADIENT_COLORS = [
  '#10b981',
  '#059669',
  '#047857',
  '#14b8a6',
  '#06b6d4',
  '#3b82f6',
  '#84cc16',
  '#a3e635',
];

export default function DashboardCharts() {
  const { filteredRecords } = useData();
  const [mounted, setMounted] = useState(false);
  const [trendView, setTrendView] = useState<'both' | 'waste' | 'loss'>('both');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-slate-900/60 rounded-3xl border border-slate-800" />
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
    backgroundColor: 'rgba(3, 7, 18, 0.95)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '1rem',
    color: '#f8fafc',
    fontSize: '0.75rem',
    boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(16, 185, 129, 0.2)',
    backdropFilter: 'blur(12px)',
    padding: '0.75rem 1rem',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Trend Over Time */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Annual Waste & Loss Trajectory (2018–2024)
            </h4>
            <p className="text-xs text-slate-400">Total Waste (Tons) & Economic Loss ($M) trajectory</p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-[10px] font-bold">
            <button
              onClick={() => setTrendView('both')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                trendView === 'both' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Combined
            </button>
            <button
              onClick={() => setTrendView('waste')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                trendView === 'waste' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tonnage
            </button>
            <button
              onClick={() => setTrendView('loss')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                trendView === 'loss' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Loss ($M)
            </button>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#047857" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                yAxisId="left"
                stroke="#10b981"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#f59e0b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              {(trendView === 'both' || trendView === 'waste') && (
                <Bar
                  yAxisId="left"
                  dataKey="totalWasteTons"
                  name="Waste (Tons)"
                  fill="url(#wasteGradient)"
                  radius={[6, 6, 0, 0]}
                />
              )}
              {(trendView === 'both' || trendView === 'loss') && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="economicLossMillion"
                  name="Economic Loss ($M)"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#020617' }}
                  activeDot={{ r: 7 }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Waste by Food Category */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Waste Distribution by Food Category
            </h4>
            <p className="text-xs text-slate-400">Total recorded tonnage per product category</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 45, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} opacity={0.6} />
              <XAxis
                type="number"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="category"
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                width={105}
              />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="totalWasteTons" name="Waste (Tons)" radius={[0, 8, 8, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={GRADIENT_COLORS[index % GRADIENT_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Top Countries */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              Highest Waste Generating Countries (Top 8)
            </h4>
            <p className="text-xs text-slate-400">Aggregate recorded food waste volume by nation</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countryData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis
                dataKey="country"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                angle={-25}
                textAnchor="end"
                height={45}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="totalWasteTons" name="Waste (Tons)" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Household vs Supply Chain Split */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              Domestic Household vs. Supply Chain Split
            </h4>
            <p className="text-xs text-slate-400">Post-consumer domestic vs commercial distribution</p>
          </div>
        </div>

        <div className="h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={householdSplit}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
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
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Waste Tonnage vs. Financial Loss Correlation
            </h4>
            <p className="text-xs text-slate-400">Empirical linear coupling (Pearson r = 0.9745)</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis
                dataKey="waste"
                name="Waste (Tons)"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                dataKey="loss"
                name="Loss ($M)"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip contentStyle={customTooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Observations" data={scatterData} fill="#34d399" opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Per Capita Distribution */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Per Capita Waste Distribution Histogram
            </h4>
            <p className="text-xs text-slate-400">Frequency of annual per-capita discard tiers (Kg)</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={capitaHistogram} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis dataKey="range" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="count" name="Frequency" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
