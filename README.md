# WasteLess AI — Smart Food Waste Prediction & Prevention System

> **A Production-Grade Academic & Analytical Web Application for Global Food Waste Intelligence, Econometric Loss Forecasting, and Evidence-Based Intervention Strategies.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.4-orange?style=flat&logo=scikit-learn)](https://scikit-learn.org/)
[![Vercel Compatible](https://img.shields.io/badge/Deployment-Vercel%20Ready-success?style=flat&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 1. Executive Summary & UN SDG 12.3 Context

Food loss and waste is one of the most critical socio-economic and ecological challenges of the modern era. According to the **United Nations Environment Programme (UNEP)**, roughly one-third of all food produced for human consumption is lost or wasted globally, generating 8–10% of global greenhouse gas emissions and exceeding \$1 Trillion in economic losses annually.

**WasteLess AI** addresses **United Nations Sustainable Development Goal 12.3** (*"Halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains by 2030"*). The platform provides an empirical analytics dashboard, a regularized machine learning loss forecasting engine, and targeted intervention strategies grounded strictly in **5,000 verified observations** from `global_food_wastage_dataset.csv`.

---

## 2. Key Capabilities & System Features

### 📊 Real-Time Empirical Analytics Dashboard
- **Dynamic Multi-Dimensional Filters:** Filter simultaneously across 20 countries, 8 food categories, temporal range (2018–2024), and waste tonnage intervals.
- **Genuine KPI Computation:** Real calculated metrics including Total Waste Tonnage, Direct Economic Loss, Average Waste per Capita, Domestic Household Share, and UNEP-standard Greenhouse Gas emission equivalents.
- **Interactive Visualizations (Recharts):**
  - Annual Waste & Loss Trajectory (2018–2024 Composed Line/Bar Chart)
  - Category-wise Distribution Breakdown
  - Top 8 Country Loss Rankings
  - Domestic Household vs. Commercial Supply-Chain Split
  - Empirical Linear Correlation Plot ($r = 0.9745$)
  - Per-Capita Discard Histogram

### 🧠 AI Food Waste & Economic Loss Predictor
- **Ridge Regression Inference Engine:** Evaluates mathematically optimized weights in under 1 millisecond at the edge.
- **Statistical Confidence Intervals:** Displays true $\pm 1.96 \times \text{RMSE}$ empirical boundaries derived from a holdout test partition.
- **Environmental Equivalency Calculator:** Translates food tonnage into metric tons of $\text{CO}_2e$, passenger vehicles taken off the road for a year, and urban tree seedling sequestration requirements.
- **Scenario Simulation Engine:** Interactive reduction slider allowing facility managers to project cost and emission savings for $5\%$ to $50\%$ target waste cuts.

### 💡 Waste Insights & Evidence-Based Interventions
- Six structured operational recommendations directly linking observed dataset characteristics (e.g. household post-consumer waste dominance at 50.06%, perishable prepared food turnover, cold-chain vulnerabilities) to proven reduction mechanisms.

### 🔍 Comprehensive Dataset Explorer
- Searchable, sortable, paginated data grid (15/25/50/100 records per page).
- Column visibility selector and instant CSV download for filtered records.
- Custom CSV drag-and-drop uploader with automated schema verification.

### 📈 Machine Learning Benchmarking & Academic Critique
- Rigorous comparative analysis: **Primary Ridge Model ($R^2 = 0.9504$, MAE = \$2,534M)** vs. **Random Forest ($R^2 = 0.9468$)** vs. **Mean Baseline ($R^2 = -0.0004$, MAE = \$12,994M)**.
- Actual vs. Predicted scatter plot on 100 test samples.
- Zero-centered residual error distribution confirming Gauss-Markov homoscedasticity.
- Gini feature importance chart.
- Honest academic critique detailing dataset characteristics, limitations, and requirements for localized canteen-level forecasting.

### 🎓 Academic Presentation Mode
- Built-in slide-deck presentation mode designed for faculty defense, capstone evaluations, and technical seminars.

---

## 3. Dataset Inspection & Technical Summary

The application operates on `global_food_wastage_dataset.csv`:

| Column | Type | Null Count | Summary / Range |
|---|---|---|---|
| **Country** | string | 0 (0%) | 20 Sovereign Nations across 6 continents |
| **Year** | int64 | 0 (0%) | 2018 to 2024 (7 calendar years) |
| **Food Category** | string | 0 (0%) | 8 Classes (Fruits & Veg, Prepared Food, Dairy, etc.) |
| **Total Waste (Tons)** | float64 | 0 (0%) | 502.61 to 49,990.76 Tons (Mean: 25,061.78 Tons) |
| **Economic Loss (Million $)** | float64 | 0 (0%) | \$406.69M to \$59,228.93M (Mean: \$25,039.70M) |
| **Avg Waste per Capita (Kg)** | float64 | 0 (0%) | 20.09 to 199.97 Kg (Mean: 109.46 Kg) |
| **Population (Million)** | float64 | 0 (0%) | 11.29 to 1,399.97M (Mean: 706.61M) |
| **Household Waste (%)** | float64 | 0 (0%) | 30.02% to 70.00% (Mean: 50.06%) |

---

## 4. Machine Learning Pipeline & Metrics

Supervised regression target: **`Economic Loss (Million $)`**  
Partition: **80% Training (4,000 samples) / 20% Testing (1,000 samples)** with fixed seed `42`.

### Empirical Evaluation on Holdout Test Partition:

$$\text{Error Reduction} = \left(1 - \frac{\text{MAE}_{\text{Ridge}}}{\text{MAE}_{\text{Baseline}}}\right) \times 100\% = \mathbf{80.5\%}$$

| Model Name | $R^2$ Score | MAE (Million \$) | RMSE (Million \$) | Characteristics |
|---|---|---|---|---|
| **Primary Ridge Regression** | **0.9504** | **\$2,534.32M** | **\$3,358.45M** | **Selected Model: 80.5% error reduction** |
| Random Forest (100 Trees) | 0.9468 | \$2,590.39M | \$3,479.44M | Non-linear ensemble comparison |
| Dummy Regressor (Mean) | -0.0004 | \$12,994.36M | \$15,082.13M | Naive baseline benchmark |

---

## 5. Technology Stack & Architecture

```
                                  ┌───────────────────────────────┐
                                  │ global_food_wastage_dataset   │
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │ scripts/train_model.py (Python)│
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                          ┌──────────────────────────────────────────────┐
                          │ public/data/model_artifacts.json & dataset   │
                          └──────────────────────┬───────────────────────┘
                                                 │
                                                 ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Next.js 14 (App Router) + TypeScript + Tailwind CSS (Vercel Serverless Ready)                  │
├───────────────────┬──────────────────────┬─────────────────────────────┬───────────────────────┤
│ / (Dashboard)     │ /predict (AI Engine) │ /insights (Interventions)   │ /data-explorer (Grid) │
│ - Filter Context  │ - Ridge Inference    │ - Pattern to Mechanism      │ - Column Selector     │
│ - Real CSV KPIs   │ - Confidence Bounds  │ - Empirical Metrics         │ - Search & Pagination │
│ - Recharts SVGs   │ - Carbon Equivalent  │ - Operational Strategies    │ - Custom CSV Upload   │
└───────────────────┴──────────────────────┴─────────────────────────────┴───────────────────────┘
```

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Visualization:** Recharts SVG composables, Lucide React icons
- **Data Science:** Python 3, scikit-learn, pandas, NumPy
- **Deployment Runtime:** Vercel Edge / Serverless Compatible (zero-latency in-browser TypeScript inference eliminating fragile server dependencies)

---

## 6. Installation & Local Development

### Prerequisites
- **Node.js**: v18.17+ or v20+
- **Python**: 3.9+ (optional, only needed if re-training ML models)

### Step 1: Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/wasteless-ai.git
cd wasteless-ai
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: (Optional) Retrain ML Pipeline
To regenerate `model_artifacts.json` and `dataset.json`:
```bash
python scripts/train_model.py
```

### Step 5: Run Production Build Test
```bash
npm run build
npm run start
```

---

## 7. Vercel Deployment Instructions

WasteLess AI is architected specifically for zero-configuration, native Vercel deployment:

1. Push your code to GitHub (see Section 8).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and select `wasteless-ai`.
4. Framework Preset: **Next.js** (automatically detected).
5. Build Command: `next build` (default).
6. Output Directory: `.next` (default).
7. Environment Variables: *None required* (zero external API keys needed).
8. Click **"Deploy"**.
9. Once deployed, Vercel will provide your live URL (e.g. `https://wasteless-ai.vercel.app`).

---

## 8. Academic Project Disclaimer

This project is developed as an academic software engineering and data science project. All metrics and figures are grounded in empirical observations from `global_food_wastage_dataset.csv`. Environmental conversions follow standard guidelines published by the United Nations Environment Programme (UNEP) Food Waste Index.

---

## 9. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
