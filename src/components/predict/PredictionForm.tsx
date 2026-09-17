'use client';

import React, { useState } from 'react';
import { PredictionInput, PredictionOutput } from '@/types';
import { predictFoodWasteLoss } from '@/lib/predictionEngine';
import PredictionResult from './PredictionResult';
import {
  Sparkles,
  Sliders,
  Scale,
  Globe,
  Utensils,
  Home,
  Users,
  Calendar,
  RotateCcw,
} from 'lucide-react';

interface Props {
  countries: string[];
  categories: string[];
}

export default function PredictionForm({ countries, categories }: Props) {
  const [input, setInput] = useState<PredictionInput>({
    country: countries[0] || 'USA',
    foodCategory: categories[0] || 'Fruits & Vegetables',
    totalWasteTons: 25000,
    avgWastePerCapitaKg: 109,
    populationMillion: 700,
    householdWastePct: 50,
    year: 2024,
  });

  const [result, setResult] = useState<PredictionOutput>(() => predictFoodWasteLoss({
    country: countries[0] || 'USA',
    foodCategory: categories[0] || 'Fruits & Vegetables',
    totalWasteTons: 25000,
    avgWastePerCapitaKg: 109,
    populationMillion: 700,
    householdWastePct: 50,
    year: 2024,
  }));

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = predictFoodWasteLoss(input);
    setResult(res);
  };

  const applyPreset = (presetTons: number, presetCat: string) => {
    const updated = {
      ...input,
      totalWasteTons: presetTons,
      foodCategory: presetCat,
    };
    setInput(updated);
    setResult(predictFoodWasteLoss(updated));
  };

  return (
    <div className="space-y-8">
      {/* Preset Scenario Buttons */}
      <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-4 shadow-card">
        <span className="text-xs font-semibold text-slate-400 block mb-2.5">
          Quick Case Study Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset(3500, 'Bakery Items')}
            className="px-3 py-1.5 text-xs font-medium bg-slate-950/80 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-700/50 rounded-lg transition-all"
          >
            🥖 Regional Bakery Hub (3.5k Tons)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(12000, 'Fruits & Vegetables')}
            className="px-3 py-1.5 text-xs font-medium bg-slate-950/80 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-700/50 rounded-lg transition-all"
          >
            🍎 Wholesale Fresh Produce (12k Tons)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(28000, 'Prepared Food')}
            className="px-3 py-1.5 text-xs font-medium bg-slate-950/80 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-700/50 rounded-lg transition-all"
          >
            🍱 Metro Foodservice & Hospitality (28k Tons)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(46000, 'Meat & Seafood')}
            className="px-3 py-1.5 text-xs font-medium bg-slate-950/80 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-700/50 rounded-lg transition-all"
          >
            🥩 National Cold Chain Supply (46k Tons)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs (5 cols on lg) */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleCalculate}
            className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl p-6 shadow-card space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Inference Parameters
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Ridge ML Model
              </span>
            </div>

            {/* Food Category */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Food Category
              </label>
              <div className="relative">
                <select
                  value={input.foodCategory}
                  onChange={(e) => {
                    const updated = { ...input, foodCategory: e.target.value };
                    setInput(updated);
                    setResult(predictFoodWasteLoss(updated));
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Country / Region
              </label>
              <select
                value={input.country}
                onChange={(e) => {
                  const updated = { ...input, country: e.target.value };
                  setInput(updated);
                  setResult(predictFoodWasteLoss(updated));
                }}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Waste (Tons) */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" /> Total Waste (Tons)
                </span>
                <span className="font-bold text-emerald-400 text-sm">
                  {input.totalWasteTons.toLocaleString()} Tons
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={250}
                value={input.totalWasteTons}
                onChange={(e) => {
                  const updated = { ...input, totalWasteTons: Number(e.target.value) };
                  setInput(updated);
                  setResult(predictFoodWasteLoss(updated));
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>500 Tons</span>
                <span>25,000 Tons</span>
                <span>50,000 Tons</span>
              </div>
            </div>

            {/* Household Waste Share (%) */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <Home className="w-3.5 h-3.5 text-emerald-400" /> Household Waste Share (%)
                </span>
                <span className="font-bold text-emerald-400 text-sm">
                  {input.householdWastePct}%
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={70}
                step={1}
                value={input.householdWastePct}
                onChange={(e) => {
                  const updated = { ...input, householdWastePct: Number(e.target.value) };
                  setInput(updated);
                  setResult(predictFoodWasteLoss(updated));
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Avg Waste per Capita (Kg) & Population (Million) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Waste / Capita (Kg)
                </label>
                <input
                  type="number"
                  min={20}
                  max={200}
                  value={input.avgWastePerCapitaKg}
                  onChange={(e) => {
                    const updated = { ...input, avgWastePerCapitaKg: Number(e.target.value) };
                    setInput(updated);
                    setResult(predictFoodWasteLoss(updated));
                  }}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Population (M)
                </label>
                <input
                  type="number"
                  min={10}
                  max={1400}
                  value={input.populationMillion}
                  onChange={(e) => {
                    const updated = { ...input, populationMillion: Number(e.target.value) };
                    setInput(updated);
                    setResult(predictFoodWasteLoss(updated));
                  }}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Recompute AI Prediction</span>
            </button>
          </form>
        </div>

        {/* Prediction Results & Impact (7 cols on lg) */}
        <div className="lg:col-span-7">
          <PredictionResult result={result} input={input} />
        </div>
      </div>
    </div>
  );
}
