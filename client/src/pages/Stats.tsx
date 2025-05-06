import { useQuery } from '@apollo/client';
import { GET_ME, GET_STATS } from '../utils/queries';

export default function Stats() {
  const { data: meD } = useQuery(GET_ME);
  const userId = meD?.me?._id;
  const { loading, data } = useQuery(GET_STATS, {
    skip: !userId,
    variables: { userId }
  });

  if (!userId)    return <p>Please log in to see your stats.</p>;
  if (loading)    return <p>Loading stats…</p>;

  return (
    <div>
      <h1>Your Stats</h1>
      {data.statsByUser.map((s:any) => (
        <p key={s._id}>
          {s.skillLevel}: {s.numCorrect}/{s.numQuestions} @{' '}
          {new Date(s.createdAt).toLocaleTimeString()}
        </p>
      ))}
    </div>
  );
}
