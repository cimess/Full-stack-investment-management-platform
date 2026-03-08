import React, { useState } from 'react';
import { getInvestmentInsights } from '../services/geminiService';
import { Sparkles, Send, Loader2, AlertCircle } from 'lucide-react';
import { LoadingState } from '../types';

const GeminiAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const predefinedQueries = [
    "What is dollar-cost averaging?",
    "Explain bearish vs bullish markets",
    "Benefits of ETF investing",
    "How does inflation affect stocks?"
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setStatus(LoadingState.LOADING);
    setResponse(null);
    
    try {
      const result = await getInvestmentInsights(query);
      setResponse(result);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      setStatus(LoadingState.ERROR);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section id="ai-advisor" className="py-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-900/10 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                
                {/* Left Side: Content */}
                <div className="lg:w-1/2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-purple-400 font-medium tracking-wide">NOVA AI ADVISOR</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Your intelligent <br/>
                        <span className="gradient-text">financial companion</span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Navigating the markets can be complex. Nova AI leverages Gemini's advanced models to break down concepts, analyze trends, and provide clarity in seconds.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {predefinedQueries.map((q, i) => (
                            <button 
                                key={i}
                                onClick={() => { setQuery(q); }}
                                className="text-sm px-4 py-2 rounded-full border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-300 transition-all"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Interactive Chat Interface */}
                <div className="lg:w-1/2 w-full">
                    <div className="glass-panel rounded-2xl p-1 border border-white/10 shadow-2xl relative overflow-hidden">
                        {/* Header of Chat */}
                        <div className="bg-white/5 p-4 rounded-t-xl border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Nova Assistant</p>
                                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"/> Online
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="h-[300px] bg-dark/50 p-6 overflow-y-auto flex flex-col gap-4">
                            {/* Welcome Message */}
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex-shrink-0 flex items-center justify-center h-8">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                                    <p className="text-slate-200 text-sm">Hello! Ask me anything about investment strategies, market terminology, or financial planning.</p>
                                </div>
                            </div>

                            {/* User Query (if exists) */}
                            {status !== LoadingState.IDLE && (
                                <div className="flex gap-4 flex-row-reverse animate-in slide-in-from-bottom-2 fade-in">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full bg-slate-400" />
                                    </div>
                                    <div className="bg-emerald-600 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                                        <p className="text-white text-sm">{query}</p>
                                    </div>
                                </div>
                            )}

                            {/* AI Response */}
                            {status === LoadingState.LOADING && (
                                <div className="flex gap-4 animate-pulse">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex-shrink-0" />
                                    <div className="flex items-center gap-1 bg-white/10 rounded-2xl rounded-tl-none p-4">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}

                            {status === LoadingState.SUCCESS && response && (
                                <div className="flex gap-4 animate-in slide-in-from-bottom-2 fade-in duration-500">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] border border-emerald-500/20">
                                        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
                                    </div>
                                </div>
                            )}

                            {status === LoadingState.ERROR && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center">
                                        <AlertCircle className="w-4 h-4 text-red-400" />
                                    </div>
                                    <div className="bg-red-500/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] border border-red-500/20">
                                        <p className="text-red-200 text-sm">Sorry, I encountered a temporary error connecting to the intelligence engine.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/5 border-t border-white/5">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask about market trends..."
                                    className="w-full bg-black/30 text-white placeholder-slate-500 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                    disabled={status === LoadingState.LOADING}
                                />
                                <button 
                                    onClick={handleSearch}
                                    disabled={status === LoadingState.LOADING || !query.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                                >
                                    {status === LoadingState.LOADING ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default GeminiAdvisor;