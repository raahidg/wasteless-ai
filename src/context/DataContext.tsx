'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { FoodWasteRecord, FilterState } from '@/types';
import { filterDataset, computeKPIs } from '@/lib/dataService';
import initialDataset from '../../public/data/dataset.json';

interface DataContextType {
  records: FoodWasteRecord[];
  filteredRecords: FoodWasteRecord[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  kpis: ReturnType<typeof computeKPIs>;
  allCountries: string[];
  allCategories: string[];
  yearBounds: [number, number];
  wasteBounds: [number, number];
  isCustomDataLoaded: boolean;
  loadCustomCSV: (file: File) => Promise<boolean>;
  resetToOriginalData: () => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const initialFilters: FilterState = {
  countries: [],
  categories: [],
  yearMin: 2018,
  yearMax: 2024,
  wasteMin: 0,
  wasteMax: 50000,
  searchQuery: '',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<FoodWasteRecord[]>(initialDataset as FoodWasteRecord[]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isCustomDataLoaded, setIsCustomDataLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast after 3.5s
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const allCountries = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.country))).sort();
  }, [records]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.foodCategory))).sort();
  }, [records]);

  const yearBounds = useMemo<[number, number]>(() => {
    if (records.length === 0) return [2018, 2024];
    const years = records.map((r) => r.year);
    return [Math.min(...years), Math.max(...years)];
  }, [records]);

  const wasteBounds = useMemo<[number, number]>(() => {
    if (records.length === 0) return [0, 50000];
    const wastes = records.map((r) => r.totalWasteTons);
    return [Math.floor(Math.min(...wastes)), Math.ceil(Math.max(...wastes))];
  }, [records]);

  const filteredRecords = useMemo(() => {
    return filterDataset(records, filters);
  }, [records, filters]);

  const kpis = useMemo(() => {
    return computeKPIs(filteredRecords);
  }, [filteredRecords]);

  const resetFilters = () => {
    setFilters({
      ...initialFilters,
      yearMin: yearBounds[0],
      yearMax: yearBounds[1],
      wasteMin: wasteBounds[0],
      wasteMax: wasteBounds[1],
    });
    setToastMessage('Filters reset to default values.');
  };

  const resetToOriginalData = () => {
    setRecords(initialDataset as FoodWasteRecord[]);
    setIsCustomDataLoaded(false);
    resetFilters();
    setToastMessage('Reset back to original 5,000-record dataset.');
  };

  const loadCustomCSV = async (file: File): Promise<boolean> => {
    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        throw new Error('CSV file has insufficient rows.');
      }

      const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
      const requiredColumns = [
        'Country',
        'Year',
        'Food Category',
        'Total Waste (Tons)',
        'Economic Loss (Million $)',
        'Avg Waste per Capita (Kg)',
        'Population (Million)',
        'Household Waste (%)',
      ];

      const hasAll = requiredColumns.every((col) =>
        headers.some((h) => h.toLowerCase() === col.toLowerCase())
      );

      if (!hasAll) {
        setToastMessage(`CSV missing required columns. Expected: ${requiredColumns.join(', ')}`);
        return false;
      }

      const parsedRecords: FoodWasteRecord[] = [];
      for (let i = 1; i < lines.length; i++) {
        // basic CSV row parsing handling quotes
        const match = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if (!match || match.length < 8) continue;
        const vals = match.map((m) => m.replace(/^"|"$/g, '').trim());

        parsedRecords.push({
          id: i,
          country: vals[0],
          year: parseInt(vals[1], 10) || 2024,
          foodCategory: vals[2],
          totalWasteTons: parseFloat(vals[3]) || 0,
          economicLossMillion: parseFloat(vals[4]) || 0,
          avgWastePerCapitaKg: parseFloat(vals[5]) || 0,
          populationMillion: parseFloat(vals[6]) || 0,
          householdWastePct: parseFloat(vals[7]) || 0,
        });
      }

      if (parsedRecords.length === 0) {
        setToastMessage('No valid records parsed from CSV.');
        return false;
      }

      setRecords(parsedRecords);
      setIsCustomDataLoaded(true);
      resetFilters();
      setToastMessage(`Successfully loaded ${parsedRecords.length} records from custom CSV!`);
      return true;
    } catch (err: any) {
      setToastMessage(`Error reading CSV: ${err.message}`);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        records,
        filteredRecords,
        filters,
        setFilters,
        resetFilters,
        kpis,
        allCountries,
        allCategories,
        yearBounds,
        wasteBounds,
        isCustomDataLoaded,
        loadCustomCSV,
        resetToOriginalData,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
