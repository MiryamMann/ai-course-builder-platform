import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface PromptResponse {
  id: string;
  prompt: string;
  response: string;
  categoryId: string;
  subCategoryId: string;
  createdAt: string;
  user?: { name: string };
  category?: { name: string };
  subCategory?: { name: string };
}

interface PromptState {
  currentResponse: string | null;
  history: PromptResponse[];
  loading: boolean;
  error: string | null;
  openPromptId: string | null;

  adminPrompts: PromptResponse[];
  adminTotal: number;
  adminPage: number;
  adminSearch: string;

  promptText: string;
  categoryId: string;
  subCategoryId: string;
  step: number;
}

const initialState: PromptState = {
  currentResponse: null,
  history: [],
  loading: false,
  error: null,
  openPromptId: null,

  adminPrompts: [],
  adminTotal: 0,
  adminPage: 1,
  adminSearch: '',

  promptText: '',
  categoryId: '',
  subCategoryId: '',
  step: 1,
};

// Thunks

export const fetchPromptById = createAsyncThunk(
  'prompt/fetchPromptById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/prompts/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch prompt');
    }
  }
);

export const submitPrompt = createAsyncThunk(
  'prompt/submitPrompt',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { prompt: PromptState };
      const { promptText, categoryId, subCategoryId } = state.prompt;
      const dataToSend = { prompt: promptText, categoryId, subCategoryId };
      const response = await api.post('/api/prompts', dataToSend);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to submit prompt');
    }
  }
);

export const fetchUserHistory = createAsyncThunk(
  'prompt/fetchUserHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('api/user/history');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch history');
    }
  }
);

export const fetchAdminPrompts = createAsyncThunk(
  'prompt/fetchAdminPrompts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { prompt: PromptState };
      const { adminPage, adminSearch } = state.prompt;
      const res = await api.get(`/api/admin/prompts?search=${adminSearch}&page=${adminPage}&pageSize=10`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch admin prompts');
    }
  }
);

// Slice

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    clearCurrentResponse: (state) => {
      state.currentResponse = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    togglePrompt: (state, action: PayloadAction<string>) => {
      state.openPromptId = state.openPromptId === action.payload ? null : action.payload;
    },
    setAdminSearch: (state, action: PayloadAction<string>) => {
      state.adminSearch = action.payload;
      state.adminPage = 1;
    },
    setAdminPage: (state, action: PayloadAction<number>) => {
      state.adminPage = action.payload;
    },
    setPromptText: (state, action: PayloadAction<string>) => {
      state.promptText = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    setSubCategoryId: (state, action: PayloadAction<string>) => {
      state.subCategoryId = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    clearPromptForm: (state) => {
      state.promptText = '';
      state.categoryId = '';
      state.subCategoryId = '';
      state.step = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResponse = action.payload.response;
        state.history.unshift(action.payload);
      })
      .addCase(submitPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(fetchAdminPrompts.fulfilled, (state, action) => {
        state.adminPrompts = action.payload.prompts;
        state.adminTotal = action.payload.total;
      })
      .addCase(fetchPromptById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromptById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResponse = action.payload.response;
      })
      .addCase(fetchPromptById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearCurrentResponse,
  clearError,
  togglePrompt,
  setAdminSearch,
  setAdminPage,
  setPromptText,
  setCategoryId,
  setSubCategoryId,
  setStep,
  clearPromptForm,
} = promptSlice.actions;

export default promptSlice.reducer;
