import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import KPICards from '@/components/dashboard/KPICards';
import DashboardCharts from '@/components/dashboard/Charts';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Dynamic Multi-Filter Bar */}
      <FilterBar />

      {/* Real Calculated KPI Metric Cards */}
      <KPICards />

      {/* Real Data Recharts Visualizations */}
      <DashboardCharts />
    </div>
  );
}
