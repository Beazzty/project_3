import { Schema, model } from 'mongoose';

export interface IVocabSet {
  word: string;
  translation: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
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
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
});

const VocabSet = model<IVocabSet>('VocabSet', vocabSetSchema);

export default VocabSet;
