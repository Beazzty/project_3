import { Schema, model, Document, Types } from 'mongoose';
export interface IResult extends Document {
  userId: Types.ObjectId;
  numQuestions: number;
  numCorrect: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Date;
}
const resultSchema = new Schema<IResult>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    numQuestions: {
      type: Number,
      required: true,
    },
    numCorrect: {
      type: Number,
      required: true,
    },
    skillLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);
const Result = model<IResult>('Result', resultSchema);
export default Result;