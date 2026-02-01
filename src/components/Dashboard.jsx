import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Car, Zap, DollarSign, MapPin, TrendingUp, Activity } from 'lucide-react';
import MetricCard from './MetricCard';
import MakeDistributionChart from './Charts/MakeDistributionChart';
import EVGrowthChart from './Charts/EVGrowthChart';
import RangeChart from './Charts/RangeChart';
import EligibilityChart from './Charts/EligibilityChart';
import GeoDistributionChart from './Charts/GeoDistributionChart';
import DataTable from './DataTable';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEVs: 0,
        avgRange: 0,
        topMake: '',
        bevPercentage: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/Electric_Vehicle_Population_Data.csv');
                // Use .text() to ensure we get the full file content, not just the first chunk
                const csv = await response.text();

                Papa.parse(csv, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        processData(results.data);
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error('Error fetching CSV:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const processData = (evData) => {
        if (!evData || evData.length === 0) return;

        const totalEVs = evData.length;

        // Avg Range
        const totalRange = evData.reduce((sum, item) => sum + (parseInt(item['Electric Range']) || 0), 0);
        const avgRange = Math.round(totalRange / totalEVs);

        // Top Make
        const makes = {};
        evData.forEach(item => {
            if (item.Make) {
                makes[item.Make] = (makes[item.Make] || 0) + 1;
            }
        });

        let topMake = 'N/A';
        if (Object.keys(makes).length > 0) {
            topMake = Object.keys(makes).reduce((a, b) => makes[a] > makes[b] ? a : b);
        }

        // BEV Percentage
        const bevCount = evData.filter(item => item['Electric Vehicle Type']?.includes('Battery Electric Vehicle')).length;
        const bevPercentage = Math.round((bevCount / totalEVs) * 100);

        setStats({
            totalEVs,
            avgRange,
            topMake,
            bevPercentage
        });

        setData(evData);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-accent">
                <div className="text-xl animate-pulse">Loading EV Analytics...</div>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="mb-8 border-b border-gray-800 pb-6">
                <h1 className="text-3xl font-bold gradient-text">EV Population Analytics</h1>
                <p className="text-muted mt-2">Real-time insights into electric vehicle adoption trends</p>
            </header>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Total Vehicles"
                    value={stats.totalEVs.toLocaleString()}
                    icon={Car}
                    color="blue"
                    trend={12}
                />
                <MetricCard
                    title="Average Range"
                    value={`${stats.avgRange} mi`}
                    icon={Zap}
                    color="purple"
                    trend={5}
                />
                <MetricCard
                    title="Top Manufacturer"
                    value={stats.topMake}
                    icon={TrendingUp}
                    color="green"
                />
                <MetricCard
                    title="% Battery EV"
                    value={`${stats.bevPercentage}%`}
                    icon={Activity}
                    color="orange"
                    trend={2}
                />
            </div>

            {/* Charts Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="lg:col-span-1">
                    <EVGrowthChart data={data} />
                </div>
                <div className="lg:col-span-1">
                    <MakeDistributionChart data={data} />
                </div>
            </div>

            {/* Charts Layout II (New Insights) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="lg:col-span-1">
                    <GeoDistributionChart data={data} />
                </div>
                <div className="lg:col-span-1">
                    <EligibilityChart data={data} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
                <RangeChart data={data} />
            </div>

            <DataTable data={data} />

            <footer className="mt-12 text-center text-muted text-sm py-6 border-t border-gray-800">
                <p>Created by Parthasarathi...thank you</p>
            </footer>
        </div>
    );
};

export default Dashboard;
