// src/hooks/useSubjectsState.js
import { useState, useEffect } from 'react';

const useSubjectsState = () => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('subjects');
    return saved ? JSON.parse(saved) : [{ name: '', score: '' }];
  });

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const handleChange = (index, e) => {
    const updated = [...subjects];
    updated[index][e.target.name] = e.target.value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: '', score: '' }]);
  };

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  return { subjects, setSubjects, handleChange, addSubject, removeSubject };
};

export default useSubjectsState;
