import express from 'express';
import Discipline from '../models/Discipline.js';

const router = express.Router();

// Liste aller Disziplinen
router.get('/', async (req, res) => {
  const all = await Discipline.find().sort('name');
  res.json(all);
});

export default router;
