import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
  return (
    <div className="glass-panel p-6 metric-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-muted text-sm font-medium uppercase tracking-wider">{title}</p>
          <h3 className="metric-value mt-2">{value}</h3>
        </div>
        <div className={`icon-wrapper ${color}`}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={trend > 0 ? 'text-success' : 'text-danger'}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-muted ml-2">from last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
