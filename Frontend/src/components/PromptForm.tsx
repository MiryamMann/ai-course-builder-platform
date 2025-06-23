import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
} from '@/redux/slices/categorySlice';
import { submitPrompt } from '@/redux/slices/promptSlice';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { RootState, AppDispatch } from '@/redux/store';
import { Link } from 'react-router-dom';
import PromptResponse from '../pages/PromptResponse'; 

const PromptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showResponse, setShowResponse] = useState(false); // <--- חדש

  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();

  const {
    categories,
    selectedCategoryId,
    selectedSubCategoryId,
    loading,
  } = useSelector((state: RootState) => state.category);

  const currentResponse = useSelector((state: RootState) => state.prompt.currentResponse);

  const selectedCategory = Array.isArray(categories)
    ? categories.find((c) => c.id === selectedCategoryId)
    : undefined;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (!prompt.trim()) return;

    dispatch(
      submitPrompt({
        prompt,
        categoryId: selectedCategoryId || undefined,
        subCategoryId: selectedSubCategoryId || undefined,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setShowResponse(true);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {showResponse && currentResponse ? (
        <>
          <PromptResponse response={currentResponse} />
          <Button onClick={() => setShowResponse(false)} className="mt-4">
            🔄 Submit another prompt
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <select
                value={selectedCategoryId}
                onChange={(e) => dispatch(setSelectedCategoryId(e.target.value))}
                className="w-full border p-2 rounded"
              >
                <option value="">Select a category</option>
                {(Array.isArray(categories) ? categories : []).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory?.subCategories?.length > 0 && (
              <div>
                <Label>Subcategory</Label>
                <select
                  value={selectedSubCategoryId}
                  onChange={(e) => dispatch(setSelectedSubCategoryId(e.target.value))}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select a sub-category</option>
                  {selectedCategory.subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <Label>Prompt</Label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              rows={4}
              className="w-full border p-2 rounded"
            />
          </div>

          <Button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? 'Generating...' : 'Submit'}
          </Button>
        </form>
      )}

      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <p>You must log in to submit prompts.</p>
          <div className="flex gap-2 mt-4">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">Register</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptForm;
