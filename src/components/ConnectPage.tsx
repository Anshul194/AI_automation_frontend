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
  TrendingUp,
} from "lucide-react";
import axiosInstance from "../../axiosConfig";

type LoginStep = "login" | "integrations" | "analyzing";

function ConnectPage({ onComplete }: { onComplete: () => void }) {
  const dispatch = useAppDispatch();
  const [connections, setConnections] = useState({
    shopify: false,
    meta: false,
    analytics: false,
  });
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleConnection = (service: keyof typeof connections) => {
    setConnections((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  const handleContinue = () => {
    setStep("analyzing");
    // let currentProgress = 0;
    // const interval = setInterval(() => {
    //   currentProgress += 10;
    //   setProgress(currentProgress);
    //   if (currentProgress >= 100) {
    //     clearInterval(interval);
    //     setTimeout(() => {
    //       alert("Setup Complete! Dashboard would load here.");
    //     }, 500);
    //   }
    // }, 200);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-bg">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-primary mb-4">
            Connect Your Data Sources
          </h2>
          <p className="text-dark-secondary text-lg max-w-2xl mx-auto">
            Link your business platforms to start getting AI-powered insights
            and recommendations
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
                  <h3 className="text-xl font-semibold text-dark-primary">
                    Shopify Store
                  </h3>
                  <p className="text-dark-secondary">
                    Connect your store to track revenue, orders, and customer
                    data
                  </p>
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
                  onClick={() => toggleConnection("shopify")}
                  className={`px-3 py-2 rounded-full font-medium transition-all ${
                    connections.shopify
                      ? "bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }`}
                >
                  {connections.shopify ? "Disconnect" : "Connect"}
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
                  <h3 className="text-xl font-semibold text-dark-primary">
                    Meta Ads Manager
                  </h3>
                  <p className="text-dark-secondary">
                    Connect Facebook & Instagram ad accounts for campaign
                    insights
                  </p>
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
                  onClick={() => toggleConnection("meta")}
                  className={`px-3 py-2 rounded-full  font-medium transition-all ${
                    connections.meta
                      ? "bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }`}
                >
                  {connections.meta ? "Disconnect" : "Connect"}
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
                  <h3 className="text-xl font-semibold text-dark-primary">
                    Google Analytics
                  </h3>
                  <p className="text-dark-secondary">
                    Track website traffic, user behavior, and conversion metrics
                  </p>
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
                  onClick={() => toggleConnection("analytics")}
                  className={`px-3 py-2 rounded-full font-medium transition-all ${
                    connections.analytics
                      ? "bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }`}
                >
                  {connections.analytics ? "Disconnect" : "Connect"}
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

export default ConnectPage;
