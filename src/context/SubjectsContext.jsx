// src/context/SubjectsContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const SubjectsContext = createContext();

export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('subjects');
    return saved ? JSON.parse(saved) : [{ name: '', score: '' }];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [average, setAverage] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Calculate average and status when subjects update
  useEffect(() => {
    const scores = subjects
      .map((s) => parseFloat(s.score))
      .filter((s) => !isNaN(s));
    const total = scores.reduce((sum, s) => sum + s, 0);
    const avg = scores.length ? (total / scores.length).toFixed(2) : 0;
    setAverage(avg);
    setStatus(calculateStatus(avg));
  }, [subjects]);

  // Helper function for status (same as your original)
  // const calculateStatus = (avg) => {
  //   if (avg >= 90) return 'Honour Roll';
  //   if (avg >= 66) return 'Merit Roll';
  //   return 'Probation';
  // };

  const calculateStatus = (avg) => {
  if (avg >= 90 && avg <= 100) return 'Excellent';
  if (avg >= 85 && avg < 90) return 'Very Good';
  if (avg >= 70 && avg < 85) return 'Good';
  if (avg >= 65 && avg < 70) return 'Pass';
  return 'Fail';
};


  return (
    <SubjectsContext.Provider
      value={{
        subjects,
        setSubjects,
        darkMode,
        setDarkMode,
        average,
        status,
      }}
    >
      {children}
    </SubjectsContext.Provider>
  );
};
