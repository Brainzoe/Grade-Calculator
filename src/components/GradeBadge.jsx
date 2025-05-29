// src/components/GradeBadge.jsx
import React from 'react';

const gradeLetter = (score) => {
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  return 'F';
};

const GradeBadge = ({ score }) => {
  const grade = gradeLetter(score);

  const bgColor = {
    A: 'bg-green-400',
    B: 'bg-blue-400',
    C: 'bg-yellow-400',
    D: 'bg-orange-400',
    F: 'bg-red-500',
  }[grade];

  return (
    <span
      className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg ${bgColor} text-white`}
      aria-label={`Grade: ${grade}`}
    >
      {grade}
    </span>
  );
};

export default GradeBadge;
