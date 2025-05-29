// src/utils/helpers.js

export const gradeLetter = (score) => {
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  return 'F';
};

export const getProgressColor = (avg) => {
  if (avg >= 90) return '#16a34a'; // green-600
  if (avg >= 66) return '#2563eb'; // blue-600
  return '#dc2626'; // red-600
};

export const studyTips = (avg) => {
  if (avg >= 90)
    return "Excellent work! Keep up the great effort and continue aiming high.";
  if (avg >= 66)
    return "Good job! You're doing well but there's room for improvement.";
  return "Don't be discouraged. Focus on areas of difficulty and seek help when needed.";
};
