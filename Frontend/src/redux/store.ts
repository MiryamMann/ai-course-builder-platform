
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import promptReducer from './slices/promptSlice';
import categoryReducer from './slices/categorySlice';
import adminReducer from './slices/adminSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    prompt: promptReducer,
    admin: adminReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
