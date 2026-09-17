'use client';

import React from 'react';
import artifacts from '../../../public/data/model_artifacts.json';
import {
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Percent,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

export default function MetricsGrid() {
  const { metadata, regression_models, classifier_model } = artifacts;
  const { primary, random_forest, baseline } = regression_models;

  return (
    <div className="space-y-6">
      {/* Model Spec Overview */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-5 shadow-card grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
            Target Variable
          </span>
          <span className="text-sm font-bold text-white block">
            {metadata.target_variable}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">
            Unit: {metadata.target_unit}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
            Train / Test Partition
          </span>
          <span className="text-sm font-bold text-white block">
            80% Train / 20% Test
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {metadata.train_records.toLocaleString()} train / {metadata.test_records.toLocaleString()} test
          </span>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
            Primary Model
          </span>
          <span className="text-sm font-bold text-emerald-400 block">
            {primary.name}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            L2 Regularization (α = 1.0)
          </span>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
            Risk Classification
          </span>
          <span className="text-sm font-bold text-cyan-400 block">
            {classifier_model.name}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Accuracy: {(classifier_model.accuracy * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Side-by-Side Model Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Primary Ridge Regression */}
        <div className="bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-glow relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Selected Primary Model
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              Optimal Generalization
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white">
            {primary.name}
          </h3>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">R² Score (Variance Explained)</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {(primary.r2 * 100).toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">Mean Absolute Error (MAE)</span>
              <span className="text-sm font-bold text-white font-mono">
                ${primary.mae.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">Root Mean Squared Error (RMSE)</span>
              <span className="text-sm font-bold text-white font-mono">
                ${primary.rmse.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-emerald-900/40">
              <span className="text-xs text-emerald-300 font-medium">Error Reduction vs Baseline</span>
              <span className="text-sm font-extrabold text-emerald-400 font-mono">
                +{primary.error_reduction_pct}%
              </span>
            </div>
          </div>
        </div>

        {/* 2. Random Forest Regressor */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Non-Linear Ensemble
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-300 rounded border border-slate-700">
              100 Estimators
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white">
            {random_forest.name}
          </h3>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">R² Score (Variance Explained)</span>
              <span className="text-base font-bold text-teal-400 font-mono">
                {(random_forest.r2 * 100).toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">Mean Absolute Error (MAE)</span>
              <span className="text-sm font-bold text-white font-mono">
                ${random_forest.mae.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">Root Mean Squared Error (RMSE)</span>
              <span className="text-sm font-bold text-white font-mono">
                ${random_forest.rmse.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400">Complexity</span>
              <span className="text-xs font-medium text-slate-300">
                Non-linear ensemble
              </span>
            </div>
          </div>
        </div>

        {/* 3. Dummy Regressor (Baseline) */}
        <div className="bg-slate-900/90 border border-rose-950/60 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Naive Baseline Model
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/10 text-rose-300 rounded border border-rose-500/20">
              Mean Strategy
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white">
            {baseline.name}
          </h3>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">R² Score (Variance Explained)</span>
              <span className="text-base font-bold text-rose-400 font-mono">
                {(baseline.r2 * 100).toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">Mean Absolute Error (MAE)</span>
              <span className="text-sm font-bold text-slate-300 font-mono">
                ${baseline.mae?.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-300">Root Mean Squared Error (RMSE)</span>
              <span className="text-sm font-bold text-slate-300 font-mono">
                ${baseline.rmse?.toLocaleString()}M
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
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
