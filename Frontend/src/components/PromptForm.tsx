
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCategories, 
  fetchSubcategories, 
  submitPrompt, 
  setSelectedCategory, 
  setSelectedSubcategory 
} from '../redux/slices/promptSlice';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';

const PromptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();
  const { 
    categories, 
    subcategories, 
    selectedCategory, 
    selectedSubcategory, 
    loading, 
    currentResponse 
  } = useSelector((state: RootState) => state.prompt);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    if (categoryId) {
      dispatch(fetchSubcategories(categoryId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    if (!prompt.trim()) return;
    
    dispatch(submitPrompt({
      prompt,
      categoryId: selectedCategory || undefined,
      subcategoryId: selectedSubcategory || undefined,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">AI Learning Assistant</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category (Optional)</Label>
              <select
                id="category"
                value={selectedCategory || ''}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedCategory && subcategories.length > 0 && (
              <div>
                <Label htmlFor="subcategory">Subcategory (Optional)</Label>
                <select
                  id="subcategory"
                  value={selectedSubcategory || ''}
                  onChange={(e) => dispatch(setSelectedSubcategory(e.target.value))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="prompt">Your Learning Prompt</Label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What would you like to learn about today?"
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full"
          >
            {loading ? 'Generating lesson...' : 'Submit Prompt'}
          </Button>
        </form>
      </div>
      
      {currentResponse && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">AI Response</h3>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{currentResponse}</p>
          </div>
        </div>
      )}
      
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>You need to be logged in to submit prompts and access AI lessons.</p>
            <div className="flex space-x-2">
              <Link to="/login" className="flex-1">
                <Button className="w-full">Login</Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button variant="outline" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptForm;
