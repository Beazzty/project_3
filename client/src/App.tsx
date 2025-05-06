import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-100-vh flex-column justify-center align-center bg-primary">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
