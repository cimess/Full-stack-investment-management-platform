import React, { useState } from 'react';
import { getAIInsights } from '../services/queryServices';
import { Sparkles, Send, Loader2, AlertCircle } from 'lucide-react';
import { LoadingState } from '../types';

const GeminiAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
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

    setSubmittedQuery(query);
    setStatus(LoadingState.LOADING);
    setResponse(null);

    try {
      const result = await getAIInsights(query);
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
    <section id="ai-advisor" className="py-12 sm:py-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.01] to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                
                {/* Left Side: Content */}
                <div className="lg:w-1/2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                            <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
                        </div>
                        <span className="premium-label">NOVA AI ADVISOR</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter text-white">
                        Your intelligent <br/>
                        <span className="text-slate-500">financial companion</span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Navigating the markets can be complex. Nova AI leverages Gemini's advanced models to break down concepts, analyze trends, and provide clarity in seconds.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {predefinedQueries.map((q, i) => (
                            <button 
                                key={i}
                                onClick={() => { setQuery(q); }}
                                className="text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-slate-500 hover:text-white transition-all"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Interactive Chat Interface */}
                <div className="lg:w-1/2 w-full">
                    <div className="premium-card rounded-3xl p-1 overflow-hidden">
                        {/* Header of Chat */}
                        <div className="bg-white/[0.03] p-5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-black" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm tracking-tight">Nova Assistant</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/> Active
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="h-[350px] bg-black/60 p-5 sm:p-8 overflow-y-auto flex flex-col gap-6">
                            {/* Welcome Message */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex-shrink-0 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
                                </div>
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 max-w-[85%]">
                                    <p className="text-slate-300 text-sm leading-relaxed font-medium">Hello! Ask me anything about investment strategies, market terminology, or financial planning.</p>
                                </div>
                            </div>

                            {/* User Query (if exists) */}
                            {status !== LoadingState.IDLE && (
                                <div className="flex gap-4 flex-row-reverse animate-in slide-in-from-bottom-2 fade-in">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full bg-slate-400" />
                                    </div>
                                    <div className="bg-emerald-600 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                                        <p className="text-white text-sm">{submittedQuery}</p>
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
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex-shrink-0 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 max-w-[85%]">
                                        <p className="text-slate-300 text-sm leading-relaxed font-medium whitespace-pre-wrap">{response}</p>
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
                        <div className="p-6 bg-white/[0.01] border-t border-white/5">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask for insights..."
                                    className="w-full bg-white/[0.02] text-white placeholder-slate-600 border border-white/10 rounded-xl py-4 pl-5 pr-14 focus:outline-none focus:border-white/20 transition-all font-medium"
                                    disabled={status === LoadingState.LOADING}
                                />
                                <button 
                                    onClick={handleSearch}
                                    disabled={status === LoadingState.LOADING || !query.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white text-black hover:bg-slate-200 disabled:opacity-50 transition-all"
                                >
                                    {status === LoadingState.LOADING ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" strokeWidth={2.5} />}
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