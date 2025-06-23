import React, { useState, useRef, useEffect } from 'react';

// Standalone embeddable chatbot component
const EmbeddableChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "שלום! 👋 אני כאן כדי לעזור לך ליצור את השיעור הבא שלך, בצורה הכי מוצלחת ומהירה שיש. מה תרצה? טיפים לכתיבת פרומט מדויק? טלפון לרכישת מנוי לבית הספר שלך? דיווח על שגיאה? By the way - you can replay in English if you like",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
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
      message.includes('contact') ||
      message.includes('number') ||
      message.includes('phone') ||
      message.includes('טלפון') ||
      message.includes('מספר') ||
      message.includes('contact us')
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

    return "זו שאלה מעולה! לפרטים ספציפיים, אני ממליץ להתקשר לחנות שלנו בטלפון 03-1234567. הצוות שלנו ישמח לעזור לך! 🤗";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // NOTE: rendering and styles code remain unchanged...

  return null; // for brevity, UI code was excluded in this document.
};

export default EmbeddableChatbot;
