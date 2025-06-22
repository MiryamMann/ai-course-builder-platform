
import PromptForm from '../components/PromptForm';
import Navbar from '../components/Navbar';

const Lessons = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <PromptForm />
      </div>
    </div>
  );
};

export default Lessons;
