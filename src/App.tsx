import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { LoginFlow } from "./components/LoginFlow";

import SignupPage from "./components/SignupPage";

// Wrapper for LandingPage to navigate to /login
function LandingPageWithNav() {
  const navigate = useNavigate();
  return <LandingPage onLogin={() => navigate("/login")}/>;
}

// Wrapper for LoginFlow to navigate to /app
function LoginFlowWithNav() {
  const navigate = useNavigate();
  return <LoginFlow onComplete={() => navigate("/app")}/>;
}

// Wrapper for MainApp to navigate to / (logout)
function MainAppWithNav() {
  const navigate = useNavigate();
  return <MainApp onLogout={() => navigate("/")}/>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<LandingPageWithNav />} />
  <Route path="/login" element={<LoginFlowWithNav />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/app/*" element={<MainAppWithNav />} />
      </Routes>
    </BrowserRouter>
  );
}
