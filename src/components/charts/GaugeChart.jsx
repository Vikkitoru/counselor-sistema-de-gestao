import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const GaugeChart = ({ value, max, label, color = "#FFD700" }) => {
  const data = [
    { value: value },
    { value: max - value },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={color} stroke="none" />
            <Cell fill="#E2E8F0" stroke="none" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute mt-10 flex flex-col items-center">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
        <span className="text-xs text-slate-400 uppercase tracking-tighter">Meta: {max}</span>
      </div>
      {label && <p className="text-sm font-medium text-slate-600 mt-2">{label}</p>}
    </div>
  );
};