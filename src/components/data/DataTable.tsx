'use client';

import React, { useState, useMemo } from 'react';
import { useData } from '@/context/DataContext';
import { FoodWasteRecord } from '@/types';
import { exportToCSV } from '@/lib/dataService';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Download,
  Eye,
  Search,
} from 'lucide-react';

export default function DataTable() {
  const { filteredRecords, setToastMessage } = useData();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Sorting state
  const [sortColumn, setSortColumn] = useState<keyof FoodWasteRecord>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    country: true,
    year: true,
    foodCategory: true,
    totalWasteTons: true,
    economicLossMillion: true,
    avgWastePerCapitaKg: true,
    populationMillion: true,
    householdWastePct: true,
  });

  const [colMenuOpen, setColMenuOpen] = useState(false);

  // Sorted records
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDirection === 'asc'
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number);
    });
  }, [filteredRecords, sortColumn, sortDirection]);

  // Paginated records
  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / pageSize));
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (col: keyof FoodWasteRecord) => {
    if (sortColumn === col) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(col);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleExport = () => {
    exportToCSV(filteredRecords, `food_waste_dataset_${filteredRecords.length}_rows.csv`);
    setToastMessage(`Exported ${filteredRecords.length} records as CSV.`);
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-900/30 rounded-2xl shadow-card overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-300">
            Showing{' '}
            <span className="text-emerald-400 font-bold">
              {Math.min(sortedRecords.length, (currentPage - 1) * pageSize + 1)}-
              {Math.min(sortedRecords.length, currentPage * pageSize)}
            </span>{' '}
            of <span className="text-white font-bold">{sortedRecords.length.toLocaleString()}</span> records
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Column Visibility Menu */}
          <div className="relative">
            <button
              onClick={() => setColMenuOpen(!colMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Columns</span>
            </button>
            {colMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-2xl z-30 space-y-1.5 text-xs">
                {Object.keys(visibleColumns).map((col) => (
                  <label key={col} className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={visibleColumns[col as keyof typeof visibleColumns]}
                      onChange={() =>
                        setVisibleColumns((prev) => ({
                          ...prev,
                          [col]: !prev[col as keyof typeof visibleColumns],
                        }))
                      }
                      className="accent-emerald-500 rounded"
                    />
                    <span className="capitalize">{col.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Page Size Selector */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 text-xs font-medium bg-slate-950/80 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value={15}>15 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto max-h-[600px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 bg-slate-950/95 backdrop-blur-md z-10 border-b border-slate-800 text-slate-400 font-semibold tracking-wider uppercase">
            <tr>
              {visibleColumns.id && (
                <th
                  onClick={() => handleSort('id')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    ID <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
              {visibleColumns.country && (
                <th
                  onClick={() => handleSort('country')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    Country <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
              {visibleColumns.year && (
                <th
                  onClick={() => handleSort('year')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    Year <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
              {visibleColumns.foodCategory && (
                <th
                  onClick={() => handleSort('foodCategory')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    Food Category <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
              {visibleColumns.totalWasteTons && (
                <th
                  onClick={() => handleSort('totalWasteTons')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    Waste (Tons) <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
              {visibleColumns.economicLossMillion && (
                <th
                  onClick={() => handleSort('economicLossMillion')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    Economic Loss ($M) <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
              {visibleColumns.avgWastePerCapitaKg && (
                <th
                  onClick={() => handleSort('avgWastePerCapitaKg')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    Waste/Capita (Kg) <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
              {visibleColumns.populationMillion && (
                <th
                  onClick={() => handleSort('populationMillion')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    Population (M) <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
              {visibleColumns.householdWastePct && (
                <th
                  onClick={() => handleSort('householdWastePct')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-400 select-none whitespace-nowrap text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    Household (%) <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
            {paginatedRecords.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                {visibleColumns.id && (
                  <td className="py-2.5 px-4 text-slate-500 font-sans">
                    #{row.id}
                  </td>
                )}
                {visibleColumns.country && (
                  <td className="py-2.5 px-4 font-sans font-medium text-white group-hover:text-emerald-300">
                    {row.country}
                  </td>
                )}
                {visibleColumns.year && (
                  <td className="py-2.5 px-4 text-slate-300">
                    {row.year}
                  </td>
                )}
                {visibleColumns.foodCategory && (
                  <td className="py-2.5 px-4 font-sans">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                      {row.foodCategory}
                    </span>
                  </td>
                )}
                {visibleColumns.totalWasteTons && (
                  <td className="py-2.5 px-4 text-right font-bold text-emerald-400">
                    {row.totalWasteTons.toLocaleString()}
                  </td>
                )}
                {visibleColumns.economicLossMillion && (
                  <td className="py-2.5 px-4 text-right font-bold text-amber-400">
                    ${row.economicLossMillion.toLocaleString()}
                  </td>
                )}
                {visibleColumns.avgWastePerCapitaKg && (
                  <td className="py-2.5 px-4 text-right">
                    {row.avgWastePerCapitaKg}
                  </td>
                )}
                {visibleColumns.populationMillion && (
                  <td className="py-2.5 px-4 text-right text-slate-400">
                    {row.populationMillion.toLocaleString()}
                  </td>
                )}
                {visibleColumns.householdWastePct && (
                  <td className="py-2.5 px-4 text-right text-slate-300">
                    {row.householdWastePct}%
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-400">
          Page <span className="font-bold text-white">{currentPage}</span> of{' '}
          <span className="font-bold text-white">{totalPages}</span>
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            title="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 text-xs font-semibold bg-emerald-950/70 border border-emerald-700/40 text-emerald-300 rounded-lg">
            {currentPage}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            title="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
