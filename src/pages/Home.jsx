// src/pages/Home.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectsContext } from '../context/SubjectsContext';
import SubjectInput from '../components/SubjectInput';
import Button from '../components/Button';

const Home = () => {
  const {
    subjects,
    setSubjects,
    darkMode,
    setDarkMode,
  } = useContext(SubjectsContext);
  const navigate = useNavigate();

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...subjects];
    updated[index][name] = value;
    setSubjects(updated);
  };

  const addSubject = () => setSubjects([...subjects, { name: '', score: '' }]);

  const removeSubject = (index) => {
    if (subjects.length === 1) return;
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const clearAllSubjects = () => {
    setSubjects([{ name: '', score: '' }]);
  };



  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const s of subjects) {
      if (!s.name.trim()) {
        alert('Please enter all subject names.');
        return;
      }
      if (s.score === '' || isNaN(s.score)) {
        alert('Please enter valid scores for all subjects.');
        return;
      }
      const scoreNum = Number(s.score);
      if (scoreNum < 0 || scoreNum > 100) {
        alert('Scores must be between 0 and 100.');
        return;
      }
    }
    navigate('/results');
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-10">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 text-center sm:text-left">
              Exam Result
            </h1>
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {subjects.map((subject, i) => (
              <SubjectInput
                key={i}
                index={i}
                subject={subject}
                onChange={handleSubjectChange}
                onRemove={removeSubject}
                darkMode={darkMode}
              />
            ))}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6">
              <Button
                onClick={addSubject}
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto sm:min-w-[160px] sm:px-6 sm:py-3"
                ariaLabel="Add Subject"
              >
                + Add Subject
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto sm:min-w-[220px] sm:px-6 sm:py-3"
                ariaLabel="Calculate CGPA and view results"
              >
                Calculate & View Results
              </Button>
              <Button
                onClick={clearAllSubjects}
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto sm:min-w-[140px] sm:px-6 sm:py-3"
                ariaLabel="Clear all subject fields"
              >
                Clear All
              </Button>
            </div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
