import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#f97316', '#ef4444', '#8b5cf6'];

const MakeDistributionChart = ({ data }) => {
    // Process data to get counts by Make
    const makeCounts = data.reduce((acc, curr) => {
        const make = curr['Make'];
        acc[make] = (acc[make] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(makeCounts)
        .map(key => ({ name: key, value: makeCounts[key] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6); // Top 6

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Market Share by Manufacturer</h3>
            <div className="flex-grow min-h-[300px]" style={{ minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                            itemStyle={{ color: '#f8fafc' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MakeDistributionChart;
