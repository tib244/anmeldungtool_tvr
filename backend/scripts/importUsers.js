// backend/scripts/importUsers.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import xlsx from 'xlsx';
import User from '../src/models/User.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('💾 MongoDB verbunden');

  // Excel einlesen
  const path = 'data/users.xlsx';
  const workbook = xlsx.readFile(path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet);

  for (const row of rows) {
    const firstName = String(row.Vorname || '').trim();
    const lastName  = String(row.Nachname || '').trim();
    const roles     = row.Rollen
      ? String(row.Rollen).split(',').map(s => s.trim())
      : [];
    const discs     = row.Disziplinen
      ? String(row.Disziplinen).split(',').map(s => s.trim())
      : [];

    if (!firstName || !lastName) continue;

    // Upsert: aktualisieren oder neu anlegen
    await User.updateOne(
      { firstName, lastName },
      {
        $set: { roles, disciplines: discs },
        $setOnInsert: { uid: `${firstName}-${lastName}-${Date.now()}` }
      },
      { upsert: true }
    );
    console.log(`✔ ${firstName} ${lastName} → Rollen: [${roles.join(', ')}], Disziplinen: [${discs.join(', ')}]`);
  }

  console.log('🛑 Import abgeschlossen');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
