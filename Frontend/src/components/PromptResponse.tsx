import React from 'react';

interface PromptResponseProps {
  response: string;
}

const PromptResponse: React.FC<PromptResponseProps> = ({ response }) => {
  return (
    <div className="mt-6 p-6 border border-gray-300 rounded-2xl bg-gray-50 shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">✨ Generated Lesson</h3>
      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
        {response}
      </div>
    </div>
  );
};

export default PromptResponse;
