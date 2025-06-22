
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Category {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface PromptResponse {
  id: string;
  prompt: string;
  response: string;
  categoryId?: string;
  subcategoryId?: string;
  createdAt: string;
}

interface PromptState {
  categories: Category[];
  subcategories: Subcategory[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  currentResponse: string | null;
  history: PromptResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  categories: [],
  subcategories: [],
  selectedCategory: null,
  selectedSubcategory: null,
  currentResponse: null,
  history: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchCategories = createAsyncThunk(
  'prompt/fetchCategories',
  async () => {
    const response = await api.get('/api/categories');
    return response.data;
  }
);

export const fetchSubcategories = createAsyncThunk(
  'prompt/fetchSubcategories',
  async (categoryId: string) => {
    const response = await api.get(`/api/subcategories/${categoryId}`);
    return response.data;
  }
);

export const submitPrompt = createAsyncThunk(
  'prompt/submit',
  async (promptData: { 
    prompt: string; 
    categoryId?: string; 
    subcategoryId?: string; 
  }) => {
    const response = await api.post('/api/prompts', promptData);
    return response.data;
  }
);

export const fetchUserHistory = createAsyncThunk(
  'prompt/fetchUserHistory',
  async () => {
    const response = await api.get('/api/prompts/user');
    return response.data;
  }
);

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedSubcategory = null;
      state.subcategories = [];
    },
    setSelectedSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
    },
    clearCurrentResponse: (state) => {
      state.currentResponse = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Fetch subcategories
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategories = action.payload;
      })
      // Submit prompt
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
        state.error = action.error.message || 'Failed to submit prompt';
      })
      // Fetch user history
      .addCase(fetchUserHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export const { 
  setSelectedCategory, 
  setSelectedSubcategory, 
  clearCurrentResponse, 
  clearError 
} = promptSlice.actions;
export default promptSlice.reducer;
