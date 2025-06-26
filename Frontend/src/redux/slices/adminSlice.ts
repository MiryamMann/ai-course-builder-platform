import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Prompt {
  id: string;
  prompt: string;
  response: string;
  createdAt: string;
  category?: { name: string };
  subCategory?: { name: string };
  user?: { name: string };
}

interface AdminState {
  prompts: Prompt[];
  total: number;
  page: number;
  search: string;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  prompts: [],
  total: 0,
  page: 1,
  search: '',
  loading: false,
  error: null,
};

export const fetchAdminPrompts = createAsyncThunk(
  'admin/fetchAdminPrompts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { admin: AdminState };
      const { page, search } = state.admin;
      const res = await api.get(`/api/admin/prompts?search=${search}&page=${page}&pageSize=10`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch admin prompts');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setAdminPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action.payload.prompts;
        state.total = action.payload.total;
      })
      .addCase(fetchAdminPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAdminSearch, setAdminPage } = adminSlice.actions;
export default adminSlice.reducer;
