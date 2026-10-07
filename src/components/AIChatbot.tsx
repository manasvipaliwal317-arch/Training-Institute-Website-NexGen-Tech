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
  ChevronLeft,
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const latestBotMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chipsScrollRef = useRef<HTMLDivElement>(null);

  const handleScrollChips = (direction: 'left' | 'right') => {
    if (chipsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      chipsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      const lastMsg = messages[messages.length - 1];

      // If the latest message is a model response, scroll so the user can read from the START of the answer
      if (lastMsg?.role === 'model' && lastMsg.id !== 'welcome-1') {
        const timer = setTimeout(() => {
          if (latestBotMessageRef.current && messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            const containerRect = container.getBoundingClientRect();
            const botRect = latestBotMessageRef.current.getBoundingClientRect();
            // Scroll container so the top of the new answer card sits neatly at the top with comfortable padding
            const targetScrollTop = container.scrollTop + (botRect.top - containerRect.top) - 12;
            container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
          } else {
            latestBotMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 60);
        return () => clearTimeout(timer);
      } else {
        // When user sends a message or on initial open, scroll to bottom to show input & typing loader
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }

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
            <strong key={pIdx} className="font-bold text-blue-700 dark:text-cyan-300">
              {part.slice(2, -2)}
            </strong>
          );
        }

        // Process markdown links [text](url)
        const linkParts = part.split(/(\[[^\]]+\]\([^)]+\))/g);
        if (linkParts.length > 1) {
          return linkParts.map((lPart, lIdx) => {
            const match = lPart.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (match) {
              return (
                <a
                  key={lIdx}
                  href={match[2]}
                  target={match[2].startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-amber-300 hover:text-blue-800 dark:hover:text-amber-200 underline font-semibold transition-colors"
                >
                  {match[1]}
                </a>
              );
            }
            return lPart;
          });
        }

        return part;
      });

      // Handle Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1">
            <span className="bullet-dot text-blue-600 dark:text-cyan-400 mt-1 font-bold">•</span>
            <span className="flex-1 leading-relaxed">{renderedParts}</span>
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
    <div className="ai-chatbot-widget">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group">
          {/* Tooltip Pill - Crystal Clear High Contrast in Light and Dark Mode */}
          <div
            onClick={handleOpen}
            className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 dark:bg-slate-950/95 text-slate-800 dark:text-white text-xs font-bold shadow-[0_10px_25px_-5px_rgba(37,99,235,0.25)] dark:shadow-[0_10px_25px_-5px_rgba(14,165,233,0.35)] border border-slate-200 dark:border-cyan-400/50 backdrop-blur-xl cursor-pointer hover:border-blue-400 dark:hover:border-cyan-300 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </span>
            <span className="tracking-wide text-xs font-bold text-slate-800 dark:text-white">
              Ask AI Career Counselor
            </span>
            <span
              className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-300 border border-blue-200 dark:border-cyan-400/40 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-xs"
            >
              <Sparkles className="w-2.5 h-2.5 text-blue-600 dark:text-cyan-300 animate-pulse" />
              LIVE
            </span>
          </div>

          {/* Premium Glowing 3D AI Counselor Trigger */}
          <div className="relative">
            {/* Luminous Pulsing Multi-Color Radial Halo */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 opacity-80 blur-md group-hover:opacity-100 group-hover:blur-lg animate-pulse transition-all duration-300" />

            <button
              type="button"
              onClick={handleOpen}
              aria-label="Open AI Counselor Chat"
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 border-2 border-white/70 text-white shadow-[0_8px_30px_rgba(37,99,235,0.45)] flex items-center justify-center transform group-hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Specular Light Reflection Sweep */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-white/30 pointer-events-none" />

              {/* Bot Icon with Animated Golden Sparkle */}
              <div className="relative flex items-center justify-center">
                <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:rotate-6 transition-transform duration-300" />
                <Sparkles className="absolute -top-1.5 -right-1.5 w-4 h-4 text-amber-300 fill-amber-300 animate-bounce filter drop-shadow-[0_0_6px_#f59e0b]" />
              </div>

              {/* Online Green Indicator Dot */}
              <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_#10b981]" />
              </span>

              {/* Notification Badge */}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-slate-950 shadow-[0_0_8px_#ef4444]" />
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          className={`chatbot-window fixed z-50 transition-all duration-300 flex flex-col bg-white dark:bg-slate-950 border-0 sm:border border-slate-200 dark:border-cyan-500/40 shadow-2xl backdrop-blur-2xl ${
            isMinimized
              ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-72 sm:w-80 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-cyan-500/40'
              : 'inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[440px] h-[100dvh] sm:h-[630px] max-h-[100dvh] sm:max-h-[88vh] rounded-none sm:rounded-3xl overflow-hidden'
          }`}
        >
          {/* Header */}
          <div className="chatbot-header px-4 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-slate-950 dark:via-indigo-950 dark:to-blue-950 text-white flex items-center justify-between border-b border-blue-500/30 dark:border-cyan-500/30 relative z-10 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-white/20 border border-white/30 shadow-sm">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-950 shadow-[0_0_6px_#10b981]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm leading-tight text-white drop-shadow-xs">
                    NexGen AI Counselor
                  </h3>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 uppercase tracking-wider shadow-xs">
                    Live AI
                  </span>
                </div>
                <p className="text-[11px] text-blue-100 dark:text-cyan-200 font-medium leading-none mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Instant Guidance for Courses & Placements
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/90">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Reset Chat History"
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg hover:bg-red-500/30 text-white/90 hover:text-red-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages Area - Adaptive Clean Canvas */}
              <div
                ref={messagesContainerRef}
                className="chatbot-messages-area flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm bg-slate-50/70 dark:bg-gradient-to-b dark:from-[#080d1a] dark:via-[#090f20] dark:to-[#060a14]"
              >
                {messages.map((msg, idx) => {
                  const isModel = msg.role === 'model';
                  const isLatestModel = isModel && idx === messages.length - 1;
                  return (
                    <div
                      key={msg.id}
                      ref={isLatestModel ? latestBotMessageRef : undefined}
                      className={`flex items-start gap-2.5 ${isModel ? 'justify-start' : 'justify-end'}`}
                    >
                      {isModel && (
                        <div className="p-2 rounded-xl bg-blue-100/70 dark:bg-gradient-to-br dark:from-blue-600/30 dark:to-cyan-500/20 border border-blue-200 dark:border-cyan-500/40 text-blue-600 dark:text-cyan-300 shrink-0 mt-0.5 shadow-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                          isModel
                            ? 'chatbot-bot-bubble bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-cyan-500/30 text-slate-800 dark:text-slate-100 rounded-tl-sm shadow-xs'
                            : 'chatbot-user-bubble bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm font-medium shadow-md'
                        }`}
                      >
                        <div className="text-xs sm:text-[13px] leading-relaxed select-text">
                          {formatMarkdown(msg.text)}
                        </div>
                        {isModel && msg.source ? (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-[10px]">
                            {msg.source === 'rag' && (
                              <span className="source-badge inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold">
                                <span>📚</span>
                                <span>Verified from Institute Knowledge Base</span>
                              </span>
                            )}
                            {msg.source === 'rag_unavailable' && (
                              <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold">
                                <span>🔒</span>
                                <span>Official NexGen Knowledge Base</span>
                              </span>
                            )}
                            {msg.source === 'general' && (
                              <span className="inline-flex items-center gap-1.5 text-blue-700 dark:text-cyan-300 font-medium">
                                <span>🤖</span>
                                <span>AI Career Counselor</span>
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                          </div>
                        ) : (
                          <div
                            className={`text-[10px] mt-1.5 text-right font-medium ${
                              isModel ? 'text-slate-400' : 'text-blue-100'
                            }`}
                          >
                            {msg.time}
                          </div>
                        )}
                      </div>

                      {!isModel && (
                        <div className="p-2 rounded-xl bg-indigo-100/70 dark:bg-indigo-600/40 border border-indigo-200 dark:border-indigo-400/40 text-indigo-600 dark:text-indigo-200 shrink-0 mt-0.5 shadow-xs">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading typing indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2.5 justify-start">
                    <div className="p-2 rounded-xl bg-blue-100/70 dark:bg-blue-600/30 border border-blue-200 dark:border-blue-400/40 text-blue-600 dark:text-cyan-300 shrink-0">
                      <Bot className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="chatbot-bot-bubble p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-cyan-500/30 text-slate-600 dark:text-slate-300 rounded-tl-sm flex items-center gap-2 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-xs text-blue-600 dark:text-cyan-300 font-medium ml-1">
                        NexGen AI is finding the best answer...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Starter Chips with Slider Effect */}
              <div className="chatbot-chips-area p-2.5 bg-slate-100/90 dark:bg-[#0b0f19] border-t border-slate-200 dark:border-slate-800 relative">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 px-1 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
                    <Sparkles className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                    Popular Questions
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-semibold mr-0.5">Slide to explore</span>
                    <button
                      type="button"
                      onClick={() => handleScrollChips('left')}
                      className="p-1 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 active:scale-90 transition-all cursor-pointer shadow-xs"
                      title="Slide left"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleScrollChips('right')}
                      className="p-1 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 active:scale-90 transition-all cursor-pointer shadow-xs"
                      title="Slide right"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div
                  ref={chipsScrollRef}
                  className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none scroll-smooth snap-x snap-mandatory"
                >
                  {STARTER_PROMPTS.map((prompt, idx) => {
                    const IconComp = prompt.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt.text)}
                        disabled={isLoading}
                        className="chatbot-chip snap-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-[11px] font-semibold border border-slate-300 dark:border-slate-700 whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer disabled:opacity-50 shadow-xs hover:border-blue-500 dark:hover:border-cyan-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 active:scale-95"
                      >
                        <IconComp className="chatbot-chip-icon w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                        <span className="chatbot-chip-text text-slate-800 dark:text-slate-100 font-semibold">{prompt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick CTA Banner */}
              <div className="chatbot-cta-bar px-3 sm:px-3.5 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500/10 via-blue-500/5 to-indigo-500/10 dark:from-blue-950/80 dark:via-slate-900 dark:to-purple-950/80 border-t border-slate-200 dark:border-cyan-500/20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 text-[11px] sm:text-xs">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="chatbot-cta-demo text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500 dark:fill-amber-300 dark:text-amber-300" />
                  <span>Book 1-on-1 Free Demo Class</span>
                </button>

                <a
                  href="tel:+918009998800"
                  className="chatbot-cta-phone text-blue-700 dark:text-cyan-300 hover:text-blue-900 dark:hover:text-white font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>+91 800-999-8800</span>
                </a>
              </div>

              {/* Input Area */}
              <div className="chatbot-input-area p-2.5 sm:p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about courses, fees, batch timings, placements..."
                  disabled={isLoading}
                  className="chatbot-input flex-1 bg-slate-50 dark:bg-[#0e1424] border border-slate-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-cyan-400 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/30 transition-all"
                />

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || inputMessage.trim().length === 0}
                  className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer shrink-0"
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
    </div>
  );
}
