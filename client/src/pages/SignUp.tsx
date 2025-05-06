import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'; // Ensure this file exists at the specified path or update the path to the correct location
import styles from '../assets/form.module.css';

export default function SignUp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    skillLevel: 'Beginner',
  });

  const [addUser] = useMutation(ADD_USER);
  const nav = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.skillLevel = form.skillLevel.toUpperCase();
    try {
      const { data } = await addUser({ variables: { input: form } });
      if (data?.addUser.token) {
        Auth.login(data.addUser.token);
        nav('/select');
      }
    } catch (err) {
      console.error(err);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h1>Sign Up</h1>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={onChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
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
      <select name="skillLevel" value={form.skillLevel} onChange={onChange}>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
}
