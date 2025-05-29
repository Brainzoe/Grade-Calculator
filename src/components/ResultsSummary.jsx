// src/components/ResultsSummary.jsx
import React from 'react';
import Chart from './Chart';
import { gradeLetter, studyTips, getProgressColor } from '../utils/helpers';

const ResultsSummary = ({
  subjects,
  average,
  status,
  darkMode,
  onPrint,
  onExportCSV,
}) => {
  const chartData = subjects
    .filter((s) => s.name.trim() !== '' && !isNaN(parseFloat(s.score)))
    .map((s) => ({
      name: s.name,
      score: Number(s.score),
    }));

  return (
    <section
      className="mt-10 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-colors"
      id="results"
    >
      {/* Average Score Progress Bar */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-100">
          Average Score:
        </h3>
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
          <div
            style={{
              width: `${average}%`,
              backgroundColor: getProgressColor(average),
              height: '100%',
              transition: 'width 0.6s ease',
            }}
            aria-label={`Average score progress: ${average}%`}
          />
        </div>
        <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
          {average} %
        </p>
      </div>

      <p className="mb-4 text-lg text-gray-800 dark:text-gray-100">
        Status: <strong>{status}</strong>
      </p>

      {/* Chart */}
      <Chart data={chartData} darkMode={darkMode} />

      {/* Study Tips */}
      <p
        className="mt-6 text-lg italic p-4 rounded-md border border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100"
        aria-live="polite"
      >
        {studyTips(average)}
      </p>

      {/* Subjects Table */}
      <div className="overflow-x-auto mt-6 rounded-lg border border-gray-300 dark:border-gray-700">
        <table
          className="min-w-full text-center border-collapse"
          aria-label="Subjects and Scores"
        >
          <thead>
            <tr className="bg-indigo-600 text-white dark:bg-indigo-700">
              <th className="p-3">Subject</th>
              <th className="p-3">Score</th>
              <th className="p-3">Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) =>
              s.name.trim() === '' ? null : (
                <tr
                  key={i}
                  className={`border-b border-gray-200 dark:border-gray-700 ${i % 2 === 0
                      ? darkMode
                        ? 'bg-gray-800'
                        : 'bg-gray-50'
                      : darkMode
                        ? 'bg-gray-900'
                        : 'bg-white'
                    }`}
                >
                  <td className="p-3 text-black dark:text-white">{s.name}</td>
                  <td className="p-3 text-black dark:text-white">{s.score}</td>
                  <td className="p-3 text-black dark:text-white">{gradeLetter(s.score)}</td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>


      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-6 print:hidden">
        <button
          onClick={onPrint}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow transition"
          aria-label="Print Results"
        >
          Print Results
        </button>
        <button
          onClick={onExportCSV}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow transition"
          aria-label="Export Results to CSV"
        >
          Export CSV
        </button>
      </div>
    </section>
  );
};

export default ResultsSummary;
