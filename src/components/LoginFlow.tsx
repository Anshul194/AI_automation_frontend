import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { loginUser } from "../store/slices/authSlice";
import { login } from "../store/slices/authSlice";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Mail, 
  Lock, 
  Chrome,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Facebook,
  ShoppingBag,
  BarChart3,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Users,
  TrendingUp
} from "lucide-react";

type LoginStep = 'login' | 'integrations' | 'analyzing';

export function LoginFlow({ onComplete }: { onComplete: () => void }) {

  const dispatch = useAppDispatch();
  const [step, setStep] = useState<LoginStep>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [connections, setConnections] = useState({
    shopify: false,
    meta: false,
    analytics: false
  });
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      console.log(data);
      if (data && data?.data?.accessToken && data?.data?.refreshToken && data?.data?.user) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }
      dispatch(login({ user: data.data.user, token: data.data.accessToken }));
      setStep('integrations');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setStep('integrations');
  };

  const toggleConnection = (service: keyof typeof connections) => {
    setConnections(prev => ({ ...prev, [service]: !prev[service] }));
  };

  const handleContinue = () => {
    setStep('analyzing');
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          alert('Setup Complete! Dashboard would load here.');
        }, 500);
      }
    }, 200);
  };

  if (step === 'login') {
    return (
      <div className="min-h-screen bg-dark-bg">

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16 h-screen flex sm:items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-dark-positive/10 text-dark-positive text-sm font-medium border border-dark-positive/20">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Analytics
                </div>
                <h2 className="text-5xl font-bold text-dark-primary leading-tight">
                  Transform Your 
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block">
                    Business Data
                  </span>
                </h2>
                <p className="text-xl text-dark-secondary leading-relaxed">
                  Connect your platforms and get AI-driven insights that help you make smarter decisions and grow your business faster.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-dark-hover p-6 rounded-2xl border border-dark-border">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-dark-primary mb-2">Smart Analytics</h3>
                  <p className="text-sm text-dark-secondary">AI analyzes your data patterns and provides actionable insights</p>
                </div>
                <div className="bg-dark-hover p-6 rounded-2xl border border-dark-border">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-dark-primary mb-2">Real-time Updates</h3>
                  <p className="text-sm text-dark-secondary">Get instant notifications when important metrics change</p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl">
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-bold text-dark-primary">Welcome Back</h3>
                  <p className="text-dark-secondary">Sign in to access your analytics dashboard</p>
                </div>

                {/* Google Login */}
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center space-x-3 bg-dark-hover hover:bg-dark-border border border-dark-border rounded-2xl py-4 px-6 transition-all duration-200 text-dark-primary font-medium"
                >
                  <Chrome className="w-5 h-5" />
                  <span>Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dark-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-dark-card px-4 text-dark-secondary">Or sign in with email</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-primary mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-secondary" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-12 pr-4 py-4 bg-dark-hover border border-dark-border rounded-2xl text-dark-primary placeholder-dark-secondary focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-primary mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-secondary" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-12 pr-12 py-4 bg-dark-hover border border-dark-border rounded-2xl text-dark-primary placeholder-dark-secondary focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-dark-secondary hover:text-dark-primary transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

              <Button 
                onClick={handleLogin}
                className="w-full dark-button-primary"
                size="lg"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {error && (
                <div className="text-red-500 text-sm text-center mt-2">{error}</div>
              )}
            </div>

                  <div className="text-center text-sm">
                    <span className="text-dark-secondary">Don't have an account? </span>
                    <button className="text-dark-cta hover:underline font-medium">Create one</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  if (step === 'integrations') {
    return (
      <div className="min-h-screen flex justify-center items-center bg-dark-bg">

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-primary mb-4">Connect Your Data Sources</h2>
            <p className="text-dark-secondary text-lg max-w-2xl mx-auto">
              Link your business platforms to start getting AI-powered insights and recommendations
            </p>
          </div>

          {/* Integration Grid */}
          <div className="space-y-6 mb-12">
            {/* Shopify */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-4 md:p-8 hover:border-dark-border/80 transition-colors">
              <div className="flex items-start gap-8 md:flex-row md:items-center flex-col justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-dark-primary">Shopify Store</h3>
                    <p className="text-dark-secondary">Connect your store to track revenue, orders, and customer data</p>
                    <div className="flex items-center space-x-4 text-sm text-dark-secondary">
                      <span>• Revenue Tracking</span>
                      <span>• Order Analytics</span>
                      <span>• Customer Insights</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {connections.shopify ? (
                    <div className="bg-dark-positive/20 text-dark-positive px-4 py-2 rounded-full flex items-center space-x-2 border border-dark-positive/30">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Connected</span>
                    </div>
                  ) : (
                    <div className="bg-dark-tag text-dark-secondary px-4 py-2 rounded-full flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Not Connected</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleConnection('shopify')}
                    className={`px-3 py-2 rounded-full font-medium transition-all ${
                      connections.shopify
                        ? 'bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    {connections.shopify ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>

            {/* Meta Ads */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-4 md:p-8 hover:border-dark-border/80 transition-colors">
              <div className="flex items-start gap-8 md:flex-row md:items-center flex-col justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Facebook className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-dark-primary">Meta Ads Manager</h3>
                    <p className="text-dark-secondary">Connect Facebook & Instagram ad accounts for campaign insights</p>
                    <div className="flex items-center space-x-4 text-sm text-dark-secondary">
                      <span>• Campaign Performance</span>
                      <span>• ROAS Tracking</span>
                      <span>• Audience Insights</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {connections.meta ? (
                    <div className="bg-dark-positive/20 text-dark-positive px-4 py-2 rounded-full flex items-center space-x-2 border border-dark-positive/30">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Connected</span>
                    </div>
                  ) : (
                    <div className="bg-dark-tag text-dark-secondary px-4 py-2 rounded-full flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Not Connected</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleConnection('meta')}
                    className={`px-3 py-2 rounded-full  font-medium transition-all ${
                      connections.meta
                        ? 'bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    {connections.meta ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>

            {/* Google Analytics */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-4 md:p-8 hover:border-dark-border/80 transition-colors">
              <div className="flex items-start gap-8 md:flex-row md:items-center flex-col justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-dark-primary">Google Analytics</h3>
                    <p className="text-dark-secondary">Track website traffic, user behavior, and conversion metrics</p>
                    <div className="flex items-center space-x-4 text-sm text-dark-secondary">
                      <span>• Traffic Analysis</span>
                      <span>• User Behavior</span>
                      <span>• Conversion Tracking</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {connections.analytics ? (
                    <div className="bg-dark-positive/20 text-dark-positive px-4 py-2 rounded-full flex items-center space-x-2 border border-dark-positive/30">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Connected</span>
                    </div>
                  ) : (
                    <div className="bg-dark-tag text-dark-secondary px-4 py-2 rounded-full flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Not Connected</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleConnection('analytics')}
                    className={`px-3 py-2 rounded-full font-medium transition-all ${
                      connections.analytics
                        ? 'bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    {connections.analytics ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center space-y-6">
            <button 
              onClick={handleContinue}
              disabled={!connections.shopify && !connections.meta}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-dark-tag disabled:to-dark-tag disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all flex items-center space-x-3 mx-auto"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-dark-secondary">
              You can connect additional platforms later in your settings
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center space-y-8">
            {/* Loading Icon */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse"></div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-dark-primary">Setting Up Your Dashboard</h2>
              <p className="text-dark-secondary text-lg">We're analyzing your connected data sources and preparing personalized insights</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-dark-card border border-dark-border rounded-3xl p-8 mt-12 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-dark-primary font-medium">Overall Progress</span>
                <span className="text-dark-cta font-bold text-lg">{progress}%</span>
              </div>
              <div className="h-3 bg-dark-hover rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Processing Steps */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {progress > 20 ? (
                  <CheckCircle className="w-6 h-6 text-dark-positive flex-shrink-0" />
                ) : (
                  <Loader2 className="w-6 h-6 text-dark-cta animate-spin flex-shrink-0" />
                )}
                <div className="flex items-center space-x-3 flex-1">
                  <ShoppingBag className="w-5 h-5 text-dark-secondary" />
                  <span className={`font-medium ${progress > 20 ? "text-dark-positive" : "text-dark-secondary"}`}>
                    Connected to Shopify
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {progress > 40 ? (
                  <CheckCircle className="w-6 h-6 text-dark-positive flex-shrink-0" />
                ) : (
                  <Loader2 className="w-6 h-6 text-dark-cta animate-spin flex-shrink-0" />
                )}
                <div className="flex items-center space-x-3 flex-1">
                  <Facebook className="w-5 h-5 text-dark-secondary" />
                  <span className={`font-medium ${progress > 40 ? "text-dark-positive" : "text-dark-secondary"}`}>
                    Importing Facebook Ads data
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {progress > 60 ? (
                  <CheckCircle className="w-6 h-6 text-dark-positive flex-shrink-0" />
                ) : (
                  <Loader2 className="w-6 h-6 text-dark-cta animate-spin flex-shrink-0" />
                )}
                <div className="flex items-center space-x-3 flex-1">
                  <BarChart3 className="w-5 h-5 text-dark-secondary" />
                  <span className={`font-medium ${progress > 60 ? "text-dark-positive" : "text-dark-secondary"}`}>
                    Calculating ROAS & RTO metrics
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {progress > 80 ? (
                  <CheckCircle className="w-6 h-6 text-dark-positive flex-shrink-0" />
                ) : (
                  <Loader2 className="w-6 h-6 text-dark-cta animate-spin flex-shrink-0" />
                )}
                <div className="flex items-center space-x-3 flex-1">
                  <Sparkles className="w-5 h-5 text-dark-secondary" />
                  <span className={`font-medium ${progress > 80 ? "text-dark-positive" : "text-dark-secondary"}`}>
                    Generating AI recommendations
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-dark-secondary text-sm">This usually takes 30-60 seconds</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}