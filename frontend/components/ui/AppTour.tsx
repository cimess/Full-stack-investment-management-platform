import React, { useMemo } from 'react';
import { Joyride, type Step, STATUS } from 'react-joyride';

// Handle library variations in export style (named vs default)
const JoyrideComponent: any = (Joyride as any).Joyride || Joyride;

interface AppTourProps {
  role: 'CLIENT' | 'MANAGER' | 'ADMIN';
  run: boolean;
  onFinish: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

// ─────────────────────────────────────────────
// STEP DEFINITIONS  (one array per role)
// ─────────────────────────────────────────────

const clientSteps: Step[] = [
  {
    target: 'body',
    placement: 'center',
    title: '👋 Welcome to CimessInvest!',
    content:
      'This is your personal wealth management portal. You can track your portfolio, browse live markets, request trades, and have a dedicated financial manager guide your investments.',
  },
  {
    target: '[data-tour="sidebar"]',
    placement: 'right',
    title: '📂 Navigation Sidebar',
    content:
      'This is your sidebar. Use it to move between all sections of your dashboard. On mobile it slides in from the left. You can collapse it on desktop using the small arrow on its edge.',
  },
  {
    target: '[data-tour="sidebar-overview"]',
    placement: 'right',
    title: '🏠 Overview',
    content:
      'The Overview is your home base. It shows your total portfolio value, recent trade requests, active investments, and a summary of your account health at a single glance.',
  },
  {
    target: '[data-tour="sidebar-portfolio"]',
    placement: 'right',
    title: '📈 Portfolio',
    content:
      'The Portfolio section shows every stock you currently own, the quantity, average buy price, and live market price. You can also see your overall P&L (profit and loss) here.',
  },
  {
    target: '[data-tour="sidebar-transactions"]',
    placement: 'right',
    title: '↔️ Transactions',
    content:
      'Transactions is your full trading history. Every BUY and SELL trade that was approved and executed by your manager is logged here with timestamps and prices.',
  },
  {
    target: '[data-tour="sidebar-market"]',
    placement: 'right',
    title: '📊 Live Market',
    content:
      'Browse live and updated stock data including price, market cap, P/E ratio, dividend yield, and 52-week highs/lows. You can request to buy or sell any stock directly from this view.',
  },
  {
    target: '[data-tour="sidebar-manager"]',
    placement: 'right',
    title: '👤 My Manager',
    content:
      'This is where you assign or view your personal financial manager. You paste your manager\'s approval code here to link them to your account. They will then oversee and approve your trade requests.',
  },
  {
    target: '[data-tour="sidebar-settings"]',
    placement: 'right',
    title: '⚙️ Settings',
    content:
      'Update your profile, change your password, toggle email and trade notifications, and manage your display preferences here.',
  },
  {
    target: '[data-tour="topbar-portfolio-value"]',
    placement: 'bottom',
    title: '💰 Live Portfolio Value',
    content:
      'This number in the top bar shows your total live portfolio value in USD, calculated in real-time from your current holdings multiplied by the latest stock prices.',
  },
  {
    target: '[data-tour="topbar-notifications"]',
    placement: 'bottom',
    title: '🔔 Notifications',
    content:
      'Your notifications bell shows real-time alerts. You\'ll be notified when your manager approves or rejects a trade request, or when there is an important system message.',
  },
  {
    target: 'body',
    placement: 'center',
    title: '🚀 You are all set!',
    content:
      'That\'s the full tour! Start by assigning a manager in the "My Manager" section, then browse the Market to request your first trade. Good luck, investor!',
  },
];

const managerSteps: Step[] = [
  {
    target: 'body',
    placement: 'center',
    title: '👋 Welcome, Manager!',
    content:
      'You have been approved as a Financial Manager on CimessInvest. This platform lets you manage a portfolio of clients, review and approve their trade requests, and track their overall performance.',
  },
  {
    target: '[data-tour="sidebar"]',
    placement: 'right',
    title: '📂 Manager Navigation',
    content:
      'Your sidebar gives you access to all Manager-specific sections: Overview, My Clients, Trade Requests, Analytics, and Settings.',
  },
  {
    target: '[data-tour="sidebar-overview"]',
    placement: 'right',
    title: '🏠 Manager Overview',
    content:
      'Your overview summarises how many clients you currently manage, pending trade requests that need your action, and your remaining available client slots.',
  },
  {
    target: '[data-tour="sidebar-clients"]',
    placement: 'right',
    title: '👥 My Clients',
    content:
      'The Clients view lists every client who has linked to you using your approval code. You can view their details, portfolios, and deactivate the relationship if needed.',
  },
  {
    target: '[data-tour="sidebar-requests"]',
    placement: 'right',
    title: '📋 Trade Requests',
    content:
      'This is the most important section for you. When a client requests a BUY or SELL trade, it appears here as PENDING. You can Approve or Reject it with a written response. Approved trades are immediately executed.',
  },
  {
    target: '[data-tour="sidebar-analytics"]',
    placement: 'right',
    title: '📉 Analytics',
    content:
      'The Analytics view gives you a high-level view of activity across all your clients — trade volumes, approval rates, and overall performance metrics.',
  },
  {
    target: '[data-tour="sidebar-settings"]',
    placement: 'right',
    title: '⚙️ Profile & Settings',
    content:
      'Fill out your professional profile here — title, bio, specialization, years of experience, LinkedIn, success rate, and contact email. Clients can see this when they search for a manager.',
  },
  {
    target: '[data-tour="topbar-manager-slots"]',
    placement: 'bottom',
    title: '🪑 Client Slots',
    content:
      'This shows your remaining client capacity. You start with 10 slots by default. Each client who links to you consumes one slot. When full, clients will see "Manager has no available slots".',
  },
  {
    target: '[data-tour="topbar-notifications"]',
    placement: 'bottom',
    title: '🔔 Trade Alerts',
    content:
      'Every time one of your clients submits a trade request, you get an instant notification here. Stay on top of your queue to keep clients happy!',
  },
  {
    target: 'body',
    placement: 'center',
    title: '✅ Ready to Manage!',
    content:
      'Share your approval code (found in Settings) with your clients so they can link to you. Once linked, you\'ll see their trade requests appear in the Requests tab. Good luck!',
  },
];

const adminSteps: Step[] = [
  {
    target: 'body',
    placement: 'center',
    title: '🛡️ Welcome, Admin!',
    content:
      'You have full administrative control over the CimessInvest platform. You can manage all users, promote managers, restrict accounts, oversee transactions, and monitor the entire platform.',
  },
  {
    target: '[data-tour="sidebar"]',
    placement: 'right',
    title: '📂 Admin Navigation',
    content:
      'The Admin sidebar gives you access to: Overview, Users, Managers, Portfolios, Transactions, Trade Requests, Stocks, and Security.',
  },
  {
    target: '[data-tour="sidebar-overview"]',
    placement: 'right',
    title: '📊 Platform Overview',
    content:
      'The Admin Overview shows real-time platform stats — total registered clients, total managers, total trades executed, and any pending activity that needs attention.',
  },
  {
    target: '[data-tour="sidebar-users"]',
    placement: 'right',
    title: '👤 User Management',
    content:
      'View and manage every client registered on the platform. You can restrict (block) a client from trading or logging in, and see which manager they are assigned to.',
  },
  {
    target: '[data-tour="sidebar-managers"]',
    placement: 'right',
    title: '👔 Manager Management',
    content:
      'See all approved managers, their client counts, and slot availability. You can restrict a manager (which blocks them from approving new trades) and generate approval codes for new managers.',
  },
  {
    target: '[data-tour="sidebar-transactions"]',
    placement: 'right',
    title: '↔️ All Transactions',
    content:
      'This is the complete ledger of every trade that has ever been executed on the platform — BUY and SELL — across all clients, with full timestamps and values.',
  },
  {
    target: '[data-tour="sidebar-trade-requests"]',
    placement: 'right',
    title: '📋 All Trade Requests',
    content:
      'Monitor every pending, approved, and rejected trade request across the entire platform. This gives you essential audit visibility over manager behaviour.',
  },
  {
    target: '[data-tour="sidebar-stocks"]',
    placement: 'right',
    title: '📈 Stock Table',
    content:
      'View the full stock database that powers the Market view. All stock data including price, volume, market cap, and metadata is managed here.',
  },
  {
    target: '[data-tour="sidebar-security"]',
    placement: 'right',
    title: '🔒 Security & Access Control',
    content:
      'The Security section lets you generate and manage approval codes for new managers and admins, initiate a remote server shutdown, and control who has elevated access to the platform.',
  },
  {
    target: '[data-tour="topbar-notifications"]',
    placement: 'bottom',
    title: '🔔 System Notifications',
    content:
      'You receive system-level notifications for important platform events — new manager approvals, anomalies, and security events.',
  },
  {
    target: 'body',
    placement: 'center',
    title: '🚀 Platform is in your hands!',
    content:
      'You have full control. Start by approving managers from the Managers section so they can begin onboarding clients. You are the backbone of the platform.',
  },
];

// ─────────────────────────────────────────────
// CUSTOM PREMIUM STYLES
// ─────────────────────────────────────────────

const joyrideOptions = {
  // Theme colors - using the CimessInvest palette (Pure Black & White)
  arrowColor: '#09090b',
  backgroundColor: '#09090b',
  overlayColor: 'rgba(0, 0, 0, 0.6)', // Reduced from 0.9 to 0.6 for better background visibility
  primaryColor: '#ffffff', // High contrast white for main actions
  textColor: '#ffffff',
  zIndex: 10000,
  spotlightRadius: 1,

  // Behavior & Layout
  showProgress: true,
  skipBeacon: true,
  buttons: ['back', 'primary', 'skip'] as any,
};

const joyrideStyles = {
  tooltip: {
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: '#0b0909ff',
    padding: '24px',
    maxWidth: '380px',
    textAlign: 'left' as const,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  tooltipTitle: {
    fontSize: '18px',
    lineHeight: '1.4',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#ffffff',
  },
  tooltipContent: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#94a3b8', // Slate-400
    padding: '0',
  },
  buttonPrimary: {
    background: '#ffffff',
    borderRadius: '10px',
    color: '#000000',
    fontWeight: 700,
    fontSize: '14px',
    padding: '10px 18px',
    border: 'none',
    outline: 'none', // Remove focus ring
    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
  },
  buttonBack: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '14px',
    marginRight: '12px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '10px',
    padding: '10px 18px',
    cursor: 'pointer',
    outline: 'none', // Remove focus ring
  },
  buttonSkip: {
    color: '#64748b',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
  },
  buttonClose: {
    color: '#94a3b8',
    padding: '12px',
    top: '16px',
    right: '16px',
  },
  spotlight: {
    padding: 20,
    // borderRadius removed from here to prevent React DOM warning
  },
};

