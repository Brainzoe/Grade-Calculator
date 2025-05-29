// src/pages/Results.jsx
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectsContext } from '../context/SubjectsContext';
import ResultsSummary from '../components/ResultsSummary';

const Results = () => {
  const { subjects, average, status, darkMode } = useContext(SubjectsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!subjects || subjects.length === 0) {
      navigate('/');
    }
  }, [subjects, navigate]);

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">Exam Results</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Back to Input
          </button>
        </header>

        <ResultsSummary
          subjects={subjects}
          average={average}
          status={status}
          darkMode={darkMode}
          onPrint={() => window.print()}
          onExportCSV={() => {
            const header = ['Subject', 'Score', 'Grade'];
            const rows = subjects.map(s => [s.name, s.score, s.score >= 80 ? 'A' : s.score >= 65 ? 'B' : s.score >= 55 ? 'C' : s.score >= 40 ? 'D' : 'F']);
            const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].map(e => e.join(',')).join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.href = encodedUri;
            link.download = 'cgpa_results.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        />
      </div>
    </div>
  );
};

export default Results;
