import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { registerUser, setFormField, clearError, clearForm } from '../redux/slices/authSlice';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { form, error, loading } = useAppSelector((state) => state.auth);
  const [formErrors, setFormErrors] = useState<{ [K in keyof typeof form]?: string }>({});

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateForm = () => {
    const errors: typeof formErrors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Invalid email format';
    if (!form.password) errors.password = 'Password is required';
    else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!form.phone) errors.phone = 'Phone is required';
    else if (!/^\+?\d{7,15}$/.test(form.phone)) errors.phone = 'Invalid phone number';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    dispatch(setFormField({ field, value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await dispatch(registerUser()).unwrap();
      toast({
        title: 'Registration successful!',
        description: `Welcome, ${result.user.name}`,
      });
      dispatch(clearForm());
      navigate('/lessons');
    } catch (err: any) {
      toast({
        title: 'Registration failed',
        description: err || 'Something went wrong',
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
          {(['name', 'email', 'password', 'phone'] as const).map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
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
};

export default Register;
