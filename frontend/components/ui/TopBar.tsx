import React, { useState } from 'react';
import { Bell, Search, ChevronDown, CheckCircle, TrendingUp, AlertCircle, Menu } from 'lucide-react';
import { useGetNotifications, useMarkNotificationsRead, getUserDashboard } from '../../hooks/useQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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
  role?: "CLIENT" | "MANAGER" | "ADMIN"
  managerSlot?: number
  image?: string;
}

const TopBar: React.FC<TopBarProps> = ({ pageTitle, userName = 'User', onToggleSidebar, handleLogout, role, managerSlot, image }) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data: notificationsResponse } = useGetNotifications();
  const { mutate: markNotificationsRead } = useMarkNotificationsRead();

  const notifications = (notificationsResponse as any)?.data?.notifications || [];
  const unread = (notificationsResponse as any)?.data?.unreadCount || 0;

  const { data } = role === "CLIENT" && getUserDashboard()
  const investments = data?.data?.investments || [];
  const portfolioValue = investments.reduce((acc: number, inv: any) => acc + (inv.quantity * Number(inv.stock.price)), 0);
  const insertValue = role === "MANAGER" ? managerSlot : portfolioValue;

  const handleReadMsg = (_id: string) => {
    markAllRead();
    setShowNotifs(false);
    navigate('notifications');
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
    <header className="flex items-center justify-between px-3 md:px-8 py-2 md:py-3 border-b border-white/[0.05] bg-black/80 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Page Title */}
        <div className="hidden sm:block">
          <h1 className="text-sm lg:text-base font-semibold text-white tracking-tight">{pageTitle}</h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5 font-bold">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>


      {role && typeof insertValue === 'number' && (
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="hidden sm:block text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-0.5">
            {role === "MANAGER" ? "Total Manager Slots" : "Total Portfolio"}
          </h2>
          <p className="text-sm md:text-lg font-bold text-white tracking-tighter font-mono" data-tour={role === "CLIENT" ? "topbar-portfolio-value" : role === "MANAGER" ? "topbar-manager-slots" : role === "ADMIN" ? "topbar-admin-slots" : null}>
            {role === "MANAGER" ? `Manager Slots` : `portfolio-value `}
            <p>
              {role === "CLIENT"
                ? `$${Number(portfolioValue).toLocaleString()}`
                : role === "MANAGER"
                  ? Number(managerSlot).toLocaleString()
                  : null}
            </p>

          </p>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search symbols..."
            className="bg-white/[0.03] border border-white/10 text-slate-200 placeholder-slate-600 text-xs pl-9 pr-4 py-2 rounded-xl w-48 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            data-tour="topbar-notifications"
          >
            <Bell className="w-4 h-4" strokeWidth={1.5} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 translate-x-[10%] top-full mt-3 w-72 
            sm:w-80 max-w-[calc(100vw-1rem)] bg-black/95 rounded-2xl 
            shadow-2xl border border-white/10 overflow-hidden z-50 backdrop-blur-xl">
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-white font-semibold text-xs uppercase tracking-wider">Notifications</span>
                <button onClick={markAllRead} className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-300 transition-colors">Mark all read</button>
              </div>
              <div className="divide-y divide-white/5 max-h-80 overflow-y-auto scrollbar-hide">
                {notifications.length === 0 ? (
                  <div className="px-5 py-8 text-center text-slate-500 text-xs font-medium">
                    No notifications yet.
                  </div>
                ) : (
                  notifications?.map((n: any) => (
                    <div key={n.id} className={`flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors ${!n.read ? 'bg-white/[0.01]' : ''} cursor-pointer`}
                      onClick={() => handleReadMsg(n.id)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {React.cloneElement((notifIcons[n.type] || notifIcons.info) as React.ReactElement<any>, { className: "w-3.5 h-3.5", strokeWidth: 1.5 })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold mb-0.5 tracking-tight">{n.title}</p>
                        <p className={`text-[11px] leading-relaxed ${!n.read ? 'text-slate-200' : 'text-slate-400'}`}>{n.message}</p>
                        <p className="text-slate-600 text-[10px] mt-1.5 font-bold uppercase tracking-wider">{formatTime(n.createdAt)}</p>
                      </div>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />}
                    </div>
                  ))
                )}
              </div>
              {/* View all link */}
              <div className="px-5 py-3 border-t border-white/5">
                <button
                  onClick={() => { setShowNotifs(false); navigate('notifications'); }}
                  className="w-full text-center text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors py-1"
                >
                  View all notifications &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all group"
          >
            {image ? (
              <img src={image} alt={userName} className="w-8 h-8 rounded-lg object-cover border border-white/10 group-hover:border-white/20 transition-all" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-white text-xs font-bold shadow-inner group-hover:border-white/20 transition-all">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <ChevronDown className={`w-3 h-3 text-slate-500 hidden sm:block transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} strokeWidth={2} />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-3 w-48 bg-black/95 rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 backdrop-blur-xl">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-white text-xs font-bold truncate">{userName}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Account Settings</p>
              </div>
              <button className="w-full text-left px-4 py-2.5 text-slate-300 text-[11px] font-medium hover:bg-white/5 hover:text-white transition-colors">Security Details</button>
              <button className="w-full text-left px-4 py-2.5 text-slate-300 text-[11px] font-medium hover:bg-white/5 hover:text-white transition-colors">Interface Preferences</button>
              <div className="border-t border-white/5" />
              <button className="w-full text-left px-4 py-3 text-red-400/80 text-[11px] font-bold uppercase tracking-widest hover:bg-red-500/10 hover:text-red-400 transition-colors"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
