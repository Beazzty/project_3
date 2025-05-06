// src/pages/Beginner.tsx
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_QUIZ } from '../utils/queries';
import styles from '../assets/form.module.css';
import QuizForm from '../components/QuizForm';

export default function Beginner() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_QUIZ, {
    variables: { level: 'BEGINNER' },
  });

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error loading quiz</p>;

  // We'll assume each q has: q.word and q.options (array of strings)
  return (
    <div className={styles.form}>
      <h1>Beginner Quiz</h1>

      <QuizForm questions={data?.flashcardsByLevel} />
    </div>
  );
}
