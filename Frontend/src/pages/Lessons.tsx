
import PromptForm from '../components/PromptForm';
import Navbar from '../components/Navbar';
import Chatbot from '@/components/ChatBot/Chatbot';

const Lessons = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <PromptForm />
        <Chatbot/>
      </div>
    </div>
  );
};

export default Lessons;
