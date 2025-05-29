import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ data, darkMode }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const chartWrapperRef = useRef(null);

  useEffect(() => {
    const checkSize = () => {
      if (chartWrapperRef.current) {
        const width = chartWrapperRef.current.offsetWidth;
        setIsSmallScreen(width < 500); // breakpoint
      }
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div ref={chartWrapperRef} style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, bottom: 50, left: 10, right: 10 }}
        >
          <XAxis
            dataKey="name"
            interval={0}
            height={isSmallScreen ? 60 : 70}
            tick={({ x, y, payload }) => {
              const labelColor = darkMode ? '#ffffff' : '#000000';
              const label = payload.value;

              if (isSmallScreen) {
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="end"
                      fill={labelColor}
                      fontSize={12}
                      transform="rotate(-45)"
                    >
                      {label}
                    </text>
                  </g>
                );
              } else {
                const maxCharsPerLine = 10;
                const lines = [];
                for (let i = 0; i < label.length; i += maxCharsPerLine) {
                  lines.push(label.substring(i, i + maxCharsPerLine));
                }

                return (
                  <g transform={`translate(${x},${y})`}>
                    {lines.map((line, index) => (
                      <text
                        key={index}
                        x={0}
                        y={index * 12}
                        textAnchor="middle"
                        fill={labelColor}
                        fontSize={12}
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              }
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
