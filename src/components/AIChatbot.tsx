'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  RotateCcw,
  Phone,
  Calendar,
  Award,
  ChevronRight,
  ExternalLink,
  Brain,
  MessageSquare,
  Minus,
  Maximize2,
} from 'lucide-react';
import InquiryModal from './InquiryModal';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
  source?: 'rag' | 'general' | 'rag_unavailable';
}

const STARTER_PROMPTS = [
  { text: 'Which course is best for beginners?', icon: Brain },
  { text: 'What is the fee structure & scholarship?', icon: Award },
  { text: 'Tell me about placement stats & partners', icon: Award },
  { text: 'When do the next batches start?', icon: Calendar },
  { text: 'How to verify an ISO certificate?', icon: Sparkles },
  { text: 'Where are your physical campuses located?', icon: ExternalLink },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: `👋 **Hello! I am NexGen AI**, your official Senior Academic Counselor and Career Advisor.\n\nI can help you explore our **15+ Industry Certification Programs**, check **upcoming batch timings**, explain **fee scholarships**, or guide you through **placements & free demo classes**.\n\nWhat career goal can I help you achieve today?`,
      time: 'Just now',
      source: 'general',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: `👋 **Chat reset!** How can I assist you with your tech career journey?`,
        time: 'Just now',
        source: 'general',
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      time: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare history payload for API
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome-1')
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const botMsg: Message = {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: data.source || 'general',
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'Failed to get a response');
      }
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `⚠️ **Counselor Connection Note:** ${
          err.message || 'I could not connect to the advisory server.'
        }\n\nYou can also speak directly with our Senior Admissions Counselors at **[+91 800-999-8800](tel:+918009998800)**.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to format basic markdown text (bolding, lists, links)
  const formatMarkdown = (content: string) => {
    return content.split('\n').map((line, lineIdx) => {
      // Process bold formatting **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-white dark:text-white light:text-slate-950">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      // Handle Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1">
            <span className="text-blue-400 mt-1">•</span>
            <span className="flex-1">{renderedParts}</span>
          </div>
        );
      }

      if (line.trim().length === 0) {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="my-1 leading-relaxed">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Tooltip Pill */}
          <div
            onClick={handleOpen}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 dark:bg-slate-900/90 text-white text-xs font-semibold shadow-2xl border border-blue-500/30 backdrop-blur-xl cursor-pointer hover:border-blue-400 hover:scale-105 transition-all animate-bounce"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Chat with AI Counselor</span>
          </div>

          {/* Glowing Circular Button */}
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Open AI Counselor Chat"
            className="relative p-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />

            {/* Notification Badge */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-slate-950" />
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col glass-card border border-blue-500/30 shadow-2xl backdrop-blur-2xl ${
            isMinimized
              ? 'bottom-6 right-6 w-80 h-16 rounded-2xl overflow-hidden'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[430px] h-[calc(100vh-100px)] sm:h-[620px] max-h-[88vh] rounded-3xl overflow-hidden'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-2xl bg-white/10 border border-white/20 shadow-sm">
                <Bot className="w-5 h-5 text-amber-300 animate-pulse" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight text-white">NexGen AI Counselor</h3>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 uppercase tracking-wider">
                    3.6 Flash
                  </span>
                </div>
                <p className="text-[11px] text-blue-200 leading-none mt-0.5">Senior Academic & Career Advisor</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-200">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Reset Chat History"
                className="p-1.5 rounded-lg hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-lg hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm bg-slate-950/90 dark:bg-slate-950/90 text-slate-200">
                {messages.map((msg) => {
                  const isModel = msg.role === 'model';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isModel ? 'justify-start' : 'justify-end'}`}
                    >
                      {isModel && (
                        <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shrink-0 mt-0.5 shadow-sm">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                          isModel
                            ? 'bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm font-medium'
                        }`}
                      >
                        <div className="text-xs sm:text-[13px]">{formatMarkdown(msg.text)}</div>
                        {isModel && msg.source ? (
                          <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[10px]">
                            {msg.source === 'rag' && (
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                                <span>📚</span>
                                <span>Answered from Institute Knowledge</span>
                              </span>
                            )}
                            {msg.source === 'rag_unavailable' && (
                              <span className="inline-flex items-center gap-1 text-amber-400/90 font-semibold">
                                <span>🔒</span>
                                <span>Institute Knowledge Base</span>
                              </span>
                            )}
                            {msg.source === 'general' && (
                              <span className="inline-flex items-center gap-1 text-blue-400/80 font-medium">
                                <span>🤖</span>
                                <span>AI Counselor Answer</span>
                              </span>
                            )}
                            <span className="text-[9px] text-slate-500">{msg.time}</span>
                          </div>
                        ) : (
                          <div
                            className={`text-[9px] mt-1 text-right ${
                              isModel ? 'text-slate-400' : 'text-blue-200'
                            }`}
                          >
                            {msg.time}
                          </div>
                        )}
                      </div>

                      {!isModel && (
                        <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 shrink-0 mt-0.5 shadow-sm">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading typing indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2.5 justify-start">
                    <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shrink-0">
                      <Bot className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 rounded-tl-sm flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] text-slate-400 font-medium ml-1">
                        NexGen AI is thinking...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Starter Chips */}
              <div className="p-2.5 bg-slate-900/95 border-t border-slate-800/80">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-1 mb-1.5 flex items-center justify-between">
                  <span>Quick Questions</span>
                  <span className="text-blue-400">Tap to Ask</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {STARTER_PROMPTS.map((prompt, idx) => {
                    const IconComp = prompt.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt.text)}
                        disabled={isLoading}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 text-[11px] font-medium border border-slate-700/60 whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer disabled:opacity-50"
                      >
                        <span className="flex items-center gap-1">
                          <IconComp className="w-3 h-3 text-blue-400 group-hover:text-white" />
                          <span>{prompt.text}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick CTA Banner */}
              <div className="px-3 py-2 bg-gradient-to-r from-blue-950/60 to-purple-950/60 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                  <span>Book Free Demo Class</span>
                </button>

                <a
                  href="tel:+918009998800"
                  className="text-blue-300 hover:text-white font-bold flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>Call +91 800-999-8800</span>
                </a>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about courses, fees, batch timings, placements..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || inputMessage.trim().length === 0}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Demo Booking Modal */}
      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
