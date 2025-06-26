import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PromptResponse = () => {
  const response = useSelector((state: RootState) => state.prompt.currentResponse);

  if (!response) return null;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Response</h2>
      <p>{response}</p>
    </div>
  );
};

export default PromptResponse;
