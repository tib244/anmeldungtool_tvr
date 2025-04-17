// backend/src/routes/register.js
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  // Rohdaten aus dem Body
  const rawFirst = req.body.firstName;
  const rawLast  = req.body.lastName;

  // Trim + Validierung
  const firstName = typeof rawFirst === 'string' ? rawFirst.trim() : '';
  const lastName  = typeof rawLast  === 'string' ? rawLast.trim()  : '';
  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Vor- und Nachname erforderlich' });
  }

  console.log(`Login-Versuch für: ${firstName} ${lastName}`);

  // Case‑insensitive Suche in der DB
  const user = await User.findOne({
    firstName: { $regex: `^${firstName}$`, $options: 'i' },
    lastName:  { $regex: `^${lastName}$`,  $options: 'i' }
  });

  if (!user) {
    console.log(`→ Nutzer nicht gefunden`);
    return res.status(404).json({ error: 'Nutzer nicht gefunden' });
  }

  // Token erstellen und Cookie setzen
  const token = jwt.sign({ uid: user.uid }, SECRET, { expiresIn: '14d' });
  res.cookie('memberToken', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 14 * 24 * 60 * 60 * 1000
  });

  console.log(`→ Login erfolgreich für: ${user.firstName} ${user.lastName}`);
  return res.json({ message: 'Erfolgreich angemeldet' });
});

export default router;
