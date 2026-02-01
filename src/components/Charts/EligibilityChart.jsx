import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#22c55e', '#eab308', '#94a3b8'];

const EligibilityChart = ({ data }) => {
    const statusCounts = data.reduce((acc, curr) => {
        const status = curr['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
        if (status) {
            let label = 'Unknown';
            if (status.includes('Eligible')) label = 'Eligible';
            else if (status.includes('Not eligible')) label = 'Not Eligible';
            else if (status.includes('unknown')) label = 'Unknown/Pending';

            acc[label] = (acc[label] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(statusCounts)
        .map(key => ({ name: key, value: statusCounts[key] }))
        .sort((a, b) => b.value - a.value);

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">CAFV Eligibility Status</h3>
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

export default EligibilityChart;
