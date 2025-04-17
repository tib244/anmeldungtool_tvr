// frontend/src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post('/register', { firstName, lastName });
      navigate('/disciplines');
    } catch (err: any) {
      if (err.response?.status === 404) {
        alert('Dein Name ist nicht in der Mitglieder‑Liste. Bitte wende dich an den Vorstand.');
      } else {
        alert('Fehler bei der Anmeldung. Bitte überprüfe deine Eingaben oder versuche es später erneut.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Mitglieds‑Login</h2>
      <input
        type="text"
        placeholder="Vorname"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Nachname"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Anmelden
      </button>
    </div>
  );
}
