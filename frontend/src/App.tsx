// frontend/src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Disciplines from './pages/Disciplines';
import Events from './pages/Events';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/disciplines" element={<Disciplines />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
