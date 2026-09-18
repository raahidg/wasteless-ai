'use client';

import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';

export default function ModelCritique() {
  return (
    <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 sm:p-7 shadow-card backdrop-blur-xl space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
        <FileText className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-extrabold text-white">
          Academic Methodology & Model Validation Critique
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Validated Strengths */}
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Empirical Validation & Strengths
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5 list-disc list-inside leading-relaxed">
            <li>
              <span className="font-bold text-white">Direct Physical Mapping:</span> Total Waste Tonnage strongly governs Economic Loss (r = 0.9745), yielding an R² of 95.04% with minimal regularization shrinkage.
            </li>
            <li>
              <span className="font-bold text-white">Drastic Error Reduction:</span> Ridge regression lowers Mean Absolute Error from $12,994.4M (Baseline) to $2,534.3M, an <span className="text-emerald-400 font-bold">80.5% reduction in error</span>.
            </li>
            <li>
              <span className="font-bold text-white">Unbiased Residuals:</span> Residual distribution around zero error satisfies classical Gauss-Markov homoscedasticity assumptions without systematic skew.
            </li>
            <li>
              <span className="font-bold text-white">Risk Tier Alignment:</span> Decision-tree partition maps waste tonnage directly into Low, Moderate, and High operational intervention categories.
            </li>
          </ul>
        </div>

        {/* Dataset Limitations */}
        <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
            <AlertTriangle className="w-4 h-4" />
            Dataset Constraints & Academic Limitations
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5 list-disc list-inside leading-relaxed">
            <li>
              <span className="font-bold text-white">Demographic Independence:</span> Correlation between Total Waste and national Population or Country is near zero (r ≈ 0.02), reflecting synthetic global benchmark generation rather than localized censuses.
            </li>
            <li>
              <span className="font-bold text-white">No Direct Production Metric:</span> The dataset provides waste tonnage, per capita discard, and loss, but does not record total gross food production harvested. Consequently, percentage of total harvest lost cannot be directly computed without external proxies.
            </li>
            <li>
              <span className="font-bold text-white">Macro Tonnage Scale:</span> Data entries are aggregated in macro metric tons rather than granular retail stock keeping units (SKUs) or daily canteen trays.
            </li>
          </ul>
        </div>
      </div>

      {/* Recommended Future Micro-Data Requirements */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-emerald-400" />
          Recommended Data Feeds for High-Precision Canteen & Retail Forecasting:
        </span>
        <p className="text-xs text-slate-400 leading-relaxed">
          To transition from macro regional economic loss prediction to micro-level canteen meal over-production forecasting, the system would ideally ingest:
          (1) Point-of-Sale (POS) hourly diner transactions,
          (2) Smart scale tray tare weights at dish return stations,
          (3) Perishable item expiration timestamps and refrigeration thermistor logs, and
          (4) Daily local weather forecasts and academic holiday calendars.
        </p>
      </div>
    </div>
  );
}
