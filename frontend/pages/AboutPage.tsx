import React from 'react';
import { Shield, TrendingUp, BarChart3, Zap, Globe, Cpu, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative selection:bg-indigo-500/30">
      <Header />
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      <main className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* SEO Hero Section */}
          <div className="max-w-3xl mb-24">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 gradient-text leading-tight">
              Reinventing Financial Intelligence.
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              CimessInvest is more than a portfolio tracker. We are building the next generation of financial tools 
              designed for the precision-focused investor. From <span className="text-white">Real-time Analytics</span> to 
              <span className="text-white"> Discounted Cash Flow (DCF)</span> modeling, we bring institutional-grade 
              intelligence to your screen.
            </p>
          </div>

          {/* Core Pillars (Keyword Rich) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {[
              {
                icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
                title: "Portfolio Management",
                desc: "Advanced real-time tracking for global stocks, cryptocurrencies, and traditional assets with automated P&L reporting."
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
                title: "Professional Valuation",
                desc: "Integrated DCF (Discounted Cash Flow) engine to determine absolute fair value based on SEC filings and live growth projections."
              },
              {
                icon: <Shield className="w-6 h-6 text-blue-400" />,
                title: "Risk Assessment",
                desc: "Dynamic Beta analysis and volatility modeling to ensure your wealth allocation remains within your risk tolerance limits."
              },
              {
                icon: <Zap className="w-6 h-6 text-amber-400" />,
                title: "Deep Logistics",
                desc: "High-performance architecture utilizing Redis caching and Node.js for zero-latency market updates."
              },
              {
                icon: <Globe className="w-6 h-6 text-purple-400" />,
                title: "Global Reach",
                desc: "Multi-currency support across 60+ global exchanges, ensuring you have a single view of your worldwide wealth."
              },
              {
                icon: <Cpu className="w-6 h-6 text-rose-400" />,
                title: "AI Insights",
                desc: "Leveraging machine learning algorithms to scan market sentiment and news cycles for potential portfolio impact."
              }
            ].map((item, i) => (
              <div key={i} className="glass-panel rounded-[2rem] p-8 border border-white/5 hover:border-white/10 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Value Proposition Section */}
          <div className="glass-panel rounded-[3rem] p-10 lg:p-20 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 tracking-tighter">Institutional Intelligence. <br/><span className="text-indigo-400">Zero Cost.</span></h2>
                <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                  <p className="text-lg">
                    Why pay hundreds for a Bloomberg terminal or premium subscriptions when the world's most sophisticated analytics are now at your fingertips—<span className="text-white border-b border-indigo-500">100% Free?</span>
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                      <span><strong className="text-white">Real-Time Everything:</strong> Get live quotes, deep EPS data, and analyst consensus without the 15-minute delay found on other platforms.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                      <span><strong className="text-white">Peer Benchmarking:</strong> Instantly compare any stock against its sector rivals to find the hidden gems and avoid the value traps.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                      <span><strong className="text-white">Daily Intelligence Feed:</strong> Curated professional news and market sentiment data delivered directly to your dashboard.</span>
                    </li>
                  </ul>
                  <p>
                    CimessInvest isn't just an app; it's your unfair advantage in an increasingly complex market. We've democratized the tools used by hedge funds so you can trade with confidence, precision, and zero overhead.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-4xl font-bold text-white mb-2">10k+</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold font-bold">API Calls/Day</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-4xl font-bold text-white mb-2">99.9%</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold font-bold">Uptime Rate</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-4xl font-bold text-white mb-2">0.5s</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold font-bold">Avg Response</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-4xl font-bold text-white mb-2">SSL</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold font-bold">Bank Grade Security</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
