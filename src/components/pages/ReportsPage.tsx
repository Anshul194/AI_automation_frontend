import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  BarChart3,
  Users,
  TrendingUp,
  IndianRupee,
  Eye,
  MousePointer,
  ShoppingCart,
  Calendar,
  ArrowUp,
  ArrowDown,
  MapPin,
  Filter,
  Download,
  Smartphone,
  Monitor,
  Tablet,
  Target,
  UserCheck,
  Globe
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAppDispatch } from "../../store/hooks";
import { fetchGoogleAnalyticsData } from "../../store/slices/google-ananyltics";

type ReportView = 'analytics' | 'demographics';

export function ReportsPage() {
  const [activeView, setActiveView] = useState<ReportView>('analytics');
  const [propertyData, setPropertyData] = useState<any | null>(null);
  const dispatch = useAppDispatch();


  const channelData = [
    { name: 'Organic Search', value: 38.2, color: '#22C55E' },
    { name: 'Facebook Ads', value: 25.1, color: '#3B82F6' },
    { name: 'Instagram Ads', value: 18.3, color: '#F59E0B' },
    { name: 'Direct', value: 12, color: '#EF4444' },
    { name: 'YouTube', value: 6.4, color: '#A855F7' }
  ];

   const topPagesData = [
    { page: '/products', pageViews: 48320, uniqueViews: 34680, avgTime: '03:45', bounceRate: 26.8 },
    { page: '/products/mens/watches', pageViews: 16600, uniqueViews: 14400, avgTime: '04:16', bounceRate: 15.2 },
    { page: '/cart', pageViews: 12840, uniqueViews: 11030, avgTime: '04:52', bounceRate: 68.9 },
    { page: '/checkout', pageViews: 8600, uniqueViews: 6440, avgTime: '02:18', bounceRate: 24.6 }
  ];


  useEffect(() => {
    const stored = localStorage.getItem("ga_selected_property");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPropertyData(parsed.data);
        console.log("propertyData from localStorage:", parsed.data);
      } catch {}
    }
  }, []);

  // Fetch latest analytics data for selected property on mount
  useEffect(() => {
    const stored = localStorage.getItem("ga_selected_property");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const propertyId = parsed.propertyId;
        const gaTokens = localStorage.getItem("ga_tokens");
        const access_token = gaTokens ? JSON.parse(gaTokens).access_token : "";
        const endDate = new Date().toISOString().slice(0, 10);
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        // Call your handlePropertyConnect API (thunk)
        dispatch(fetchGoogleAnalyticsData({ access_token, propertyId, startDate, endDate }))
          .then((resultAction: any) => {
            if (fetchGoogleAnalyticsData.fulfilled.match(resultAction)) {
              console.log("Google Analytics data fetched successfully", resultAction.payload);
              localStorage.setItem("ga_selected_property", JSON.stringify({ propertyId, data: resultAction.payload }));
              setPropertyData(resultAction.payload);
              console.log("propertyData from API:", resultAction.payload);
            }
          });
      } catch {}
    }
  }, [dispatch]);

  // Helper for formatting currency
  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(num)) return "₹0";
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(1)}L`;
    }
    return `₹${(num / 1000).toFixed(0)}K`;
  };

  // Helper for formatting duration (seconds to mm:ss)
  const formatDuration = (seconds: number | string) => {
    const sec = typeof seconds === "string" ? parseFloat(seconds) : seconds;
    if (isNaN(sec)) return "00:00";
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = Math.round(sec % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // --- Use summary and data from API response object ---
  const summary = propertyData?.summary || {};

  // Prepare traffic data (latest 7 days for chart)
  const trafficDataRaw = Array.isArray(propertyData?.data)
    ? propertyData.data.map((row: any) => ({
        date: row.date || "",
        users: row.totalUsers || 0,
        sessions: row.sessions || 0,
        bounceRate: row.bounceRate
          ? (parseFloat(row.bounceRate) * 100).toFixed(1)
          : undefined,
        deviceCategory: row.deviceCategory,
        country: row.country,
      }))
    : [];

  // Aggregate traffic data by date
  const trafficByDateMap: Record<string, { date: string; users: number; sessions: number }> = {};
  Array.isArray(propertyData?.data) && propertyData.data.forEach((row: any) => {
    if (!row.date) return;
    if (!trafficByDateMap[row.date]) {
      trafficByDateMap[row.date] = { date: row.date, users: 0, sessions: 0 };
    }
    trafficByDateMap[row.date].users += row.totalUsers || 0;
    trafficByDateMap[row.date].sessions += row.sessions || 0;
  });
  const trafficDatesSorted = Object.keys(trafficByDateMap).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const trafficDataAll = trafficDatesSorted.map(date => trafficByDateMap[date]);
  const trafficDataLatest7 = trafficDataAll.slice(0, 7).reverse();

  // Show only the latest 7 days (by date, descending)
  const trafficDataSorted = [...trafficDataRaw].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const trafficData = trafficDataSorted.slice(0, 7).reverse();

  // --- Device & Platform Analytics (dynamic) ---
  const deviceMap: Record<string, { users: number; sessions: number }> = {};
  trafficDataRaw.forEach(row => {
    if (!row.deviceCategory) return;
    if (!deviceMap[row.deviceCategory]) deviceMap[row.deviceCategory] = { users: 0, sessions: 0 };
    deviceMap[row.deviceCategory].users += row.users || 0;
    deviceMap[row.deviceCategory].sessions += row.sessions || 0;
  });
  const totalDeviceUsers = Object.values(deviceMap).reduce((sum, d) => sum + d.users, 0);
  const deviceData = Object.entries(deviceMap).map(([type, data]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    users: data.users,
    percentage: totalDeviceUsers ? ((data.users / totalDeviceUsers) * 100).toFixed(1) : 0,
    conversionRate: "-", // Not available in GA4 default, unless you have conversion events
  }));

  // --- E-commerce Conversion Funnel (dynamic) ---
  // Example: Home Page = total users, Product View = view_item, Add to Cart = add_to_cart, Checkout = begin_checkout, Purchase = purchase
  const funnelStages = [
    { stage: "Home Page", event: "page_view" },
    { stage: "Product View", event: "view_item" },
    { stage: "Add to Cart", event: "add_to_cart" },
    { stage: "Checkout", event: "begin_checkout" },
    { stage: "Purchase", event: "purchase" }
  ];
  const funnelCounts: Record<string, number> = {};
  funnelStages.forEach(({ event }) => {
    funnelCounts[event] = trafficDataRaw.filter(row => row.eventName === event)
      .reduce((sum, row) => sum + (row.users || 0), 0);
  });
  const homeUsers = summary.totalUsers || 0;
  const conversionFunnelData = funnelStages.map((stage, idx) => {
    const users = idx === 0 ? homeUsers : funnelCounts[stage.event];
    const percentage = homeUsers ? ((users / homeUsers) * 100).toFixed(1) : 0;
    const colors = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#A855F7"];
    return { stage: stage.stage, users, percentage, color: colors[idx] };
  });

  // --- Geographic Performance (dynamic) ---
  const geoMap: Record<string, { revenue: number; sessions: number; conversionRate: string }> = {};
  trafficDataRaw.forEach(row => {
    if (!row.country) return;
    if (!geoMap[row.country]) geoMap[row.country] = { revenue: 0, sessions: 0, conversionRate: "-" };
    geoMap[row.country].revenue += parseFloat(row.purchaseRevenue || "0");
    geoMap[row.country].sessions += row.sessions || 0;
    // Conversion rate not available unless you have transactions
  });
  const geoData = Object.entries(geoMap).map(([country, data]) => ({
    country,
    revenue: data.revenue,
    sessions: data.sessions,
    conversionRate: data.conversionRate
  }));

  return (
    <div className="p-6 space-y-6 bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-primary mb-2">Detailed Reports</h1>
          <p className="text-sm text-dark-secondary">Deep dive into your performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="dark-button-secondary flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          
          <Button className="dark-button-secondary flex items-center gap-2">
            <Download className="h-4 w-4" />
            Data Export
          </Button>
          
          <Button className="dark-button-primary">
            Export Report
          </Button>
        </div>
      </div>

      {/* Top Navigation Tabs */}
      <div className="bg-dark-card rounded-lg p-1 border border-dark-border">
        <div className="flex">
          <button
            onClick={() => setActiveView('analytics')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'analytics'
                ? 'bg-dark-cta text-white shadow-sm'
                : 'text-dark-secondary hover:text-dark-primary hover:bg-dark-hover'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Google Analytics
          </button>
          
          <button
            onClick={() => setActiveView('demographics')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'demographics'
                ? 'bg-dark-cta text-white shadow-sm'
                : 'text-dark-secondary hover:text-dark-primary hover:bg-dark-hover'
            }`}
          >
            <Users className="h-4 w-4" />
            Demographics
          </button>
        </div>
      </div>

      {/* Google Analytics View */}
      {activeView === 'analytics' && (
        <div className="space-y-6">
          {/* Summary Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="dark-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary">Total Users</span>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-dark-primary">
                  {summary.totalUsers?.toLocaleString?.() ?? "0"}
                </p>
                <div className="flex items-center gap-1 text-dark-positive">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs"> {/* No trend in GA API, so fallback */}
                    +12.5%
                  </span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary mt-1">vs last period</p>
            </Card>

            <Card className="dark-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary">Total Sessions</span>
                <Eye className="h-5 w-5 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-dark-primary">
                  {summary.totalSessions?.toLocaleString?.() ?? "0"}
                </p>
                <div className="flex items-center gap-1 text-dark-positive">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+8.3%</span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary mt-1">vs last period</p>
            </Card>

            <Card className="dark-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary">Avg Session</span>
                <Calendar className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-dark-primary">
                  {formatDuration(summary.avgSessionDuration ?? summary.sessionDuration ?? 0)}
                </p>
                <div className="flex items-center gap-1 text-dark-positive">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+5.2%</span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary mt-1">vs last period</p>
            </Card>

            <Card className="dark-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary">Bounce Rate</span>
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-dark-primary">
                  {summary.avgBounceRate && summary.avgBounceRate !== "NaN"
                    ? `${summary.avgBounceRate}%`
                    : summary.bounceRate
                    ? `${summary.bounceRate}%`
                    : "0%"}
                </p>
                <div className="flex items-center gap-1 text-dark-positive">
                  <ArrowDown className="h-3 w-3" />
                  <span className="text-xs">-2.1%</span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary mt-1">vs last period</p>
            </Card>
          </div>

          {/* Website Traffic Overview */}
          <Card className="dark-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-dark-primary mb-2">Website Traffic Overview</h3>
                <p className="text-sm text-dark-secondary">Daily sessions, users, and pageviews</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-primary">
                  {trafficDataAll.length > 0
                    ? Math.max(...trafficDataAll.map(d => Number(d.sessions) || 0))
                    : "0"}
                </p>
                <p className="text-xs text-dark-secondary">Peak Sessions</p>
              </div>
            </div>
            
            {/* Horizontally scrollable chart for all days, show latest 7 by default */}
            <div className="w-full overflow-x-auto">
              <div style={{ minWidth: Math.max(700, trafficDataAll.length * 100) }}>
                <ResponsiveContainer width={trafficDataAll.length * 100} height={320}>
                  <BarChart data={trafficDataAll} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#94A3B8"
                      fontSize={12}
                      tick={{ fill: '#94A3B8' }}
                    />
                    <YAxis 
                      stroke="#94A3B8"
                      fontSize={12}
                      tick={{ fill: '#94A3B8' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#94A3B8' }} />
                    <Bar dataKey="users" fill="#3B82F6" name="Users" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sessions" fill="#A855F7" name="Sessions" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Traffic Acquisition Sources */}
            <Card className="dark-card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark-primary mb-2">Traffic Acquisition Sources</h3>
                <p className="text-sm text-dark-secondary">Where your website visitors come from</p>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <div className="h-64 w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                        formatter={(value) => [`${value}%`, 'Traffic Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-3">
                {channelData.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: channel.color }}
                      />
                      <span className="text-dark-primary font-medium">{channel.name}</span>
                    </div>
                    <span className="text-dark-secondary font-semibold">{channel.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Device & Platform Analytics (dynamic) */}
            <Card className="dark-card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark-primary mb-2">Device & Platform Analytics</h3>
                <p className="text-sm text-dark-secondary">User engagement across devices</p>
              </div>
              <div className="space-y-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="border border-dark-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {device.type === 'Mobile' && <Smartphone className="h-5 w-5 text-blue-400" />}
                        {device.type === 'Desktop' && <Monitor className="h-5 w-5 text-green-400" />}
                        {device.type === 'Tablet' && <Tablet className="h-5 w-5 text-purple-400" />}
                        <span className="text-dark-primary font-semibold">{device.type}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-dark-primary">{device.users.toLocaleString()}</p>
                        <p className="text-xs text-dark-secondary">{device.percentage}%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-secondary">Conversion Rate</span>
                      <span className="text-dark-primary font-medium">{device.conversionRate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Pages Performance */}
          <Card className="dark-card">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dark-primary mb-2">Top Pages Performance</h3>
              <p className="text-sm text-dark-secondary">Most visited pages and their engagement metrics</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Page</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Page Views</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Unique Views</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Avg. Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Bounce Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topPagesData.map((page, index) => (
                    <tr key={index} className="border-b border-dark-border hover:bg-dark-hover transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-dark-primary font-medium">{page.page}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-dark-primary font-semibold">{page.pageViews.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-dark-primary font-semibold">{page.uniqueViews.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-dark-primary font-medium">{page.avgTime}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`text-xs ${
                          page.bounceRate <= 30 
                            ? 'bg-green-600/20 text-green-400 border-green-600/30'
                            : page.bounceRate <= 50 
                            ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
                            : 'bg-red-600/20 text-red-400 border-red-600/30'
                        }`}>
                          {page.bounceRate}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Bottom Section - Two Columns */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* E-commerce Conversion Funnel */}
            <Card className="dark-card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark-primary mb-2">E-commerce Conversion Funnel</h3>
                <p className="text-sm text-dark-secondary">Journey from landing to purchase</p>
              </div>
              <div className="space-y-4">
                {conversionFunnelData.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-dark-primary font-medium">{stage.stage}</span>
                      <div className="text-right">
                        <span className="text-dark-primary font-semibold">{stage.users.toLocaleString()}</span>
                        <span className="text-dark-secondary text-sm ml-2">({stage.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-dark-border rounded-full h-3">
                      <div 
                        className="h-3 rounded-full"
                        style={{ 
                          width: `${stage.percentage}%`,
                          backgroundColor: stage.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Geographic Performance (dynamic) */}
            <Card className="dark-card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark-primary mb-2">Geographic Performance</h3>
                <p className="text-sm text-dark-secondary">Revenue and engagement by country</p>
              </div>
              <div className="space-y-4">
                {geoData.map((country, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-dark-border rounded-lg">
                    <div>
                      <p className="text-dark-primary font-medium">{country.country}</p>
                      <p className="text-dark-secondary text-sm">{country.sessions.toLocaleString()} sessions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-dark-primary font-semibold">{formatCurrency(country.revenue)}</p>
                      <p className="text-dark-secondary text-sm">{country.conversionRate} conversion</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Demographics View */}
      {activeView === 'demographics' && (
        <div className="space-y-6">
          {/* Winning Audience Cards */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-dark-primary mb-2">🏆 Winning Audience Segments</h2>
              <p className="text-sm text-dark-secondary">Your highest-performing demographic segments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="dark-card border-2 border-green-500/30 bg-gradient-to-br from-green-900/20 to-dark-card shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-green-400">Winning Age</span>
                  <UserCheck className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-2xl font-bold text-dark-primary">25-34</p>
                  <Badge className="bg-green-600/20 text-green-400 text-xs border-green-600/30">
                    Best ROI
                  </Badge>
                </div>
                <p className="text-xs text-dark-secondary">36.1% of users • 4.2% conversion</p>
              </Card>

              <Card className="dark-card border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-dark-card shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-purple-400">Winning Gender</span>
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-2xl font-bold text-dark-primary">Female</p>
                  <Badge className="bg-purple-600/20 text-purple-400 text-xs border-purple-600/30">
                    Highest LTV
                  </Badge>
                </div>
                <p className="text-xs text-dark-secondary">54.2% of users • 4.3% conversion</p>
              </Card>

              <Card className="dark-card border-2 border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-dark-card shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-blue-400">Winning Location</span>
                  <Globe className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-2xl font-bold text-dark-primary">Delhi NCR</p>
                  <Badge className="bg-blue-600/20 text-blue-400 text-xs border-blue-600/30">
                    Top Revenue
                  </Badge>
                </div>
                <p className="text-xs text-dark-secondary">18.7% of users • 4.5% conversion</p>
              </Card>

              <Card className="dark-card border-2 border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-dark-card shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-orange-400">Winning Placement</span>
                  <Target className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-2xl font-bold text-dark-primary">Instagram Reels</p>
                  <Badge className="bg-orange-600/20 text-orange-400 text-xs border-orange-600/30">
                    7.2x ROAS
                  </Badge>
                </div>
                <p className="text-xs text-dark-secondary">5.8% CTR • Best engagement</p>
              </Card>
            </div>
          </div>

          {/* Age Demographics */}
          <Card className="dark-card">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dark-primary mb-2">Age Demographics</h3>
              <p className="text-sm text-dark-secondary">User distribution and performance by age groups</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="percentage"
                    >
                      {ageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={channelData[index]?.color || '#3B82F6'} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                      formatter={(value) => [`${value}%`, 'Percentage']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {ageData.map((age, index) => (
                  <div key={index} className="border border-dark-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-dark-primary font-semibold">{age.age} years</span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-dark-primary">{age.users.toLocaleString()}</p>
                        <p className="text-xs text-dark-secondary">{age.percentage}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-dark-secondary">Revenue</p>
                        <p className="text-dark-primary font-medium">{formatCurrency(age.revenue)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-dark-secondary">Conversion</p>
                        <p className="text-dark-primary font-medium">{age.conversionRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Gender & Location Analytics */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Gender Demographics */}
            <Card className="dark-card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark-primary mb-2">Gender Demographics</h3>
                <p className="text-sm text-dark-secondary">Performance breakdown by gender</p>
              </div>

              <div className="space-y-4">
                {genderData.map((gender, index) => (
                  <div key={index} className="border border-dark-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-dark-primary font-semibold">{gender.gender}</span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-dark-primary">{gender.users.toLocaleString()}</p>
                        <p className="text-xs text-dark-secondary">{gender.percentage}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-dark-secondary">Revenue</p>
                        <p className="text-dark-primary font-medium">{formatCurrency(gender.revenue)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-dark-secondary">Conversion</p>
                        <p className="text-dark-primary font-medium">{gender.conversionRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Location Demographics */}
            <Card className="dark-card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark-primary mb-2">Location Demographics</h3>
                <p className="text-sm text-dark-secondary">Top performing cities in India</p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {locationData.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-dark-border rounded-lg hover:bg-dark-hover transition-colors">
                    <div>
                      <p className="text-dark-primary font-medium">{location.location}</p>
                      <p className="text-dark-secondary text-sm">{location.users.toLocaleString()} users ({location.percentage}%)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-dark-primary font-semibold">{formatCurrency(location.revenue)}</p>
                      <p className="text-dark-secondary text-sm">{location.conversionRate}% conversion</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Placement Performance */}
          <Card className="dark-card">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dark-primary mb-2">Ad Placement Performance</h3>
              <p className="text-sm text-dark-secondary">Facebook and Instagram placement analytics</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Placement</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Impressions</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Clicks</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">CTR</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Spend</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {placementData.map((placement, index) => (
                    <tr key={index} className="border-b border-dark-border hover:bg-dark-hover transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-dark-primary font-medium">{placement.placement}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-dark-primary font-semibold">{placement.impressions.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-dark-primary font-semibold">{placement.clicks.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`text-xs ${
                          placement.ctr >= 4.0 
                            ? 'bg-green-600/20 text-green-400 border-green-600/30'
                            : placement.ctr >= 3.0 
                            ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
                            : 'bg-red-600/20 text-red-400 border-red-600/30'
                        }`}>
                          {placement.ctr}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-dark-primary font-semibold">{formatCurrency(placement.spend)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`text-xs ${
                          placement.roas >= 5.0 
                            ? 'bg-green-600/20 text-green-400 border-green-600/30'
                            : placement.roas >= 3.5 
                            ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
                            : 'bg-red-600/20 text-red-400 border-red-600/30'
                        }`}>
                          {placement.roas}x
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}