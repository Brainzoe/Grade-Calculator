// src/components/Chart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ data, darkMode }) => (
  <div style={{ width: '100%', height: 250 }}>
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 20, bottom: 20 }}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Bar
          dataKey="score"
          fill={darkMode ? '#6366f1' : '#4f46e5'}
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;
