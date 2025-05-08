import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

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
  const [form, setForm] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN);
  const nav = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { input: { email: form.email, password: form.password } } });
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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-[#006847]/10">
        <h1 className="text-3xl font-bold text-[#006847] mb-8 text-center">Welcome Back!</h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#006847] mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full p-3 rounded-lg border-2 border-[#006847]/20 focus:border-[#006847] focus:ring-2 focus:ring-[#006847]/20 outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#006847] mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={onChange}
              required
              className="w-full p-3 rounded-lg border-2 border-[#006847]/20 focus:border-[#006847] focus:ring-2 focus:ring-[#006847]/20 outline-none transition-all duration-300"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full mt-8 px-6 py-3 bg-[#006847] text-white rounded-lg font-semibold hover:bg-[#004225] transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
