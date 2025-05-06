import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username:'', password:'' });
  const [login] = useMutation(LOGIN);
  const nav = useNavigate();

  const onChange = (e:any) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e:any) => {
    e.preventDefault();
    const { data } = await login({ variables: { input: {...form, email: ''} } });
    if (data?.login.token) nav('/select');
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Log In</h1>
      <input  name="username" placeholder="Username" onChange={onChange} required/>
      <input  name="password" placeholder="Password" type="password" onChange={onChange} required/>
      <button type="submit">Log In</button>
    </form>
  );
}
