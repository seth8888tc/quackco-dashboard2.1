
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useTranslation } from '../LanguageContext';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AiChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiChatWindow: React.FC<AiChatWindowProps> = ({ isOpen, onClose }) => {
  const { language } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: language === 'zh' ? '你好！我是 QuackcoPulse 神经引擎。有什么可以帮您的？' : 'Hello! I am the QuackcoPulse Neural Engine. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: currentInput }] }
        ],
        config: {
          systemInstruction: `You are the QuackcoPulse Pro AI Assistant, a world-class quantitative trading and macro research assistant. 
          Provide concise, high-value financial insights. Use professional terminal language. 
          Current language mode: ${language === 'zh' ? 'Chinese' : 'English'}.`,
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });

      const modelText = response.text || (language === 'zh' ? '抱歉，神经引擎目前繁忙。' : 'Sorry, the neural engine is currently busy.');
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Connection to Neural Hub lost. Please check your API configuration.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-12 left-20 z-[300] w-[380px] h-[500px] bg-panel-dark border border-border-dark rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left-4 fade-in duration-300">
      {/* Header */}
      <div className="px-4 py-3 bg-background-dark/50 border-b border-border-dark flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons text-primary animate-pulse">bolt</span>
          <span className="text-[11px] font-black uppercase tracking-widest text-white">Neural Engine v3.0</span>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-sm font-bold">close</span>
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border-dark"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
              m.role === 'user' 
                ? 'bg-primary/10 border border-primary/20 text-white' 
                : 'bg-background-dark border border-border-dark text-slate-300'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-background-dark border border-border-dark px-3 py-2 rounded-xl flex gap-1 items-center">
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-background-dark/30 border-t border-border-dark">
        <div className="relative">
          <input 
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'zh' ? '询问宏观、个股或技术面...' : 'Ask about macro, stocks, or tech...'}
            className="w-full bg-background-dark border border-border-dark rounded-xl py-2 pl-3 pr-10 text-[11px] text-white focus:outline-none focus:border-primary/50 placeholder:text-slate-600 font-medium"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1.5 text-primary disabled:opacity-30 disabled:text-slate-600 transition-all hover:scale-110 active:scale-95"
          >
            <span className="material-symbols-outlined font-bold">send</span>
          </button>
        </div>
        <div className="mt-2 text-[8px] text-slate-600 uppercase font-bold tracking-widest text-center">
          Powered by Gemini 3.0 Flash Preview
        </div>
      </form>
    </div>
  );
};
