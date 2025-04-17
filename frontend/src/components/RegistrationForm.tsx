// frontend/src/components/RegistrationForm.tsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EventCard from './EventCard';

interface Event {
  _id: string;
  date: string;
  location: string;
  disciplines: string[];
}

export default function RegistrationForm() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Holt automatisch alle Di-/Fr-Termine des aktuellen Monats
    api.get<Event[]>('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggle = (eventId: string, disc: string, checked: boolean) => {
    setSelected(prev => {
      const curr = prev[eventId] || [];
      return {
        ...prev,
        [eventId]: checked
          ? [...curr, disc]
          : curr.filter(d => d !== disc)
      };
    });
  };

  const submit = async () => {
    for (const [eventId, discList] of Object.entries(selected)) {
      if (discList.length) {
        await api.post('/signup', { eventId, disciplines: discList });
      }
    }
    alert('Anmeldung gesendet!');
  };

  return (
    <div>
      {events.map(ev => (
        <EventCard
          key={ev._id}
          id={ev._id}
          date={ev.date}
          location={ev.location}
          disciplines={ev.disciplines}
          selected={selected[ev._id] || []}
          onToggle={(disc, checked) => toggle(ev._id, disc, checked)}
        />
      ))}
      <button
        onClick={submit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Jetzt anmelden
      </button>
    </div>
  );
}
