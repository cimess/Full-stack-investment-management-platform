import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUpdateUserProfile, useGetMe } from '../hooks/useQuery';
import { toast, Zoom } from 'react-toastify';
import { Eye, EyeOff, Lock, User, ChevronDown, AlertCircle } from "lucide-react";
import { useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import Loader from '../components/loadericon/loader';
import { useLoadingRedirect } from '../hooks/useLoadingRedirect';
import { isPassword } from '../hooks/validator';
import { useAnalytics } from '../hooks/useAnalysis';

export default function CompleteRegistration() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [role, setRole] = useState<"CLIENT" | "MANAGER"|"">("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const queryClient = useQueryClient();
  const { data: userData, isLoading: userLoading } = useGetMe();
  const { mutate: updateProfile, isPending: updatePending } = useUpdateUserProfile();
  
  const { startRedirect, showLoader, message: redirectMessage, success: redirectSuccess } = useLoadingRedirect({
    initialMessage: "Password set successfully!",
    loadingMessage: "Preparing your dashboard...",
    target: role === "MANAGER" ? "/dashboard/manager" : "/dashboard/client"
  });

  const { trackEvent } = useAnalytics();


  useEffect(() => {
    // If user already has a password, redirect them away
    if (userData?.data?.hasPassword) {
      navigate("/dashboard/client");
    }


  }, [userData, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!isPassword(password)) {
      toast.error("Password must contain at least one lowercase, one uppercase, one number, and one special character");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!role || role !== "MANAGER" && role !== "CLIENT")  {
      toast.error("Please select a role");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setShowConfirm(true);
  };

  const handleFinalSubmit = () => {
    setShowConfirm(false);
   
    updateProfile({ password, role }, {
      onSuccess: async() => {
        await queryClient.invalidateQueries({ queryKey: ['me'] });
        role === "MANAGER" ? startRedirect("/dashboard/manager") : startRedirect();
        trackEvent("REGISTRATION_COMPLETED");
      },
      onError: (error: any) => {
        const msg = (error as any)?.response?.data?.message || "Failed to set password";
        toast.error(msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          theme: "colored",
          transition: Zoom,
        });
      }
    });
  }



  if (userLoading || !userData) return <Loader message="Verifying session..." />;

  return (
    <>
      {showLoader && <Loader message={redirectMessage} />}
      {!showLoader && (
        <>
          <Header />
          <div className="min-h-screen flex items-center justify-center bg-transparent">
            {/* Dark background overlay to match LandingPage/Login */}
            <div className={`relative w-[90%] lg:w-[40%] mt-[10vh] rounded-2xl p-10 pt-16 backdrop-blur-xl
              bg-white/5 border border-white/10 shadow-2xl transition-transform
              hover:-translate-y-1 ${shake ? "animate-shake" : ""}`}
            >
              {/* Floating Badge */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full
                flex items-center justify-center text-white text-3xl shadow-xl
                bg-gradient-to-br from-indigo-500 to-purple-700 animate-float"
              >
                <Lock size={32} />
              </div>

              <h1 className="text-center text-white text-2xl font-semibold mb-2">
                Secure Your Account
              </h1>
              <p className="text-center text-cyan-300 text-sm mb-8 min-h-[1.5rem]">
                Welcome, {userData?.data?.fullname || 'User'}! Please set a password for your account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full rounded-xl bg-white/10 border border-white/20
                    text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
               

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full rounded-xl bg-white/10 border border-white/20
                    text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                 <div className="relative group">
                  <div 
                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    className="w-full rounded-xl bg-white/10 border border-white/20
                    text-white px-4 py-4 outline-none focus:ring-2 focus:ring-cyan-400 
                    cursor-pointer flex items-center gap-4 transition-all hover:bg-white/15 active:scale-[0.99]"
                  >
                    <User className="text-gray-400 shrink-0" size={18} />
                    <span className="flex-grow text-sm lg:text-base font-medium text-gray-400">
                      {role === "CLIENT" ? "Client" :role === "MANAGER" ? "Manager" : "Please Select Role"}
                    </span>
                    <ChevronDown 
                      className={`text-gray-400 transition-transform duration-300 ${showRoleDropdown ? 'rotate-180 text-cyan-400' : ''}`} 
                      size={18} 
                    />
                  </div>

                  {showRoleDropdown && (
                    <div className="absolute top-full mt-2 left-0 right-0 rounded-xl bg-[#0f172a] border border-white/20 shadow-2xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                      <div 
                        onClick={() => { setRole("CLIENT"); setShowRoleDropdown(false); }}
                        className={`px-4 py-4 cursor-pointer transition-colors flex items-center gap-4 ${role === 'CLIENT' ? 'bg-white/10 text-cyan-400' : 'text-white hover:bg-white/5'}`}
                      >
                        <User className={role === 'CLIENT' ? 'text-cyan-400' : 'text-gray-400'} size={18} />
                        <span className="font-medium">Client</span>
                      </div>
                      <div 
                        onClick={() => { setRole("MANAGER"); setShowRoleDropdown(false); }}
                        className={`px-4 py-4 cursor-pointer transition-colors flex items-center gap-4 ${role === 'MANAGER' ? 'bg-white/10 text-cyan-400' : 'text-white hover:bg-white/5'}`}
                      >
                        <User className={role === 'MANAGER' ? 'text-cyan-400' : 'text-gray-400'} size={18} />
                        <span className="font-medium">Manager</span>
                      </div>
                    </div>
                  )}
                  <div className="text-cyan-300 text-[10px] lg:text-xs px-4 mt-2 font-light">
                    Please select your account role to proceed
                  </div>
                </div>



                <button
                  disabled={updatePending || redirectSuccess}
                  className={`w-full h-14 py-4 rounded-xl font-medium tracking-wide
                  transition-all shadow-lg
                  ${redirectSuccess 
                    ? "bg-gradient-to-r from-green-400 to-emerald-600" 
                    : "bg-gradient-to-r from-indigo-500 to-purple-700 hover:-translate-y-0.5"}
                  disabled:opacity-70 text-white`}
                  type="submit"
                >
                  {updatePending ? "Setting Password..." : "Complete Registration"}
                </button>
              </form>
            </div>
          </div>
          <Footer />
          
          {/* Custom Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-modal-fade">
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-modal-zoom">

                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400">
                  <AlertCircle size={32} />
                </div>
                
                <h3 className="text-white text-xl font-bold text-center mb-3">Confirm Your Role</h3>
                
                <p className="text-gray-400 text-center mb-8 leading-relaxed">
                  You are about to register as a <span className="text-cyan-400 font-bold uppercase tracking-wider">{role}</span>. 
                  Please note that you <span className="text-white font-medium italic">can only change this role</span> by the approval of the admin.
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleFinalSubmit}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          <style>{`

            @keyframes shake {
              10%, 90% { transform: translateX(-2px); }
              20%, 80% { transform: translateX(4px); }
              30%, 50%, 70% { transform: translateX(-6px); }
              40%, 60% { transform: translateX(6px); }
            }
            .animate-shake { animation: shake 0.5s both; }
            @keyframes float {
              0%, 100% { transform: translate(-50%, 0); }
              50% { transform: translate(-50%, -10px); }
            }
            .animate-float { animation: float 3s ease-in-out infinite; }
            
            @keyframes modal-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modal-zoom-in {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-modal-fade { animation: modal-fade-in 0.2s ease-out; }
            .animate-modal-zoom { animation: modal-zoom-in 0.2s ease-out; }
          `}</style>

        </>
      )}
    </>
  );
}
