import React from 'react';
import { ArrowRight, Calendar, Clock, ChevronRight, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: "Mastering the DCF Valuation: A Guide for Modern Investors",
      excerpt: "Learn how to calculate the intrinsic value of any stock using our professional Discounted Cash Flow engine.",
      category: "Education",
      date: "May 5, 2024",
      readTime: "8 min read",
      image: "/1.jpg"
    },
    {
      id: 2,
      title: "Why Volatility Matters: Understanding Beta in Your Portfolio",
      excerpt: "Volatility isn't just risk—it's opportunity. Discover how to use Beta modeling to balance your wealth hub.",
      category: "Strategy",
      date: "April 28, 2024",
      readTime: "6 min read",
      image: "/3.jpg"
    },
    {
      id: 3,
      title: "CimessInvest v2.0: Introducing AI-Powered Market Insights",
      excerpt: "Our latest update brings neural network sentiment analysis to your dashboard. Here is how it works.",
      category: "Product",
      date: "April 20, 2024",
      readTime: "4 min read",
      image: "/2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative selection:bg-indigo-500/30">
      <Header />
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <main className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 gradient-text">Insights & Analysis</h1>
              <p className="text-slate-400 text-lg font-medium">
                Deep dives into market trends, valuation methodologies, and platform updates.
              </p>
            </div>
            
            <div className="relative group shrink-0">
               <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-indigo-500/10 transition-all opacity-0 group-hover:opacity-100" />
               <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 min-w-[300px]">
                  <Search className="w-4 h-4 text-slate-500 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-600 w-full"
                  />
               </div>
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-24 group cursor-pointer">
             <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 mb-8">
                <img 
                loading='lazy'
                  src={posts[0].image} 
                  alt="Featured" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest">{posts[0].category}</span>
                      <div className="flex items-center text-white/60 text-xs font-medium gap-2">
                         <Calendar className="w-3 h-3" /> {posts[0].date}
                      </div>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
                      {posts[0].title}
                   </h2>
                </div>
             </div>
          </div>

          {/* More Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-400/20 px-2 py-0.5 rounded-lg">{post.category}</span>
                  <div className="flex items-center text-slate-500 text-[10px] font-bold uppercase tracking-widest gap-2">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors tracking-tight">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-white text-xs font-bold uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
                  Read Article <ArrowRight className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter / CTA Section for SEO */}
          <div className="mt-32 p-12 lg:p-20 rounded-[3rem] bg-indigo-600 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-xl text-center lg:text-left">
                   <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tighter">Stay ahead of the market.</h2>
                   <p className="text-indigo-100 text-lg font-medium opacity-80">
                      Join 5,000+ investors getting weekly insights on stock valuations and macro trends.
                   </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto self-center lg:self-auto">
                   <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-8 py-5 rounded-2xl bg-white text-black outline-none font-bold text-sm min-w-[300px]"
                   />
                   <button className="px-10 py-5 rounded-2xl bg-black text-white font-bold uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all">
                      Subscribe
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
