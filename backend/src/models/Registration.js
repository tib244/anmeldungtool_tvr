import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  disciplines: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Registration', RegistrationSchema);
