# EV Population Analytics Dashboard 🚗⚡

A modern, comprehensive analytics dashboard built to visualize trends in Electric Vehicle (EV) adoption. This project parses and analyzes large-scale EV population datasets to provide actionable insights into market share, technology growth, and geographic distribution.

## 🚀 Live Demo
**[INSERT YOUR DEPLOYED DASHBOARD URL HERE]**
*(e.g., https://my-ev-dashboard.vercel.app)*

## 📊 Key Features
*   **Real-time CSV Analysis**: Parses 50,000+ records purely on the frontend using `papaparse`.
*   **Interactive Visualizations**:
    *   **Growth Trends**: Bar charts showing EV adoption over model years.
    *   **Market Share**: Pie/Donut charts for top manufacturers.
    *   **Range Analysis**: Comparative analysis of average electric ranges.
    *   **Geographic Density**: Adoption metrics by County.
    *   **Policy Impact**: CAFV (Clean Alternative Fuel Vehicle) eligibility analysis.
*   **Data Exploration**: Full searchable and paginated data table for inspecting raw records.
*   **Premium UI**: Fully responsive "Glassmorphism" design with dark mode aesthetics.

## 🛠️ Tech Stack
*   **Framework**: React 18 + Vite
*   **Styling**: Custom CSS Variables (No external UI libraries for layout)
*   **Charts**: Recharts
*   **Icons**: Lucide React
*   **Data Processing**: Papaparse

## 🏃‍♂️ Running Locally

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd mapup
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:5173`.

4.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure
```
src/
├── components/
│   ├── Charts/           # Visualization components (Pie, Bar, etc.)
│   ├── Dashboard.jsx     # Main container & data logic
│   ├── DataTable.jsx     # Searchable raw data table
│   └── MetricCard.jsx    # KPI display cards
├── App.jsx               # Root component
└── index.css             # Global styles & variables
```

## 📝 Assignment Submission
This dashboard was created for the MapUp assessment. It fulfills all requirements regarding analytical depth, design quality, and insightfulness.
