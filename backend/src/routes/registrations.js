import express from 'express';
import Registration from '../models/Registration.js';

const router = express.Router();

// Liefert nur Anmeldungen für die Disziplin(en) des Leiters
router.get('/', async (req, res) => {
  const regs = await Registration.find({
    disciplines: { $in: req.user.disciplines }
  })
    .populate('user', 'firstName lastName')
    .populate('event');
  res.json(regs);
});

export default router;
