import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "שלום! 👋\nעייפ/ה מהכנת שיעורים?\nגם ככה ההוראה סוחטת ממך יותר מידי כח?\nאני כאן כדי לעזור לך ליצור את השיעור הבא שלך,\nבצורה הכי מוצלחת וקלה שיש.\n\nמה תרצה?\n• טיפים לכתיבת פרומט מדויק?\n• טלפון לרכישת מנוי לבית הספר שלך?\n• דיווח על שגיאה?\n\nBy the way - you can reply in English if you like",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (
      message.includes('טיפים') ||
      message.includes('טיפ') ||
      message.includes('tips') ||
      message.includes('advice')
    ) {
      return `🧑‍🏫 הנה 6 טיפים לכתיבת פרומט מוצלח ל־GPT לבניית שיעור מותאם:

1. ציין את גיל או כיתה התלמידים  
📌 כתוב באיזו כיתה מדובר או בני כמה התלמידים.  
דוגמה: "שיעור לתלמידי כיתה ד', בני 9–10."

2. תאר מה התלמידים כבר יודעים בנושא  
📌 כתוב בקצרה מהו הידע המקדים של התלמידים – מה למדו עד כה ומה עוד לא.  
דוגמה: "הם יודעים חיבור וחיסור, אך טרם למדו שברים."

3. כתוב מה מטרת השיעור  
📌 מה תרצה שהתלמידים יבינו או יצליחו לעשות בסוף השיעור.  
דוגמה: "שהתלמידים יבינו מהי אנרגיה מתחדשת ויוכלו לתת דוגמאות."

4. ציין את סגנון ההוראה או ההעדפה שלך  
📌 לדוגמה: למידה חווייתית, משחקית, שיח כיתתי.  
דוגמה: "חשוב לי לשלב דיון פתוח והפעלה קבוצתית."

5. כתוב כמה זמן יש לשיעור  
📌 ציין את משך השיעור כדי שיתאים לזמן שלך.  
דוגמה: "יש לי 45 דקות."

6. כתוב מה אתה צריך בפועל מהמערכת  
📌 מערך שיעור? שאלות? דפי עבודה?  
דוגמה: "אני צריך מערך שיעור מלא + דף עבודה לתלמידים."

בהצלחה בתכנון השיעור! 📚`;
    }

    if (
      message.includes('צור קשר') ||
      message.includes('חבילה') ||
      message.includes('מנוי') ||
      message.includes('לרכוש') ||
      message.includes('לקנות') ||
      message.includes('טלפון') ||
      message.includes('מספר') ||
      message.includes('contact') ||
      message.includes('number') ||
      message.includes('phone') ||
      message.includes('buy') ||
      message.includes('subscribe')
    ) {
      return "צור קשר במייל או בטלפון : aiplatform@gmail.com או בטלפון 03-1234567. אנחנו כאן כדי לעזור לך! 📞✉️";
    }

    if (
      message.includes('שגיאה') ||
      message.includes('bug') ||
      message.includes('error')
    ) {
      return "תודה על הדיווח! אנא שלח לנו את הפרטים במייל לכתובת aiplatform@gmail.com ואנחנו נבדוק את זה בהקדם. 🐞";
    }

    return "זו שאלה מעולה! לפרטים ספציפיים, אני ממליץ להתקשר לנציג בטלפון 03-1234567. הצוות שלנו ישמח לעזור לך! 🤗";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          >
            <MessageCircle className="h-8 w-8 text-white" />
          </Button>
        )}
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-scale-in" dir="rtl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🛍️</span>
                </div>
                <div>
                  <h3 className="font-semibold">סייעת ההוראה</h3>
                  <p className="text-sm opacity-90">זמין עכשיו</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2 space-x-reverse">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="הקלד את ההודעה שלך..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-right"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
