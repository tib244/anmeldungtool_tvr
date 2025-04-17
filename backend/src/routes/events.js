// backend/src/routes/events.js
import express from 'express';
import Discipline from '../models/Discipline.js';
import { auth } from '../middleware/auth.js';
import { getDatesForMonth } from '../utils/dateUtils.js';

const router = express.Router();

/**
 * GET /events?year=2025&month=4
 * Liefert alle Di‑ & Fr‑Termine eines Monats
 */
router.get('/', auth, async (req, res) => {
  // Aktueller Monat, wenn nicht in Query
  const now = new Date();
  const year  = parseInt(req.query.year)  || now.getFullYear();
  const month = parseInt(req.query.month) ? parseInt(req.query.month) - 1 : now.getMonth();

  // Alle verfügbaren Disziplinen aus der DB
  const allDisciplines = (await Discipline.find().sort('name')).map(d => d.name);

  // Dienstag=2, Freitag=5
  const dates = getDatesForMonth(year, month, [2, 5]);

  // Baue Event‑Objekte
  const events = dates.map(d => ({
    _id: d.toISOString(),      // eindeutiges ID‑Feld
    date: d,
    location: '',               // optional hart‑coded oder später aus Config
    disciplines: allDisciplines // alle Disziplinen anzeigen
  }));

  res.json(events);
});

export default router;
