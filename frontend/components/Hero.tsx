import React, { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ShieldCheck, TrendingUp, BarChart3, Users, CheckCircle2 } from 'lucide-react';
import DiscoverPage from './DiscoverPage';
import MarketChart from './MarketChart';
import GeminiAdvisor from './GeminiAdvisor';
import ContactUs from './ContactUs';
import Header from './Header';
import Footer from './Footer';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Fallback: forcefully ensure visibility first, then animate.
      gsap.set([textRef.current?.children, bentoRef.current?.children], { visibility: 'visible' });

      tl.from(textRef.current?.children || [], { 
        y: 30, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.1 
      })
      .from(bentoRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        clearProps: "all" // Clears inline styles after animation so it doesn't get stuck hidden
      }, "-=0.6");
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-black text-white z-0">
        
        {/* Deep Dark Theme Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/[0.04] rounded-full blur-[150px] -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/[0.04] rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center relative z-10">
          
          {/* Hook: The Main Text */}
          <div ref={textRef} className="text-center max-w-4xl mx-auto mb-20">
           
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tighter">
              The Complete Workspace for <br/>
              <span className="premium-text-gradient">Investment Managers.</span>
            </h1>
            
            {/* The Sub-List Feature Breakdown */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
               <div className="flex items-center gap-2 text-slate-300 font-medium text-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Manage Clients
               </div>
               <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
               <div className="flex items-center gap-2 text-slate-300 font-medium text-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Track Trades
               </div>
               <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
               <div className="flex items-center gap-2 text-slate-300 font-medium text-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Prove Performance
               </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black hover:bg-slate-200 px-8 py-3.5 rounded-2xl font-bold transition-all group active:scale-95"
              >
                Create Free Portal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.08] px-8 py-3.5 rounded-2xl font-bold transition-all active:scale-95"
              >
                Manager Login
              </button>
            </div>
          </div>

        
          <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-20 mt-12">
            
            {/* Box 1: Professional Client Management */}
            <div className="col-span-1 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 hover:bg-[#111] hover:border-white/20 transition-all flex flex-col group overflow-hidden min-h-[500px]">
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight mb-3">Client Portals</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Institutional-grade dashboard for managing multi-client accounts and AUM tracking.
                </p>
              </div>
              <div className="flex-1 w-full bg-black border border-white/10 rounded-2xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700 shadow-2xl">
                <img 
                  src="/assets/p1.png" 
                  alt="Client Dashboard" 
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-top opacity-90 transition-opacity group-hover:opacity-100"
                />
              </div>
            </div>

            {/* Box 2: Real-time Trade Execution (Large Video) */}
            <div className="col-span-1 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 hover:bg-[#111] hover:border-white/20 transition-all flex flex-col group overflow-hidden min-h-[500px]">
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight mb-3">Instant Execution</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Low-latency order routing with integrated market data for precise entry and exit.
                </p>
              </div>
              <div className="flex-1 w-full bg-black border border-white/10 rounded-2xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700 shadow-2xl">
                <video 
                   autoPlay loop muted playsInline 
                   className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                   src="/assets/v1.mp4" 
                   poster="/assets/p3.png"
                />
              </div>
            </div>

            {/* Box 3: Advanced DCF Valuation (Wide View) */}
            <div className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 hover:bg-[#111] hover:border-white/20 transition-all flex flex-col group overflow-hidden">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                 <div className="max-w-xl">
                    <h3 className="text-3xl font-bold tracking-tight mb-3">Institutional Valuation</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Prove your performance with built-in Discounted Cash Flow models matching professional investment banking workflows.
                    </p>
                 </div>
                 <button onClick={() => navigate('/signup')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                    Try the Calculator
                 </button>
               </div>
               
               <div className="w-full aspect-video md:aspect-[21/9] bg-black border border-white/10 rounded-2xl overflow-hidden relative group-hover:scale-[1.01] transition-transform duration-700 shadow-2xl">
                 <img 
                    src="/assets/p2.png" 
                    alt="DCF Valuation Model" 
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center opacity-90 transition-opacity group-hover:opacity-100"
                 />
               </div>
            </div>
          </div>


        </div>
      </section>

      <DiscoverPage />
      <MarketChart />
      <GeminiAdvisor />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Hero;
