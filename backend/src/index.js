// backend/src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import registerRoute      from './routes/register.js';
import disciplinesRoute   from './routes/disciplines.js';
import signupRoute        from './routes/signup.js';
import eventsRoute        from './routes/events.js';
import registrationsRoute from './routes/registrations.js';
import { auth }           from './middleware/auth.js';        // named import
import { authorizeLeader } from './middleware/authorize.js';  // named import

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Public‑Routes
app.use('/register',    registerRoute);
app.use('/disciplines', disciplinesRoute);

// Auth‑geschützte Routes
app.use('/signup', auth, signupRoute);
app.use('/events', auth, eventsRoute);

// Leader‑only Routes
app.use('/registrations', auth, authorizeLeader, registrationsRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
