import api from './api'; // ✅ שימוש ב־api שמוגדר עם baseURL ו־interceptors

// שליפת כל הקטגוריות עם תתי-קטגוריות
export const getAllCategories = async () => {
  const response = await api.get('/api/categories');
  return response.data;
};

// יצירת קטגוריה חדשה
export const createCategory = async (name: string) => {
  const response = await api.post('/api/categories', { name });
  return response.data;
};

// הוספת תת־קטגוריה לקטגוריה קיימת
export const addSubCategory = async (categoryId: string, name: string) => {
  const response = await api.post(`/api/categories/${categoryId}/subcategories`, { name });
  return response.data;
};
