import { memo } from 'react';

interface PromptItemProps {
  prompt: {
    id: string;
    prompt: string;
    response: string;
    user?: { name: string };
    category?: { name: string };
    subCategory?: { name: string };
  };
}

const PromptItem = ({ prompt }: PromptItemProps) => {
  return (
    <li className="border rounded p-3 shadow">
      <div className="text-sm text-gray-500">
        {prompt.category?.name} / {prompt.subCategory?.name} | {prompt.user?.name}
      </div>
      <div className="font-semibold">{prompt.prompt}</div>
      <div className="text-gray-600 whitespace-pre-wrap">{prompt.response}</div>
    </li>
  );
};

export default memo(PromptItem, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.prompt) === JSON.stringify(nextProps.prompt);
});
