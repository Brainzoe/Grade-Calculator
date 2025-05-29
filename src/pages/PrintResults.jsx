import React, { useEffect, useState } from 'react';
import ResultsSummary from '../components/ResultsSummary';

const PrintResults = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Load print data from sessionStorage
        const stored = sessionStorage.getItem('printData');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setData(parsed);

                // Delay print slightly to allow render
                setTimeout(() => {
                    window.print();
                }, 300);
            } catch (error) {
                console.error('Error parsing print data:', error);
            }
        }
    }, []);

    if (!data) {
        return <p className="text-center mt-10">No data available to print.</p>;
    }

    const { subjects, average, status, darkMode } = data;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center print:block hidden">
                CGPA Report
            </h1>
            <ResultsSummary
                subjects={subjects}
                average={average}
                status={status}
                darkMode={darkMode}
                onPrint={handlePrint}
                onExportCSV={handleExportCSV}
            />
        </div>
    );
};

export default PrintResults;
