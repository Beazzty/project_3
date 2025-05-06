import { Schema, model, Document, Types } from 'mongoose';
export interface IResult extends Document {
  userId: Types.ObjectId;
  vocabId: Types.ObjectId;
  correct: Boolean;
  createdAt: Date;
}
const resultSchema = new Schema<IResult>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vocabId: {
      type: Schema.Types.ObjectId,
      ref: 'VocabSet',
      required: true,
    },
    correct: {
      type: Boolean,
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