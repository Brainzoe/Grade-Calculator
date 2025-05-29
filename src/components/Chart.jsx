// src/components/Chart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ data, darkMode }) => (
  <div style={{ width: '100%', height: 250 }}>
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 20, bottom: 20 }}>
        <XAxis
          dataKey="name"
          interval={0}
          tick={({ x, y, payload }) => {
            const lines = payload.value.split(' ');
            return (
              <g transform={`translate(${x},${y + 10})`}>
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  fill={darkMode ? '#ffffff' : '#000000'}
                  fontSize={12}
                >
                  {lines.map((line, index) => (
                    <tspan key={index} x={0} dy={index === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          }}
        />
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
