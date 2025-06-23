
import React from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`flex items-end space-x-2 max-w-xs ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.isBot 
            ? 'bg-blue-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          <span className="text-sm">
            {message.isBot ? '🤖' : '👤'}
          </span>
        </div>
        
        {/* Message bubble */}
        <div className="flex flex-col">
          <div className={`rounded-2xl px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md ${
            message.isBot
              ? 'bg-white text-gray-800 rounded-bl-md'
              : 'bg-blue-500 text-white rounded-br-md'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          </div>
          <span className={`text-xs text-gray-500 mt-1 ${message.isBot ? 'text-left' : 'text-right'}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
