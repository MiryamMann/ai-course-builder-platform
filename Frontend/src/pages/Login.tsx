import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { loginUser } from '../redux/slices/authSlice';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom'; // ✅ לצורך ניתוב

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // ✅ מוסיפים ניתוב
  const { error, loading } = useAppSelector((state) => state.auth);
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      // ✅ שמירת המשתמש ב-localStorage
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.accessToken);

      // ✅ Toast ברוך הבא
      toast({
        title: 'Welcome back!',
        description: `Hello ${result.user.name}`,
      });

      // ✅ ניתוב ל־/lessons
      navigate('/lessons');
    } catch (err: any) {
      toast({
        title: 'Login failed',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">Access your AI learning dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
