import {useState, useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import {login,register} from '../hooks/useQuery';
import { toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isEmail,isPassword,isName} from '../hooks/validator';
import {Eye,EyeOff} from "lucide-react"
import {  useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Loader from './loadericon/loader';
import { getClientAll, getManagerAll, getAdminDashboard } from '../services/queryServices';
import { useLoadingRedirect } from '../hooks/useLoadingRedirect';


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

const [showPassword,setShowPassword]=useState<boolean>(false);
const queryClient=useQueryClient();

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





useEffect(() => {
   if(loginSuccess||registerSuccess){
    toast.success(loginUi ? loginData?.message : registerData?.message,{
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
  }else if(isLoginError||isRegisterError){
     const specificLoginError = (loginError as any)?.response?.data?.message || loginError?.message;
    const specificRegisterError = (registerError as any)?.response?.data?.message || registerError?.message;
    toast.error(loginUi ? specificLoginError : specificRegisterError,{
      position:"top-center",
      autoClose:5000,
      hideProgressBar:true,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      theme:"colored",
      transition:Zoom,
    });
  }

  if(loginPending||registerPending){
      setMessage("Authenticating...");
    }
    if(registerSuccess){
queryClient.setQueryData(["userEmail"],email);
      setTimeout(()=>navigate("/verify"),3000);
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
  setMessage("Login successful! Redirecting...");
}

  }, [loginSuccess,isLoginError,registerSuccess,isRegisterError]);


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
    registerMutate({username,password,email,name:firstName+" "+lastName});
  }


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
    {!showLoader && <><Header/><div className="min-h-screen flex items-center justify-center ">
      <div
        className={`relative w-[90%] lg:w-[60%]  mt-[18vh] rounded-2xl p-10 pt-16 backdrop-blur-xl
        bg-white/5 border border-white/10 shadow-2xl transition-transform
        hover:-translate-y-1 ${shake ? "animate-shake" : ""}`}
      >
        {/* Badge */}
        <div
          onMouseEnter={() => setHoverBadge(true)}
          onMouseLeave={() => setHoverBadge(false)}
          className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full
          flex items-center justify-center text-white text-3xl shadow-xl
          transition-all duration-300 animate-float
          ${redirectSuccess
            ? "bg-gradient-to-br from-green-400 to-emerald-600 animate-pulse"
            : "bg-gradient-to-br from-indigo-500 to-purple-700"}`}
        >
          <i
            className={`fas ${
              success
                ? "fa-check"
                : hoverBadge
                ? "fa-user"
                : "fa-lock-open"
            }`}
          />
        </div>

        <h1 className="text-center text-white text-2xl font-semibold mb-6">
          {loginUi ? "Welcome Back" : "Create an Account"}
        </h1>

        <p className="text-center text-cyan-300 text-sm mb-6 min-h-[1.5rem]">
          { message}
        </p>

        <form onSubmit={handleTextValidation} className="space-y-6  ">

            {/* first name */}
          {loginUi ? null :<div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="First Name"
              className="w-full rounded-xl bg-white/10 border border-white/20
              text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value);}}
              onFocus={() => setMessage("Enter your first name")}
            />
          </div>
}
          {/* last name */}
          {loginUi ? null :<div className="relative">
            <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full rounded-xl bg-white/10 border border-white/20
              text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value)}}
              onFocus={() => setMessage('Enter your last name')}
            />
          </div>
}

          {/* Username */}
            {loginUi ? null :<div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-xl bg-white/10 border border-white/20
              text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setMessage("Enter your username")}
            />
          </div>
            }
           <div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl bg-white/10 border border-white/20
              text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setMessage("Enter your email")}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword? "text": "password"}
              placeholder="Password"
              className="w-full rounded-xl bg-white/10 border border-white/20
              text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
              value={password}
              onChange={(e) => { setPassword(e.target.value);setMessage(passwordFeedback())}}
              onFocus={()=>{setMessage("Enter your password")}}
            />
            <button onClick={()=>setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
               type="button">
              {showPassword ?<EyeOff size={18} /> : <Eye size={18} />}

            </button>
          </div>

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
            className={`w-full h-13 py-4 rounded-xl font-medium tracking-wide
            transition-all shadow-lg
            ${
              success
                ? "bg-gradient-to-r from-green-400 to-emerald-600"
                : "bg-gradient-to-r from-indigo-500 to-purple-700 hover:-translate-y-0.5"
            }
            disabled:opacity-70`}
            type="submit"
          >
            {success
              ? "Access Granted"
              : loginPending
              ? "Authenticating..."
              :registerPending
              ? "Registering..."
              : "Sign In"}

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

    </>
  );
}


