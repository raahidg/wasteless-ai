'use client';

import React from 'react';
import artifacts from '../../../public/data/model_artifacts.json';
import {
  Trophy,
  Medal,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function MetricsGrid() {
  const { metadata, regression_models, classifier_model } = artifacts;
  const { primary, random_forest, baseline } = regression_models;

  return (
    <div className="space-y-6">
      {/* Partition & Scope Strip */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card backdrop-blur-xl grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Target Variable
          </span>
          <span className="text-sm font-black text-white block">
            {metadata.target_variable}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">
            Unit: {metadata.target_unit}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Holdout Partition
          </span>
          <span className="text-sm font-black text-white block">
            80% Train / 20% Test
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {metadata.train_records.toLocaleString()} train / {metadata.test_records.toLocaleString()} test
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Primary Model
          </span>
          <span className="text-sm font-black text-emerald-400 block">
            {primary.name}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            L2 Regularization (α = 1.0)
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Risk Classification
          </span>
          <span className="text-sm font-black text-cyan-400 block">
            {classifier_model.name}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Accuracy: {(classifier_model.accuracy * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Comparative Model Leaderboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Primary Ridge Regression (Champion) */}
        <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-7 shadow-glow backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                Selected Core Model
              </span>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-black font-mono bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
              Rank #1
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-white tracking-tight">
              {primary.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Closed-form analytical solution with L2 regularization
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">R² Variance Explained</span>
              <span className="text-base font-black text-emerald-400 font-mono">
                {(primary.r2 * 100).toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">Mean Absolute Error (MAE)</span>
              <span className="text-sm font-black text-white font-mono">
                ${primary.mae.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">Root Mean Squared (RMSE)</span>
              <span className="text-sm font-black text-white font-mono">
                ${primary.rmse.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
              <span className="text-xs text-emerald-300 font-bold">Error Reduction vs Baseline</span>
              <span className="text-sm font-black text-emerald-400 font-mono">
                +{primary.error_reduction_pct}%
              </span>
            </div>
          </div>
        </div>

        {/* 2. Random Forest Regressor */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-7 shadow-card backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Medal className="w-5 h-5 text-slate-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Non-Linear Comparison
              </span>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-bold font-mono bg-slate-800 text-slate-300 rounded-full border border-slate-700">
              Rank #2
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-white tracking-tight">
              {random_forest.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              100 Decision Trees ensemble with max depth 12
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">R² Variance Explained</span>
              <span className="text-base font-black text-teal-400 font-mono">
                {(random_forest.r2 * 100).toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">Mean Absolute Error (MAE)</span>
              <span className="text-sm font-black text-white font-mono">
                ${random_forest.mae.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">Root Mean Squared (RMSE)</span>
              <span className="text-sm font-black text-white font-mono">
                ${random_forest.rmse.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-400">Computational Cost</span>
              <span className="text-xs font-bold text-slate-300">
                Heavy forest
              </span>
            </div>
          </div>
        </div>

        {/* 3. Dummy Baseline Regressor */}
        <div className="bg-slate-900/80 border border-rose-950/50 rounded-3xl p-7 shadow-card backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
              Naive Baseline
            </span>
            <span className="px-2.5 py-1 text-[10px] font-bold font-mono bg-rose-500/10 text-rose-300 rounded-full border border-rose-500/20">
              Benchmark
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-white tracking-tight">
              {baseline.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Predicts sample mean for all unseen observations
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">R² Variance Explained</span>
              <span className="text-base font-black text-rose-400 font-mono">
                {(baseline.r2 * 100).toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">Mean Absolute Error (MAE)</span>
              <span className="text-sm font-black text-slate-300 font-mono">
                ${baseline.mae?.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">Root Mean Squared (RMSE)</span>
              <span className="text-sm font-black text-slate-300 font-mono">
                ${baseline.rmse?.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-400">Constant Mean Prediction</span>
              <span className="text-xs font-mono text-slate-300">
                ${baseline.mean_prediction?.toLocaleString()}M
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
