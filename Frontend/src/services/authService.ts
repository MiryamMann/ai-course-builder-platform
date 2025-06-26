import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  form: {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
}

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedToken,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
  form: {
    name: '',
    email: '',
    password: '',
    phone: '',
  },
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    _: void,
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    const { email, password } = state.auth.form;
    try {
      const response = await api.post('/api/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }  }
);


export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    _: void,
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    const { email, password, name, phone } = state.auth.form;
    try {
      const response = await api.post('/api/auth/register', {
        email,
        password,
        name,
        phone,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    setFormField: (
      state,
      action: PayloadAction<{ field: keyof AuthState['form']; value: string }>
    ) => {
      state.form[action.payload.field] = action.payload.value;
    },
    clearForm: (state) => {
      state.form = { name: '', email: '', password: '', phone: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setFormField, clearForm,  } = authSlice.actions;
export default authSlice.reducer;
