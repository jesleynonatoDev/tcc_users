import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const UserModel = mongoose.model('user', userSchema);