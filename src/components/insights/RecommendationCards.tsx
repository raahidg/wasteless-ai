'use client';

import React, { useState } from 'react';
import {
  Home,
  UtensilsCrossed,
  DollarSign,
  Users,
  ThermometerSnowflake,
  Wheat,
  TrendingDown,
  ArrowUpRight,
  Sparkles,
  Clock,
  Target,
} from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Household Post-Consumer Waste Reduction',
    domain: 'Consumer & Retail',
    phase: 'Immediate Quick-Win (0-90 Days)',
    pattern:
      'Household waste accounts for an average of 50.06% of all recorded food waste across all 20 countries, frequently peaking at 70% in high-loss observations.',
    metric: '50.06% Mean Domestic Share (~62.7M Tons aggregate dataset volume)',
    action:
      'Deploy consumer-facing meal planning applications, intelligent fridge inventory trackers, and dynamic "best-before" date education campaigns.',
    rationale:
      'WRAP and UNEP research indicates domestic post-consumer discard is heavily driven by over-purchasing and misinterpretation of date labels. Correcting consumer label comprehension significantly lowers domestic discard.',
    icon: Home,
    accent: 'from-emerald-500/15 via-emerald-600/5 to-transparent',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 2,
    title: 'Prepared Food & Fresh Produce Batch Tuning',
    domain: 'Hospitality',
    phase: 'Operational Shift (3-6 Months)',
    pattern:
      'Prepared foods and fresh produce represent the largest cumulative tonnage losses, driven by short shelf-lives and volatile daily footfall.',
    metric: 'Over 25,000 Tons average loss per observation; $25,035M mean economic impact',
    action:
      'Implement algorithmic daily demand forecasting based on reservation calendars, local weather, and foot-traffic analytics, coupled with same-day surplus redistribution platforms.',
    rationale:
      'Prepared foods degrade rapidly once cooked. Aligning preparation batch sizes to predicted diner counts eliminates prep surplus before it enters the disposal stream.',
    icon: UtensilsCrossed,
    accent: 'from-amber-500/15 via-amber-600/5 to-transparent',
    borderColor: 'border-amber-500/30 hover:border-amber-400/60',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    id: 3,
    title: 'Direct Supply Chain Internal Chargebacks',
    domain: 'Supply Chain & Logistics',
    phase: 'Structural Policy (6-12 Months)',
    pattern:
      'An extraordinarily tight linear correlation (r = 0.9745) links total physical waste with economic loss, demonstrating that tonnage directly dictates financial loss.',
    metric: 'Pearson r = 0.9745; ~$1.00 Million direct loss per 1,000 Tons wasted',
    action:
      'Establish internal waste chargeback mechanisms where facility operational budgets are directly debited for organic waste disposal rather than treating waste as general overhead.',
    rationale:
      'When waste is treated as general corporate overhead rather than a department-specific operational loss, facility managers lack urgency to optimize inventory rotations.',
    icon: DollarSign,
    accent: 'from-teal-500/15 via-teal-600/5 to-transparent',
    borderColor: 'border-teal-500/30 hover:border-teal-400/60',
    tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  },
  {
    id: 4,
    title: 'Targeting Upper-Quartile Per Capita Discarders',
    domain: 'Municipal Policy',
    phase: 'Policy Intervention (6-12 Months)',
    pattern:
      'Per capita waste distribution shows an upper quartile where individuals waste between 154.5 kg and 199.9 kg annually, more than double the lower quartile.',
    metric: 'Top 25% cohort wastes >154.5 Kg/capita/year (Max: 199.97 Kg)',
    action:
      'Introduce municipal Pay-As-You-Throw (PAYT) variable-rate collection policies and organic waste diversion mandates in high-density metropolitan zones.',
    rationale:
      'Economic signaling through unit-based pricing for municipal solid waste has historically driven a 15% to 28% reduction in organic waste sent to landfills.',
    icon: Users,
    accent: 'from-lime-500/15 via-lime-600/5 to-transparent',
    borderColor: 'border-lime-500/30 hover:border-lime-400/60',
    tagColor: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
  },
  {
    id: 5,
    title: 'Meat & Seafood Cold-Chain IoT Telematics',
    domain: 'Supply Chain & Logistics',
    phase: 'Technology Deployment (3-6 Months)',
    pattern:
      'Meat and seafood items exhibit high economic value and embodied greenhouse gas emissions per ton of waste across global logistics corridors.',
    metric: 'High economic intensity: $25,407M mean loss per observation',
    action:
      'Install IoT telematics sensors monitoring temperature, humidity, and vibration in refrigerated transport containers with automated threshold alerts.',
    rationale:
      'Cold-chain breaks are a leading cause of premature spoilage in animal proteins. Real-time alerts allow rerouting or expedited dispatch before bacterial loads exceed safety standards.',
    icon: ThermometerSnowflake,
    accent: 'from-cyan-500/15 via-cyan-600/5 to-transparent',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    id: 6,
    title: 'Bakery & Grains Rapid Dynamic Markdown Channels',
    domain: 'Consumer & Retail',
    phase: 'Immediate Quick-Win (0-90 Days)',
    pattern:
      'Grain and bakery products experience short commercial windows (typically 24 to 48 hours) before being discarded due to staling.',
    metric: 'Over 630 bakery records averaging 24,742 tons wasted per incident',
    action:
      'Integrate dynamic flash discounting platforms during the final 3 hours of business, partnered with local food rescue networks and anaerobic digestion facilities.',
    rationale:
      'Staling does not equal spoilage. Secondary discount channels recover residual financial value while redirecting safe calories to food-insecure households.',
    icon: Wheat,
    accent: 'from-emerald-500/15 via-emerald-600/5 to-transparent',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
];

const domains = [
  'All Domains',
  'Consumer & Retail',
  'Hospitality',
  'Supply Chain & Logistics',
  'Municipal Policy',
];

export default function RecommendationCards() {
  const [selectedDomain, setSelectedDomain] = useState('All Domains');

  const filtered =
    selectedDomain === 'All Domains'
      ? recommendations
      : recommendations.filter((r) => r.domain === selectedDomain);

  return (
    <div className="space-y-6">
      {/* Domain Filter Pills */}
      <div className="flex flex-wrap gap-2 pb-2">
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDomain(d)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDomain === d
                ? 'bg-emerald-500 text-white shadow-glow'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className={`bg-gradient-to-br ${rec.accent} bg-slate-900/90 border ${rec.borderColor} rounded-3xl p-6 sm:p-7 shadow-card hover:shadow-card-hover backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-5 group`}
            >
              <div className="space-y-4">
                {/* Header Row: Domain & Icon */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${rec.tagColor}`}>
                      {rec.domain}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {rec.phase}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-white/5 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {rec.title}
                </h4>

                {/* Empirical Pattern */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Observed Dataset Pattern:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rec.pattern}
                  </p>
                </div>

                {/* Metric Chip */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-900/40">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                    Supporting Dataset Metric:
                  </span>
                  <span className="text-xs font-bold text-white font-mono">
                    {rec.metric}
                  </span>
                </div>

                {/* Suggested Action */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                    Suggested Intervention:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rec.action}
                  </p>
                </div>
              </div>

              {/* Rationale Footer */}
              <div className="pt-3.5 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                <span className="font-bold text-slate-200">Operational Mechanism: </span>
                {rec.rationale}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
