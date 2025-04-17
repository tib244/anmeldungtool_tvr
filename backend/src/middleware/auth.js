import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET = process.env.JWT_SECRET;

export async function auth(req, res, next) {
  try {
    const token = req.cookies.memberToken;
    if (!token) return res.status(401).json({ error: 'Nicht angemeldet' });
    const payload = jwt.verify(token, SECRET);
    const user = await User.findOne({ uid: payload.uid });
    if (!user) return res.status(401).json({ error: 'Ungültiger Nutzer' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Auth fehlgeschlagen' });
  }
}
