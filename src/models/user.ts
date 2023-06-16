import { Document, Schema, model } from 'mongoose';
import { UserInterface } from '@src/interfaces/userInterface';

export interface UserModelInterface extends UserInterface, Document {
    fullName(): string;
}

export const schema: Schema = new Schema({
    createAt: Date,
    email: String,
    firstName: String,
    lastName: String,
    userName: String
});

schema.pre('save', (next) => {
  const now = new Date();
  if (!this.createAt) {
    this.createAt = now;
  }
  next();
});
schema.methods.fullName = (): string => {
  return `${this.firstName} ${this.lastName}`;
};

export const UserModel = model('User', schema)