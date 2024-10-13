import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import os

# List of file names and corresponding category names
file_names = [
    'grocery_store_daily_sales_bakery.csv',
    'grocery_store_daily_sales_beverages.csv',
    'grocery_store_daily_sales_condiments.csv',
    'grocery_store_daily_sales_dairy.csv',
    'grocery_store_daily_sales_frozen.csv',
    'grocery_store_daily_sales_meat.csv',
    'grocery_store_daily_sales_produce.csv',
    'grocery_store_daily_sales_snacks.csv',
    'grocery_store_daily_sales_staples.csv'
]

# Dictionary to hold the category and predicted order amount
category_order_map = {}

# Function to process each file and return the recommended order amount
def process_file(file_path, category_name):
    # Load the sales data from the CSV file
    data = pd.read_csv(file_path)

    # Convert 'Date' to datetime for working with time periods
    data['Date'] = pd.to_datetime(data['Date'])

    # Sort the data by date
    data = data.sort_values(by='Date')

    # Feature Engineering: Add lagged sales and surplus data
    data['Sales_lag_1'] = data['Quantity Sold'].shift(1)
    data['Surplus_lag_1'] = data['Surplus'].shift(1)

    # Drop rows with missing values
    data = data.dropna()

    # Prepare the features (X) and target (y)
    X = data[['Quantity Sold', 'Surplus', 'Sales_lag_1', 'Surplus_lag_1']]
    y = data['Quantity Sold']

    # Split the data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

    # Train a machine learning model (Random Forest)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Make predictions on the test set
    y_pred = model.predict(X_test)

    # Evaluate the model using Mean Absolute Error (MAE)
    mae = mean_absolute_error(y_test, y_pred)
    print(f"{category_name} - Mean Absolute Error on the test set: {mae}")

    # Forecast the next 14 days (2 weeks)
    last_data_point = X_test.iloc[-1].values.reshape(1, -1)  # Reshape for prediction

    # Convert back to DataFrame for consistent feature names
    last_data_point_df = pd.DataFrame(last_data_point, columns=X_train.columns)

    # Predict sales for the next 14 days (assume constant prediction for each day)
    predicted_sales_2_weeks = model.predict(last_data_point_df)[0] * 14  # Predict once, multiply by 14 days

    # Calculate the recommended order amount (predicted sales minus surplus)
    average_surplus = data['Surplus'].mean()  # Use historical surplus
    order_amount = max(predicted_sales_2_weeks - average_surplus, 0)

    # Return the order amount as an integer
    return int(order_amount)

# Iterate over each file, process it, and store the result in the hashmap
for file_name in file_names:
    # Extract category name from file name (e.g., "bakery" from "grocery_store_daily_sales_bakery.csv")
    category_name = file_name.split('_')[-1].split('.')[0]

    # Process the file and get the recommended order amount
    order_amount = process_file(file_name, category_name)

    # Store the result in the dictionary
    category_order_map[category_name] = order_amount

# Print the hashmap with the order amounts for each category
print("Recommended order amounts for each category:")
print(category_order_map)
