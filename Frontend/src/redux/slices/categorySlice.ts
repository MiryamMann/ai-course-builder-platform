import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllCategories,
  createCategory,
  addSubCategory,
} from '@/services/categoryService';

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
  createdAt: string;
  updatedAt: string;
}

interface CategoryState {
  categories: Category[];
  selectedCategoryId: string;
  selectedSubCategoryId: string;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategoryId: '',
  selectedSubCategoryId: '',
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await getAllCategories();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const createNewCategory = createAsyncThunk<Category, string>(
  'categories/createCategory',
  async (name, thunkAPI) => {
    try {
      return await createCategory(name);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create category');
    }
  }
);

export const addNewSubCategory = createAsyncThunk<
    SubCategory,
    { categoryId: string; name: string }
>('categories/addSubCategory', async ({ categoryId, name }, thunkAPI) => {
    try {
        return await addSubCategory(categoryId, name);
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add subcategory');
    }
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
      state.selectedSubCategoryId = '';
    },
    setSelectedSubCategoryId: (state, action) => {
      state.selectedSubCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(addNewSubCategory.fulfilled, (state, action) => {
        const category = state.categories.find(c => c.id === action.payload.categoryId);
        if (category) {
          category.subCategories.push(action.payload);
        }
      });
  },
});

export const {
  setSelectedCategoryId,
  setSelectedSubCategoryId,
} = categorySlice.actions;

export default categorySlice.reducer;
