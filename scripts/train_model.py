import json
import shutil
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier
from sklearn.dummy import DummyRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
    accuracy_score,
    precision_recall_fscore_support
)

def main():
    csv_path = 'global_food_wastage_dataset.csv'
    print(f"Loading dataset from {csv_path}...")
    df = pd.read_csv(csv_path)

    total_records = len(df)
    missing_values = {k: int(v) for k, v in df.isnull().sum().to_dict().items()}
    duplicates = int(df.duplicated().sum())

    print(f"Loaded {total_records} records. Missing: {missing_values}, Duplicates: {duplicates}")

    df['id'] = range(1, total_records + 1)
    shutil.copyfile(csv_path, 'public/data/global_food_wastage_dataset.csv')

    features_num = ['Total Waste (Tons)', 'Avg Waste per Capita (Kg)', 'Population (Million)', 'Household Waste (%)', 'Year']
    features_cat = ['Country', 'Food Category']

    df_encoded = pd.get_dummies(df[features_num + features_cat], drop_first=True)
    feature_names = list(df_encoded.columns)
    
    X = df_encoded.values
    y = df['Economic Loss (Million $)'].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 1. Baseline
    dummy = DummyRegressor(strategy='mean')
    dummy.fit(X_train, y_train)
    y_pred_dummy = dummy.predict(X_test)
    dummy_mae = float(mean_absolute_error(y_test, y_pred_dummy))
    dummy_rmse = float(np.sqrt(mean_squared_error(y_test, y_pred_dummy)))
    dummy_r2 = float(r2_score(y_test, y_pred_dummy))

    # 2. Ridge Regression
    ridge = Ridge(alpha=1.0)
    ridge.fit(X_train, y_train)
    y_pred_ridge = ridge.predict(X_test)
    ridge_mae = float(mean_absolute_error(y_test, y_pred_ridge))
    ridge_rmse = float(np.sqrt(mean_squared_error(y_test, y_pred_ridge)))
    ridge_r2 = float(r2_score(y_test, y_pred_ridge))

    # 3. Random Forest
    rf = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
    rf.fit(X_train, y_train)
    y_pred_rf = rf.predict(X_test)
    rf_mae = float(mean_absolute_error(y_test, y_pred_rf))
    rf_rmse = float(np.sqrt(mean_squared_error(y_test, y_pred_rf)))
    rf_r2 = float(r2_score(y_test, y_pred_rf))

    coefficients = {feature_names[i]: float(ridge.coef_[i]) for i in range(len(feature_names))}
    intercept = float(ridge.intercept_)

    rf_importances = {feature_names[i]: float(rf.feature_importances_[i]) for i in range(len(feature_names))}
    sorted_importances = sorted(rf_importances.items(), key=lambda x: x[1], reverse=True)[:10]

    # Sample actual vs predicted
    sample_indices = np.random.RandomState(42).choice(len(y_test), size=min(100, len(y_test)), replace=False)
    actual_vs_pred = []
    for idx in sample_indices:
        actual_vs_pred.append({
            "actual": round(float(y_test[idx]), 2),
            "predicted": round(float(y_pred_ridge[idx]), 2),
            "baseline": round(float(y_pred_dummy[idx]), 2),
            "error": round(float(y_pred_ridge[idx] - y_test[idx]), 2),
            "pct_error": round(float(abs(y_pred_ridge[idx] - y_test[idx]) / y_test[idx] * 100), 2)
        })

    # Residuals
    residuals = y_pred_ridge - y_test
    res_hist, res_edges = np.histogram(residuals, bins=15)
    residual_distribution = [
        {"bin": f"{round(res_edges[i])} to {round(res_edges[i+1])}", "count": int(res_hist[i])}
        for i in range(len(res_hist))
    ]

    # Decision Tree classifier
    def classify_waste(tons):
        if tons < 17000:
            return 'Low'
        elif tons <= 33000:
            return 'Moderate'
        return 'High'

    y_class = df['Total Waste (Tons)'].apply(classify_waste).values
    X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(X, y_class, test_size=0.2, random_state=42)
    dt_clf = DecisionTreeClassifier(max_depth=4, random_state=42)
    dt_clf.fit(X_train_c, y_train_c)
    y_pred_c = dt_clf.predict(X_test_c)

    clf_acc = float(accuracy_score(y_test_c, y_pred_c))
    precision, recall, f1, _ = precision_recall_fscore_support(y_test_c, y_pred_c, average='weighted')

    model_artifacts = {
        "metadata": {
            "dataset_name": "global_food_wastage_dataset.csv",
            "total_records": total_records,
            "train_records": len(X_train),
            "test_records": len(X_test),
            "target_variable": "Economic Loss (Million $)",
            "target_unit": "Million USD ($)",
            "risk_target": "Waste Severity Risk (Low, Moderate, High)"
        },
        "regression_models": {
            "primary": {
                "name": "Ridge Regression (L2 Regularized)",
                "mae": round(ridge_mae, 2),
                "rmse": round(ridge_rmse, 2),
                "r2": round(ridge_r2, 4),
                "error_reduction_pct": round((1 - (ridge_mae / dummy_mae)) * 100, 1),
                "intercept": round(intercept, 4),
                "coefficients": coefficients
            },
            "random_forest": {
                "name": "Random Forest Regressor (100 Trees)",
                "mae": round(rf_mae, 2),
                "rmse": round(rf_rmse, 2),
                "r2": round(rf_r2, 4),
                "top_importances": [{"feature": k, "importance": round(v, 4)} for k, v in sorted_importances]
            },
            "baseline": {
                "name": "Dummy Regressor (Mean Baseline)",
                "mae": round(dummy_mae, 2),
                "rmse": round(dummy_rmse, 2),
                "r2": round(dummy_r2, 4),
                "mean_prediction": round(float(dummy.constant_[0][0]), 2)
            }
        },
        "classifier_model": {
            "name": "Decision Tree Risk Classifier",
            "accuracy": round(clf_acc, 4),
            "precision": round(float(precision), 4),
            "recall": round(float(recall), 4),
            "f1_score": round(float(f1), 4),
            "classes": ["Low (<17k Tons)", "Moderate (17k-33k Tons)", "High (>33k Tons)"]
        },
        "actual_vs_predicted_samples": actual_vs_pred,
        "residual_distribution": residual_distribution,
        "feature_names": feature_names,
        "categories": sorted(list(df['Food Category'].unique())),
        "countries": sorted(list(df['Country'].unique())),
        "years": sorted([int(y) for y in df['Year'].unique()]),
        "carbon_conversion_factors": {
            "note": "UNEP / FAO Greenhouse Gas Emission equivalents: average 2.5 kg CO2e per 1 kg food waste",
            "co2e_kg_per_kg_waste": 2.5
        }
    }

    with open('public/data/model_artifacts.json', 'w') as f:
        json.dump(model_artifacts, f, indent=2)
    print("Exported public/data/model_artifacts.json")

    dataset_records = []
    for _, row in df.iterrows():
        dataset_records.append({
            "id": int(row['id']),
            "country": str(row['Country']),
            "year": int(row['Year']),
            "foodCategory": str(row['Food Category']),
            "totalWasteTons": round(float(row['Total Waste (Tons)']), 2),
            "economicLossMillion": round(float(row['Economic Loss (Million $)']), 2),
            "avgWastePerCapitaKg": round(float(row['Avg Waste per Capita (Kg)']), 2),
            "populationMillion": round(float(row['Population (Million)']), 2),
            "householdWastePct": round(float(row['Household Waste (%)']), 2)
        })

    with open('public/data/dataset.json', 'w') as f:
        json.dump(dataset_records, f)
    print(f"Exported public/data/dataset.json with {len(dataset_records)} records.")

if __name__ == '__main__':
    main()
