import api from './api'; // זה ה־axios עם baseURL = 'http://localhost:3000/api'

export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials); // בלי /api
  const { accessToken, refreshToken } = res.data;
  localStorage.setItem('token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post('/auth/register', data); // בלי /api
  const { accessToken, refreshToken } = res.data;
  localStorage.setItem('token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};
