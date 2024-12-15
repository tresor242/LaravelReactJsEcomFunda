import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Redirige /admin vers le tableau de bord */}
        <Route path="/admin/*" element={<MasterLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
