
# crime_model_trainer.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
import joblib
import os

def load_and_preprocess_data(filepath):
    df = pd.read_csv(filepath)

    # Drop rows with missing target or key features
    df = df.dropna(subset=["Arrest", "Primary Type", "Location Description", "Domestic", "Year"])

    # Select relevant features
    features = ["Primary Type", "Location Description", "Domestic", "Year"]
    target = "Arrest"
    df = df[features + [target]]

    # Encode categorical variables
    label_encoders = {}
    for col in ["Primary Type", "Location Description", "Domestic", "Arrest"]:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le

    return df, features, target, label_encoders

def train_model(df, features, target):
    X = df[features]
    y = df[target]

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train RandomForest model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

    return model

def save_model(model, encoders, model_path="crime_model.pkl", encoder_path="label_encoders.pkl"):
    joblib.dump(model, model_path)
    joblib.dump(encoders, encoder_path)
    print(f"Model saved as {model_path}")
    print(f"Encoders saved as {encoder_path}")

def main():
    # Path to your CSV file
    filepath = "Crimes_-_2001_to_Present.csv.csv"

    # Load and preprocess
    df, features, target, encoders = load_and_preprocess_data(filepath)

    # Train the model
    model = train_model(df, features, target)

    # Save the model and encoders
    save_model(model, encoders)

    # If running in Colab, enable download
    try:
        from google.colab import files
        files.download("crime_model.pkl")
        files.download("label_encoders.pkl")
    except ImportError:
        print("Download skipped (not running in Colab)")

if __name__ == "__main__":
    main()
