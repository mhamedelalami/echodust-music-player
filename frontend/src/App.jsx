// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <Router>
      {/* You can add a main layout wrapper here if you want */}
      <main className="bg-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:query" element={<SearchResultsPage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;