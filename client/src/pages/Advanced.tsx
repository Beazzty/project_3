// src/pages/Advanced.tsx
import { useQuery } from '@apollo/client';
import { GET_QUIZ } from '../utils/queries';
import styles from '../assets/form.module.css';
import QuizForm from '../components/QuizForm';

export default function Advanced() {
  const { loading, error, data } = useQuery(GET_QUIZ, {
    variables: { level: 'ADVANCED' },
  });

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error loading quiz</p>;

  return (
    <div className={styles.form}>
      <h1>Advanced Quiz</h1>

      <QuizForm questions={data?.flashcardsByLevel} />
    </div>
  );
}
