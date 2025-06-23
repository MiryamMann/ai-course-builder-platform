import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface PromptResponse {
  id: string;
  prompt: string;
  response: string;
  categoryId: string;
  subCategoryId: string;
  createdAt: string;
}

interface PromptState {
  currentResponse: string | null;
  history: PromptResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  currentResponse: null,
  history: [],
  loading: false,
  error: null,
};

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
      const dataToSend = {
        prompt,
        categoryId,
        subCategoryId,

      };

      console.log('📤 שולח את הנתונים:', dataToSend);

      const response = await api.post('api/prompts', dataToSend);

      console.log('✅ תגובה מהשרת:', response.data);

      return response.data;
    } catch (error: any) {
      console.error('❌ שגיאה מהשרת:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Failed to submit prompt');
    }
  }
);


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
      });
  },

});


export const { clearCurrentResponse, clearError } = promptSlice.actions;
export default promptSlice.reducer;
