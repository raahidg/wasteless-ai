import { FoodWasteRecord, FilterState } from '@/types';

export function filterDataset(records: FoodWasteRecord[], filters: FilterState): FoodWasteRecord[] {
  return records.filter((r) => {
    // Country filter
    if (filters.countries.length > 0 && !filters.countries.includes(r.country)) {
      return false;
    }
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(r.foodCategory)) {
      return false;
    }
    // Year range
    if (r.year < filters.yearMin || r.year > filters.yearMax) {
      return false;
    }
    // Waste range
    if (r.totalWasteTons < filters.wasteMin || r.totalWasteTons > filters.wasteMax) {
      return false;
    }
    // Search query
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const match =
        r.country.toLowerCase().includes(q) ||
        r.foodCategory.toLowerCase().includes(q) ||
        r.year.toString().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

export function computeKPIs(records: FoodWasteRecord[]) {
  if (records.length === 0) {
    return {
      totalWasteTons: 0,
      totalEconomicLossMillion: 0,
      avgWastePerCapitaKg: 0,
      avgHouseholdWastePct: 0,
      recordsCount: 0,
      topCategory: 'N/A',
      topCountry: 'N/A',
      carbonFootprintTons: 0,
    };
  }

  let totalWaste = 0;
  let totalLoss = 0;
  let totalCapita = 0;
  let totalHousehold = 0;

  const categoryMap: Record<string, number> = {};
  const countryMap: Record<string, number> = {};

  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    totalWaste += r.totalWasteTons;
    totalLoss += r.economicLossMillion;
    totalCapita += r.avgWastePerCapitaKg;
    totalHousehold += r.householdWastePct;

    categoryMap[r.foodCategory] = (categoryMap[r.foodCategory] || 0) + r.totalWasteTons;
    countryMap[r.country] = (countryMap[r.country] || 0) + r.totalWasteTons;
  }

  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const topCountry = Object.entries(countryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // UNEP factor: 2.5 kg CO2e per kg food waste -> 2.5 tons CO2e per ton waste
  const carbonFootprintTons = totalWaste * 2.5;

  return {
    totalWasteTons: Math.round(totalWaste),
    totalEconomicLossMillion: Math.round(totalLoss),
    avgWastePerCapitaKg: +(totalCapita / records.length).toFixed(2),
    avgHouseholdWastePct: +(totalHousehold / records.length).toFixed(2),
    recordsCount: records.length,
    topCategory,
    topCountry,
    carbonFootprintTons: Math.round(carbonFootprintTons),
  };
}

export function getTrendData(records: FoodWasteRecord[]) {
  const yearsMap: Record<number, { waste: number; loss: number; count: number }> = {};

  for (const r of records) {
    if (!yearsMap[r.year]) {
      yearsMap[r.year] = { waste: 0, loss: 0, count: 0 };
    }
    yearsMap[r.year].waste += r.totalWasteTons;
    yearsMap[r.year].loss += r.economicLossMillion;
    yearsMap[r.year].count += 1;
  }

  return Object.keys(yearsMap)
    .map(Number)
    .sort((a, b) => a - b)
    .map((year) => ({
      year: year.toString(),
      totalWasteTons: Math.round(yearsMap[year].waste),
      economicLossMillion: Math.round(yearsMap[year].loss),
      avgWaste: Math.round(yearsMap[year].waste / yearsMap[year].count),
    }));
}

export function getCategoryData(records: FoodWasteRecord[]) {
  const catMap: Record<string, { waste: number; loss: number; count: number }> = {};

  for (const r of records) {
    if (!catMap[r.foodCategory]) {
      catMap[r.foodCategory] = { waste: 0, loss: 0, count: 0 };
    }
    catMap[r.foodCategory].waste += r.totalWasteTons;
    catMap[r.foodCategory].loss += r.economicLossMillion;
    catMap[r.foodCategory].count += 1;
  }

  return Object.entries(catMap)
    .map(([category, data]) => ({
      category,
      totalWasteTons: Math.round(data.waste),
      economicLossMillion: Math.round(data.loss),
      avgLossPerTon: +(data.loss / (data.waste || 1)).toFixed(2),
    }))
    .sort((a, b) => b.totalWasteTons - a.totalWasteTons);
}

export function getCountryData(records: FoodWasteRecord[], topN = 10) {
  const countryMap: Record<string, { waste: number; loss: number }> = {};

  for (const r of records) {
    if (!countryMap[r.country]) {
      countryMap[r.country] = { waste: 0, loss: 0 };
    }
    countryMap[r.country].waste += r.totalWasteTons;
    countryMap[r.country].loss += r.economicLossMillion;
  }

  return Object.entries(countryMap)
    .map(([country, data]) => ({
      country,
      totalWasteTons: Math.round(data.waste),
      economicLossMillion: Math.round(data.loss),
    }))
    .sort((a, b) => b.totalWasteTons - a.totalWasteTons)
    .slice(0, topN);
}

export function getHouseholdSplitData(records: FoodWasteRecord[]) {
  let totalHouseholdTons = 0;
  let totalSupplyChainTons = 0;

  for (const r of records) {
    const hhTons = r.totalWasteTons * (r.householdWastePct / 100);
    const scTons = r.totalWasteTons - hhTons;
    totalHouseholdTons += hhTons;
    totalSupplyChainTons += scTons;
  }

  return [
    { name: 'Household Waste', value: Math.round(totalHouseholdTons), color: '#10b981' },
    { name: 'Supply Chain & Commercial', value: Math.round(totalSupplyChainTons), color: '#047857' },
  ];
}

export function getCorrelationScatterData(records: FoodWasteRecord[], maxPoints = 120) {
  const step = Math.max(1, Math.floor(records.length / maxPoints));
  const samples: Array<{ waste: number; loss: number; category: string; country: string }> = [];

  for (let i = 0; i < records.length && samples.length < maxPoints; i += step) {
    samples.push({
      waste: records[i].totalWasteTons,
      loss: records[i].economicLossMillion,
      category: records[i].foodCategory,
      country: records[i].country,
    });
  }

  return samples;
}

export function getCapitaHistogram(records: FoodWasteRecord[]) {
  const bins = [
    { label: '20-50 kg', min: 20, max: 50, count: 0 },
    { label: '50-80 kg', min: 50, max: 80, count: 0 },
    { label: '80-110 kg', min: 80, max: 110, count: 0 },
    { label: '110-140 kg', min: 110, max: 140, count: 0 },
    { label: '140-170 kg', min: 140, max: 170, count: 0 },
    { label: '170-200 kg', min: 170, max: 201, count: 0 },
  ];

  for (const r of records) {
    for (const b of bins) {
      if (r.avgWastePerCapitaKg >= b.min && r.avgWastePerCapitaKg < b.max) {
        b.count += 1;
        break;
      }
    }
  }

  return bins.map((b) => ({ range: b.label, count: b.count }));
}

export function exportToCSV(records: FoodWasteRecord[], filename = 'filtered_food_wastage.csv') {
  const headers = [
    'Country',
    'Year',
    'Food Category',
    'Total Waste (Tons)',
    'Economic Loss (Million $)',
    'Avg Waste per Capita (Kg)',
    'Population (Million)',
    'Household Waste (%)',
  ];

  const rows = records.map((r) => [
    `"${r.country}"`,
    r.year,
    `"${r.foodCategory}"`,
    r.totalWasteTons,
    r.economicLossMillion,
    r.avgWastePerCapitaKg,
    r.populationMillion,
    r.householdWastePct,
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
