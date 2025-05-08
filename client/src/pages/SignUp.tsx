import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'; // Ensure this file exists at the specified path or update the path to the correct location

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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-[#006847]/10">
        <h1 className="text-3xl font-bold text-[#006847] mb-8 text-center">Join VIVA VOCAB</h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#006847] mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              placeholder="Choose a username"
              value={form.username}
              onChange={onChange}
              required
              className="w-full p-3 rounded-lg border-2 border-[#006847]/20 focus:border-[#006847] focus:ring-2 focus:ring-[#006847]/20 outline-none transition-all duration-300"
            />
          </div>

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
              placeholder="Create a password"
              value={form.password}
              onChange={onChange}
              required
              className="w-full p-3 rounded-lg border-2 border-[#006847]/20 focus:border-[#006847] focus:ring-2 focus:ring-[#006847]/20 outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="skillLevel" className="block text-sm font-medium text-[#006847] mb-2">
              Skill Level
            </label>
            <select 
              id="skillLevel"
              name="skillLevel" 
              value={form.skillLevel} 
              onChange={onChange}
              className="w-full p-3 rounded-lg border-2 border-[#006847]/20 focus:border-[#006847] focus:ring-2 focus:ring-[#006847]/20 outline-none transition-all duration-300"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full mt-8 px-6 py-3 bg-[#006847] text-white rounded-lg font-semibold hover:bg-[#004225] transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
