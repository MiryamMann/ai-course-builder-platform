import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { registerUser } from '../redux/slices/authSlice';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom'; // Add this import

const Register = () => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate(); // Add this line

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser({ name, email, password, phone })).unwrap();
      toast({
        title: 'Registration successful!',
        description: `Welcome, ${result.user.name}`,
      });
      navigate('/lessons'); // Navigate to lessons after success
    } catch (err: any) {
      toast({
        title: 'Registration failed',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign Up</h2>
          <p className="mt-2 text-sm text-gray-600">Create your AI learning account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            </div>
            <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition disabled:opacity-50"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
export default Register;