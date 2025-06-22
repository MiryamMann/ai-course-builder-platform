
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserHistory } from '../redux/slices/promptSlice';
import { RootState, AppDispatch } from '../redux/store';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const HistoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { history } = useSelector((state: RootState) => state.prompt);

  useEffect(() => {
    dispatch(fetchUserHistory());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No prompts submitted yet.</p>
      ) : (
        history.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="border-b pb-3 mb-3">
              <h3 className="font-semibold text-lg">Prompt</h3>
              <p className="text-gray-700">{item.prompt}</p>
              <span className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">AI Response</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{item.response}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const History = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8">Your Learning History</h1>
          <HistoryList />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default History;
