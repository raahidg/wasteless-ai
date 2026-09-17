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
  TrendingUp,
  Award,
} from 'lucide-react';

export default function KPICards() {
  const { kpis, filteredRecords, records } = useData();

  const formatTons = (tons: number) => {
    if (tons >= 1_000_000) {
      return `${(tons / 1_000_000).toFixed(2)}M Tons`;
    }
    return `${tons.toLocaleString()} Tons`;
  };

  const formatCurrency = (millions: number) => {
    if (millions >= 1_000) {
      return `$${(millions / 1_000).toFixed(2)} Billion`;
    }
    return `$${millions.toLocaleString()} Million`;
  };

  const cards = [
    {
      title: 'Total Food Waste',
      value: formatTons(kpis.totalWasteTons),
      subtitle: `${filteredRecords.length.toLocaleString()} verified observations`,
      icon: Trash2,
      trend: 'Sum of real tonnage',
      accent: 'from-emerald-500/20 to-emerald-700/10',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Total Economic Loss',
      value: formatCurrency(kpis.totalEconomicLossMillion),
      subtitle: `~${kpis.totalWasteTons > 0 ? (kpis.totalEconomicLossMillion / kpis.totalWasteTons).toFixed(2) : 0} ratio per ton`,
      icon: DollarSign,
      trend: 'Direct supply loss',
      accent: 'from-amber-500/20 to-amber-700/10',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Avg Waste per Capita',
      value: `${kpis.avgWastePerCapitaKg} Kg`,
      subtitle: 'Annual per capita waste benchmark',
      icon: User,
      trend: 'Individual footprint',
      accent: 'from-teal-500/20 to-teal-700/10',
      border: 'border-teal-500/30',
      iconColor: 'text-teal-400',
    },
    {
      title: 'Household Waste Share',
      value: `${kpis.avgHouseholdWastePct}%`,
      subtitle: 'Post-consumer domestic proportion',
      icon: Home,
      trend: 'Dominant waste channel',
      accent: 'from-lime-500/20 to-lime-700/10',
      border: 'border-lime-500/30',
      iconColor: 'text-lime-400',
    },
    {
      title: 'Highest Waste Category',
      value: kpis.topCategory,
      subtitle: `Top country: ${kpis.topCountry}`,
      icon: UtensilsCrossed,
      trend: 'Primary loss sector',
      accent: 'from-cyan-500/20 to-cyan-700/10',
      border: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'CO₂e Carbon Impact',
      value: formatTons(kpis.carbonFootprintTons),
      subtitle: 'UNEP factor (2.5 kg CO₂e / kg)',
      icon: CloudRain,
      trend: 'GHG emission load',
      accent: 'from-emerald-600/20 to-forest-800/20',
      border: 'border-emerald-600/30',
      iconColor: 'text-emerald-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${card.accent} bg-slate-900/90 border ${card.border} shadow-card backdrop-blur-sm transition-all hover:-translate-y-0.5`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wide text-slate-300">
                {card.title}
              </span>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tight text-white truncate">
                {card.value}
              </h3>
              <p className="text-[11px] text-slate-400 truncate">
                {card.subtitle}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
              <span>{card.trend}</span>
              <span className="font-medium text-emerald-400">Verified</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
