import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { useToast } from '@/hooks/use-toast';
import { AppDispatch } from '@/redux/store';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: any) => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      toast({
        title: 'Welcome back!',
        description: `Hello ${result.user.name}`,
      });
      navigate('/lessons');
    } catch (err: any) {
      toast({
        title: 'Login failed',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};
