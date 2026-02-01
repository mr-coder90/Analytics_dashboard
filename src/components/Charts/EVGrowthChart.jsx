import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EVGrowthChart = ({ data }) => {
    // Process data for Model Year
    const yearCounts = data.reduce((acc, curr) => {
        const year = curr['Model Year'];
        if (year && year !== '0') { // Filter invalid years
            acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(yearCounts)
        .map(key => ({ year: key, count: yearCounts[key] }))
        .sort((a, b) => a.year - b.year);

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">EV Adoption Growth (by Model Year)</h3>
            <div className="flex-grow min-h-[300px]" style={{ minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="year" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                        />
                        <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EVGrowthChart;
