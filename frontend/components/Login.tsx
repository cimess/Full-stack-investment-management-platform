import {useState, useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import {login,register } from '../hooks/useQuery';
import { toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isEmail,isPassword,isName} from '../hooks/validator';
import {Eye,EyeOff, User, ChevronDown, AlertCircle} from "lucide-react"

import {  useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Loader from './loadericon/loader';
import { getClientAll, getManagerAll, getAdminDashboard } from '../services/queryServices';
import { useLoadingRedirect } from '../hooks/useLoadingRedirect';
import { SiGoogle } from "react-icons/si";




export default function Login({loginUi}:{loginUi:boolean}){
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [message, setMessage] = useState<string>("Sign in to access your account");
  const [success, setSuccess] = useState<boolean>(false);
  const [hoverBadge, setHoverBadge] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [googleAuthData, setGoogleAuthData] = useState<any>(null);


const [showPassword,setShowPassword]=useState<boolean>(false);
const [role, setRole] = useState<"CLIENT" | "MANAGER">("CLIENT");
const [showRoleDropdown, setShowRoleDropdown] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
const queryClient=useQueryClient();


useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');
  if (error === 'oauth_failed') {
    toast.error("Google authentication failed. Please try again or use another method.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Zoom,
    });
    // Remove the error param from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}, []);

const { startRedirect, showLoader, message: redirectMessage, success: redirectSuccess } = useLoadingRedirect({
  initialMessage: "Login successful!",
  loadingMessage: "Fetching account data...",
  action: async () => {
    const role = loginData?.data?.roles;
    if (role === "MANAGER") {
      await queryClient.prefetchQuery({ queryKey: ["managerDashboard"], queryFn: getManagerAll });
    } else if (role === "ADMIN") {
      await queryClient.prefetchQuery({ queryKey: ["adminDashboard"], queryFn: getAdminDashboard });
    } else {
      await queryClient.prefetchQuery({ queryKey: ["dashboard"], queryFn: getClientAll });
    }
  }
});
    const {mutate:loginMutate,isSuccess:loginSuccess,isError:isLoginError,error:loginError,isPending:loginPending,data:loginData}=login();



    const {mutate:registerMutate,isSuccess:registerSuccess,data:registerData,isError:isRegisterError,error:registerError,isPending:registerPending}=register();


 



const apiMessage= loginData?.message ??  registerData?.message


useEffect(() => {
   if(loginSuccess||registerSuccess){
    toast.success(apiMessage,{
      position:"top-center",
      autoClose:5000,
      hideProgressBar:true,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      theme:"colored",
      transition:Zoom,
    });
    queryClient.setQueryData(['dashboard'], loginData);
  }else if (isLoginError || isRegisterError) {
  const apiErrorMessage =
    (loginError as any)?.response?.data?.message ??
    loginError?.message ??
    (registerError as any)?.response?.data?.message ??
    registerError?.message 
    // ??(data as any)?.response?.data?.message ??
    // "Something went wrong";

  toast.error(apiErrorMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Zoom,
  });

  setMessage(apiErrorMessage);
  setSuccess(false);
}


  if(loginPending||registerPending ){
      setMessage("Authenticating...");
    }
    if(registerSuccess){
// queryClient.setQueryData(["userEmail"],email);
//       setTimeout(()=>navigate("/verify"),3000);
  const roles = registerData?.data?.roles;
  const target = roles === "MANAGER" ? "/dashboard/manager" :"/dashboard/client";
  console.log("Registration success, redirecting to:", target);
  startRedirect(target);
    }
if (loginSuccess && loginData?.success) {
  const roles = loginData?.data?.roles;
  const target = roles === "MANAGER" ? "/dashboard/manager" :
                 roles === "ADMIN" ? "/dashboard/admin" :
                 "/dashboard/client";
  console.log("Login success, redirecting to:", target);
  startRedirect(target);
}
if (isLoginError) {
  console.error("Login failed:", loginError);
}

if(isLoginError||isRegisterError){
  setSuccess(false);
  setMessage("Login failed!");


}
if(loginPending||registerPending){
      setMessage("Authenticating...");
    }
if(loginSuccess||registerSuccess){
  setSuccess(true);
  setMessage(loginSuccess?"Login successful! Redirecting...":"Registration successful! Redirecting to verification...");
}

  }, [loginSuccess,isLoginError,registerSuccess,isRegisterError]);





// handle form validation and submit
  const handleTextValidation = async (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();

     if (!loginUi && (firstName.length<1 || lastName.length<1 || email.length<1)) {
      setMessage("input field cant be empty!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (!email || !password) {
      setMessage("Please fill all fields!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }


   if(!loginUi){
    if(!isName(firstName)){
      setMessage("Please enter a valid first name!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if(!isName(lastName)){
      setMessage("Please enter a valid last name!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }


    if(!isEmail(email)){
      setMessage("Please enter a valid email address!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if(!isPassword(password)){
      setMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
  }

    if(loginUi){
      loginMutate({email:email,password});
    }else{
      setShowConfirm(true);
    }
  };

  const handleFinalSubmit = () => {
    setShowConfirm(false);
    registerMutate({
      username,
      password,
      email,
      name: firstName + " " + lastName,
      role
    });
  };


const passwordFeedback = () => {
    if (!password) return "";
    if (!loginUi && password.length < 5) return "Keep going... Password should be more than 8 characters!";
    if (!loginUi && password.length < 8) return "Good, but can be stronger";
    return !loginUi ? "Excellent password strength!" : "";
  };

  return (
    <>

    {showLoader && <Loader message={redirectMessage} />}
    {!showLoader && <><Header/><div className="min-h-screen overflow-y-auto flex items-center justify-center py-20 bg-black">
      <div
        className={`relative w-[95%] sm:w-[85%] md:w-[70%] lg:w-[45%] rounded-[2.5rem] p-8 sm:p-12 premium-card transition-all duration-500
        ${shake ? "animate-shake" : ""}`}
      >
        {/* Badge */}
        <div
          onMouseEnter={() => setHoverBadge(true)}
          onMouseLeave={() => setHoverBadge(false)}
          className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl
          flex items-center justify-center text-white text-3xl shadow-2xl border border-white/10
          transition-all duration-500
          ${redirectSuccess
            ? "bg-emerald-500 shadow-emerald-500/20"
            : "bg-white/[0.03] backdrop-blur-xl"}`}
        >
          <i
            className={`fas ${
              success
                ? "fa-check"
                : hoverBadge
                ? "fa-user"
                : "fa-lock-open"
            }`}
             style={success ? {color: 'white'} : {color: '#888888'}}
          />
        </div>

        <h1 className="text-center text-white text-3xl font-bold mb-3 tracking-tighter">
          {loginUi ? "Welcome back" : "Create your account"}
        </h1>

        <p className="text-center text-slate-500 text-sm mb-10 font-medium">
          { message }
        </p>

        {/* Google Button */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white text-black font-bold border border-white hover:bg-slate-100 transition-all active:scale-[0.98]"
            onClick={() => (window.location.href = "/api/auth/google")}
          >
            <SiGoogle size={18} />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-8">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
           <span className="relative px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-[#0a0a0a]">Or continue with email</span>
        </div>

        {/*   LOGIN AND SIGNUP LAYOUT */}
        <form onSubmit={handleTextValidation} className="space-y-6  ">

            {/* first name */}
          {loginUi ? null :<div className="relative">
             <input
              type="text"
              placeholder="First Name"
              className="w-full rounded-xl bg-white/[0.03] border border-white/10
              text-white px-5 py-3.5 outline-none focus:border-white/20 transition-all font-medium"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value);}}
              onFocus={() => setMessage("Enter your first name")}
            />
          </div>
}
          {/* last name */}
          {loginUi ? null :<div className="relative">
            <input
              type="text"
              placeholder="Last Name"
              className="w-full rounded-xl bg-white/[0.03] border border-white/10
              text-white px-5 py-3.5 outline-none focus:border-white/20 transition-all font-medium"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value)}}
              onFocus={() => setMessage('Enter your last name')}
            />
          </div>
}

          {/* Username */}
            {loginUi ? null :<div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-xl bg-white/[0.03] border border-white/10
              text-white px-5 py-3.5 outline-none focus:border-white/20 transition-all font-medium"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setMessage("Enter your username")}
            />
          </div>
            }
           <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl bg-white/[0.03] border border-white/10
              text-white px-5 py-3.5 outline-none focus:border-white/20 transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setMessage("Enter your email")}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword? "text": "password"}
              placeholder="Password"
              className="w-full rounded-xl bg-white/[0.03] border border-white/10
              text-white px-5 py-3.5 outline-none focus:border-white/20 transition-all font-medium"
              value={password}
              onChange={(e) => { setPassword(e.target.value);setMessage(passwordFeedback())}}
              onFocus={()=>{setMessage("Enter your password")}}
            />
            <button onClick={()=>setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
               type="button">
              {showPassword ?<EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}

            </button>
          </div>

           {/* Role Selection (Registration only) */}
          {!loginUi && (
            <div className="relative group">
              <div 
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="w-full rounded-xl bg-white/10 border border-white/20
                text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-cyan-400 
                cursor-pointer flex items-center gap-4 transition-all hover:bg-white/15 active:scale-[0.99]"
              >
                <User className="text-gray-400 shrink-0" size={18} />
                <span className="flex-grow text-sm font-medium text-gray-400">
                  {role === "CLIENT" ? "Client" : "Manager"}
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
                    className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-4 ${role === 'CLIENT' ? 'bg-white/10 text-cyan-400' : 'text-white hover:bg-white/5'}`}
                  >
                    <User className={role === 'CLIENT' ? 'text-cyan-400' : 'text-gray-400'} size={18} />
                    <span className="font-medium text-sm">Client</span>
                  </div>
                  <div 
                    onClick={() => { setRole("MANAGER"); setShowRoleDropdown(false); }}
                    className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-4 ${role === 'MANAGER' ? 'bg-white/10 text-cyan-400' : 'text-white hover:bg-white/5'}`}
                  >
                    <User className={role === 'MANAGER' ? 'text-cyan-400' : 'text-gray-400'} size={18} />
                    <span className="font-medium text-sm">Manager</span>
                  </div>
                </div>
              )}
              <div className="text-cyan-300 text-[10px] px-4 mt-2 font-light">
                Please select your account role to proceed
              </div>
            </div>
          )}


          {/* Options */}

          {loginUi ? <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>
            <a href="#" className="text-cyan-400 hover:underline">
              Forgot password?
            </a>
          </div> : null
              }
          {/* Button */}
          <button
            disabled={loginPending||loginSuccess||registerPending||registerSuccess}
            className={`w-full py-4 rounded-xl font-bold tracking-tight transition-all active:scale-[0.98] disabled:opacity-50
            ${
              success
                ? "bg-emerald-500 text-white"
                : "bg-white text-black hover:bg-slate-100"
            }`}
            type="submit"
          >
            {success
              ? "Access Granted"
              : loginPending
              ? "Authenticating..."
              :registerPending
              ? "Creating Account..."
              : loginUi ? "Sign in" : "Create account"}

          </button>
        </form>

       {loginUi?<p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?
          <a href="/signup" className="text-cyan-400 ml-1 hover:underline">
            Sign up
          </a>
        </p>:<p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?
          <a href="/login" className="text-cyan-400 ml-1 hover:underline">
            Login
          </a>
        </p>}

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
    <Footer/>
    </>}

    {/* Custom Confirmation Modal */}
    {showConfirm && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-modal-fade">
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-modal-zoom">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400">
            <AlertCircle size={32} />
          </div>
          
          <h3 className="text-white text-xl font-bold text-center mb-3">Confirm Your Role</h3>
          
          <p className="text-gray-400 text-center mb-8 leading-relaxed text-sm">
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
  );
}


