
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Dashboard from './dashboard/dashboard';

const App= () => {


  return (
     <Router>
    <div className="bg-dark text-white min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200">
      <main>


        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </main>
     </div>
    </Router>
  );
};

export default App;
