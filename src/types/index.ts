export interface FoodWasteRecord {
  id: number;
  country: string;
  year: number;
  foodCategory: string;
  totalWasteTons: number;
  economicLossMillion: number;
  avgWastePerCapitaKg: number;
  populationMillion: number;
  householdWastePct: number;
}

export interface FilterState {
  countries: string[];
  categories: string[];
  yearMin: number;
  yearMax: number;
  wasteMin: number;
  wasteMax: number;
  searchQuery: string;
}

export interface ModelMetadata {
  dataset_name: string;
  total_records: number;
  train_records: number;
  test_records: number;
  target_variable: string;
  target_unit: string;
  risk_target: string;
}

export interface RegressionModelMetrics {
  name: string;
  mae: number;
  rmse: number;
  r2: number;
  error_reduction_pct?: number;
  intercept?: number;
  coefficients?: Record<string, number>;
  top_importances?: Array<{ feature: string; importance: number }>;
  mean_prediction?: number;
}

export interface ClassifierModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  classes: string[];
}

export interface ActualVsPredictedPoint {
  actual: number;
  predicted: number;
  baseline: number;
  error: number;
  pct_error: number;
}

export interface ResidualBin {
  bin: string;
  count: number;
}

export interface ModelArtifacts {
  metadata: ModelMetadata;
  regression_models: {
    primary: RegressionModelMetrics;
    random_forest: RegressionModelMetrics;
    baseline: RegressionModelMetrics;
  };
  classifier_model: ClassifierModelMetrics;
  actual_vs_predicted_samples: ActualVsPredictedPoint[];
  residual_distribution: ResidualBin[];
  feature_names: string[];
  categories: string[];
  countries: string[];
  years: number[];
  carbon_conversion_factors: {
    note: string;
    co2e_kg_per_kg_waste: number;
  };
}

export interface PredictionInput {
  country: string;
  foodCategory: string;
  totalWasteTons: number;
  avgWastePerCapitaKg: number;
  populationMillion: number;
  householdWastePct: number;
  year: number;
}

export interface PredictionOutput {
  predictedLossMillion: number;
  lowerBoundMillion: number;
  upperBoundMillion: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  carbonEquivalentTons: number;
  carEquivalents: number;
  treeEquivalents: number;
  featureContributions: Array<{ name: string; contribution: number; description: string }>;
  scenarioSavings?: {
    tenPercentReduction: number;
    twentyFivePercentReduction: number;
    co2SavedTenPct: number;
  };
}
