import { Link } from 'react-router-dom';

export default function SkillSelect() {
  return (
    <div>
      <h1>Select Your Level</h1>
      <Link to="/beginner"><button>Beginner</button></Link>{' '}
      <Link to="/intermediate"><button>Intermediate</button></Link>{' '}
      <Link to="/advanced"><button>Advanced</button></Link>
    </div>
  );
}
