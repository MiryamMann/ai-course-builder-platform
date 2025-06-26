import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import {
  fetchAdminPrompts,
  setAdminPage,
  setAdminSearch,
} from '@/redux/slices/adminSlice';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import PromptItem from '@/components/PromptItem';

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prompts, total, page, search, loading } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminPrompts());
  }, [dispatch, page, search]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

          <input
            type="text"
            placeholder="Search prompts or users...(Just don't be too nosy!)"
            className="border p-2 rounded mb-4 w-full"
            value={search}
            onChange={(e) => dispatch(setAdminSearch(e.target.value))}
          />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-2">
              {prompts.map((p) => (
                <PromptItem key={p.id} prompt={p} />
              ))}
            </ul>
          )}

          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              disabled={page <= 1}
              onClick={() => dispatch(setAdminPage(page - 1))}
            >
              Previous
            </button>
            <span className="px-4 py-2">{page}</span>
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              disabled={prompts.length < 10}
              onClick={() => dispatch(setAdminPage(page + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
