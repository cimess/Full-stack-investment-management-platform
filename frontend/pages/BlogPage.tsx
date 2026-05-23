import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Clock, Search, Tag, Eye, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../lib/axios';

const CATEGORIES = ['All', 'Education', 'Strategy', 'Product', 'Update', 'General'];

const BlogPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const STATIC_POSTS = [
    {
      id: 'static-1',
      title: 'Mastering the DCF Valuation: A Guide for Modern Investors',
      excerpt: 'Learn how to calculate the intrinsic value of any stock using our professional Discounted Cash Flow engine.',
      category: 'Education',
      publishedAt: '2024-05-05',
      readTime: '8 min read',
      imageUrl: '/1.jpg',
      views: 0,
      featured: true,
      tags: ['dcf', 'valuation'],
      sourceUrl: 'https://www.investopedia.com/terms/d/dcf.asp', // External link
      author: { fullname: 'CimessInvest Team' },
    },
    {
      id: 'static-2',
      title: "Why Volatility Matters: Understanding Beta in Your Portfolio",
      excerpt: "Volatility isn't just risk—it's opportunity. Discover how to use Beta modeling to balance your wealth hub.",
      category: 'Strategy',
      publishedAt: '2024-04-28',
      readTime: '6 min read',
      imageUrl: '/3.jpg',
      views: 0,
      featured: false,
      tags: ['beta', 'portfolio'],
      sourceUrl: 'https://www.investopedia.com/terms/b/beta.asp',
      author: { fullname: 'CimessInvest Team' },
    },
    {
      id: 'static-3',
      title: 'CimessInvest v2.0: Introducing AI-Powered Market Insights',
      excerpt: 'Our latest update brings neural network sentiment analysis to your dashboard.',
      category: 'Product',
      publishedAt: '2024-04-20',
      readTime: '4 min read',
      imageUrl: '/2.jpg',
      views: 0,
      featured: false,
      tags: ['ai', 'update'],
      sourceUrl: 'https://cimessinvest.com',
      author: { fullname: 'CimessInvest Team' },
    },
  ];

  // Inside useEffect:
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/blog/posts');
        const apiPosts = res.data.data || [];
        // ✅ Always merge: API posts first, then static ones after
        setPosts([...apiPosts, ...STATIC_POSTS]);
      } catch {
        // If network fails, just show static posts
        setPosts(STATIC_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);


  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filtered.find((p) => p.featured) || filtered[0];
  const restPosts = filtered.filter((p) => p.id !== featuredPost?.id);

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className="min-h-screen bg-black relative selection:bg-indigo-500/30">
      <Header />

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-indigo-500/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <main className="relative pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Header */}
          <div className="flex flex-col gap-6 mb-10 sm:mb-16">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4 gradient-text">
                Insights &amp; Analysis
              </h1>
              <p className="text-slate-400 text-base sm:text-lg font-medium max-w-2xl">
                Deep dives into market trends, valuation methodologies, and platform updates.
              </p>
            </div>

            {/* Search */}
            <div className="relative group w-full sm:max-w-sm">
              <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-indigo-500/10 transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                <Search className="w-4 h-4 text-slate-500 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-600 w-full"
                />
              </div>
            </div>

            {/* Category Filter — Horizontal Scroll on Mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${activeCategory === cat
                    ? 'bg-indigo-500 text-white border-indigo-500'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-6">
              <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-[3rem] bg-white/5 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-full aspect-video rounded-2xl bg-white/5 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 text-slate-500">
              <p className="text-lg font-bold">No articles found</p>
              <p className="text-sm mt-2">Try a different search or category</p>
            </div>
          )}

          {/* Featured Post */}
          {!loading && featuredPost && (
            <div className="mb-12 sm:mb-24 group cursor-pointer">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-[3rem] overflow-hidden border border-white/10 mb-6 sm:mb-8">
                <img
                  loading="lazy"
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Featured Badge */}
                {featuredPost.featured && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    <Star className="w-3 h-3" /> Featured
                  </div>
                )}

                <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 right-4 sm:right-10">
                  <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
                    <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center text-white/60 text-xs font-medium gap-2">
                      <Calendar className="w-3 h-3" /> {formatDate(featuredPost.publishedAt)}
                    </div>
                    {featuredPost.readTime && (
                      <div className="flex items-center text-white/60 text-xs font-medium gap-2">
                        <Clock className="w-3 h-3" /> {featuredPost.readTime}
                      </div>
                    )}
                    {featuredPost.views > 0 && (
                      <div className="flex items-center text-white/60 text-xs font-medium gap-2">
                        <Eye className="w-3 h-3" /> {featuredPost.views.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4 tracking-tight drop-shadow-2xl line-clamp-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/60 text-sm hidden sm:block line-clamp-2">{featuredPost.excerpt}</p>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          {!loading && restPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-24">
              {posts.map((post) => (
                console.log(post),
                <div key={post.id} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/5 mb-4 sm:mb-6">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
                    <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-400/20 px-2 py-0.5 rounded-lg">
                      {post.category}
                    </span>
                    {post.readTime && (
                      <div className="flex items-center text-slate-500 text-[10px] font-bold uppercase tracking-widest gap-2">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </div>
                    )}
                    {post.views > 0 && (
                      <div className="flex items-center text-slate-500 text-[10px] gap-2">
                        <Eye className="w-3 h-3" /> {post.views}
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-indigo-400 transition-colors tracking-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 sm:mb-6 font-medium line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                          <Tag className="w-2.5 h-2.5" /> {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {<div className="flex items-center justify-between gap-4 mt-6">

                    {/* OPEN MODAL */}
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        bg-indigo-500/10
                        border border-indigo-500/20
                        text-indigo-400
                        hover:bg-indigo-500
                        hover:text-white
                        transition-all duration-300
                        text-xs font-bold uppercase tracking-widest
    "
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* EXTERNAL SOURCE */}
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                              inline-flex items-center gap-2
                              text-slate-500
                              hover:text-indigo-400
                              transition-colors
                              text-xs font-bold uppercase tracking-widest
    "
                    >
                      Source
                      <ArrowRight className="w-3 h-3" />
                    </a>

                  </div>
                  }


                </div>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-8 p-8 sm:p-12 lg:p-20 rounded-2xl sm:rounded-[3rem] bg-indigo-600 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tighter">
                  Stay ahead of the market <p className="text-indigo-400">(Coming.....SOON)</p>
                </h2>
                <p className="text-indigo-100 text-base sm:text-lg font-medium opacity-80">
                  Join 5,000+ investors getting weekly insights on stock valuations and macro trends.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-white text-black outline-none font-bold text-sm w-full sm:min-w-[280px]"
                />
                <button className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-black text-white font-bold uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all whitespace-nowrap">
                  Subscribe (Coming.....SOON)
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ARTICLE MODAL */}
{selectedPost && (
  <div
    className="
      fixed inset-0 z-50
      bg-black/80 backdrop-blur-sm
      flex items-center justify-center
      p-4
      animate-in fade-in duration-300
    "
    onClick={() => setSelectedPost(null)}
  >
    {/* MODAL CONTAINER */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        relative
        w-full max-w-4xl
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
        border border-white/10
        bg-[#0B0B0F]
        shadow-2xl
      "
    >

      {/* HERO IMAGE */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={selectedPost.imageUrl}
          alt={selectedPost.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-black/30 to-transparent" />

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedPost(null)}
          className="
            absolute top-4 right-4
            w-10 h-10
            rounded-full
            bg-black/60
            border border-white/10
            text-white
            hover:bg-red-500
            transition-all
            flex items-center justify-center
          "
        >
          ✕
        </button>

        {/* TITLE OVER IMAGE */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">

            <span className="
              px-3 py-1
              rounded-full
              bg-indigo-500
              text-white
              text-[10px]
              font-bold
              uppercase
              tracking-widest
            ">
              {selectedPost.category}
            </span>

            {selectedPost.readTime && (
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <Clock className="w-3 h-3" />
                {selectedPost.readTime}
              </div>
            )}
          </div>

          <h2 className="
            text-2xl sm:text-4xl
            font-bold
            text-white
            leading-tight
            tracking-tight
          ">
            {selectedPost.title}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 sm:p-10">

        {/* META */}
        <div className="
          flex flex-wrap items-center gap-4
          text-xs text-slate-500
          mb-8
          border-b border-white/5
          pb-6
        ">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(selectedPost.publishedAt)}
          </div>

          {selectedPost.views > 0 && (
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {selectedPost.views}
            </div>
          )}

          {selectedPost.author && (
            <div>
              by {selectedPost.author.fullname}
            </div>
          )}
        </div>

        {/* ARTICLE CONTENT */}
        <div className="
          prose prose-invert
          prose-p:text-slate-300
          prose-headings:text-white
          max-w-none
        ">
          <p className="text-lg text-slate-300 leading-8">
            {selectedPost.content || selectedPost.excerpt}
          </p>
        </div>

        {/* TAGS */}
        {selectedPost.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {selectedPost.tags.map((tag: string) => (
              <span
                key={tag}
                className="
                  px-3 py-1
                  rounded-full
                  bg-white/5
                  border border-white/10
                  text-slate-400
                  text-xs
                "
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ACTIONS */}
        <div className="
          flex flex-col sm:flex-row
          gap-4
          mt-10
          pt-6
          border-t border-white/5
        ">

          {/* EXTERNAL SOURCE */}
          <a
            href={selectedPost.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-4
              rounded-2xl
              bg-indigo-500
              hover:bg-indigo-400
              text-white
              font-bold
              uppercase
              tracking-widest
              text-xs
              transition-all
              hover:scale-[1.02]
            "
          >
            Visit Source
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* CLOSE */}
          <button
            onClick={() => setSelectedPost(null)}
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-4
              rounded-2xl
              border border-white/10
              bg-white/5
              hover:bg-white/10
              text-slate-300
              font-bold
              uppercase
              tracking-widest
              text-xs
              transition-all
            "
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      <Footer />
    </div>
  );
};

export default BlogPage;
