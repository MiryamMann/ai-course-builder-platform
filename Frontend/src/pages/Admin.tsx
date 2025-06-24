import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  togglePrompt,
  fetchAdminPrompts,
  setAdminSearch,
  setAdminPage,
} from '../redux/slices/promptSlice';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    openPromptId,
    adminPrompts,
    adminSearch,
    adminPage,
    adminTotal,
  } = useSelector((state: RootState) => state.prompt);

  useEffect(() => {
    dispatch(fetchAdminPrompts(undefined));
  }, [dispatch, adminSearch, adminPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearch(e.target.value));
  };

  const totalPages = Math.ceil(adminTotal / 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full p-2 border rounded"
            value={adminSearch}
            onChange={handleSearchChange}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Prompts ({adminTotal})</h2>
          <div className="space-y-4 max-h-[480px] overflow-y-auto">
            {adminPrompts.map((prompt) => {
              const isExpanded = openPromptId === prompt.id;
              return (
                <div key={prompt.id} className="border-b pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">{prompt.user?.name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 italic mb-1">
                    Category: {prompt.category?.name} | Sub: {prompt.subCategory?.name}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Prompt:</strong> {prompt.prompt}
                  </p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    <strong>Response:</strong>{' '}
                    {isExpanded ? prompt.response : `${prompt.response.substring(0, 150)}...`}
                  </p>
                  <button
                    className="mt-1 text-blue-600 text-sm underline"
                    onClick={() => dispatch(togglePrompt(prompt.id))}
                  >
                    {isExpanded ? 'הסתר שיעור' : 'הצג שיעור מלא'}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded border ${
                  adminPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-600'
                }`}
                onClick={() => dispatch(setAdminPage(page))}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default Admin;
