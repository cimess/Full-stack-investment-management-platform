import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUpdateUserProfile, useGetMe } from '../hooks/useQuery';
import { toast, Zoom } from 'react-toastify';
import { Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loadericon/loader';
import { useLoadingRedirect } from '../hooks/useLoadingRedirect';
import { isPassword } from '../hooks/validator';

export default function CompleteRegistration() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  
  const { data: userData, isLoading: userLoading } = useGetMe();
  const { mutate: updateProfile, isPending: updatePending } = useUpdateUserProfile();
  
  const { startRedirect, showLoader, message: redirectMessage, success: redirectSuccess } = useLoadingRedirect({
    initialMessage: "Password set successfully!",
    loadingMessage: "Preparing your dashboard...",
    target: "/dashboard/client"
  });

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

    updateProfile({ password }, {
      onSuccess: () => {
        startRedirect();
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
  };

  if (userLoading) return <Loader message="Verifying session..." />;

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
          `}</style>
        </>
      )}
    </>
  );
}
