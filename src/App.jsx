// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import PrintResults from './pages/PrintResults';
import { SubjectsProvider } from './context/SubjectsContext';

const App = () => (
  <SubjectsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/print" element={<PrintResults />} />
      </Routes>
    </Router>
  </SubjectsProvider>
);

export default App;
