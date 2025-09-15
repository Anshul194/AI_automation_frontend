import { useState } from "react";
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

type ReportView = 'analytics' | 'demographics';

export function ReportsPage() {
  const [activeView, setActiveView] = useState<ReportView>('analytics');

  // Mock Google Analytics "All Data" metrics
  const analyticsData = {
    summary: {
      totalUsers: 45672,
      totalSessions: 58934,
      bounceRate: 34.2,
      sessionDuration: 245,
      conversionRate: 3.8,
      revenue: 2847500
    },
    trend: {
      users: 12.5,
      sessions: 8.3,
      revenue: 15.2
    }
  };

  // Mock traffic data for charts
  const trafficData = [
    { date: 'Day 1', users: 4200, sessions: 4850, bounceRate: 42 },
    { date: 'Day 2', users: 3900, sessions: 4420, bounceRate: 38 },
    { date: 'Day 3', users: 4500, sessions: 5180, bounceRate: 35 },
    { date: 'Day 4', users: 4820, sessions: 5640, bounceRate: 32 },
    { date: 'Day 5', users: 4280, sessions: 4990, bounceRate: 40 },
    { date: 'Day 6', users: 3980, sessions: 4580, bounceRate: 44 },
    { date: 'Day 7', users: 5120, sessions: 5720, bounceRate: 28 }
  ];

  const channelData = [
    { name: 'Organic Search', value: 38.2, color: '#22C55E' },
    { name: 'Facebook Ads', value: 25.1, color: '#3B82F6' },
    { name: 'Instagram Ads', value: 18.3, color: '#F59E0B' },
    { name: 'Direct', value: 12, color: '#EF4444' },
    { name: 'YouTube', value: 6.4, color: '#A855F7' }
  ];

  const deviceData = [
    { type: 'Mobile', users: 18760, percentage: 53.5, conversionRate: 2.8 },
    { type: 'Desktop', users: 12640, percentage: 36.1, conversionRate: 4.2 },
    { type: 'Tablet', users: 3640, percentage: 10.4, conversionRate: 3.1 }
  ];

  const topPagesData = [
    { page: '/products', pageViews: 48320, uniqueViews: 34680, avgTime: '03:45', bounceRate: 26.8 },
    { page: '/products/mens/watches', pageViews: 16600, uniqueViews: 14400, avgTime: '04:16', bounceRate: 15.2 },
    { page: '/cart', pageViews: 12840, uniqueViews: 11030, avgTime: '04:52', bounceRate: 68.9 },
    { page: '/checkout', pageViews: 8600, uniqueViews: 6440, avgTime: '02:18', bounceRate: 24.6 }
  ];

  const conversionFunnelData = [
    { stage: 'Home Page', users: 35200, percentage: 100, color: '#3B82F6' },
    { stage: 'Product View', users: 24640, percentage: 70, color: '#22C55E' },
    { stage: 'Add to Cart', users: 14230, percentage: 40.4, color: '#F59E0B' },
    { stage: 'Checkout', users: 8600, percentage: 24.4, color: '#EF4444' },
    { stage: 'Purchase', users: 2418, percentage: 6.9, color: '#A855F7' }
  ];

  const geoData = [
    { country: 'Australia', revenue: 48320, sessions: 12640, conversionRate: 6.2 },
    { country: 'Canada', revenue: 35240, sessions: 8960, conversionRate: 4.8 },
    { country: 'United States', revenue: 89420, sessions: 23580, conversionRate: 5.4 },
    { country: 'India', revenue: 21600, sessions: 8920, conversionRate: 3.1 }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Demographics data
  const ageData = [
    { age: '18-24', users: 8450, percentage: 24.1, revenue: 425000, conversionRate: 2.8 },
    { age: '25-34', users: 12640, percentage: 36.1, revenue: 780000, conversionRate: 4.2 },
    { age: '35-44', users: 9280, percentage: 26.5, revenue: 695000, conversionRate: 4.8 },
    { age: '45-54', users: 3210, percentage: 9.2, revenue: 289000, conversionRate: 3.9 },
    { age: '55+', users: 1420, percentage: 4.1, revenue: 156000, conversionRate: 3.2 }
  ];

  const genderData = [
    { gender: 'Female', users: 18960, percentage: 54.2, revenue: 1245000, conversionRate: 4.3 },
    { gender: 'Male', users: 15140, percentage: 43.3, revenue: 985000, conversionRate: 3.8 },
    { gender: 'Non-binary', users: 900, percentage: 2.5, revenue: 115000, conversionRate: 3.2 }
  ];

  const locationData = [
    { location: 'Delhi NCR', users: 6540, percentage: 18.7, revenue: 1125000, conversionRate: 4.5 },
    { location: 'Mumbai', users: 5680, percentage: 16.2, revenue: 895000, conversionRate: 4.8 },
    { location: 'Bangalore', users: 4250, percentage: 12.1, revenue: 685000, conversionRate: 4.3 },
    { location: 'Chennai', users: 3180, percentage: 9.1, revenue: 485000, conversionRate: 3.9 },
    { location: 'Kolkata', users: 2840, percentage: 8.1, revenue: 425000, conversionRate: 3.6 },
    { location: 'Pune', users: 2450, percentage: 7.0, revenue: 398000, conversionRate: 4.0 },
    { location: 'Hyderabad', users: 2180, percentage: 6.2, revenue: 356000, conversionRate: 3.8 },
    { location: 'Others', users: 8880, percentage: 25.4, revenue: 1250000, conversionRate: 3.5 }
  ];

  const placementData = [
    { placement: 'Instagram Reels', impressions: 320000, clicks: 18560, ctr: 5.8, spend: 145000, roas: 7.2 },
    { placement: 'Facebook Feed', impressions: 245000, clicks: 12250, ctr: 5.0, spend: 125000, roas: 6.2 },
    { placement: 'Instagram Stories', impressions: 189000, clicks: 8505, ctr: 4.5, spend: 95000, roas: 4.8 },
    { placement: 'Instagram Feed', impressions: 156000, clicks: 6240, ctr: 4.0, spend: 78000, roas: 5.1 },
    { placement: 'Facebook Stories', impressions: 98000, clicks: 2940, ctr: 3.0, spend: 49000, roas: 3.9 },
    { placement: 'Messenger', impressions: 67000, clicks: 1675, ctr: 2.5, spend: 33500, roas: 3.2 },
    { placement: 'Audience Network', impressions: 45000, clicks: 900, ctr: 2.0, spend: 22500, roas: 2.8 }
  ];

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
                <p className="text-2xl font-bold text-dark-primary">32,450</p>
                <div className="flex items-center gap-1 text-dark-positive">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+12.5%</span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary mt-1">vs last month</p>
            </Card>

            <Card className="dark-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary">Page Views</span>
                <Eye className="h-5 w-5 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-dark-primary">95,270</p>
                <div className="flex items-center gap-1 text-dark-positive">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+8.3%</span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary mt-1">vs last month</p>
            </Card>

            <Card className="dark-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary">Avg Session</span>
                <Calendar className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-dark-primary">05:24</p>
                <div className="flex items-center gap-1 text-dark-positive">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs">+5.2%</span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary mt-1">vs last month</p>
            </Card>

            <Card className="dark-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary">Bounce Rate</span>
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-dark-primary">39.2%</p>
                <div className="flex items-center gap-1 text-dark-positive">
                  <ArrowDown className="h-3 w-3" />
                  <span className="text-xs">-2.1%</span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary mt-1">vs last month</p>
            </Card>
          </div>

          {/* Website Traffic Overview */}
          <Card className="dark-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-dark-primary mb-2">Website Traffic Overview</h3>
                <p className="text-sm text-dark-secondary">Daily sessions, users, and pageviews for the last 7 days</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-primary">6000</p>
                <p className="text-xs text-dark-secondary">Peak Sessions</p>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  <Line 
                    type="monotone" 
                    dataKey="bounceRate" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    name="Bounce Rate %"
                  />
                </BarChart>
              </ResponsiveContainer>
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

            {/* Device & Platform Analytics */}
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
                      <span className="text-dark-primary font-medium">{device.conversionRate}%</span>
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

            {/* Geographic Performance */}
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
                      <p className="text-dark-secondary text-sm">{country.conversionRate}% conversion</p>
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