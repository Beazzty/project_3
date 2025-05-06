import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div>
      <h1>Welcome to Spanish Quiz</h1>
      <Link to="signup"><button>Sign Up</button></Link>{' '}
      <Link to="login"><button>Log In</button></Link>
    </div>
  );
}
