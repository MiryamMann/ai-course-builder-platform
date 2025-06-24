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

  adminPrompts: PromptResponse[]; // ✅ חדש
  adminTotal: number;             // ✅ חדש
  adminPage: number;              // ✅ חדש
  adminSearch: string;            // ✅ חדש
}

const initialState: PromptState = {
  currentResponse: null,
  history: [],
  loading: false,
  error: null,
  openPromptId: null,

  adminPrompts: [], // ✅
  adminTotal: 0,    // ✅
  adminPage: 1,     // ✅
  adminSearch: '',  // ✅
};

// שליחת פרומפט לשרת
export const submitPrompt = createAsyncThunk(
  'prompt/submitPrompt',
  async (
    {
      prompt,
      categoryId,
      subCategoryId,
    }: { prompt: string; categoryId: string; subCategoryId: string },
    { rejectWithValue }
  ) => {
    try {
      const dataToSend = { prompt, categoryId, subCategoryId };
      const response = await api.post('api/prompts', dataToSend);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to submit prompt');
    }
  }
);

// קבלת היסטוריה של המשתמש
export const fetchUserHistory = createAsyncThunk(
  'prompt/fetchUserHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/prompts/user');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch history');
    }
  }
);

// קבלת פרומפטים לאדמין עם חיפוש ופייג'ינציה
export const fetchAdminPrompts = createAsyncThunk(
  'prompt/fetchAdminPrompts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { prompt: PromptState };
      const { adminPage, adminSearch } = state.prompt;

      const res = await api.get(`/api/admin/prompts?search=${adminSearch}&page=${adminPage}&pageSize=10`);
      return res.data; // מצופה שיכיל { prompts: [], total: number }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch admin prompts');
    }
  }
);

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
      state.adminPage = 1; // חזרה לעמוד ראשון
    },
    setAdminPage: (state, action: PayloadAction<number>) => {
      state.adminPage = action.payload;
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
      });
  },
});

export const {
  clearCurrentResponse,
  clearError,
  togglePrompt,
  setAdminSearch,
  setAdminPage,
} = promptSlice.actions;

export default promptSlice.reducer;
