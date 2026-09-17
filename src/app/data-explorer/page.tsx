import React from 'react';
import DatasetStats from '@/components/data/DatasetStats';
import DataTable from '@/components/data/DataTable';
import FilterBar from '@/components/dashboard/FilterBar';

export default function DataExplorerPage() {
  return (
    <div className="space-y-6">
      {/* High-level Data Summary & Uploader */}
      <DatasetStats />

      {/* Filter Bar */}
      <FilterBar />

      {/* Full Paginated, Searchable, Sortable Table */}
      <DataTable />
    </div>
  );
}
