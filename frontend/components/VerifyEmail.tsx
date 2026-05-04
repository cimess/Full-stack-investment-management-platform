import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { verifyUserEmail } from '../hooks/useQuery';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmail } from '../hooks/validator';
import { useQueryClient } from '@tanstack/react-query';
import { useLoadingRedirect } from '../hooks/useLoadingRedirect';
import Loader from './loadericon/loader';
import { resendVerificationToken } from '../hooks/useQuery';
import { useAnalytics } from '../hooks/useAnalysis';


export default function VerifyEmail({tokenRequired=false}: {tokenRequired?: boolean}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('Enter your email and verification code');
  const [success, setSuccess] = useState<boolean>(false);
  const [hoverBadge, setHoverBadge] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [showOtpForm, setShowOtpForm] = useState(!tokenRequired);

   const [searchParams] = useSearchParams();
  
  // 1. Get the values from the URL
  const urlOtp = searchParams.get("otp");
  const urlEmail = searchParams.get("email");

  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // 2. If both exist, trigger the verification automatically

   if (urlOtp && urlEmail) {
      setEmail(urlEmail);
      setOtp(urlOtp);
      
      toast.info("Auto-verifying your account...");
      verifyMutate({ email: urlEmail, otp: urlOtp });
    }
  }, [urlOtp, urlEmail]);

  const { startRedirect, showLoader, message: redirectMessage, success: redirectSuccess } = useLoadingRedirect({
    initialMessage: 'Email verified successfully!',
    loadingMessage: 'Loading dashboard...',
    target: '/dashboard/client', // default target, overwritten below
    initialDelay: 2000,
  });

 const { mutateAsync: getVerificationToken, isPending: isResending } = resendVerificationToken();

  const {
    mutate: verifyMutate,
    isSuccess,
    isError,
    error,
    isPending,
    data,
  } = verifyUserEmail();

  useEffect(() => {
  if (!showOtpForm) {
      setMessage("Account not verified. Please request a new code.");
      toast.warn("Account not verified. Please request a new code.");
    } else {
      setMessage("Enter the 6-digit code sent to your email");
    
    }
  }, [showOtpForm]);

  useEffect(() => {
    const savedEmail = queryClient.getQueryData(["userEmail"]);
    if (savedEmail) {
      setEmail(savedEmail as string);
    }

    if (isSuccess) {
      toast.success(data?.message || 'Email verified successfully', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Zoom,
      });
      const roles = data?.data?.roles;
      const target = roles === "MANAGER" ? "/dashboard/manager" :
        roles === "ADMIN" ? "/dashboard/admin" :
          "/dashboard/client";
      startRedirect(target);
      trackEvent("REGISTRATION_USER_VERIFIED", { method: "email" });
    } else if (isError) {
      const specificError = (error as any)?.response?.data?.message || error?.message;
      toast.error(specificError, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Zoom,
      });
      setSuccess(false);
      setMessage('Verification failed!');
    }

    if (isPending) {
      setMessage('Verifying...');
    }
  }, [isSuccess, isError, isPending, data, error, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !otp) {
      setMessage('Please fill all fields!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!isEmail(email)) {
      setMessage('Please enter a valid email address!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setMessage('OTP must be exactly 6 digits');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    verifyMutate({ email, otp });
  };



  const handleResendVerificationEmail = async () => {
    if (!email) return toast.error("Please enter your email first");
    const res: any = await getVerificationToken(email)
     
    if (res?.data.success) {
      toast.success(res?.data.message)
      setShowOtpForm(true);
    } else {
      toast.error(res?.data.message)
      setShowOtpForm(false);
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div
          className={`relative w-[90%] lg:w-[40%] mt-[15vh] rounded-2xl p-10 pt-16 backdrop-blur-xl
          bg-white/5 border border-white/10 shadow-2xl transition-transform
          hover:-translate-y-1 ${shake ? 'animate-shake' : ''}`}
        >
          {showLoader && <Loader message={redirectMessage} />}
          {/* Badge */}
          <div
            onMouseEnter={() => setHoverBadge(true)}
            onMouseLeave={() => setHoverBadge(false)}
            className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full
            flex items-center justify-center text-white text-3xl shadow-xl
            transition-all duration-300 animate-float
            ${redirectSuccess
                ? 'bg-gradient-to-br from-green-400 to-emerald-600 animate-pulse'
                : 'bg-gradient-to-br from-indigo-500 to-purple-700'
              }`}
          >
            <i
              className={`fas ${success ? 'fa-check' : hoverBadge ? 'fa-key' : 'fa-envelope-open-text'
                }`}
            />
          </div>

          <h1 className="text-center text-white text-2xl font-semibold mb-6">
            Verify Email
          </h1>

          <p className="text-center text-cyan-300 text-sm mb-6 min-h-[1.5rem]">
            {message}
          </p>
          <div className="space-y-6">


                <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl bg-white/10 border border-white/20
                text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400 text-center" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setMessage('Enter your registered email')}
              />
            </div>
              {!showOtpForm ? (
              /* STAGE 1: REQUEST BUTTON */
              <button
                onClick={handleResendVerificationEmail}
                disabled={isResending}
                className="w-full py-4 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {isResending ? 'Sending...' : 'Send Verification Code'}
              </button>
            ) :(
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            


            {/* OTP */}
            <div className="relative">
              <i className="fas fa-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="6-digit Verification Code"
                maxLength={6}
                className="w-full rounded-xl bg-white/10 border border-white/20
                text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400 tracking-widest text-center text-lg"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                onFocus={() => setMessage('Enter the 6-digit code sent to your email')}
              />
            </div>

            {/* Button */}
            <button
              disabled={isPending || success}
              className={`w-full h-13 py-4 rounded-xl font-medium tracking-wide
              transition-all shadow-lg text-white
              ${success
                  ? 'bg-gradient-to-r from-green-400 to-emerald-600'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-700 hover:-translate-y-0.5'
                }
              disabled:opacity-70`}
              type="submit"
            >
              {success ? 'Verified' : isPending ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
            )}

          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Back to{' '}
            <a href="/login" className="text-cyan-400 hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Tailwind Animations */}
        <style>{`
          @keyframes shake {
            10%, 90% { transform: translateX(-2px); }
            20%, 80% { transform: translateX(4px); }
            30%, 50%, 70% { transform: translateX(-6px); }
            40%, 60% { transform: translateX(6px); }
          }
          .animate-shake {
            animation: shake 0.5s both;
          }
          @keyframes float {
            0%, 100% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, -10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
