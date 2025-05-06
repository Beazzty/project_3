// src/pages/Intermediate.tsx
import { useQuery } from '@apollo/client';
import { GET_QUIZ }   from '../utils/queries';

export default function Intermediate() {
  const { loading, error, data } = useQuery(GET_QUIZ, {
    variables: { level: 'INTERMEDIATE' }
  });
  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error!</p>;

  return (
    <div>
      <h1>Intermediate Quiz</h1>
      {data.flashcardsByLevel.map((q:any) => (
        <div key={q._id}>
          <p>{q.word}</p>
          {q.options.map((opt:string,i:number) =>
            <button key={i}>{opt}</button>
          )}
        </div>
      ))}
    </div>
  );
}
