import React from 'react';
import { TrendingUp, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
                <div className="bg-white p-1.5 rounded-lg">
                    <TrendingUp className="text-black w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold tracking-tighter text-white">
                    Nova<span className="text-slate-400">Invest</span>
                </span>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Empowering the next generation of investors with professional-grade tools and AI-driven insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Markets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Advisor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Screeners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fees</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] text-center md:text-left">
                © {new Date().getFullYear()} NovaInvest Inc. <br className="md:hidden" /> All rights reserved.
            </p>
            <div className="flex gap-6">
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" strokeWidth={1.5} /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" strokeWidth={1.5} /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" strokeWidth={1.5} /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;