'use client';

import React from 'react';
import PredictionForm from '@/components/predict/PredictionForm';
import { useData } from '@/context/DataContext';

export default function PredictPage() {
  const { allCountries, allCategories } = useData();

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-base font-bold text-white mb-1">
          Predictive Impact Modeling
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Estimate direct commercial financial loss (Million USD) and greenhouse gas equivalents for any proposed food category, waste volume, and demographic context using our empirical regularized Ridge model (R² = 0.9504).
        </p>
      </div>

      <PredictionForm countries={allCountries} categories={allCategories} />
    </div>
  );
}
