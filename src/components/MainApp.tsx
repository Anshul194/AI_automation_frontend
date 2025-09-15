import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  LayoutDashboard,
  BarChart3,
  Lightbulb,
  Zap,
  Package,
  Video,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  Palette,
  Filter
} from "lucide-react";

// Import pages
import { EnhancedDashboard } from "./EnhancedDashboard";
import { ReportsPage } from "./pages/ReportsPage";
import { DemographicsPage } from "./pages/DemographicsPage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductTrendPage } from "./pages/ProductTrendPage";
import { VideosPage } from "./pages/VideosPage";
import { VideoTrendPage } from "./pages/VideoTrendPage";
import { TrendsPage } from "./pages/TrendsPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { AICreativePage } from "./pages/AICreativePage";
import { FunnelPage } from "./pages/FunnelPage";

type Page = 'dashboard' | 'reports' | 'demographics' | 'recommendations' | 'automation' | 'catalog' | 'videos' | 'trends' | 'ai-creative' | 'funnel' | 'settings' | 'video-trend' | 'product-trend';

export function MainApp({ onLogout }: { onLogout: () => void }) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as Page, name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, badge: null },
    { id: 'reports' as Page, name: 'Reports', icon: <BarChart3 className="h-5 w-5" />, badge: null },
    { id: 'funnel' as Page, name: 'Funnel', icon: <Filter className="h-5 w-5" />, badge: null },
    { id: 'recommendations' as Page, name: 'Recommendations', icon: <Lightbulb className="h-5 w-5" />, badge: '3' },
    { id: 'automation' as Page, name: 'Automation', icon: <Zap className="h-5 w-5" />, badge: 'New' },
    { id: 'catalog' as Page, name: 'Catalog', icon: <Package className="h-5 w-5" />, badge: null },
    { id: 'videos' as Page, name: 'Videos', icon: <Video className="h-5 w-5" />, badge: null },
    { id: 'trends' as Page, name: 'Trends', icon: <TrendingUp className="h-5 w-5" />, badge: null },
    { id: 'ai-creative' as Page, name: 'AI Creative', icon: <Palette className="h-5 w-5" />, badge: 'New' },
    { id: 'settings' as Page, name: 'Settings', icon: <Settings className="h-5 w-5" />, badge: null }
  ];

  const handleNavigateToVideoTrend = (videoId: number) => {
    setSelectedVideoId(videoId);
    setCurrentPage('video-trend');
  };

  const handleBackFromVideoTrend = () => {
    setCurrentPage('videos');
    setSelectedVideoId(null);
  };

  const handleNavigateToProductTrend = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage('product-trend');
  };

  const handleBackFromProductTrend = () => {
    setCurrentPage('catalog');
    setSelectedProductId(null);
  };

  const handleNavigateToDemographics = () => {
    setCurrentPage('demographics');
  };

  const handleBackFromDemographics = () => {
    setCurrentPage('reports');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <EnhancedDashboard />;
      case 'reports':
        return <ReportsPage />;
      case 'demographics':
        return <DemographicsPage onBack={handleBackFromDemographics} />;
      case 'funnel':
        return <FunnelPage />;
      case 'catalog':
        return <CatalogPage onNavigateToTrend={handleNavigateToProductTrend} />;
      case 'product-trend':
        return selectedProductId ? (
          <ProductTrendPage productId={selectedProductId} onBack={handleBackFromProductTrend} />
        ) : (
          <CatalogPage onNavigateToTrend={handleNavigateToProductTrend} />
        );
      case 'videos':
        return <VideosPage onNavigateToTrend={handleNavigateToVideoTrend} />;
      case 'video-trend':
        return selectedVideoId ? (
          <VideoTrendPage videoId={selectedVideoId} onBack={handleBackFromVideoTrend} />
        ) : (
          <VideosPage onNavigateToTrend={handleNavigateToVideoTrend} />
        );
      case 'trends':
        return <TrendsPage />;
      case 'ai-creative':
        return <AICreativePage />;
      case 'settings':
        return <IntegrationsPage />;
      case 'recommendations':
        return (
          <div className="p-6 bg-dark-bg min-h-screen">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-dark-primary">AI Recommendations</h1>
              <Card className="dark-card p-8 text-center">
                <Lightbulb className="h-16 w-16 text-dark-cta mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-dark-primary mb-2">Coming Soon</h2>
                <p className="text-dark-secondary">Advanced AI recommendations are being developed to help optimize your campaigns automatically.</p>
              </Card>
            </div>
          </div>
        );
      case 'automation':
        return (
          <div className="p-6 bg-dark-bg min-h-screen">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-dark-primary">Campaign Automation</h1>
              <Card className="dark-card p-8 text-center">
                <Zap className="h-16 w-16 text-dark-cta mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-dark-primary mb-2">Coming Soon</h2>
                <p className="text-dark-secondary">Set up automated rules to pause, scale, or optimize campaigns based on performance metrics.</p>
              </Card>
            </div>
          </div>
        );
      default:
        return <EnhancedDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-dark-card border-r border-dark-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-dark-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="font-bold text-lg text-dark-primary">GenZway</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-dark-secondary hover:text-dark-primary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  currentPage === item.id 
                    ? 'dark-nav-item-active' 
                    : 'dark-nav-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <Badge className={`text-xs ${
                    item.badge === 'New' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                  }`}>
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-dark-border">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-hover transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-dark-primary">John Doe</div>
                <div className="text-xs text-dark-secondary">Premium Plan</div>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-dark-secondary hover:text-red-400 hover:bg-red-600/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-dark-card border-b border-dark-border px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-dark-secondary hover:text-dark-primary"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-dark-primary capitalize">
                  {currentPage === 'video-trend' ? 'Video Trend Analysis' : 
                   currentPage === 'product-trend' ? 'Product Trend Analysis' :
                   currentPage === 'demographics' ? 'Demographics Analysis' :
                   currentPage === 'ai-creative' ? 'AI Creative Suite' :
                   currentPage === 'funnel' ? 'Funnel Analytics' :
                   currentPage === 'dashboard' ? 'Dashboard' : 
                   navItems.find(item => item.id === currentPage)?.name}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-secondary" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-dark-hover border border-dark-border rounded-lg text-dark-primary placeholder-dark-secondary focus:outline-none focus:ring-2 focus:ring-dark-cta"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative text-dark-secondary hover:text-dark-primary">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Connection Status */}
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600/20 text-green-400">
                  Shopify Connected
                </Badge>
                <Badge className="bg-blue-600/20 text-blue-400">
                  Meta Connected
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}