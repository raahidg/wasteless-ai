import React from 'react';
import MetricsGrid from '@/components/model/MetricsGrid';
import ActualVsPredictedChart from '@/components/model/ActualVsPredictedChart';
import FeatureImportanceChart from '@/components/model/FeatureImportanceChart';
import ModelCritique from '@/components/model/ModelCritique';

export default function ModelPerformancePage() {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-base font-bold text-white mb-1">
          Machine Learning Validation & Benchmarking
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Comparative empirical analysis between our primary regularized Ridge model, an ensemble Random Forest regressor, and a naive Dummy baseline evaluated on an uncorrupted 20% holdout test partition (1,000 observations).
        </p>
      </div>

      {/* Side-by-side Model Metrics Grid */}
      <MetricsGrid />

      {/* Actual vs Predicted & Residual Distribution */}
      <ActualVsPredictedChart />

      {/* Feature Importance */}
      <FeatureImportanceChart />

      {/* Academic Methodology Critique */}
      <ModelCritique />
    </div>
  );
}
