// src/pages/Intermediate.tsx
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_QUIZ } from '../utils/queries';
import styles from '../assets/form.module.css';
import QuizForm from '../components/QuizForm';

export default function Intermediate() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_QUIZ, {
    variables: { level: 'INTERMEDIATE' },
  });

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error loading quiz</p>;

  return (
    <div className={styles.form}>
      <h1>Intermediate Quiz</h1>

      <QuizForm questions={data?.flashcardsByLevel} />
    </div>
  );
}
