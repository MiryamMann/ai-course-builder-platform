import api from './api'; 

export const getAllCategories = async () => {
  const response = await api.get('/api/categories');
  return response.data;
};

export const createCategory = async (name: string) => {
  const response = await api.post('/api/categories', { name });
  return response.data;
};

export const addSubCategory = async (categoryId: string, name: string) => {
  const response = await api.post(`/api/categories/${categoryId}/subcategories`, { name });
  return response.data;
};
