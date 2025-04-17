// frontend/src/pages/Events.tsx
import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

export default function Events() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Trainingstermine</h2>
      <RegistrationForm />
    </div>
  );
}
