# waste.0 - AI-Driven Surplus and Spoilage Management System
waste.0 is an AI-powered platform designed to help grocery stores reduce food waste and optimize their inventory management. By leveraging machine learning models, waste.0 predicts surplus and spoilage, providing businesses with real-time insights and enabling them to make data-driven decisions. The platform allows businesses to donate surplus food to nearby charities, ensuring resources are utilized efficiently and minimizing waste. Built with Next.js, the system integrates with MongoDB, Clerk for authentication, and AWS Databricks for running ML models, with hosting on AWS and security managed by Cloudflare.
##
Devpost: [Link to Devpost Project] 

## Features
## 🚀 AI-Powered Inventory Optimization
## Dynamic Linear Regression Model: 
Predicts optimal order quantities for the next two weeks to prevent surplus and ensure accurate restocking. The model has a 95% accuracy rate, helping stores save money and reduce waste.
Reference: https://www.tensorflow.org/probability/api_docs/python/tfp/sts/DynamicLinearRegression
## Surplus & Spoilage Prediction: 
Using a combination of logistic regression and decision tree models, waste.0 forecasts potential spoilage based on current inventory, expiration dates, and sales rates.
## 🔒 User Authentication (Clerk)
## Businesses and Charities: 
Two user types (businesses and charities) supported, each with tailored dashboards and features.
## Secure Logins: 
Powered by Clerk, offering email and OAuth-based authentication for a secure and streamlined login experience.
## 📦 Inventory Management
## Daily Inventory Updates: 
Businesses can update their inventory daily, tracking quantities and expiration dates.
## Real-Time Spoilage Alerts: 
The platform sends notifications to businesses 7 days prior to potential spoilage, enabling proactive donation to nearby charities.
## 📊 Dashboard & Data Visualization
## Business Dashboard:
Visualizes predicted spoilage items for the next 7 days, helping businesses act before waste occurs.
## Charity Dashboard: 
Lists nearby businesses offering food donations, with real-time notifications when surplus food is available.
## 📡 Donation Notifications
## Automated Notifications: 
Businesses can notify nearby charities of surplus food, ensuring it is collected and distributed before spoilage.
## Nearby Charities: 
Charities can see a live feed of businesses offering donations and plan collections accordingly.
##Benefits
## ✅ Resource & Cost Optimization
By predicting the optimal quantity to order and preventing surplus, waste.0 helps businesses avoid overstocking, saving both resources and money.

## 💼 Supporting Local Communities
Charities are notified when surplus food is available, ensuring donations are made before spoilage and benefiting local communities.

## 🔐 Secure Data Management
All user data and inventory information is securely stored in MongoDB, ensuring safe and efficient data handling for businesses and charities.

## ⚡️ Scalable & Reliable
Built on AWS infrastructure, waste.0 scales effortlessly, ensuring that businesses and charities of all sizes can use the platform.

## Technologies Used
## 🖥 Frontend
## Next.js: 
A React framework for building server-rendered applications with dynamic data.
## React: 
For creating interactive user interfaces.
## Tailwind CSS:
A utility-first CSS framework for efficient styling.
## 🔧 Backend
## Node.js: 
Handles the server-side logic and API routes.
## Machine Learning Models: 
Deployed on AWS Databricks, using time-series models for order prediction and decision trees for spoilage forecasting.
## 🗂 Authentication
Clerk: Provides secure and flexible authentication for businesses and charities.
## 📦 Database
## MongoDB: A NoSQL cloud database used to store user and inventory data.
## 📊 Data Visualization
## Streamlit:
Integrated into the business dashboard to visualize the ML model predictions and spoilage insights.
## ☁️ Deployment & Hosting
## AWS (Amazon Web Services): 
Provides the scalable hosting infrastructure.
## Cloudflare: 
Secures and accelerates the application to ensure reliability and performance.
## GoDaddy: 
Domain provider for the application.


