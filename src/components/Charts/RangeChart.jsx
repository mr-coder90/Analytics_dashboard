import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RangeChart = ({ data }) => {
    // Calculate average range by Make
    const makeStats = data.reduce((acc, curr) => {
        const make = curr['Make'];
        const range = parseInt(curr['Electric Range']);

        if (range > 0) { // Only consider non-zero ranges
            if (!acc[make]) {
                acc[make] = { totalRange: 0, count: 0 };
            }
            acc[make].totalRange += range;
            acc[make].count += 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(makeStats)
        .map(key => ({
            name: key,
            avgRange: Math.round(makeStats[key].totalRange / makeStats[key].count)
        }))
        .sort((a, b) => b.avgRange - a.avgRange)
        .slice(0, 10); // Top 10 by range

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Average Electric Range by Manufacturer (Top 10)</h3>
            <div className="flex-grow min-h-[300px]" style={{ minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                        <XAxis type="number" stroke="#94a3b8" unit=" mi" />
                        <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                        />
                        <Bar dataKey="avgRange" fill="#22c55e" radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#22c55e' : '#4ade80'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RangeChart;
