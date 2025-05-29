// src/components/SubjectInput.jsx
import React from 'react';

const SubjectInput = ({ index, subject, onChange, onRemove, darkMode }) => {
  return (
    <div className="flex space-x-4 items-center">
      <input
        type="text"
        name="name"
        value={subject.name}
        onChange={(e) => onChange(index, e)}
        placeholder="Subject name"
        className={`border rounded px-3 py-2 flex-grow ${
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
        className={`w-24 border rounded px-3 py-2 ${
          darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
        }`}
      />
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-600 hover:text-red-800"
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
    </div>
  );
};

export default SubjectInput;
