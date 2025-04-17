import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function Dashboard() {
  const [regs, setRegs] = useState<any[]>([]);

  useEffect(() => {
    api.get('/registrations').then(res => setRegs(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Übersicht Anmeldungen</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">Mitglied</th>
            <th className="border px-2 py-1">Termin</th>
            <th className="border px-2 py-1">Disziplinen</th>
          </tr>
        </thead>
        <tbody>
          {regs.map(r => (
            <tr key={r._id}>
              <td className="border px-2 py-1">{r.user.firstName} {r.user.lastName}</td>
              <td className="border px-2 py-1">{new Date(r.event.date).toLocaleString()}</td>
              <td className="border px-2 py-1">{r.disciplines.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
