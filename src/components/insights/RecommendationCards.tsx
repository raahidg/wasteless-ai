'use client';

import React from 'react';
import {
  Home,
  UtensilsCrossed,
  DollarSign,
  Users,
  ThermometerSnowflake,
  Wheat,
  TrendingDown,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Household Post-Consumer Waste Reduction',
    category: 'Consumer Behavior & Retail',
    pattern:
      'Household waste accounts for an average of 50.06% of all recorded food waste across all 20 countries, frequently peaking at 70% in high-loss records.',
    metric: '50.06% Mean Domestic Share (~62.7M Tons aggregate dataset volume)',
    action:
      'Deploy consumer-facing meal planning applications, intelligent fridge inventory trackers, and dynamic "best-before" date education campaigns.',
    rationale:
      'WRAP and UNEP studies show that domestic post-consumer discard is heavily driven by over-purchasing and misinterpretation of date labels. Correcting label comprehension can significantly lower domestic waste.',
    icon: Home,
    color: 'emerald',
  },
  {
    id: 2,
    title: 'Prepared Food & Fresh Produce Demand Balancing',
    category: 'Hospitality & Wholesale',
    pattern:
      'Prepared foods and fresh produce represent the largest cumulative tonnage losses, driven by short shelf-lives and volatile daily demand.',
    metric: 'Over 25,000 Tons average loss per observation; $25,035M mean economic impact',
    action:
      'Implement algorithmic daily demand forecasting based on reservations, weather, and foot-traffic analytics, coupled with same-day surplus redistribution platforms.',
    rationale:
      'Prepared foods degrade rapidly once cooked. Aligning production batch sizes to predicted diner counts eliminates prep surplus before it enters the disposal stream.',
    icon: UtensilsCrossed,
    color: 'amber',
  },
  {
    id: 3,
    title: 'Direct Supply Chain Economic Accountability',
    category: 'Supply Chain Operations',
    pattern:
      'An extraordinarily tight linear correlation (r = 0.9745) links total physical waste with economic loss, demonstrating that tonnage directly dictates financial loss.',
    metric: 'Pearson r = 0.9745; ~$1.00 Million direct loss per 1,000 Tons wasted',
    action:
      'Establish granular internal waste chargeback mechanisms where facility operational budgets are directly debited for organic waste disposal.',
    rationale:
      'When waste is treated as an overhead line-item rather than a department-specific operational loss, facility managers lack urgency to optimize inventory rotations.',
    icon: DollarSign,
    color: 'teal',
  },
  {
    id: 4,
    title: 'Targeting Upper-Quartile Per Capita Discarders',
    category: 'Municipal Policy',
    pattern:
      'Per capita waste distribution shows an upper quartile where individuals waste between 154.5 kg and 199.9 kg annually, more than double the lower quartile.',
    metric: 'Top 25% cohort wastes >154.5 Kg/capita/year (Max: 199.97 Kg)',
    action:
      'Introduce municipal Pay-As-You-Throw (PAYT) variable-rate collection policies and organic waste diversion mandates in high-density urban areas.',
    rationale:
      'Economic signaling through unit-based pricing for municipal solid waste has historically driven a 15% to 28% reduction in organic waste sent to landfills.',
    icon: Users,
    color: 'lime',
  },
  {
    id: 5,
    title: 'Meat & Seafood Cold-Chain Integrity Monitoring',
    category: 'Logistics & Storage',
    pattern:
      'Meat and seafood items exhibit high economic value and embodied greenhouse gas emissions per ton of waste across global logistics routes.',
    metric: 'High economic intensity: $25,407M mean loss per observation',
    action:
      'Install IoT telematics sensors monitoring temperature, humidity, and vibration in refrigerated transport containers with automated threshold alerts.',
    rationale:
      'Cold-chain breaks are a leading cause of premature spoilage in animal proteins. Real-time alerts allow rerouting or expedited dispatch before bacterial loads exceed safety standards.',
    icon: ThermometerSnowflake,
    color: 'cyan',
  },
  {
    id: 6,
    title: 'Bakery & Grains Rapid Redistribution Channels',
    category: 'Retail & Processing',
    pattern:
      'Grain and bakery products experience short commercial windows (typically 24 to 48 hours) before being discarded due to staling.',
    metric: 'Over 630 bakery records averaging 24,742 tons wasted per incident',
    action:
      'Integrate dynamic flash discounting platforms during the final 3 hours of business, partnered with local food rescue networks and anaerobic digestion facilities.',
    rationale:
      'Staling does not equal spoilage. Secondary discount channels recover residual financial value while redirecting safe calories to food-insecure households.',
    icon: Wheat,
    color: 'emerald',
  },
];

export default function RecommendationCards() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">
            Targeted Waste Reduction Interventions
          </h3>
          <p className="text-xs text-slate-400">
            Formulated from empirical patterns identified across the 5,000 dataset records
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className="bg-slate-900/90 border border-emerald-900/30 hover:border-emerald-700/50 rounded-2xl p-6 shadow-card transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Category & Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    {rec.category}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 text-emerald-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {rec.title}
                </h4>

                {/* Pattern */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Observed Dataset Pattern:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rec.pattern}
                  </p>
                </div>

                {/* Metric */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-900/40">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                    Supporting Dataset Metric:
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {rec.metric}
                  </span>
                </div>

                {/* Action */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                    Suggested Intervention:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rec.action}
                  </p>
                </div>
              </div>

              {/* Rationale */}
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 italic leading-relaxed">
                <span className="font-semibold text-slate-300 not-italic">Mechanism: </span>
                {rec.rationale}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
