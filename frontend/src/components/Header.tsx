// frontend/src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Turnverein Anmeldung</h1>
        <nav>
          <Link className="px-2" to="/">Anmelden</Link>
          <Link className="px-2" to="/disciplines">Disziplinen</Link>
          <Link className="px-2" to="/events">Termine</Link>
          <Link className="px-2" to="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
