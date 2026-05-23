import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, StarOff, Send, FileText, Loader2 } from 'lucide-react';
import api from '../../../lib/axios';
import { toast } from 'react-toastify';

const CATEGORIES = ['General', 'Education', 'Strategy', 'Product', 'Update'];

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  imageUrl: '',
  category: 'General',
  sourceUrl: '',
  tags: '',
  readTime: '',
  featured: false,
  status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
};

const BlogView = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/blog/admin/posts');
      setPosts(res.data.data || []);
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const openCreate = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (post: any) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || '',
      category: post.category,
      tags: post.tags?.join(', ') || '',
      sourceUrl: post.sourceUrl || '',
      readTime: post.readTime || '',
      featured: post.featured,
      status: post.status,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.excerpt || !form.content) {
      toast.error('Title, excerpt and content are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (editingPost) {
        await api.put(`/blog/admin/posts`, payload);
        toast.success('Post updated!');
      } else {
        await api.post('/blog/admin/posts', payload);
        toast.success('Post created!');
      }
      setShowForm(false);
      fetchPosts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await api.delete(`/blog/admin/posts`, { data: { id } });
      toast.success(res.data.message);
      fetchPosts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const togglePublish = async (post: any) => {
    const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await api.put(`/blog/admin/posts`, { status: newStatus, id: post.id });
      toast.success(newStatus === 'PUBLISHED' ? 'Post published!' : 'Moved to draft');
      fetchPosts();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const toggleFeatured = async (post: any) => {
    try {
      await api.put(`/blog/admin/posts`, { featured: !post.featured, id: post.id });
      toast.success(post.featured ? 'Removed from featured' : 'Set as featured');
      fetchPosts();
    } catch {
      toast.error('Failed to update');
    }
  };


  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      PUBLISHED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      DRAFT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      ARCHIVED: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };
    return map[status] || map.DRAFT;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Blog Manager</h2>
          <p className="text-slate-500 text-sm mt-1">Create and manage posts that appear on the public blog page</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="glass-panel rounded-2xl border border-white/10 p-6 space-y-5">
          <h3 className="text-white font-bold text-lg">{editingPost ? 'Edit Post' : 'New Post'}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Post title..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Excerpt * (short summary shown on the blog card)</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="Brief description of the article..."
                rows={2}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm resize-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Content * (full article — supports Markdown)</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Write the full article here..."
                rows={10}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm resize-y font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Article URL * (e.g. https://www.wikipedia.org/wiki/Stock_market)</label>
              <input
                value={form.sourceUrl}
                onChange={(e) => setForm((f) => ({ ...f, sourceUrl: e.target.value }))}
                placeholder="https://www.wikipedia.org/wiki/Stock_market"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Cover Image URL</label>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm"
              />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="Preview" className="mt-3 h-32 w-full object-cover rounded-xl border border-white/10" />
              )}
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm"
              >
                {CATEGORIES.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Read Time (e.g. "5 min read")</label>
              <input
                value={form.readTime}
                onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
                placeholder="5 min read"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Tags (comma separated)</label>
              <input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="dcf, valuation, stocks"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 text-sm"
              >
                <option value="DRAFT" className="bg-gray-900">Draft (hidden from public)</option>
                <option value="PUBLISHED" className="bg-gray-900">Published (live on blog)</option>
                <option value="ARCHIVED" className="bg-gray-900">Archived</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 accent-indigo-500"
              />
              <label htmlFor="featured" className="text-sm text-slate-300 cursor-pointer">
                Pin as Featured Post (shows at top of blog page)
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 border border-white/10 text-slate-400 font-bold rounded-xl text-sm hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {editingPost ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FileText className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="font-bold text-white mb-1">No posts yet</p>
            <p className="text-sm">Click "New Post" to write your first article</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-white/5 bg-white/[0.02]">
                  <th className="p-4 pl-6">Post</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Views</th>
                  <th className="p-4 pr-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 pl-6 max-w-xs">
                      <div className="flex items-start gap-3">
                        {post.imageUrl && (
                          <img src={post.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/5" />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            {post.featured && <Star className="w-3 h-3 text-indigo-400 shrink-0" />}
                            <p className="text-white font-bold text-sm truncate">{post.title}</p>
                          </div>
                          <p className="text-slate-500 text-xs truncate">{post.excerpt}</p>
                          {post.tags?.length > 0 && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {post.tags.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-[10px] text-slate-600 bg-white/5 px-1.5 py-0.5 rounded">#{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-slate-400 font-medium">{post.category}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg border ${statusBadge(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-slate-400 text-sm">{post.views?.toLocaleString() || 0}</span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-center gap-1">
                        {/* Toggle Featured */}
                        <button
                          onClick={() => toggleFeatured(post)}
                          title={post.featured ? 'Remove from featured' : 'Set as featured'}
                          className={`p-2 rounded-lg transition-all ${post.featured ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10'}`}
                        >
                          {post.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                        </button>
                        {/* Toggle Publish */}
                        <button
                          onClick={() => togglePublish(post)}
                          title={post.status === 'PUBLISHED' ? 'Move to Draft' : 'Publish'}
                          className={`p-2 rounded-lg transition-all ${post.status === 'PUBLISHED' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-600 hover:text-emerald-400 hover:bg-emerald-500/10'}`}
                        >
                          {post.status === 'PUBLISHED' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => openEdit(post)}
                          className="p-2 rounded-lg text-slate-600 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => {console.log(post.id); handleDelete(post.id) }}
                          className="p-2 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogView;
