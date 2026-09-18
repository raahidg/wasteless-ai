'use client';

import React, { useState, useEffect } from 'react';
import artifacts from '../../../public/data/model_artifacts.json';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Layers } from 'lucide-react';

const COLORS = [
  '#10b981',
  '#059669',
  '#047857',
  '#0d9488',
  '#14b8a6',
  '#06b6d4',
  '#3b82f6',
  '#84cc16',
];

export default function FeatureImportanceChart() {
  const [mounted, setMounted] = useState(false);
  const topImportances = artifacts.regression_models.random_forest.top_importances;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-72 bg-slate-900/60 rounded-3xl animate-pulse" />;
  }

  const customTooltipStyle = {
    backgroundColor: 'rgba(3, 7, 18, 0.95)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '1rem',
    color: '#f8fafc',
    fontSize: '0.75rem',
    boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(12px)',
    padding: '0.75rem 1rem',
  };

  return (
    <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Random Forest Gini Feature Importance Hierarchy
          </h4>
          <p className="text-xs text-slate-400">
            Relative contribution of each feature to variance reduction across 100 decision trees
          </p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topImportances}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} opacity={0.6} />
            <XAxis
              type="number"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="feature"
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              width={145}
            />
            <Tooltip
              contentStyle={customTooltipStyle}
              formatter={(val: any) => [`${(Number(val) * 100).toFixed(2)}%`, 'Gini Importance']}
            />
            <Bar dataKey="importance" name="Importance" radius={[0, 8, 8, 0]}>
              {topImportances.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
