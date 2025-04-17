// frontend/src/components/EventCard.tsx
import React from 'react';

interface Props {
  id: string;
  date: string;
  location: string;
  disciplines: string[];
  onToggle: (discipline: string, checked: boolean) => void;
  selected: string[];
}

export default function EventCard({ date, location, disciplines, onToggle, selected }: Props) {
  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="font-semibold">{new Date(date).toLocaleString()}</h3>
      {location && <p className="text-sm text-gray-600">{location}</p>}
      <div className="mt-2">
        {disciplines.map(d => (
          <label key={d} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              className="mr-1"
              checked={selected.includes(d)}
              onChange={e => onToggle(d, e.target.checked)}
            />
            {d}
          </label>
        ))}
      </div>
    </div>
  );
}
