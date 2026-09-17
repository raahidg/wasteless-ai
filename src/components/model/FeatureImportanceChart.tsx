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

const COLORS = ['#10b981', '#059669', '#047857', '#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4'];

export default function FeatureImportanceChart() {
  const [mounted, setMounted] = useState(false);
  const topImportances = artifacts.regression_models.random_forest.top_importances;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-72 bg-slate-900/60 rounded-2xl animate-pulse" />;
  }

  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: '#065f46',
    borderRadius: '0.75rem',
    color: '#e2e8f0',
    fontSize: '0.75rem',
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Random Forest Gini Feature Importance
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
            margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" stroke="#64748b" fontSize={11} />
            <YAxis
              type="category"
              dataKey="feature"
              stroke="#94a3b8"
              fontSize={10}
              width={140}
            />
            <Tooltip
              contentStyle={customTooltipStyle}
              formatter={(val: any) => [`${(Number(val) * 100).toFixed(2)}%`, 'Importance']}
            />
            <Bar dataKey="importance" name="Importance" radius={[0, 6, 6, 0]}>
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
