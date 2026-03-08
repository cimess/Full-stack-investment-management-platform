import React from 'react';
import { TrendingUp, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-emerald-400 to-blue-500 p-1.5 rounded-md">
                    <TrendingUp className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white">
                    Nova<span className="text-emerald-400">Invest</span>
                </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering the next generation of investors with professional-grade tools and AI-driven insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Markets</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Advisor</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Screeners</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Fees</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs text-center md:text-left">
                © {new Date().getFullYear()} NovaInvest Inc. All rights reserved. <br/>
                Investing involves risk. Not financial advice.
            </p>
            <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;