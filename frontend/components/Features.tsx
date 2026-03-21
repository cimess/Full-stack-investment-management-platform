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
    <section id="features" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
              Powerful tools for <span className="premium-text-gradient">smart investors</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              A comprehensive ecosystem designed to help you grow, manage, and protect your wealth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1} className={`${index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'}`}>
              <div
                className={`
                  premium-card p-10 h-full group hover:translate-y-[-4px]
                `}
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:border-white/20 transition-all duration-500">
                    {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-6 h-6", strokeWidth: 1.5 })}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{feature.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
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
