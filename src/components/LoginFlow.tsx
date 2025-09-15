import { useState } from "react";
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
  BarChart3
} from "lucide-react";

type LoginStep = 'login' | 'integrations' | 'analyzing';

export function LoginFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<LoginStep>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connections, setConnections] = useState({
    shopify: false,
    meta: false,
    analytics: false
  });
  const [progress, setProgress] = useState(0);

  const handleLogin = () => {
    setStep('integrations');
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
        setTimeout(() => onComplete(), 500);
      }
    }, 200);
  };

  if (step === 'login') {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto"></div>
            <h1 className="text-3xl font-bold text-dark-primary">Welcome Back</h1>
            <p className="text-dark-secondary">Sign in to access your D2C analytics dashboard</p>
          </div>

          <Card className="dark-card p-8 space-y-6">
            <Button 
              onClick={handleGoogleLogin}
              className="w-full dark-button-secondary"
              size="lg"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-dark-card px-2 text-dark-secondary">Or continue with email</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-dark-primary">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-dark-secondary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-dark-hover border-dark-border text-dark-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-dark-primary">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-dark-secondary" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-dark-hover border-dark-border text-dark-primary"
                  />
                </div>
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full dark-button-primary"
                size="lg"
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-dark-secondary">Don't have an account? </span>
              <button className="text-dark-cta hover:underline">Sign up</button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'integrations') {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-dark-primary">Connect Your Platforms</h1>
            <p className="text-dark-secondary">Link your accounts to get personalized insights and recommendations</p>
          </div>

          <div className="grid gap-6">
            {/* Shopify Integration */}
            <Card className="dark-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-primary">Shopify</h3>
                    <p className="text-sm text-dark-secondary">Connect your store to track revenue and orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {connections.shopify ? (
                    <Badge className="bg-dark-positive/20 text-dark-positive">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-dark-tag text-dark-secondary">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Not Connected
                    </Badge>
                  )}
                  <Button
                    onClick={() => toggleConnection('shopify')}
                    size="sm"
                    className={connections.shopify ? "dark-button-secondary" : "dark-button-primary"}
                  >
                    {connections.shopify ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Meta/Facebook Integration */}
            <Card className="dark-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Facebook className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-primary">Meta Ads</h3>
                    <p className="text-sm text-dark-secondary">Connect Facebook & Instagram ad accounts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {connections.meta ? (
                    <Badge className="bg-dark-positive/20 text-dark-positive">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-dark-tag text-dark-secondary">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Not Connected
                    </Badge>
                  )}
                  <Button
                    onClick={() => toggleConnection('meta')}
                    size="sm"
                    className={connections.meta ? "dark-button-secondary" : "dark-button-primary"}
                  >
                    {connections.meta ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Google Analytics Integration */}
            <Card className="dark-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-primary">Google Analytics</h3>
                    <p className="text-sm text-dark-secondary">Track website traffic and user behavior</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {connections.analytics ? (
                    <Badge className="bg-dark-positive/20 text-dark-positive">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-dark-tag text-dark-secondary">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Not Connected
                    </Badge>
                  )}
                  <Button
                    onClick={() => toggleConnection('analytics')}
                    size="sm"
                    className={connections.analytics ? "dark-button-secondary" : "dark-button-primary"}
                  >
                    {connections.analytics ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleContinue}
              size="lg"
              className="dark-button-primary px-8"
              disabled={!connections.shopify && !connections.meta}
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="text-center text-sm text-dark-secondary">
            You can connect additional platforms later in Settings
          </div>
        </div>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-dark-primary">Analyzing Your Data</h1>
              <p className="text-dark-secondary">We're processing your connected accounts and generating insights</p>
            </div>
          </div>

          <Card className="dark-card p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-dark-secondary">Setting up dashboard...</span>
                <span className="text-dark-cta">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                {progress > 20 ? (
                  <CheckCircle className="h-4 w-4 text-dark-positive" />
                ) : (
                  <Loader2 className="h-4 w-4 text-dark-cta animate-spin" />
                )}
                <span className={progress > 20 ? "text-dark-positive" : "text-dark-secondary"}>
                  Connected to Shopify
                </span>
              </div>
              <div className="flex items-center gap-3">
                {progress > 40 ? (
                  <CheckCircle className="h-4 w-4 text-dark-positive" />
                ) : (
                  <Loader2 className="h-4 w-4 text-dark-cta animate-spin" />
                )}
                <span className={progress > 40 ? "text-dark-positive" : "text-dark-secondary"}>
                  Importing Facebook Ads data
                </span>
              </div>
              <div className="flex items-center gap-3">
                {progress > 60 ? (
                  <CheckCircle className="h-4 w-4 text-dark-positive" />
                ) : (
                  <Loader2 className="h-4 w-4 text-dark-cta animate-spin" />
                )}
                <span className={progress > 60 ? "text-dark-positive" : "text-dark-secondary"}>
                  Calculating ROAS & RTO metrics
                </span>
              </div>
              <div className="flex items-center gap-3">
                {progress > 80 ? (
                  <CheckCircle className="h-4 w-4 text-dark-positive" />
                ) : (
                  <Loader2 className="h-4 w-4 text-dark-cta animate-spin" />
                )}
                <span className={progress > 80 ? "text-dark-positive" : "text-dark-secondary"}>
                  Generating AI recommendations
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}