import {useState} from 'react'
import Header from './Header';
import Footer from './Footer';

export default function Login({loginUi}:{loginUi:boolean}){
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [message, setMessage] = useState<string>("Sign in to access your account");
  const [attempts, setAttempts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [hoverBadge, setHoverBadge] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please fill in all fields!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (attempts === 0) {
      setAttempts(1);
      setMessage("Almost there... try once more!");
      return;
    }

    setLoading(true);
    setMessage("Authenticating...");

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setMessage("Login successful! Redirecting...");
    }, 1500);
  };
//   const loginMessage=["Hey, welcome back 👋",

// "Nice to have you here again.",

// "All set. Just one step left.",

// "You're right on time.",

// "Back for more? We like that."];
// const loginMessageIndex=Math.floor(Math.random() * loginMessage.length);

const passwordFeedback = () => {
    if (!password) return "";
    if (!loginUi && password.length < 5) return "Keep going... Password should be more than 8 characters!";
    if (!loginUi && password.length < 8) return "Good, but can be stronger";
    return !loginUi ? "Excellent password strength!" : "";
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center ">
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
          ${success
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

        <form onSubmit={handleSubmit} className="space-y-6  ">

            {/* first name */}
          <div className="relative">
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
          {/* last name */}
           <div className="relative">
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


          {/* Username */}
          <div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username or Email"
              className="w-full rounded-xl bg-white/10 border border-white/20
              text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setMessage("Enter your username or email")}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl bg-white/10 border border-white/20
              text-white px-12 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
              value={password}
              onChange={(e) => { setPassword(e.target.value);setMessage(passwordFeedback())}}
              onFocus={()=>{setMessage("Enter your password")}}
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>
            <a href="#" className="text-cyan-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            disabled={loading || success}
            className={`w-full h-13 py-4 rounded-xl font-medium tracking-wide
            transition-all shadow-lg
            ${
              success
                ? "bg-gradient-to-r from-green-400 to-emerald-600"
                : "bg-gradient-to-r from-indigo-500 to-purple-700 hover:-translate-y-0.5"
            }
            disabled:opacity-70`}
          >
            {success
              ? "Access Granted"
              : loading
              ? "Authenticating..."
              : attempts === 0
              ? "Sign In"
              : "Press Again"}
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
    </>
  );
}


