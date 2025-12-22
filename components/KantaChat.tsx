
import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { sendMessageToKantaBot } from '../services/geminiService';
import { ChatMessage } from '../types';

const KantaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: "KANTALAND Concierge connected. How may I assist your exploration today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 3D Tablet Tilt
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      // Disable 3D tilt on small screens for better usability
      if (window.innerWidth < 768) return;

      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 40; 
      const y = (e.clientY - top - height / 2) / 40;
      
      containerRef.current.style.transform = `perspective(2000px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };
  
  const handleMouseLeave = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg)`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await sendMessageToKantaBot(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
       // Error handled
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20 md:pt-24 pb-8 md:pb-12 flex flex-col items-center justify-center perspective-container">
      <div 
        className="w-full max-w-4xl px-4 md:px-12 flex-grow flex flex-col transition-transform duration-200 ease-out will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        
        {/* Header Module - Floating */}
        <div className="text-center mb-8 md:mb-16" style={{ transform: 'translateZ(20px)' }}>
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto border border-black/10 flex items-center justify-center mb-4 md:mb-6 rounded-full bg-rover-dark shadow-sm">
                <MessageSquare size={20} className="text-black" strokeWidth={1} />
            </div>
            <h1 className="text-2xl md:text-4xl font-light text-rover-obsidian tracking-hero mb-2">INTELLIGENCE SUITE</h1>
            <p className="text-[10px] font-bold tracking-brand uppercase text-rover-muted">
                Powered by Gemini 2.5
            </p>
        </div>

        {/* Chat Interface - Strict Box with Shadow Lift */}
        <div className="flex-1 bg-rover-dark border border-rover-border p-6 md:p-12 flex flex-col shadow-2xl min-h-[60vh] md:min-h-[500px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-shadow duration-500">
            <div className="flex-1 overflow-y-auto space-y-6 md:space-y-8 mb-6 md:mb-8 scrollbar-hide">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} transition-all duration-300 animate-[fadeIn_0.5s_ease-out]`}>
                        <span className="text-[9px] font-bold uppercase tracking-brand text-rover-muted mb-2 block">
                            {msg.role === 'user' ? 'Guest' : 'System'}
                        </span>
                        <div className={`
                            max-w-[85%] md:max-w-[80%] p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-300
                            ${msg.role === 'user' 
                                ? 'bg-black text-white hover:bg-gray-900' 
                                : 'bg-white border border-rover-border text-rover-obsidian hover:bg-gray-50'}
                        `}>
                            <p className="text-sm md:text-base font-light leading-relaxed">
                                {msg.text}
                            </p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-brand text-rover-muted animate-pulse">
                        <span>Processing</span>
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="relative border-t border-rover-border pt-4 md:pt-6">
                <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your inquiry..."
                    className="w-full bg-transparent text-base md:text-lg font-light text-rover-obsidian placeholder-rover-muted outline-none pr-10"
                    autoFocus
                />
                <button 
                    onClick={handleSend}
                    className="absolute right-0 top-4 md:top-6 text-rover-obsidian hover:text-rover-muted transition-colors hover:scale-110 p-2"
                >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default KantaChat;