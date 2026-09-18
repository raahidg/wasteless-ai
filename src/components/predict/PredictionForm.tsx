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
  Home,
  RotateCcw,
  Zap,
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

  const [result, setResult] = useState<PredictionOutput>(() =>
    predictFoodWasteLoss({
      country: countries[0] || 'USA',
      foodCategory: categories[0] || 'Fruits & Vegetables',
      totalWasteTons: 25000,
      avgWastePerCapitaKg: 109,
      populationMillion: 700,
      householdWastePct: 50,
      year: 2024,
    })
  );

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
      {/* Quick Scenario Archetypes */}
      <div className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-5 shadow-card backdrop-blur-xl">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          Industry Scenario Archetypes
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => applyPreset(3500, 'Bakery Items')}
            className="p-3 text-left rounded-2xl bg-slate-950/80 hover:bg-emerald-950/40 text-slate-300 hover:text-white border border-slate-800 hover:border-emerald-500/40 transition-all group"
          >
            <span className="text-base block mb-1">🥖</span>
            <span className="text-xs font-bold block group-hover:text-emerald-300">Regional Bakery</span>
            <span className="text-[10px] text-slate-500 font-mono">3,500 Tons • Fast staling</span>
          </button>

          <button
            type="button"
            onClick={() => applyPreset(12000, 'Fruits & Vegetables')}
            className="p-3 text-left rounded-2xl bg-slate-950/80 hover:bg-emerald-950/40 text-slate-300 hover:text-white border border-slate-800 hover:border-emerald-500/40 transition-all group"
          >
            <span className="text-base block mb-1">🥦</span>
            <span className="text-xs font-bold block group-hover:text-emerald-300">Fresh Produce</span>
            <span className="text-[10px] text-slate-500 font-mono">12,000 Tons • Perishable</span>
          </button>

          <button
            type="button"
            onClick={() => applyPreset(28000, 'Prepared Food')}
            className="p-3 text-left rounded-2xl bg-slate-950/80 hover:bg-emerald-950/40 text-slate-300 hover:text-white border border-slate-800 hover:border-emerald-500/40 transition-all group"
          >
            <span className="text-base block mb-1">🍱</span>
            <span className="text-xs font-bold block group-hover:text-emerald-300">Metro Foodservice</span>
            <span className="text-[10px] text-slate-500 font-mono">28,000 Tons • Daily scrap</span>
          </button>

          <button
            type="button"
            onClick={() => applyPreset(46000, 'Meat & Seafood')}
            className="p-3 text-left rounded-2xl bg-slate-950/80 hover:bg-emerald-950/40 text-slate-300 hover:text-white border border-slate-800 hover:border-emerald-500/40 transition-all group"
          >
            <span className="text-base block mb-1">🥩</span>
            <span className="text-xs font-bold block group-hover:text-emerald-300">Cold Chain Supply</span>
            <span className="text-[10px] text-slate-500 font-mono">46,000 Tons • High emission</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls Console (5 cols on lg) */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleCalculate}
            className="bg-slate-900/80 border border-emerald-500/20 rounded-3xl p-6 shadow-card backdrop-blur-xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Inference Parameters
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold font-mono">
                Ridge ML Model
              </span>
            </div>

            {/* Food Category Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Food Category
              </label>
              <select
                value={input.foodCategory}
                onChange={(e) => {
                  const updated = { ...input, foodCategory: e.target.value };
                  setInput(updated);
                  setResult(predictFoodWasteLoss(updated));
                }}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Sovereign Nation
              </label>
              <select
                value={input.country}
                onChange={(e) => {
                  const updated = { ...input, country: e.target.value };
                  setInput(updated);
                  setResult(predictFoodWasteLoss(updated));
                }}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Waste (Tons) Slider */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1 font-bold text-slate-300">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" /> Waste Volume
                </span>
                <span className="font-mono font-black text-emerald-400 text-sm">
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
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>500 T</span>
                <span>25k T</span>
                <span>50k T</span>
              </div>
            </div>

            {/* Household Share (%) Slider */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1 font-bold text-slate-300">
                  <Home className="w-3.5 h-3.5 text-emerald-400" /> Household Waste Share
                </span>
                <span className="font-mono font-black text-emerald-400 text-sm">
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

            {/* Waste per Capita & Population Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
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
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
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
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Recalculate AI Prediction</span>
            </button>
          </form>
        </div>

        {/* Prediction Results Cockpit (7 cols on lg) */}
        <div className="lg:col-span-7">
          <PredictionResult result={result} input={input} />
        </div>
      </div>
    </div>
  );
}
