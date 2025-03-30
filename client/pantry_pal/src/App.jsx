import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CuisineSelectionPage from './components/CuisineSelectionPage';
import TimeSelectionPage from './components/TimeSelectionPage';
import IngredientPage from './components/IngredientPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CuisineSelectionPage />} />
        <Route path="/time" element={<TimeSelectionPage />} />
        <Route path="/inventory" element={<IngredientPage />} />
      </Routes>
    </Router>
  );
}

export default App;
