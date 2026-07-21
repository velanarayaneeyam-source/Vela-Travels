
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, MapPin, Mail, Globe, Sparkles, MessageSquare, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOURS, CONTACT_INFO } from '@/lib/data';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const QUICK_ACTIONS = [
    { label: "Available Tours", icon: <Globe className="w-4 h-4" /> },
    { label: "Contact Info", icon: <Phone className="w-4 h-4" /> },
    { label: "Our Fleet", icon: <Sparkles className="w-4 h-4" /> },
];

export const TravelBot = ({ 
    tours = [], 
    cars = [], 
    settings = {} 
}: { 
    tours?: any[], 
    cars?: any[], 
    settings?: Record<string, string> 
}) => {
    const activeTours = tours.length > 0 ? tours : TOURS;
    const activeSettings = { ...CONTACT_INFO, ...settings };
    const activeCars = cars.length > 0 ? cars : [];
    
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi there! I'm V-Bot, your Vela Travels Assistant. 🚙 How can I help you plan your luxury vehicle rental today?",
            sender: 'bot',
            timestamp: new Date(),
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userInput: string) => {
        const query = userInput.toLowerCase();
        
        if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
            return "Hello! I'm ready to help you with Vela Travels. What can I help you discover today?";
        }
        
        if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('email') || query.includes('info') || query.includes('location') || query.includes('address') || query.includes('where')) {
            return `You can reach our travel experts anytime!\n\n📞 Phone: ${activeSettings.phone || '+91 92070 50525'}\n📧 Email: ${activeSettings.email || 'velatravelsnmra@gmail.com'}\n📍 Office: ${activeSettings.address || 'Aliyur, Near NSS College, Nenmara, Palakkad 678508'}`;
        }

        if (query.includes('service') || query.includes('offer') || query.includes('ayurveda') || query.includes('massage') || query.includes('what do you do')) {
            return "We offer a wide range of premium travel services in Kerala:\n\n🚙 Premium Vehicle Rentals (SUVs & Travellers)\n💆‍♀️ Authentic Ayurveda & Spa Retreats\n🏖️ Guided Sightseeing Tours\n⛴️ Premium Houseboat Stays\n\nWhat would you like to explore today?";
        }

        if (query.includes('tour') || query.includes('destination') || query.includes('place')) {
            if (activeTours.length > 0) {
                const tourList = activeTours.slice(0, 4).map(t => `• ${t.title} (${t.destination})`).join('\n');
                return `We have some incredible live tours right now:\n\n${tourList}\n\nWhich one would you like to know more about?`;
            }
            return "We are currently updating our tour packages. Please check back in a few minutes or contact us for custom requests!";
        }

        if (query.includes('fleet') || query.includes('car') || query.includes('vehicle') || query.includes('rent')) {
            if (activeCars.length > 0) {
                const carList = activeCars.slice(0, 3).map(c => `• ${c.name} (${c.details})`).join('\n');
                return `Our luxury fleet includes:\n\n${carList}\n\nVisit our 'Vehicles' page for the full premium selection!`;
            }
            return "Our luxury fleet includes premium sedans and SUVs like the Innova Crysta and Force Traveller. Visit our 'Vehicles' page for full details!";
        }

        if (query.includes('price') || query.includes('cost') || query.includes('money') || query.includes('charge')) {
            return "Our premium services are competitively priced to offer maximum value. Prices vary based on the vehicle or tour package. Please contact us directly at +91 92070 50525 for a quick custom quote!";
        }

        return "I'm still learning, but our human team knows everything! Would you like our phone number or office address so we can chat directly?";
    };

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotResponse(text),
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        className="mb-4 w-[calc(100vw-32px)] sm:w-[400px] h-[55vh] sm:h-[500px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-white/10 flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-primary p-6 text-white flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-widest leading-none">Vela Assistant</h3>
                                    <p className="text-[10px] text-white/70 font-bold uppercase mt-1 tracking-wider flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                                        Always Online
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 scroll-smooth">
                            {messages.map((m) => (
                                <motion.div
                                    initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={m.id}
                                    className={cn(
                                        "flex flex-col max-w-[85%]",
                                        m.sender === 'user' ? "ml-auto items-end" : "items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "p-4 rounded-3xl text-sm leading-relaxed",
                                        m.sender === 'user' 
                                            ? "bg-primary text-white rounded-tr-none shadow-md shadow-primary/10" 
                                            : "bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-white/5"
                                    )}>
                                        {m.text.split('\n').map((line, i) => (
                                            <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 px-2">
                                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center gap-1.5 p-2 bg-slate-50 dark:bg-white/5 rounded-full w-16 justify-center">
                                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {messages.length < 3 && (
                            <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar">
                                {QUICK_ACTIONS.map(action => (
                                    <button
                                        key={action.label}
                                        onClick={() => handleSend(action.label)}
                                        className="whitespace-nowrap px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary transition-all border border-slate-100 dark:border-white/5 shadow-sm flex items-center gap-2"
                                    >
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend(input);
                            }}
                            className="p-6 pt-2"
                        >
                            <div className="relative group">
                                <input 
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/10 transition-all border border-slate-200 dark:border-white/10 group-hover:border-primary/30"
                                />
                                <button 
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="absolute right-2 top-2 p-3 bg-primary text-white rounded-2xl disabled:opacity-50 active:scale-95 transition-all shadow-lg shadow-primary/20"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-primary text-white rounded-[1.75rem] flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 group relative"
            >
                {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">1</div>
            </button>
        </div>
    );
};
