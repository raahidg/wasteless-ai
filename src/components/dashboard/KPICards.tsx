'use client';

import React from 'react';
import { useData } from '@/context/DataContext';
import {
  Trash2,
  DollarSign,
  User,
  Home,
  UtensilsCrossed,
  CloudRain,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function KPICards() {
  const { kpis, filteredRecords } = useData();

  const formatTons = (tons: number) => {
    if (tons >= 1_000_000) {
      return `${(tons / 1_000_000).toFixed(2)}M`;
    }
    return tons.toLocaleString();
  };

  const formatCurrency = (millions: number) => {
    if (millions >= 1_000) {
      return `$${(millions / 1_000).toFixed(2)}B`;
    }
    return `$${millions.toLocaleString()}M`;
  };

  const cards = [
    {
      title: 'Total Food Waste',
      value: formatTons(kpis.totalWasteTons),
      unit: 'Metric Tons',
      subtitle: `${filteredRecords.length.toLocaleString()} verified observations`,
      icon: Trash2,
      accent: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15',
    },
    {
      title: 'Total Economic Loss',
      value: formatCurrency(kpis.totalEconomicLossMillion),
      unit: 'USD Equivalent',
      subtitle: `~$${kpis.totalWasteTons > 0 ? (kpis.totalEconomicLossMillion / kpis.totalWasteTons).toFixed(2) : 0} direct loss per ton`,
      icon: DollarSign,
      accent: 'from-amber-500/20 via-amber-600/10 to-transparent',
      borderColor: 'border-amber-500/30 hover:border-amber-400/60',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/15',
    },
    {
      title: 'Avg Waste / Capita',
      value: `${kpis.avgWastePerCapitaKg}`,
      unit: 'Kg / Person / Year',
      subtitle: 'Global per-person consumption discard',
      icon: User,
      accent: 'from-teal-500/20 via-teal-600/10 to-transparent',
      borderColor: 'border-teal-500/30 hover:border-teal-400/60',
      iconColor: 'text-teal-400',
      iconBg: 'bg-teal-500/15',
    },
    {
      title: 'Household Waste Share',
      value: `${kpis.avgHouseholdWastePct}%`,
      unit: 'Post-Consumer Share',
      subtitle: 'Domestic share across 20 countries',
      icon: Home,
      accent: 'from-lime-500/20 via-lime-600/10 to-transparent',
      borderColor: 'border-lime-500/30 hover:border-lime-400/60',
      iconColor: 'text-lime-400',
      iconBg: 'bg-lime-500/15',
    },
    {
      title: 'Highest-Loss Category',
      value: kpis.topCategory,
      unit: 'Primary Sector',
      subtitle: `Top country: ${kpis.topCountry}`,
      icon: UtensilsCrossed,
      accent: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
      borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15',
    },
    {
      title: 'CO₂e Carbon Footprint',
      value: formatTons(kpis.carbonFootprintTons),
      unit: 'Tons CO₂e',
      subtitle: 'UNEP Factor: 2.5 kg CO₂e / kg waste',
      icon: CloudRain,
      accent: 'from-emerald-600/20 via-forest-800/15 to-transparent',
      borderColor: 'border-emerald-600/30 hover:border-emerald-500/60',
      iconColor: 'text-emerald-300',
      iconBg: 'bg-emerald-600/15',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`group relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br ${card.accent} bg-slate-900/90 border ${card.borderColor} shadow-card hover:shadow-card-hover backdrop-blur-xl transition-all duration-300 hover:-translate-y-1`}
          >
            {/* Top Row: Icon & Tag */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors truncate">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-2xl ${card.iconBg} border border-white/5 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            {/* Metric Value */}
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  {card.value}
                </h3>
              </div>
              <p className="text-[10px] font-bold font-mono text-emerald-400 uppercase tracking-wide">
                {card.unit}
              </p>
            </div>

            {/* Subtitle / Footer */}
            <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate pr-1">{card.subtitle}</span>
              <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
