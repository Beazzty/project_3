import { Schema, model } from 'mongoose';

export interface IVocabSet {
word: string;
translation: string;
level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

const vocabSetSchema = new Schema<IVocabSet>({
  word: {
    type: String,
    required: true,
    trim: true,
  },
  translation: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    required: true,
  },
});

const VocabSet = model<IVocabSet>('VocabSet', vocabSetSchema);

export default VocabSet;
