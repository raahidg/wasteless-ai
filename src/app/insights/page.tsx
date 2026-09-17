import React from 'react';
import RecommendationCards from '@/components/insights/RecommendationCards';

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-base font-bold text-white mb-1">
          Evidence-Based Waste Prevention Strategies
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          These intervention frameworks are derived from actual structural characteristics identified within the 5,000 global food waste records. Every recommendation connects an observed empirical pattern to an operational mechanism.
        </p>
      </div>

      <RecommendationCards />
    </div>
  );
}
