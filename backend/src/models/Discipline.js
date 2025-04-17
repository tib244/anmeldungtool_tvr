import mongoose from 'mongoose';

const DisciplineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

export default mongoose.model('Discipline', DisciplineSchema);