// Global CSS to handle spotlight border radius without triggering React warnings
const spotlightStyles = `
  .react-joyride__spotlight {
    border-radius: 16px !important;
  }
`;

// Component Implementation

export default function AppTour({ role, run, onFinish, mobileOpen, setMobileOpen }: AppTourProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const steps = role === 'MANAGER' ? managerSteps :
    role === 'ADMIN' ? adminSteps :
      clientSteps;


  const handleEvent = (data: any) => {
    const { status, step, type, action, index } = data;
    const target = step?.target?.toString() || '';
    
    // Improved diagnostic logging
    const isStepInSidebar = target.includes('sidebar');
    const isStepInTopBar = target.includes('topbar-') || target.includes('notifications');
    
    console.log(`[Tour Event] Type: ${type}, Index: ${index}, Sidebar: ${isStepInSidebar}, TopBar: ${isStepInTopBar}, Status: ${status}`);

    // Proactive sidebar control on mobile using step:before
    if (isMobile && setMobileOpen && (type === 'step:before' || type === 'tour:start')) {
      const activeStep = type === 'tour:start' ? steps[0] : step;
      const activeTarget = activeStep?.target?.toString() || '';
      
      const inSidebar = activeTarget.includes('sidebar');
      const inTopBar = activeTarget.includes('topbar-') || activeTarget.includes('notifications');

      if (inSidebar && !mobileOpen) {
        setMobileOpen(true);
      } else if (inTopBar) {
        setMobileOpen(false);
      }
     
    }


    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      // Ensure sidebar is closed on finish
      if (isMobile && setMobileOpen) setMobileOpen(false);
      onFinish();
    }
  };

  const responsiveStyles = {
    ...joyrideStyles,
    spotlight: {
      ...joyrideStyles.spotlight,
      padding: isMobile ? 15 : 20,
    },
    tooltipTitle: {
      ...joyrideStyles.tooltipTitle,
      fontSize: isMobile ? '16px' : '18px',
    },
    tooltip: {
      ...joyrideStyles.tooltip,
      maxWidth: isMobile ? '300px' : '380px',
      padding: isMobile ? '16px' : '24px',
    },
    tooltipContent: {
      ...joyrideStyles.tooltipContent,
      fontSize: isMobile ? '12px' : '14px',
    },
    buttonPrimary: {
      ...joyrideStyles.buttonPrimary,
      padding: isMobile ? '8px 14px' : '10px 18px',
      fontSize: isMobile ? '12px' : '14px',
    },
    buttonBack: {
      ...joyrideStyles.buttonBack,
      padding: isMobile ? '8px 14px' : '10px 18px',
      fontSize: isMobile ? '12px' : '14px',
    }
  };

  return (
    <>
      <style>{spotlightStyles}</style>
      <JoyrideComponent
        steps={steps}
        run={run}
        continuous
        scrollToFirstStep
        options={joyrideOptions}
        styles={responsiveStyles}
        onEvent={handleEvent}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Get Started 🚀',
          next: 'Next',
          skip: 'Skip Tour',
        }}
      />
    </>
  );
}
