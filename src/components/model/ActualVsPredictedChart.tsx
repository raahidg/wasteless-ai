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
  Line,
  ComposedChart,
} from 'recharts';
import { Activity, BarChart3 } from 'lucide-react';

export default function ActualVsPredictedChart() {
  const [mounted, setMounted] = useState(false);
  const samples = artifacts.actual_vs_predicted_samples;
  const residualDistribution = artifacts.residual_distribution;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-80 bg-slate-900/60 rounded-2xl animate-pulse" />;
  }

  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: '#065f46',
    borderRadius: '0.75rem',
    color: '#e2e8f0',
    fontSize: '0.75rem',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Actual vs Predicted Scatter */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            Actual vs. Predicted Loss (100 Holdout Test Samples)
          </h4>
          <p className="text-xs text-slate-400">
            Points close to the 45-degree diagonal indicate accurate predictions
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="actual"
                name="Actual Loss ($M)"
                stroke="#64748b"
                fontSize={11}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                dataKey="predicted"
                name="Predicted Loss ($M)"
                stroke="#64748b"
                fontSize={11}
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
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Residual Error Distribution (y_pred - y_test)
          </h4>
          <p className="text-xs text-slate-400">
            Bell-shaped zero-centered distribution confirms unbiased model predictions
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={residualDistribution} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="bin"
                stroke="#64748b"
                fontSize={9}
                angle={-30}
                textAnchor="end"
              />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="count" name="Error Count" fill="#047857" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
