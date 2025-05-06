import { useLocation, Link } from 'react-router-dom';

export default function NotFound() {
  let loc = useLocation();
  return (
    <div>
      <h1>404: No page at “{loc.pathname}”</h1>
      <Link to="/"><button>Go Home</button></Link>
    </div>
  );
}
