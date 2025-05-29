import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ data, darkMode }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const chartWrapperRef = useRef(null);

  useEffect(() => {
    const checkSize = () => {
      if (chartWrapperRef.current) {
        const width = chartWrapperRef.current.offsetWidth;
        setIsSmallScreen(width < 500); // adjust threshold as needed
      }
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div ref={chartWrapperRef} style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, bottom: 20 }}>
          <XAxis
            dataKey="name"
            interval={0}
            tick={({ x, y, payload }) => {
              const labelColor = darkMode ? '#ffffff' : '#000000';
              const label = payload.value;

              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={10}
                    textAnchor="end"
                    fill={labelColor}
                    fontSize={12}
                    transform={
                      isSmallScreen
                        ? 'rotate(-45)' // diagonal for small screen
                        : 'rotate(0)'   // horizontal for larger screen
                    }
                  >
                    {label}
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
};

export default Chart;
