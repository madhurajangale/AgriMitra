from flask import Flask, request, jsonify
from joblib import load
import pandas as pd

app = Flask(__name__)

# Load the model and preprocessing objects
model = load('commodity_price_model.pkl')
scaler = load('scaler.pkl')
le_dict = load('label_encoders.pkl')

# Load your CSV once at startup
commodities_df = pd.read_csv('Price_Agriculture_commodities_Week.csv')

@app.route('/')
def home():
    return "✅ Crop Price Prediction API is running! Use /predict to test."

@app.route('/predict_prices', methods=['GET'])
def predict_prices():
    predictions = {}
    print(commodities_df.head())
    for _, row in commodities_df.iterrows():
        data = {
            "Commodity": row['Commodity'],
            "Day": row['Arrival_Date'],         # Use the actual date from CSV
            "District": row['District'],
            "Grade": row['Grade'],
            "Market": row['Market'],
            "Mid_Price": row['Modal Price'],    # Use the actual modal price from CSV
            "State": row['State'],
            "Variety": row['Variety']
        }
        df = pd.DataFrame([data])
        # Encode all categorical columns
        for col in ['Commodity', 'District', 'Grade', 'Market', 'State', 'Variety']:
            le = le_dict[col]
            df[col] = df[col].apply(lambda x: le.transform([x])[0] if x in le.classes_ else -1)
        X_scaled = scaler.transform(df)
        price = model.predict(X_scaled)[0]
        predictions[row['Commodity']] = round(float(price), 2)
    return jsonify(predictions)


if __name__ == '__main__':
    app.run(debug=True, port=5001)