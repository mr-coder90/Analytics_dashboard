import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GeoDistributionChart = ({ data }) => {
    const countyCounts = data.reduce((acc, curr) => {
        const county = curr['County'];
        if (county) {
            acc[county] = (acc[county] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(countyCounts)
        .map(key => ({ name: key, value: countyCounts[key] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10); // Top 10 Counties

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Top 10 Counties for EV Adoption</h3>
            <div className="flex-grow min-h-[300px]" style={{ minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                        <XAxis type="number" stroke="#94a3b8" />
                        <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                        />
                        <Bar dataKey="value" fill="#a855f7" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GeoDistributionChart;
