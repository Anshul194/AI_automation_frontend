import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Eye, 
  MousePointer, 
  CreditCard,
  Package,
  Smartphone,
  Monitor,
  Tablet,
  ChevronDown,
  Download,
  Calendar,
  Target,
  Zap,
  Play,
  Globe,
  ArrowDown
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  FunnelChart,
  Funnel,
  Cell
} from 'recharts';

type FunnelView = 'website' | 'user-journey';

export function FunnelPage() {
  const [activeView, setActiveView] = useState<FunnelView>('website');
  const [dateRange, setDateRange] = useState('30days');

  // Website Funnel Data
  const kpiMetrics = [
    {
      title: 'Overall Conversion',
      value: '6.0%',
      change: '+0.8%',
      trend: 'up',
      icon: Target
    },
    {
      title: 'Avg Order Value',
      value: '₹298',
      change: '+₹23',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Total Revenue',
      value: '₹460K',
      change: '+12.4%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Cart Abandonment',
      value: '37.1%',
      change: '-2.3%',
      trend: 'up',
      icon: ShoppingCart
    }
  ];

  const funnelSteps = [
    { stage: 'Website Visitors', users: 45680, dropOff: null, icon: Users },
    { stage: 'Product Views', users: 34210, dropOff: '25.1%', icon: Eye },
    { stage: 'Add to Cart', users: 17105, dropOff: '50.1%', icon: ShoppingCart },
    { stage: 'Checkout Started', users: 8552, dropOff: '50.0%', icon: CreditCard },
    { stage: 'Purchase Complete', users: 2740, dropOff: '67.9%', icon: Package }
  ];

  const trafficSources = [
    {
      name: 'Facebook Ads',
      visitors: '12.5K',
      conversions: 420,
      cvr: '3.36%',
      revenue: '₹125K',
      roas: '2.8x'
    },
    {
      name: 'Instagram Ads',
      visitors: '8.2K',
      conversions: 328,
      cvr: '4.0%',
      revenue: '₹98K',
      roas: '3.2x'
    },
    {
      name: 'Google Ads',
      visitors: '15.3K',
      conversions: 765,
      cvr: '5.0%',
      revenue: '₹228K',
      roas: '4.1x'
    },
    {
      name: 'Organic',
      visitors: '9.7K',
      conversions: 963,
      cvr: '9.92%',
      revenue: '₹287K',
      roas: '∞'
    }
  ];

  const deviceFunnelData = [
    { device: 'Mobile', aov: 245, cvr: 4.2 },
    { device: 'Desktop', aov: 385, cvr: 8.1 },
    { device: 'Tablet', aov: 298, cvr: 5.7 }
  ];

  const weeklyFunnelData = [
    { week: 'Week 1', landingToView: 75, viewToCart: 50, cartToCheckout: 50, checkoutToPurchase: 32 },
    { week: 'Week 2', landingToView: 72, viewToCart: 48, cartToCheckout: 52, checkoutToPurchase: 35 },
    { week: 'Week 3', landingToView: 78, viewToCart: 52, cartToCheckout: 48, checkoutToPurchase: 30 },
    { week: 'Week 4', landingToView: 80, viewToCart: 55, cartToCheckout: 50, checkoutToPurchase: 33 }
  ];

  const cohortData = [
    { month: 'Jan', week1: 85, week2: 62, week3: 45, week4: 28 },
    { month: 'Feb', week1: 88, week2: 65, week3: 48, week4: 31 },
    { month: 'Mar', week1: 91, week2: 68, week3: 52, week4: 35 }
  ];

  // User Journey Data
  const userJourneyKPIs = [
    {
      title: 'Hook Rate',
      subtitle: '3s video view → click',
      value: '12.4%',
      status: 'good',
      icon: Play
    },
    {
      title: 'Landing Page CVR',
      subtitle: 'Click → page visit',
      value: '74.2%',
      status: 'good',
      icon: Globe
    },
    {
      title: 'Add to Cart Rate',
      subtitle: 'Visit → add to cart',
      value: '28.7%',
      status: 'average',
      icon: ShoppingCart
    },
    {
      title: 'Checkout CVR',
      subtitle: 'Cart → checkout start',
      value: '45.3%',
      status: 'needs-attention',
      icon: CreditCard
    },
    {
      title: 'Purchase CVR',
      subtitle: 'Checkout → purchase',
      value: '67.8%',
      status: 'good',
      icon: Package
    }
  ];

  const journeyFunnelData = [
    { stage: 'Hook (3s View)', users: 100000, percentage: 100 },
    { stage: 'Landing Page Visits', users: 74200, percentage: 74.2 },
    { stage: 'Add to Cart', users: 21290, percentage: 28.7 },
    { stage: 'Checkout', users: 9644, percentage: 45.3 },
    { stage: 'Purchase', users: 6539, percentage: 67.8 }
  ];

  const dropOffInsights = [
    {
      stage: 'Hook → LP',
      insight: 'Possible issue with website speed or targeting.',
      severity: 'medium'
    },
    {
      stage: 'ATC → Checkout',
      insight: 'Maybe high shipping cost or OTP friction.',
      severity: 'high'
    },
    {
      stage: 'Checkout → Purchase',
      insight: 'Payment gateway issues detected.',
      severity: 'medium'
    }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-dark-positive';
      case 'average': return 'text-yellow-400';
      case 'needs-attention': return 'text-dark-negative';
      default: return 'text-dark-secondary';
    }
  };

  const renderWebsiteFunnel = () => (
    <div className="space-y-8">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="dark-card p-6">
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="h-8 w-8 text-dark-cta" />
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === 'up' ? 'text-dark-positive' : 'text-dark-negative'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {metric.change}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-dark-primary">{metric.value}</p>
              <p className="text-sm text-dark-secondary">{metric.title}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Conversion Funnel Section */}
        <div className="lg:col-span-2">
          <Card className="dark-card p-6">
            <h2 className="text-xl font-semibold text-dark-primary mb-6">Conversion Funnel</h2>
            <div className="space-y-4">
              {funnelSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center gap-4 p-4 bg-dark-hover rounded-xl">
                    <step.icon className="h-6 w-6 text-dark-cta" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-dark-primary">{step.stage}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-dark-primary">
                            {step.users.toLocaleString()}
                          </span>
                          {step.dropOff && (
                            <Badge className="bg-dark-negative/20 text-dark-negative border-dark-negative/30">
                              -{step.dropOff}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < funnelSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowDown className="h-5 w-5 text-dark-secondary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Side Cards */}
        <div className="space-y-6">
          {/* Critical Drop-offs */}
          <Card className="dark-card p-6">
            <h3 className="font-semibold text-dark-primary mb-4">Critical Drop-offs</h3>
            <div className="space-y-3">
              <div className="p-3 bg-dark-negative/10 rounded-lg border border-dark-negative/20">
                <p className="font-medium text-dark-negative">Views to Cart</p>
                <p className="text-sm text-dark-secondary">50.1% loss</p>
              </div>
              <div className="p-3 bg-dark-negative/10 rounded-lg border border-dark-negative/20">
                <p className="font-medium text-dark-negative">Checkout to Purchase</p>
                <p className="text-sm text-dark-secondary">60.2% loss</p>
              </div>
            </div>
          </Card>

          {/* Top Converting Source */}
          <Card className="dark-card p-6">
            <h3 className="font-semibold text-dark-primary mb-4">Top Converting Source</h3>
            <div className="p-4 bg-dark-positive/10 rounded-lg border border-dark-positive/20">
              <div className="flex items-center justify-between">
                <span className="font-medium text-dark-primary">Organic Traffic</span>
                <Badge className="bg-dark-positive/20 text-dark-positive border-dark-positive/30">
                  9.92% CVR
                </Badge>
              </div>
            </div>
          </Card>

          {/* Quick Wins */}
          <Card className="dark-card p-6">
            <h3 className="font-semibold text-dark-primary mb-4">Quick Wins</h3>
            <div className="space-y-3">
              <div className="p-3 bg-dark-cta/10 rounded-lg border border-dark-cta/20">
                <p className="font-medium text-dark-cta">A/B Test Checkout</p>
                <p className="text-sm text-dark-secondary">Test simplified flow</p>
              </div>
              <div className="p-3 bg-dark-cta/10 rounded-lg border border-dark-cta/20">
                <p className="font-medium text-dark-cta">Mobile Optimization</p>
                <p className="text-sm text-dark-secondary">Improve mobile UX</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Traffic Source Performance */}
      <Card className="dark-card p-6">
        <h2 className="text-xl font-semibold text-dark-primary mb-6">Traffic Source Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trafficSources.map((source, index) => (
            <div key={index} className="p-4 bg-dark-hover rounded-xl">
              <h3 className="font-medium text-dark-primary mb-4">{source.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-dark-secondary">Visitors</span>
                  <span className="font-medium text-dark-primary">{source.visitors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-dark-secondary">Conversions</span>
                  <span className="font-medium text-dark-primary">{source.conversions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-dark-secondary">CVR</span>
                  <span className="font-medium text-dark-positive">{source.cvr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-dark-secondary">Revenue</span>
                  <span className="font-medium text-dark-primary">{source.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-dark-secondary">ROAS</span>
                  <span className="font-medium text-dark-positive">{source.roas}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Device Funnel Performance */}
        <Card className="dark-card p-6">
          <h3 className="font-semibold text-dark-primary mb-6">Device Funnel Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceFunnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="device" stroke="#94A3B8" />
              <YAxis yAxisId="left" stroke="#94A3B8" />
              <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="aov" fill="#3B82F6" name="Avg Order Value (₹)" />
              <Bar yAxisId="right" dataKey="cvr" fill="#22C55E" name="CVR (%)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Week-wise Funnel Step Conversion Rates */}
        <Card className="dark-card p-6">
          <h3 className="font-semibold text-dark-primary mb-6">Week-wise Funnel Step Conversion Rates</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyFunnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="landingToView" stroke="#3B82F6" strokeWidth={2} name="Landing to View" />
              <Line type="monotone" dataKey="viewToCart" stroke="#22C55E" strokeWidth={2} name="View to Cart" />
              <Line type="monotone" dataKey="cartToCheckout" stroke="#F59E0B" strokeWidth={2} name="Cart to Checkout" />
              <Line type="monotone" dataKey="checkoutToPurchase" stroke="#EF4444" strokeWidth={2} name="Checkout to Purchase" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Cohort Retention Analysis */}
      <Card className="dark-card p-6">
        <h2 className="text-xl font-semibold text-dark-primary mb-6">Cohort Retention Analysis</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 px-4 font-medium text-dark-primary">Cohort Month</th>
                <th className="text-center py-3 px-4 font-medium text-dark-primary">Week 1</th>
                <th className="text-center py-3 px-4 font-medium text-dark-primary">Week 2</th>
                <th className="text-center py-3 px-4 font-medium text-dark-primary">Week 3</th>
                <th className="text-center py-3 px-4 font-medium text-dark-primary">Week 4</th>
              </tr>
            </thead>
            <tbody>
              {cohortData.map((cohort, index) => (
                <tr key={index} className="border-b border-dark-border/50">
                  <td className="py-4 px-4 font-medium text-dark-primary">{cohort.month}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-dark-positive/20 text-dark-positive">
                      {cohort.week1}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400">
                      {cohort.week2}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-orange-600/20 text-orange-400">
                      {cohort.week3}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-dark-negative/20 text-dark-negative">
                      {cohort.week4}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderUserJourney = () => (
    <div className="space-y-8">
      {/* Date Range and Export */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="appearance-none bg-dark-card border border-dark-border rounded-lg px-4 py-3 pr-10 text-dark-primary focus:outline-none focus:ring-2 focus:ring-dark-cta"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="custom">Custom</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-secondary pointer-events-none" />
        </div>
        <Button className="dark-button-secondary">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {userJourneyKPIs.map((kpi, index) => (
          <Card key={index} className="dark-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <kpi.icon className={`h-6 w-6 ${getStatusColor(kpi.status)}`} />
              <div className={`w-3 h-3 rounded-full ${
                kpi.status === 'good' ? 'bg-dark-positive' :
                kpi.status === 'average' ? 'bg-yellow-400' :
                'bg-dark-negative'
              }`} />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-dark-primary">{kpi.value}</p>
              <p className="font-medium text-dark-primary">{kpi.title}</p>
              <p className="text-xs text-dark-secondary">{kpi.subtitle}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Funnel Visualization */}
        <div className="lg:col-span-3">
          <Card className="dark-card p-6">
            <h2 className="text-xl font-semibold text-dark-primary mb-6">User Journey Funnel</h2>
            <div className="space-y-6">
              {journeyFunnelData.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-dark-primary">{stage.stage}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-dark-primary">
                            {stage.users.toLocaleString()}
                          </span>
                          {index > 0 && (
                            <Badge className="bg-dark-cta/20 text-dark-cta border-dark-cta/30">
                              {stage.percentage.toFixed(1)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-dark-border rounded-full h-8">
                        <div 
                          className="bg-gradient-to-r from-dark-cta to-dark-positive h-8 rounded-full flex items-center justify-center"
                          style={{ width: `${stage.percentage}%` }}
                        >
                          <span className="text-sm font-medium text-white">
                            {stage.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < journeyFunnelData.length - 1 && (
                    <div className="flex justify-center py-4">
                      <ArrowDown className="h-5 w-5 text-dark-secondary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Drop-Off Insights Panel */}
        <div className="space-y-6">
          <Card className="dark-card p-6">
            <h3 className="font-semibold text-dark-primary mb-4">Drop-Off Insights</h3>
            <div className="space-y-4">
              {dropOffInsights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  insight.severity === 'high' 
                    ? 'bg-dark-negative/10 border-dark-negative/20' 
                    : 'bg-yellow-600/10 border-yellow-600/20'
                }`}>
                  <div className="flex items-start gap-3">
                    <Zap className={`h-4 w-4 mt-1 ${
                      insight.severity === 'high' ? 'text-dark-negative' : 'text-yellow-400'
                    }`} />
                    <div>
                      <p className={`font-medium text-sm ${
                        insight.severity === 'high' ? 'text-dark-negative' : 'text-yellow-400'
                      }`}>
                        {insight.stage}
                      </p>
                      <p className="text-xs text-dark-secondary mt-1">{insight.insight}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Trend Graphs */}
      <Card className="dark-card p-6">
        <h2 className="text-xl font-semibold text-dark-primary mb-6">Journey Stage Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={weeklyFunnelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="week" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#FFFFFF'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="landingToView" stroke="#3B82F6" strokeWidth={3} name="Hook Rate %" />
            <Line type="monotone" dataKey="viewToCart" stroke="#22C55E" strokeWidth={3} name="ATC Rate %" />
            <Line type="monotone" dataKey="cartToCheckout" stroke="#F59E0B" strokeWidth={3} name="Checkout Rate %" />
            <Line type="monotone" dataKey="checkoutToPurchase" stroke="#EF4444" strokeWidth={3} name="Purchase Rate %" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Bottom CTA Section */}
      <div className="flex justify-end">
        <Button className="dark-button-primary px-8 py-4">
          <Target className="h-5 w-5 mr-2" />
          Optimize Campaign
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8 bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-primary">Funnel Analytics</h1>
          <p className="text-dark-secondary">Track conversion paths and optimize user journeys</p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1 bg-dark-card p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveView('website')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeView === 'website'
              ? 'bg-dark-cta text-white shadow-lg'
              : 'text-dark-secondary hover:text-dark-primary hover:bg-dark-hover'
          }`}
        >
          Website Funnel
        </button>
        <button
          onClick={() => setActiveView('user-journey')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeView === 'user-journey'
              ? 'bg-dark-cta text-white shadow-lg'
              : 'text-dark-secondary hover:text-dark-primary hover:bg-dark-hover'
          }`}
        >
          User Journey
        </button>
      </div>

      {/* Content */}
      {activeView === 'website' ? renderWebsiteFunnel() : renderUserJourney()}
    </div>
  );
}