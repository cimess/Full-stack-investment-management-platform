import React, { useEffect } from 'react';
import { Bell, TrendingUp, CheckCircle, AlertCircle, ShieldAlert, MessageSquare, ArrowLeft } from 'lucide-react';
import { useGetNotifications, useMarkNotificationsRead } from '../hooks/useQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  TRADE: {
    icon: <TrendingUp className="w-4 h-4" />,
    label: 'Trade',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  MESSAGE: {
    icon: <MessageSquare className="w-4 h-4" />,
    label: 'Message',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  SYSTEM: {
    icon: <ShieldAlert className="w-4 h-4" />,
    label: 'System',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
};

const fallbackType = {
  icon: <Bell className="w-4 h-4" />,
  label: 'Notification',
  color: 'text-slate-400',
  bg: 'bg-white/5 border-white/10',
};

const formatFullDate = (dateString: string) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatRelative = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const NotificationsView: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notificationsResponse, isLoading } = useGetNotifications();
  const { mutate: markNotificationsRead } = useMarkNotificationsRead();

  const notifications: any[] = (notificationsResponse as any)?.data?.notifications || [];
  const unread = (notificationsResponse as any)?.data?.unreadCount || 0;

  // Auto-mark all as read when the page is opened
  useEffect(() => {
    if (unread > 0) {
      markNotificationsRead(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6 animate-in fade-in duration-500  mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Notifications</h1>
            <p className="text-slate-500 text-sm">Your activity feed and system alerts</p>
          </div>
        </div>

        {unread > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{unread} unread</span>
          </div>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 rounded-2xl bg-white/[0.02] animate-pulse border border-white/5" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-slate-700" />
          </div>
          <h3 className="text-white font-bold text-lg">All caught up</h3>
          <p className="text-slate-500 text-sm max-w-xs mt-1">You have no notifications right now. Check back later.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n: any) => {
            const config = typeConfig[n.type] || fallbackType;
            return (
              <div
                key={n.id}
                className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all ${
                  !n.read
                    ? 'bg-white/[0.025] border-white/10'
                    : 'bg-white/[0.01] border-white/5'
                }`}
              >
                {/* Unread indicator */}
                {!n.read && (
                  <span className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border ${config.bg} ${config.color}`}>
                  {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${config.color}`}>
                          {config.label}
                        </span>
                        <span className="text-slate-600 text-[10px]">·</span>
                        <span className="text-slate-500 text-[10px] font-medium">{formatRelative(n.createdAt)}</span>
                      </div>
                      <p className="text-white text-sm font-semibold leading-snug mb-1">{n.title}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{n.message}</p>
                  <p className="text-slate-600 text-[10px] mt-2 font-medium">{formatFullDate(n.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationsView;
