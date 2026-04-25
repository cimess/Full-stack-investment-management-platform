import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, useGetNotifications } from "../../hooks/useQuery";
import logo from "../../public/mylogo.webp"
import {
  LayoutDashboard,
  TrendingUp,
  ArrowLeftRight,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  BarChart3,
  FileText,
  UserCheck,
  Activity,
  ShieldAlert,
  Bell,
  X,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { getClientAll, getManagerAll, getAdminDashboard, getMarketQuotes } from '../../services/queryServices';

export type UserRole = 'client' | 'manager' | 'admin';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  dataTour?: string;
}

const clientNav: NavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/client', dataTour: 'sidebar-overview' },
  { label: 'Portfolio', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/client/portfolio', dataTour: 'sidebar-portfolio' },
  { label: 'Transactions', icon: <ArrowLeftRight className="w-5 h-5" />, path: '/dashboard/client/transactions', dataTour: 'sidebar-transactions' },
  { label: 'Market', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard/client/market', dataTour: 'sidebar-market' },
  { label: 'My Manager', icon: <UserCheck className="w-5 h-5" />, path: '/dashboard/client/manager', dataTour: 'sidebar-manager' },
  { label: 'Notifications', icon: <Bell className="w-5 h-5" />, path: '/dashboard/client/notifications', dataTour: 'sidebar-notifications' },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/dashboard/client/settings', dataTour: 'sidebar-settings' },
];

const managerNav: NavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/manager/overview', dataTour: 'sidebar-overview' },
  { label: 'My Clients', icon: <Users className="w-5 h-5" />, path: '/dashboard/manager/clients', dataTour: 'sidebar-clients' },
  { label: 'Requests', icon: <Briefcase className="w-5 h-5" />, path: '/dashboard/manager/requests', dataTour: 'sidebar-requests' },
  { label: 'Market', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard/manager/market', dataTour: 'sidebar-market' },
  { label: 'Analytics', icon: <Activity className="w-5 h-5" />, path: '/dashboard/manager/dcf', dataTour: 'sidebar-dcf' },
  { label: 'Asset Management', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard/manager/stocks', dataTour: 'sidebar-stocks' },
  { label: 'Notifications', icon: <Bell className="w-5 h-5" />, path: '/dashboard/manager/notifications', dataTour: 'sidebar-notifications' },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/dashboard/manager/settings', dataTour: 'sidebar-settings' },

];

const adminNav: NavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/admin', dataTour: 'sidebar-overview' },
  { label: 'Users', icon: <Users className="w-5 h-5" />, path: '/dashboard/admin/users', dataTour: 'sidebar-users' },
  { label: 'Managers', icon: <Briefcase className="w-5 h-5" />, path: '/dashboard/admin/managers', dataTour: 'sidebar-managers' },
  { label: 'Portfolios', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/admin/portfolios', dataTour: 'sidebar-portfolios' },
  { label: 'Asset Management', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard/admin/stocks', dataTour: 'sidebar-stocks' },
  { label: 'Transactions', icon: <ArrowLeftRight className="w-5 h-5" />, path: '/dashboard/admin/transactions', dataTour: 'sidebar-transactions' },
  { label: 'Trade Requests', icon: <FileText className="w-5 h-5" />, path: '/dashboard/admin/trade-requests', dataTour: 'sidebar-trade-requests' },
  { label: 'System Reports', icon: <ShieldAlert className="w-5 h-5" />, path: '/dashboard/admin/reports', dataTour: 'sidebar-reports' },
  { label: 'Notifications', icon: <Bell className="w-5 h-5" />, path: '/dashboard/admin/notifications', dataTour: 'sidebar-notifications' },
  { label: 'Security', icon: <ShieldCheck className="w-5 h-5" />, path: '/dashboard/admin/security', dataTour: 'sidebar-security' },
];

const navByRole: Record<UserRole, NavItem[]> = {
  client: clientNav,
  manager: managerNav,
  admin: adminNav,
};

const roleLabels: Record<UserRole, string> = {
  client: '',
  manager: 'Manager',
  admin: 'Admin',
};

const roleBadgeColors: Record<UserRole, string> = {
  client: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  manager: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  admin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

interface DashboardSidebarProps {
  role: UserRole;
  userName?: string;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  handleLogout: () => void;
  onReport?: () => void;
  image?: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  role,
  userName = 'User',
  mobileOpen = false,
  setMobileOpen,
  handleLogout,
  onReport,
  image
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const navItems = navByRole[role];
  console.log(image)

  // Live unread count for badge
  const { data: notificationsResponse } = useGetNotifications();
  const unreadCount: number = (notificationsResponse as any)?.data?.unreadCount || 0;

  const handlePrefetch = (path: string) => {
    // Determine which query to prefetch based on path
    if (path.includes('/market')) {
      queryClient.prefetchQuery({ queryKey: ["marketQuotes"], queryFn: () => getMarketQuotes(1) });
    } else if (path.includes('/transactions')) {
      queryClient.prefetchQuery({ queryKey: ["userDashboard"], queryFn: getClientAll });
    } else if (path === '/dashboard/client' || path === '/dashboard/manager' || path === '/dashboard/admin') {
      const queryKey = role === 'admin' ? ["adminDashboard"] : role === 'manager' ? ["managerDashboard"] : ["userDashboard"];
      const queryFn = role === 'admin' ? getAdminDashboard : role === 'manager' ? getManagerAll : getClientAll;
      queryClient.prefetchQuery({ queryKey, queryFn });
    }
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      <aside
        data-tour="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-screen bg-black border-r border-white/5 transition-all duration-300 transform
        ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        lg:relative lg:translate-x-0 ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Logo */}
        <div className={`flex flex-col items-center gap-3 px-6 py-10 border-b border-white/5 ${collapsed ? 'px-2' : ''}`}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 shadow-2xl overflow-hidden group hover:scale-110 transition-transform duration-500">
            <img src={logo} className="w-full h-full object-cover" alt="logo" />
          </div>
          {!collapsed && (
            <div className="flex flex-col items-center text-center">
              <span className="text-white font-bold text-xl leading-tight tracking-tighter">Cimess<span className="text-slate-400">Invest</span></span>
              <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.3em] mt-1">Wealth Management</span>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-black border border-white/10 rounded-full items-center justify-center text-slate-400 hover:text-white transition-all z-10 hover:scale-110 active:scale-95"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" strokeWidth={2.5} /> : <ChevronLeft className="w-3 h-3" strokeWidth={2.5} />}
        </button>

        {/* User Info */}
        {!collapsed && (
          <div className="px-4 py-6 border-b border-white/5">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
              {image ?
                <img src={image} alt="" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 border border-white/5" /> :
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 border border-white/5">
                  {userName.charAt(0).toUpperCase()}
                </div>
              }
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{userName}</p>
                <div className={`mt-1 inline-flex px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${roleBadgeColors[role]}`}>
                  {roleLabels[role]}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <button
                key={item.path}
                data-tour={item.dataTour}
                onClick={() => handleNavClick(item.path)}
                onMouseEnter={() => handlePrefetch(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                  ? 'bg-white/5 text-white border border-white/10 shadow-sm'
                  : 'text-slate-400 hover:bg-white/[0.02] hover:text-slate-200 border border-transparent'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className={`flex-shrink-0 transition-transform ${isActive ? 'text-white' : 'group-hover:text-slate-200'}`}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, {
                    className: "w-4 h-4",
                    strokeWidth: 1.5
                  })}
                </span>
                {!collapsed && <span className="tracking-tight flex-1 text-left">{item.label}</span>}
                {/* Unread badge — only on Notifications item */}
                {!collapsed && item.path.includes('/notifications') && unreadCount > 0 && (
                  <span className="ml-auto flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(52,211,153,0.6)]">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
                {!collapsed && isActive && !item.path.includes('/notifications') && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Report Problem & Logout */}
        <div className="p-4 border-t border-white/5 space-y-2 bg-black/20">
          {onReport && (
            <button
              onClick={onReport}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all group ${collapsed ? 'justify-center px-0' : ''
                }`}
              title={collapsed ? 'Report Problem' : undefined}
            >
              <ShieldAlert className="w-4 h-4 flex-shrink-0 group-hover:text-red-400 transition-colors" strokeWidth={1.5} />
              {!collapsed && <span className="tracking-tight">Report a Problem</span>}
            </button>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all group ${collapsed ? 'justify-center px-0' : ''
              }`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            {!collapsed && <span className="tracking-tight">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
