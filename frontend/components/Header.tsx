import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate=useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Discover', href: '/#discover' },
    { name: 'Platform', href: '/#features' },
    { name: 'Markets', href: '/#market' },
    { name: 'AI Insights', href: '/#ai-advisor' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <header

      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div
        onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
         className="flex items-center gap-2 cursor-pointer">
          <div className="bg-gradient-to-br from-emerald-400 to-blue-500 p-2 rounded-lg">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Nova<span className="text-emerald-400">Invest</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}

        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigate('/login')}
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-3 py-1.5"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Get Started
          </button>
        </div>
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark border-b border-white/5 p-6 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => {navigate('/login');setIsMobileMenuOpen(false)}}

              className="bg-emerald-500 text-white py-3 rounded-lg font-semibold w-full"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
