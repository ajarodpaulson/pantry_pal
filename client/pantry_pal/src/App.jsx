import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CuisineSelectionPage from './components/CuisineSelectionPage';
import TimeSelectionPage from './components/TimeSelectionPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CuisineSelectionPage />} />
        <Route path="/time" element={<TimeSelectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
