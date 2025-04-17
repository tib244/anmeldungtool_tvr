import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  location: String,
  disciplines: [String]  // welche Disziplinen angeboten werden
});

export default mongoose.model('Event', EventSchema);
