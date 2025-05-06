import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/form.module.css';

const Auth = {
  login: (token: string) => {
    localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [login] = useMutation(LOGIN);
  const nav = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { input: { ...form, email: '' } } });
      if (data?.login.token) {
        Auth.login(data.login.token);
        nav('/select');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h1>Log In</h1>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={onChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={onChange}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}
