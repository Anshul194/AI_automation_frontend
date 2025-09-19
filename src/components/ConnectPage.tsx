import { useState, useEffect } from "react";
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
import { fetchGoogleAuthUrl, fetchGoogleTokens, fetchShopifyConnectUrl } from "../store/slices/connection";

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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [shopDomain, setShopDomain] = useState("");
  const [showShopifyInput, setShowShopifyInput] = useState(false);
  // Helper to get query param
  function getQueryParam(name: string) {
    return new URLSearchParams(window.location.search).get(name);
  }

  // Handle OAuth code in URL
  useEffect(() => {
    const code = getQueryParam("code");
    const status = getQueryParam("status");
    if (code && status === "success") {
      setShowModal(true);
      setModalContent(
        <div className="flex flex-col items-center space-y-4 p-6">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <div className="text-lg font-semibold">Connecting to Google Analytics...</div>
        </div>
      );
      setLoading(true);
      fetchGoogleTokens(code)
        .then((tokens) => {
          localStorage.setItem("ga_tokens", JSON.stringify(tokens));
          setModalContent(
            <div className="flex flex-col items-center space-y-4 p-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="text-lg font-semibold">Connected successfully!</div>
            </div>
          );
          setConnections((prev) => ({ ...prev, analytics: true }));
          setTimeout(() => {
            setShowModal(false);
            // Remove code param from URL
            const url = new URL(window.location.href);
            url.searchParams.delete("code");
            url.searchParams.delete("status");
            window.history.replaceState({}, document.title, url.pathname);
          }, 1500);
        })
        .catch((err) => {
          setModalContent(
            <div className="flex flex-col items-center space-y-4 p-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div className="text-lg font-semibold">Failed to connect: {err?.toString?.() || "Unknown error"}</div>
            </div>
          );
          setTimeout(() => setShowModal(false), 2000);
        })
        .finally(() => setLoading(false));
    }
  }, []);
  // Simple modal component
  const Modal = ({ open, children }: { open: boolean; children: React.ReactNode }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg min-w-[300px] max-w-xs mx-4">
          {children}
        </div>
      </div>
    );
  };

  // Handler for Google Analytics connect
  const handleGoogleAnalyticsConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await fetchGoogleAuthUrl();
      window.open(url, "_blank");
    } catch (err: any) {
      setError(err?.toString() || "Failed to get Google Analytics auth URL");
    } finally {
      setLoading(false);
    }
  };


  // Shopify connect handler: just open the popup
  const handleShopifyConnect = () => {
    setShowShopifyInput(true);
  };

  // Confirm Shopify subdomain and connect (call API only here)
  const handleShopifySubmit = async () => {
    setLoading(true);
    setError(null);
    setShowModal(true);
    setShowShopifyInput(false);
    setModalContent(
      <div className="flex flex-col items-center space-y-4 p-6">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        <div className="text-lg font-semibold">Connecting to Shopify...</div>
      </div>
    );
    try {
      // Get userId from localStorage user key
      const userStr = localStorage.getItem("user");
      const userId = userStr ? JSON.parse(userStr)._id : null;
      if (!userId) throw new Error("User ID not found in localStorage");
      if (!shopDomain) throw new Error("Please enter your Shopify domain");
      const url = await fetchShopifyConnectUrl(userId, shopDomain);
      setModalContent(
        <div className="flex flex-col items-center space-y-4 p-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div className="text-lg font-semibold">Redirecting to Shopify...</div>
        </div>
      );
      setTimeout(() => {
        window.open(url, "_blank");
        setShowModal(false);
      }, 1000);
    } catch (err: any) {
      setModalContent(
        <div className="flex flex-col items-center space-y-4 p-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <div className="text-lg font-semibold">{err?.toString?.() || "Failed to connect to Shopify"}</div>
        </div>
      );
      setTimeout(() => setShowModal(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    // Simulate analyzing step or call onComplete
    setShowModal(true);
    setModalContent(
      <div className="flex flex-col items-center space-y-4 p-6">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <div className="text-lg font-semibold">Analyzing your connections...</div>
      </div>
    );
    setTimeout(() => {
      setShowModal(false);
      if (onComplete) onComplete();
    }, 1200);
  };

  return (
    <>
      <Modal open={showModal}>{modalContent}</Modal>
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
                  onClick={handleShopifyConnect}
                  className={`px-3 py-2 rounded-full font-medium transition-all ${
                    connections.shopify
                      ? "bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }`}
                  disabled={connections.shopify || loading}
                >
                  {connections.shopify ? "Disconnect" : "Connect"}
                </button>
      {/* Shopify Subdomain Modal */}
      <Modal open={showShopifyInput}>
        <div className="flex flex-col items-center space-y-4 p-6">
          <div className="text-lg font-semibold">Enter your Shopify subdomain</div>
          <input
            type="text"
            placeholder="e.g. mystore.myshopify.com"
            value={shopDomain}
            onChange={e => setShopDomain(e.target.value)}
            className="px-2 py-2 rounded border border-dark-border bg-dark-bg text-white w-full"
            style={{ minWidth: 220 }}
            autoFocus
          />
          <div className="flex space-x-2 w-full">
            <button
              onClick={handleShopifySubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700"
              disabled={!shopDomain || loading}
            >
              Connect
            </button>
            <button
              onClick={() => setShowShopifyInput(false)}
              className="flex-1 bg-dark-tag text-dark-secondary py-2 rounded-full font-medium"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
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
                  onClick={() => setConnections(prev => ({ ...prev, meta: !prev.meta }))}
                  className={`px-3 py-2 rounded-full  font-medium transition-all ${
                    connections.meta
                      ? "bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }`}
                  disabled={loading}
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
                  onClick={handleGoogleAnalyticsConnect}
                  className={`px-3 py-2 rounded-full font-medium transition-all ${
                    connections.analytics
                      ? "bg-dark-hover text-dark-secondary border border-dark-border hover:bg-dark-border"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }`}
                  disabled={loading}
                >
                  {loading && !connections.analytics ? (
                    <>
                      <span>Connecting...</span>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    </>
                  ) : connections.analytics ? "Disconnect" : "Connect"}
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

    </>
  )
}

export default ConnectPage;
