import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4">
      © {new Date().getFullYear()} Turnverein – Alle Rechte vorbehalten
    </footer>
  );
}
