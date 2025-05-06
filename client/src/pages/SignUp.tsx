import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [form, setForm] = useState({
    username: '', email: '', password: '', skillLevel: 'Beginner'
  });
  const [addUser] = useMutation(ADD_USER);
  const nav = useNavigate();

  const onChange = (e:any) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e:any) => {
    e.preventDefault();
    form.skillLevel = form.skillLevel.toUpperCase();
    const { data } = await addUser({ variables: { input: form } });
    if (data?.addUser.token) nav('/select');
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <input  name="username"    placeholder="Username" onChange={onChange} required/>
      <input  name="email"       placeholder="Email"    onChange={onChange} type="email" required/>
      <input  name="password"    placeholder="Password" onChange={onChange} type="password" required/>
      <select name="skillLevel" value={form.skillLevel} onChange={onChange}>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
}
