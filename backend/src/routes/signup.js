import express from 'express';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';

const router = express.Router();

// Anmeldung für einen Termin
router.post('/', async (req, res) => {
  const { eventId, disciplines } = req.body;
  if (!eventId || !disciplines?.length) {
    return res.status(400).json({ error: 'Event + Disziplin wählen' });
  }

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ error: 'Termin nicht gefunden' });
  }

  const reg = await Registration.create({
    user: req.user._id,
    event: event._id,
    disciplines
  });
  res.json(reg);
});

export default router;
