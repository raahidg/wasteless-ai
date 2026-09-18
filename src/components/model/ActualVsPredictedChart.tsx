'use client';

import React, { useState, useEffect } from 'react';
import artifacts from '../../../public/data/model_artifacts.json';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { Activity, BarChart3, TrendingUp } from 'lucide-react';

export default function ActualVsPredictedChart() {
  const [mounted, setMounted] = useState(false);
  const samples = artifacts.actual_vs_predicted_samples;
  const residualDistribution = artifacts.residual_distribution;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-80 bg-slate-900/60 rounded-3xl animate-pulse" />;
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Actual vs Predicted Scatter */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all space-y-4">
        <div>
          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            Actual vs. Predicted Loss (100 Holdout Test Samples)
          </h4>
          <p className="text-xs text-slate-400">
            Points tightly aligned along the diagonal confirm high empirical accuracy (R² = 0.9504)
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis
                dataKey="actual"
                name="Actual Loss ($M)"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                dataKey="predicted"
                name="Predicted Loss ($M)"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={customTooltipStyle}
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value: any, name: string) => [`$${Number(value).toLocaleString()}M`, name]}
              />
              <Scatter name="Test Observations" data={samples} fill="#10b981" opacity={0.75} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Residual Distribution Histogram */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card hover:border-emerald-500/30 transition-all space-y-4">
        <div>
          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Residual Error Distribution (y_pred - y_test)
          </h4>
          <p className="text-xs text-slate-400">
            Zero-centered bell curve confirms unbiased predictions with no systematic error skew
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={residualDistribution} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis
                dataKey="bin"
                stroke="#64748b"
                fontSize={9}
                tickLine={false}
                angle={-30}
                textAnchor="end"
              />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="count" name="Error Count" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
