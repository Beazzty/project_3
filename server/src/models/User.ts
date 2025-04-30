import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: string; // Change ObjectId to string for compatibility with AuthPayload
  username: string;
  email: string;
  password: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  vocabProgress: { vocabId: Schema.Types.ObjectId; correct: number; incorrect: number }[];
  isCorrectPassword(password: string): Promise<boolean>; // Add method signature
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
});

// Hash user's password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
