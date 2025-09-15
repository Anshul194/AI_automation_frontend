import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginFlow } from "./components/LoginFlow";
import { MainApp } from "./components/MainApp";
import "./App.css"

export default function App() {
  const [appState, setAppState] = useState('landing');

  const handleLogin = () => {
    setAppState('login');
  };

  const handleLoginComplete = () => {
    setAppState('app');
  };

  const handleLogout = () => {
    setAppState('landing');
  };

  switch (appState) {
    case 'landing':
      return <LandingPage onLogin={handleLogin} />;
    case 'login':
      return <LoginFlow onComplete={handleLoginComplete} />;
    case 'app':
      return <MainApp onLogout={handleLogout} />;
    default:
      return <LandingPage onLogin={handleLogin} />;
  }
}