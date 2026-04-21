import React from 'react';
import { Link, Route, Routes ,useLocation} from 'react-router-dom';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import TopBar from '../../components/ui/TopBar';
import { toast,Zoom } from 'react-toastify';
import { useEffect } from 'react';
import { resendVerificationToken } from '../../hooks/useQuery';
``
// Views
import Overview from './views/Overview';
import MarketView from './views/MarketView';
import PortfolioView from './views/PortfolioView';
import TransactionsView from './views/TransactionsView';
import ManagerView from './views/ManagerView';
import SettingsView from './views/SettingsView';
import ReportProblemModal from '../../components/ReportProblemModal';
import NotificationsView from '../../components/NotificationsView';
import { logout } from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { SiGoogle } from 'react-icons/si';
import { useState } from 'react';
import AppTour from '../../components/ui/AppTour';





const ClientDashboard: React.FC = () => {

    const location = useLocation();
  
  React.useEffect(() => {
    console.log("📍 ClientDashboard: Root routing updated", location.pathname);
  }, [location.pathname]);

  const shown = localStorage.getItem("welcome_toast_shown");
  const { mutate: performLogout } = logout();
  const queryClient = useQueryClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isWelcomeToastShown, setIsWelcomeToastShown] = React.useState(shown);
  const navigate = useNavigate();
  const [runTour,setRunTour]=useState(false)
 

  useEffect(() => {
  const done = localStorage.getItem("tour_done");
  if (!done) setRunTour(true);
}, []);

const handleFinish = () => {
  localStorage.setItem("tour_done", "true");
  setRunTour(false);
};
  const handleLogout = () => {
    performLogout();
    queryClient.clear();
    navigate('/login');
  };
  const meData: any = queryClient.getQueryData(["me"]);
  const user = meData?.data;
  const firstName = user?.fullname?.split(" ")[0];
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    useEffect(()=>{
     
      if (!shown) {
   toast.success("Welcome to CimessInvestment Management Platform .", {
        position:"top-center",
        autoClose:5000,
        hideProgressBar:true,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        theme:"colored",
        transition:Zoom,
        });
        localStorage.setItem("welcome_toast_shown", "true");
      }
    },[!isWelcomeToastShown]
    )
const {mutate:getVerificationToken}=resendVerificationToken()

    const handleResendVerificationEmail = () => {
      const res:any=getVerificationToken(user?.email)
      if(res?.data.success){
        toast.success(res?.data.message)
        setTimeout(() => {
          navigate("/verify-email")
        }, 2000);
      }else{
        toast.error(res?.data.message)
      }
    }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <AppTour
        run={runTour}
        onFinish={handleFinish}
        role="CLIENT"
        mobileOpen={isMobileMenuOpen}
        setMobileOpen={setIsMobileMenuOpen}
      />
      <DashboardSidebar 
        role="client" 
        userName={firstName || "Investor"} 
        mobileOpen={isMobileMenuOpen}
        setMobileOpen={setIsMobileMenuOpen}
        handleLogout={handleLogout}
        onReport={() => setIsReportModalOpen(true)}
        image={user?.avatar}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          pageTitle="Dashboard" 
          userName={firstName || "Investor"} 
          onToggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          handleLogout={handleLogout}
          role="CLIENT"
          image={user?.avatar}
        />
           {/* Google Verify Banner - shown when user is NOT verified */}
                 {user && !user?.isVerified && <div className="flex justify-center mb-4 items-center 
                 gap-2 text-sm text-amber-400 md:text-base mt-2 underline">
                    <button onClick={handleResendVerificationEmail} className='cursor-pointer hover:text-amber-500 hover:underline text-amber-300'>
                    verify your email address
                    </button>
                  </div>}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <Routes>
            <Route index element={<MarketView/>} />
            <Route path="market" element={<MarketView />} />
            <Route path="portfolio" element={<PortfolioView />} />
            <Route path="transactions" element={<TransactionsView />} />
            <Route path="manager" element={<ManagerView />} />
            <Route path="settings" element={<SettingsView />} />
            <Route path="notifications" element={<NotificationsView />} />
          </Routes>
        </main>
      </div>

      <ReportProblemModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)}
        targetId={user?.client_manager?.id} 
      />
    </div>
  );
};

export default ClientDashboard;

