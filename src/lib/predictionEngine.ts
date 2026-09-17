import { PredictionInput, PredictionOutput } from '@/types';
import artifacts from '../../public/data/model_artifacts.json';

const { primary, baseline } = artifacts.regression_models;
const coefficients = primary.coefficients as Record<string, number>;
const intercept = primary.intercept as number;
const rmse = primary.rmse as number;

export function predictFoodWasteLoss(input: PredictionInput): PredictionOutput {
  // 1. Calculate Base Prediction via trained Ridge Regression
  let score = intercept;

  // Numerical inputs
  score += (coefficients['Total Waste (Tons)'] || 1.0) * input.totalWasteTons;
  score += (coefficients['Avg Waste per Capita (Kg)'] || 0) * input.avgWastePerCapitaKg;
  score += (coefficients['Population (Million)'] || 0) * input.populationMillion;
  score += (coefficients['Household Waste (%)'] || 0) * input.householdWastePct;
  score += (coefficients['Year'] || 0) * input.year;

  // One-hot categorical inputs
  const countryKey = `Country_${input.country}`;
  if (coefficients[countryKey] !== undefined) {
    score += coefficients[countryKey];
  }

  const categoryKey = `Food Category_${input.foodCategory}`;
  if (coefficients[categoryKey] !== undefined) {
    score += coefficients[categoryKey];
  }

  // Ensure loss cannot be negative
  const predictedLoss = Math.max(0, Math.round(score * 100) / 100);

  // 95% Confidence Interval based on test set RMSE (1.96 * RMSE)
  // Clamp lower bound at 0
  const marginOfError = 1.96 * rmse;
  const lowerBound = Math.max(0, Math.round((predictedLoss - marginOfError) * 100) / 100);
  const upperBound = Math.round((predictedLoss + marginOfError) * 100) / 100;

  // Risk Classification
  let riskLevel: 'Low' | 'Moderate' | 'High' = 'Low';
  if (input.totalWasteTons > 33000) {
    riskLevel = 'High';
  } else if (input.totalWasteTons >= 17000) {
    riskLevel = 'Moderate';
  }

  // Environmental Impact Calculation (UNEP Food Waste Index standard: 2.5 kg CO2e / kg waste -> 2.5 tons CO2e / ton waste)
  const carbonEquivalentTons = Math.round(input.totalWasteTons * 2.5);
  // Average passenger vehicle emits ~4.6 tons CO2 / year (EPA standard)
  const carEquivalents = Math.round(carbonEquivalentTons / 4.6);
  // Urban tree absorbs ~22 kg CO2 / year = 0.022 tons / year
  const treeEquivalents = Math.round(carbonEquivalentTons / 0.022);

  // Feature contributions breakdown
  const contributions = [
    {
      name: 'Waste Volume Baseline',
      contribution: Math.round(input.totalWasteTons * (coefficients['Total Waste (Tons)'] || 1.0)),
      description: 'Primary driver: strong linear scaling with physical waste tonnage.',
    },
    {
      name: 'Food Category Premium',
      contribution: Math.round(coefficients[categoryKey] || 0),
      description: `Category-specific value density for ${input.foodCategory}.`,
    },
    {
      name: 'Country Regional Factor',
      contribution: Math.round(coefficients[countryKey] || 0),
      description: `Macroeconomic supply-chain adjustment for ${input.country}.`,
    },
    {
      name: 'Household & Demographics',
      contribution: Math.round(
        (coefficients['Avg Waste per Capita (Kg)'] || 0) * input.avgWastePerCapitaKg +
          (coefficients['Household Waste (%)'] || 0) * input.householdWastePct +
          (coefficients['Population (Million)'] || 0) * input.populationMillion
      ),
      description: 'Secondary consumption and population distribution effects.',
    },
  ];

  // Scenario Simulation (e.g. reduction potential)
  const tenPercentReduction = Math.round(predictedLoss * 0.1 * 100) / 100;
  const twentyFivePercentReduction = Math.round(predictedLoss * 0.25 * 100) / 100;
  const co2SavedTenPct = Math.round(carbonEquivalentTons * 0.1);

  return {
    predictedLossMillion: predictedLoss,
    lowerBoundMillion: lowerBound,
    upperBoundMillion: upperBound,
    riskLevel,
    carbonEquivalentTons,
    carEquivalents,
    treeEquivalents,
    featureContributions: contributions,
    scenarioSavings: {
      tenPercentReduction,
      twentyFivePercentReduction,
      co2SavedTenPct,
    },
  };
}

export function getModelMetadata() {
  return artifacts;
}
