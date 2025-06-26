import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setSubCategoryId,
  setPromptText,
  submitPrompt,
  clearCurrentResponse,
} from '@/redux/slices/promptSlice';
import { fetchCategories } from '@/redux/slices/categorySlice';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { RootState, AppDispatch } from '@/redux/store';
import { Link } from 'react-router-dom';
import PromptResponse from '../pages/PromptResponse';
import { useState } from 'react';

const PromptForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const {
    categoryId,
    subCategoryId,
    promptText,
    currentResponse,
    loading,
  } = useSelector((state: RootState) => state.prompt);

  const {
    categories,
    selectedCategoryId,
    selectedSubCategoryId,
  } = useSelector((state: RootState) => state.category);

  const selectedCategory = categories?.find((c) => c.id === categoryId);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const AnimatedDots = () => {
    const [dotCount, setDotCount] = useState(1);
    useEffect(() => {
      if (!loading) return;
      const interval = setInterval(() => {
        setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
      }, 400);
      return () => clearInterval(interval);
    }, [loading]);
    return <span>{'.'.repeat(dotCount)}</span>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (!promptText.trim()) return;

    dispatch(submitPrompt()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setShowResponse(true);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {showResponse && currentResponse ? (
        <>
          <PromptResponse />
          <Button
            onClick={() => {
              setShowResponse(false);
              dispatch(clearCurrentResponse());
            }}
            className="mt-4"
          >
            🔄 Submit another prompt
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <select
                value={categoryId}
                onChange={(e) => dispatch(setCategoryId(e.target.value))}
                className="w-full border p-2 rounded"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
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
                  value={subCategoryId}
                  onChange={(e) => dispatch(setSubCategoryId(e.target.value))}
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
              value={promptText}
              onChange={(e) => dispatch(setPromptText(e.target.value))}
              required
              rows={4}
              className="w-full border p-2 rounded"
            />
          </div>

          <Button type="submit" disabled={loading || !promptText.trim()}>
            {loading ? (
              <>
                Generating<AnimatedDots />
              </>
            ) : (
              'Submit'
            )}
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
