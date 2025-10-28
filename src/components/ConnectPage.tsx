import { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { fetchGoogleAnalyticsData } from "../store/slices/google-ananyltics";
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
  const [gaProperties, setGAProperties] = useState<any[]>([]);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
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

  // Fetch Google Analytics properties
  const fetchGAProperties = async (accessToken?: string) => {
    try {
      let token = accessToken;
      if (!token) {
        const gaTokens = localStorage.getItem("ga_tokens");
        if (gaTokens) {
          token = JSON.parse(gaTokens).access_token;
        }
      }
      const response = await axiosInstance.post(
        "/google-analytics/list-properties",
        { access_token: token },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.properties || [];
    } catch (err: any) {
      throw err?.response?.data?.message || "Failed to fetch properties";
    }
  };

  // Connect selected property
  const handlePropertyConnect = async (propertyId: string) => {
    setLoading(true);
    try {
      // Get access token from localStorage
      const gaTokens = localStorage.getItem("ga_tokens");
      const access_token = gaTokens ? JSON.parse(gaTokens).access_token : "";
      // Set a default date range (last 30 days)
      const endDate = new Date().toISOString().slice(0, 10);
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      // Call the slice thunk to fetch analytics data
      const resultAction = await dispatch(fetchGoogleAnalyticsData({ access_token, propertyId, startDate, endDate }));
      if (fetchGoogleAnalyticsData.fulfilled.match(resultAction)) {
        localStorage.setItem("ga_selected_property", JSON.stringify({ propertyId, data: resultAction.payload }));
        // Redirect to /app after successful connection
        window.location.href = "/app";
        return; // Prevent further modal logic
      }
      setModalContent(
        <div className="flex flex-col items-center space-y-4 p-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div className="text-lg font-semibold">Property connected!</div>
        </div>
      );
      setTimeout(() => {
        setShowModal(false);
        setShowPropertyModal(false);
      }, 2000);
    } catch (err: any) {
      setModalContent(
        <div className="flex flex-col items-center space-y-4 p-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <div className="text-lg font-semibold">Failed to connect property</div>
          <div className="text-sm text-red-500">{err.toString()}</div>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

 
 useEffect(() => {
  const getQueryParam = (key) => new URLSearchParams(window.location.search).get(key);
  const code = getQueryParam("code");
  const status = getQueryParam("status");
  const integration = getQueryParam("integration");
  const rawData = getQueryParam("data");

  // ---- GOOGLE ANALYTICS FLOW ----
  if (code && status === "success" && integration !== "shopify") {
    setShowModal(true);
    setModalContent(
      <div className="flex flex-col items-center space-y-4 p-6">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <div className="text-lg font-semibold">Connecting to Google Analytics...</div>
      </div>
    );
    setLoading(true);

    fetchGoogleTokens(code)
      .then(async (tokens) => {
        localStorage.setItem("ga_tokens", JSON.stringify(tokens));
        setConnections((prev) => ({ ...prev, analytics: true }));

        // Fetch GA properties using stored tokens
        const properties = await fetchGAProperties();
        setGAProperties(properties);
        setShowPropertyModal(true);
        setShowModal(false);

        // Clean up URL params
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        url.searchParams.delete("status");
        window.history.replaceState({}, document.title, url.pathname);
      })
      .catch((err) => {
        console.error("GA connection failed:", err);
        setModalContent(
          <div className="flex flex-col items-center space-y-4 p-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <div className="text-lg font-semibold">Failed to connect Google Analytics</div>
          </div>
        );
        setTimeout(() => setShowModal(false), 3000); // ⏳ Close after 3s
      })
      .finally(() => setLoading(false));
  }

  // ---- SHOPIFY FLOW ----
  else if (code && status === "success" && integration === "shopify" && rawData) {
    try {
      const decodedData = decodeURIComponent(rawData);
      const parsedData = JSON.parse(decodedData);

      // ✅ Save to localStorage
      localStorage.setItem("shopify_data", JSON.stringify(parsedData));

      // ✅ Show success modal
      setShowModal(true);
      setModalContent(
        <div className="flex flex-col items-center space-y-4 p-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div className="text-lg font-semibold">Shopify connected successfully!</div>
        </div>
      );

      setConnections((prev) => ({ ...prev, shopify: true }));

      // ✅ Clean URL
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.pathname);

      // ⏳ Auto-close modal after 3 seconds
      setTimeout(() => setShowModal(false), 3000);
    } catch (err) {
      console.error("Failed to parse Shopify data:", err);
      setModalContent(
        <div className="flex flex-col items-center space-y-4 p-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <div className="text-lg font-semibold">Failed to connect Shopify</div>
        </div>
      );
      setTimeout(() => setShowModal(false), 3000); // ⏳ Auto-close error modal too
    }
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

  // Modal for property selection
 const PropertyModal = ({ open, properties }: { open: boolean; properties: any[] }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Select Property
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose a Google Analytics property to connect
          </p>
        </div>

        {/* Properties List */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          <ul className="space-y-2">
            {properties.map((prop: any) => (
              <li key={prop.name}>
                <button
                  className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-200 group"
                  onClick={() => handlePropertyConnect(prop.name)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {prop.displayName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {prop.currencyCode}
                        </span>
                        <span>•</span>
                        <span>{prop.timeZone.split('/')[1]}</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
          <button
            className="w-full px-4 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={() => setShowPropertyModal(false)}
          >
            Cancel
          </button>
        </div>
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
      <PropertyModal open={showPropertyModal} properties={gaProperties} />
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
