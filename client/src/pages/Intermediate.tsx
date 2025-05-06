// src/pages/Intermediate.tsx
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_QUIZ } from '../utils/queries';
import styles from '../assets/form.module.css';

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

      {data.flashcardsByLevel.map((q: any) => (
        <div key={q._id}>
          <p>{q.word}</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {q.options.map((opt: string, i: number) => (
              <button key={i} type="button">
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Push the submit button down */}
      <div style={{ flexGrow: 1 }} />

      {/* Bottom‐right submit */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" onClick={() => navigate('/stats')}>
          Submit
        </button>
      </div>
    </div>
  );
}
