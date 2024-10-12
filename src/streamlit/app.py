import streamlit as st
import pandas as pd

# Title of the dashboard
st.title("Inventory Management Dashboard")

# Load the CSV file
data_path = './data/grocery_store_inventory.csv'
try:
    df = pd.read_csv(data_path)
    st.success("Data loaded successfully!")
except Exception as e:
    st.error(f"Error loading data: {e}")

# Display the dataframe
if 'df' in locals():
    st.subheader("Inventory Data")
    st.dataframe(df)

    # Filter options
    st.sidebar.header("Filter Options")
    selected_category = st.sidebar.selectbox("Select a Category", df['Category'].unique())
    filtered_data = df[df['Category'] == selected_category]

    st.subheader(f"Filtered Data for Category: {selected_category}")
    st.dataframe(filtered_data)

    # Plotting the data
    if st.sidebar.checkbox("Show Quantity Chart"):
        st.subheader("Quantity Distribution by Product")
        st.bar_chart(filtered_data.set_index('Product Name')['Quantity'])
