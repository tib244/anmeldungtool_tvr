import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Disciplines() {
  const [list, setList] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/disciplines').then(res => setList(res.data.map((d:any) => d.name)));
  }, []);

  const toggle = (name: string) => {
    setSelected(sel => sel.includes(name) ? sel.filter(n=>n!==name) : [...sel, name]);
  };

  const submit = async () => {
    await api.post('/register/disciplines', { disciplines: selected });
    navigate('/events');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Disziplinen auswählen</h2>
      {list.map(d => (
        <label key={d} className="block mb-2">
          <input
            type="checkbox"
            checked={selected.includes(d)}
            onChange={() => toggle(d)}
            className="mr-2"
          />
          {d}
        </label>
      ))}
      <button
        onClick={submit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Weiter zu Terminen
      </button>
    </div>
  );
}
