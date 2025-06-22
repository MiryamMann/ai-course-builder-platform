
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">
            AI-Driven Learning Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock personalized learning experiences powered by artificial intelligence. 
            Submit your learning prompts and get tailored educational content instantly.
          </p>
          
          <div className="space-y-4">
            <Link to="/lessons">
              <Button size="lg" className="text-lg px-8 py-3">
                Go to Lessons
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Personalized Learning</h3>
              <p className="text-gray-600">
                Get AI-generated lessons tailored to your specific learning needs and interests.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Interactive Experience</h3>
              <p className="text-gray-600">
                Engage with an intelligent learning assistant that adapts to your pace and style.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed history and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
