import React, { useState } from 'react';
import { Bell, Search, ChevronDown, CheckCircle, TrendingUp, AlertCircle, Menu } from 'lucide-react';
import { useGetNotifications, useMarkNotificationsRead, getUserDashboard } from '../../hooks/useQuery';
import { useQueryClient } from '@tanstack/react-query';

const notifIcons: Record<string, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 text-emerald-400" />,
  info: <TrendingUp className="w-4 h-4 text-blue-400" />,
  warning: <AlertCircle className="w-4 h-4 text-amber-400" />,
  TRADE: <TrendingUp className="w-4 h-4 text-blue-400" />,
  MESSAGE: <CheckCircle className="w-4 h-4 text-emerald-400" />,
  SYSTEM: <AlertCircle className="w-4 h-4 text-amber-400" />,
};

const formatTime = (dateString: string) => {
  if (!dateString) return 'recently';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'recently';
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

interface TopBarProps {
  pageTitle: string;
  userName?: string;
  userAvatar?: string;
  onToggleSidebar?: () => void;
  handleLogout?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ pageTitle, userName = 'User', onToggleSidebar, handleLogout}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const queryClient = useQueryClient();
  const { data: notificationsResponse } = useGetNotifications();
  const { mutate: markNotificationsRead } = useMarkNotificationsRead();

  const notifications = (notificationsResponse as any)?.data?.notifications || [];
  const unread = (notificationsResponse as any)?.data?.unreadCount || 0;

  const { data } = getUserDashboard();
const investments = data?.data?.investments || [];
const portfolioValue = investments.reduce((acc:number, inv:any) => acc + (inv.quantity * Number(inv.stock.price)), 0);


  const handleReadMsg = (id: string) => {
    // If it's already a bulk mark-as-read API, run it for all when clicked anywhere unread
    markAllRead();
  };

  const markAllRead = () => {
    if (unread > 0) {
      markNotificationsRead(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
      });
    }
  };

  return (
    <header className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-white/5 bg-[#020617]/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Page Title */}
        <div>
          <h1 className="text-lg lg:text-xl font-bold text-white leading-tight">{pageTitle}</h1>
          <p className="text-slate-500 text-[10px] lg:text-xs mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>


      {portfolioValue && <div>
        <h1 className='text-lg lg:text-xl font-bold text-gray-500 leading-tight'>Portfolio value</h1>
        <p className='text-lg lg:text-xl font-bold text-white leading-tight'>${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      </div>}

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/5 border border-white/8 text-slate-300 placeholder-slate-500 text-sm pl-9 pr-4 py-2 rounded-xl w-52 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 translate-x-[10%] top-full mt-2 w-72 
            sm:w-80 max-w-[calc(100vw-1rem)] glass-panel rounded-2xl 
            shadow-2xl border overflow-hidden z-50 backdrop-blur-lg">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-white font-semibold text-sm">Notifications</span>
                <span onClick={markAllRead} className="text-emerald-400 text-xs font-medium cursor-pointer hover:text-emerald-300">Mark all read</span>
              </div>
              <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-slate-500 text-sm">
                    No notifications yet.
                  </div>
                ) : (
                  notifications?.map((n: any) => (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors ${!n.read ? 'bg-white/2' : ''} cursor-pointer`}
                      onClick={() => handleReadMsg(n.id)}
                    >
                      <div className="flex-shrink-0 mt-0.5">{notifIcons[n.type] || notifIcons.info}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold mb-0.5">{n.title}</p>
                        <p className={`text-xs leading-relaxed ${!n.read ? 'text-slate-200' : 'text-slate-400'}`}>{n.message}</p>
                        <p className="text-slate-600 text-xs mt-1">{formatTime(n.createdAt)}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            {/* <span className="text-slate-300 text-sm font-medium hidden md:block">{userName}</span> */}
            <ChevronDown className={`w-4 h-4 text-slate-500 hidden md:block transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-44 glass-panel rounded-xl shadow-2xl border border-white/8 overflow-hidden z-50">
              <button className="w-full text-left px-4 py-3 text-slate-300 text-sm hover:bg-white/5 hover:text-white transition-colors">Profile</button>
              <button className="w-full text-left px-4 py-3 text-slate-300 text-sm hover:bg-white/5 hover:text-white transition-colors">Settings</button>
              <div className="border-t border-white/5" />
              <button className="w-full text-left px-4 py-3 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
