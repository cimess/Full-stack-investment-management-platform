import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {logout} from "../../hooks/useQuery"
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
} from 'lucide-react';

export type UserRole = 'client' | 'manager' | 'admin';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const clientNav: NavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/client' },
  { label: 'Portfolio', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/client/portfolio' },
  { label: 'Transactions', icon: <ArrowLeftRight className="w-5 h-5" />, path: '/dashboard/client/transactions' },
  { label: 'Market', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard/client/market' },
  { label: 'My Manager', icon: <UserCheck className="w-5 h-5" />, path: '/dashboard/client/manager' },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/dashboard/client/settings' },
];

const managerNav: NavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/manager' },
  { label: 'My Clients', icon: <Users className="w-5 h-5" />, path: '/dashboard/manager/clients' },
  { label: 'Requests', icon: <Briefcase className="w-5 h-5" />, path: '/dashboard/manager/requests' },
  { label: 'Analytics', icon: <Activity className="w-5 h-5" />, path: '/dashboard/manager/analytics' },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/dashboard/manager/settings' },
];

const adminNav: NavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/admin' },
  { label: 'Users', icon: <Users className="w-5 h-5" />, path: '/dashboard/admin/users' },
  { label: 'Managers', icon: <Briefcase className="w-5 h-5" />, path: '/dashboard/admin/managers' },
  { label: 'Portfolios', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/admin/portfolios' },
  { label: 'Transactions', icon: <ArrowLeftRight className="w-5 h-5" />, path: '/dashboard/admin/transactions' },
  { label: 'Trade Requests', icon: <FileText className="w-5 h-5" />, path: '/dashboard/admin/trade-requests' },
  { label: 'Stocks', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard/admin/stocks' },
  { label: 'Security', icon: <ShieldCheck className="w-5 h-5" />, path: '/dashboard/admin/security' },
];

const navByRole: Record<UserRole, NavItem[]> = {
  client: clientNav,
  manager: managerNav,
  admin: adminNav,
};

const roleLabels: Record<UserRole, string> = {
  client: 'Investor',
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
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  role, 
  userName = 'User',
  mobileOpen = false,
  setMobileOpen,
  handleLogout
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = navByRole[role];



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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-screen bg-[#020617] border-r border-white/5 transition-all duration-300 transform
        ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        lg:relative lg:translate-x-0 ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-6 py-6 border-b border-white/5 ${collapsed ? 'justify-center px-3' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">CM</span>
        </div>
        {!collapsed && (
          <div>
            <span className="text-white font-bold text-lg">Cimess</span>
            <span className="gradient-text font-bold text-lg">Invest</span>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-slate-800 border border-white/10 rounded-full items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
      {/* User Info */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{userName}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${roleBadgeColors[role]}`}>
                {roleLabels[role]}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={`flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-400' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
    </>
  );
};

export default DashboardSidebar;
