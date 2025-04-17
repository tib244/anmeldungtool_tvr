import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  roles: [String],       // z.B. ['member','leader']
  disciplines: [String]  // z.B. ['Turnen']
});

export default mongoose.model('User', UserSchema);
