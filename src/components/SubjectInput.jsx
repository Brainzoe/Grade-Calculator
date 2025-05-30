// src/components/SubjectInput.jsx
import React from 'react';
import { motion } from 'framer-motion';

const gradeLetter = (score) => {
  const num = parseFloat(score);
  if (isNaN(num)) return '';
  if (num >= 80) return 'A';
  if (num >= 65) return 'B';
  if (num >= 55) return 'C';
  if (num >= 40) return 'D';
  return 'F';
};

const gradeColor = (grade) => {
  switch (grade) {
    case 'A':
      return 'bg-green-500';
    case 'B':
      return 'bg-blue-500';
    case 'C':
      return 'bg-yellow-500';
    case 'D':
      return 'bg-orange-500';
    case 'F':
      return 'bg-red-600';
    default:
      return 'bg-gray-400';
  }
};

const SubjectInput = ({ index, subject, onChange, onRemove, darkMode }) => {
  const grade = gradeLetter(subject.score);
  const color = gradeColor(grade);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300"
    >
      <input
        type="text"
        name="name"
        value={subject.name}
        onChange={(e) => onChange(index, e)}
        placeholder="Subject name"
        className={`w-full sm:flex-grow border rounded px-3 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
        }`}
      />
      <input
        type="number"
        name="score"
        value={subject.score}
        onChange={(e) => onChange(index, e)}
        placeholder="Score"
        min="0"
        max="100"
        className={`w-full sm:w-24 border rounded px-3 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
        }`}
      />
      {grade && (
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg ${color}`}
          title={`Grade: ${grade}`}
        >
          {grade}
        </div>
      )}
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-600 hover:text-red-800 transition-colors duration-200"
        aria-label="Remove Subject"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.313 3 20.25l.937-4.5 12.925-12.263z"
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default SubjectInput;

