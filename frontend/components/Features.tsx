import React from 'react';
import { LineChart, Lock, Brain, Smartphone, Globe2, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: <LineChart className="w-6 h-6 text-emerald-400" />,
    title: "Real-time Analytics",
    description: "Track your portfolio performance with millisecond precision and advanced charting tools."
  },
  {
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    title: "AI-Powered Insights",
    description: "Get personalized investment suggestions driven by our Gemini-powered neural engine."
  },
  {
    icon: <Lock className="w-6 h-6 text-blue-400" />,
    title: "Bank-Grade Security",
    description: "Your assets are protected by military-grade encryption and cold storage protocols."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-pink-400" />,
    title: "Mobile First",
    description: "Manage your wealth on the go with our award-winning mobile application."
  },
  {
    icon: <Globe2 className="w-6 h-6 text-cyan-400" />,
    title: "Global Access",
    description: "Trade across 50+ international markets with low fees and instant execution."
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Instant Transfers",
    description: "Deposit and withdraw funds instantly via major payment networks worldwide."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Powerful tools for <span className="gradient-text">smart investors</span>
            </h2>
            <p className="text-slate-400 text-lg">
              We've built a comprehensive ecosystem designed to help you grow, manage, and protect your wealth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1} className={`${index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'}`}>
              <div
                className={`
                  glass-panel p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 spotlight h-full
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
