import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  MapPin, 
  Smartphone,
  Target,
  AlertTriangle,
  Download,
  Calendar,
  Filter
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Tooltip
} from 'recharts';

export function EnhancedDashboard() {
  // Mock data for different analytics sections
  const kpiData = [
    {
      title: "Total Revenue",
      value: "₹45.2L",
      change: "+23.4%",
      trend: "up",
      subtitle: "Shopify"
    },
    {
      title: "Total Orders",
      value: "1,247",
      change: "+18.2%",
      trend: "up",
      subtitle: "Last 30 days"
    },
    {
      title: "Total Ad Spend",
      value: "₹10.8L",
      change: "+12.1%",
      trend: "up",
      subtitle: "Meta Ads"
    },
    {
      title: "Blended ROAS",
      value: "4.2x",
      change: "+0.8x",
      trend: "up",
      subtitle: "Return on Ad Spend"
    },
    {
      title: "RTO Rate",
      value: "12%",
      change: "-2.3%",
      trend: "down",
      subtitle: "Return to Origin"
    }
  ];

  const genderPerformanceData = [
    { gender: 'Male', roas: 3.8, rto: 8, spend: 4500000, revenue: 17100000 },
    { gender: 'Female', roas: 4.6, rto: 15, spend: 6300000, revenue: 28980000 }
  ];

  const locationData = [
    { state: 'Maharashtra', roas: 4.8, rto: 8, color: '#22C55E' },
    { state: 'Karnataka', roas: 4.2, rto: 12, color: '#3B82F6' },
    { state: 'Delhi', roas: 3.9, rto: 10, color: '#F59E0B' },
    { state: 'Gujarat', roas: 3.6, rto: 14, color: '#EF4444' },
    { state: 'Tamil Nadu', roas: 3.4, rto: 16, color: '#EF4444' },
    { state: 'UP', roas: 2.1, rto: 45, color: '#DC2626' },
    { state: 'Bihar', roas: 1.8, rto: 52, color: '#DC2626' },
    { state: 'Assam', roas: 1.2, rto: 48, color: '#DC2626' }
  ];

  const agePerformanceData = [
    { age: '18-24', roas: 3.2, rto: 18, orders: 156 },
    { age: '25-34', roas: 4.8, rto: 9, orders: 342 },
    { age: '35-44', roas: 4.1, rto: 12, orders: 287 },
    { age: '45-54', roas: 2.9, rto: 22, orders: 98 },
    { age: '55-64', roas: 2.1, rto: 35, orders: 45 },
    { age: '65+', roas: 1.6, rto: 42, orders: 23 }
  ];

  const placementData = [
    { platform: 'Facebook Feed', spend: 35, roas: 4.2, rto: 8 },
    { platform: 'Instagram Feed', spend: 28, roas: 4.8, rto: 12 },
    { platform: 'Instagram Stories', spend: 22, roas: 3.6, rto: 15 },
    { platform: 'Audience Network', spend: 15, roas: 2.1, rto: 35 }
  ];

  const recommendations = [
    {
      type: 'critical',
      title: 'Pause ads in UP, Bihar, Assam',
      description: 'High RTO rates (45%+) causing significant losses',
      impact: 'Save ₹2.3L/month',
      action: 'Pause Now'
    },
    {
      type: 'opportunity',
      title: 'Scale Female 25-34 audience',
      description: 'Best performing segment with 4.8x ROAS',
      impact: 'Potential +₹8.2L revenue',
      action: 'Scale Budget'
    },
    {
      type: 'optimize',
      title: 'Shift budget from Audience Network',
      description: 'Low ROAS (2.1x) compared to other placements',
      impact: 'Improve overall ROAS by 0.4x',
      action: 'Optimize'
    }
  ];

  const CHART_COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="p-6 space-y-8 bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-primary">Dashboard Overview</h1>
          <p className="text-dark-secondary">D2C Analytics & Performance Insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="dark-button-secondary">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm" className="dark-button-secondary">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="dark-button-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="dark-card p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-dark-secondary">{kpi.title}</p>
                {kpi.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-dark-positive" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-dark-negative" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-dark-primary">{kpi.value}</p>
                <p className={`text-xs ${kpi.trend === 'up' ? 'text-dark-positive' : 'text-dark-negative'}`}>
                  {kpi.change} from last month
                </p>
                <p className="text-xs text-dark-secondary">{kpi.subtitle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Gender-wise Performance */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-dark-cta" />
              <h2 className="text-xl font-semibold text-dark-primary">Gender-wise Performance</h2>
            </div>
            <Badge className="bg-dark-positive/20 text-dark-positive">Female audience outperforming</Badge>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genderPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="gender" stroke="#94A3B8" />
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
                  <Bar dataKey="roas" fill="#3B82F6" name="ROAS" />
                  <Bar dataKey="rto" fill="#EF4444" name="RTO %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-dark-hover rounded-lg">
                  <div className="text-sm text-dark-secondary">Best Performing</div>
                  <div className="text-xl font-bold text-dark-positive">Female</div>
                  <div className="text-sm text-dark-secondary">4.6x ROAS, 15% RTO</div>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg">
                  <div className="text-sm text-dark-secondary">Revenue Split</div>
                  <div className="text-xl font-bold text-dark-primary">64% F : 36% M</div>
                  <div className="text-sm text-dark-secondary">₹29L vs ₹17L</div>
                </div>
              </div>
              <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-dark-cta flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-dark-primary">Insight</div>
                    <div className="text-sm text-dark-secondary">Female audience shows 21% higher ROAS but also higher RTO. Consider improving product quality or return policy for this segment.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Location-wise Performance */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-dark-cta" />
              <h2 className="text-xl font-semibold text-dark-primary">Location-wise Performance</h2>
            </div>
            <Badge className="bg-dark-negative/20 text-dark-negative">
              <AlertTriangle className="h-4 w-4 mr-1" />
              High RTO states detected
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Top & Bottom States */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-dark-primary mb-4">Top 5 States (Best ROAS)</h3>
                <div className="space-y-3">
                  {locationData.slice(0, 5).map((state, index) => (
                    <div key={state.state} className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: state.color }}></div>
                        <span className="font-medium text-dark-primary">{state.state}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-dark-positive">{state.roas}x</div>
                        <div className="text-xs text-dark-secondary">{state.rto}% RTO</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-dark-primary mb-4">Bottom 3 States (Worst RTO)</h3>
                <div className="space-y-3">
                  {locationData.slice(-3).map((state, index) => (
                    <div key={state.state} className="flex items-center justify-between p-3 bg-red-600/10 rounded-lg border border-red-600/20">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-4 w-4 text-dark-negative" />
                        <span className="font-medium text-dark-primary">{state.state}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-dark-negative">{state.roas}x</div>
                        <div className="text-xs text-dark-negative">{state.rto}% RTO</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* State Performance Chart */}
            <div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={locationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="state" 
                    stroke="#94A3B8" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                  />
                  <Bar dataKey="roas" fill="#3B82F6" name="ROAS" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-red-600/10 rounded-lg border border-red-600/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-dark-negative flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-dark-negative">High RTO Alert</div>
                <div className="text-sm text-dark-secondary">UP, Bihar, and Assam show RTO rates above 45%. Consider pausing ads in these regions to prevent losses.</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Age-wise Performance */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-dark-cta" />
              <h2 className="text-xl font-semibold text-dark-primary">Age-wise Performance</h2>
            </div>
            <Badge className="bg-dark-positive/20 text-dark-positive">25-34 age group leading</Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agePerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="age" stroke="#94A3B8" />
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
                  <Bar dataKey="roas" fill="#3B82F6" name="ROAS" />
                  <Bar dataKey="rto" fill="#EF4444" name="RTO %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-dark-hover rounded-lg">
                  <div className="text-sm text-dark-secondary">Best Age Group</div>
                  <div className="text-xl font-bold text-dark-positive">25-34</div>
                  <div className="text-sm text-dark-secondary">4.8x ROAS, 342 orders</div>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg">
                  <div className="text-sm text-dark-secondary">Worst Age Group</div>
                  <div className="text-xl font-bold text-dark-negative">65+</div>
                  <div className="text-sm text-dark-secondary">1.6x ROAS, 42% RTO</div>
                </div>
              </div>

              <div className="space-y-3">
                {agePerformanceData.slice(0, 3).map((age, index) => (
                  <div key={age.age} className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-dark-primary">{age.age}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="font-bold text-dark-cta">{age.roas}x</span>
                        <span className="text-dark-secondary"> ROAS</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold text-dark-primary">{age.orders}</span>
                        <span className="text-dark-secondary"> orders</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Placement-wise Performance */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-dark-cta" />
              <h2 className="text-xl font-semibold text-dark-primary">Placement-wise Performance</h2>
            </div>
            <Badge className="bg-dark-positive/20 text-dark-positive">Instagram Feed performing best</Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-dark-primary mb-4">Spend Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={placementData}
                    dataKey="spend"
                    nameKey="platform"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ platform, spend }) => `${platform}: ${spend}%`}
                  >
                    {placementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="font-medium text-dark-primary mb-4">ROAS vs RTO by Platform</h3>
              <div className="space-y-4">
                {placementData.map((placement, index) => (
                  <div key={placement.platform} className="p-4 bg-dark-hover rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                        ></div>
                        <span className="font-medium text-dark-primary">{placement.platform}</span>
                      </div>
                      <div className="text-sm text-dark-secondary">{placement.spend}% spend</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-bold text-dark-cta">{placement.roas}x</span>
                        <span className="text-dark-secondary"> ROAS</span>
                      </div>
                      <div className="text-sm">
                        <span className={`font-bold ${placement.rto > 20 ? 'text-dark-negative' : 'text-dark-positive'}`}>
                          {placement.rto}%
                        </span>
                        <span className="text-dark-secondary"> RTO</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-dark-cta flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-dark-primary">Platform Insight</div>
                <div className="text-sm text-dark-secondary">Instagram Feed shows best ROI (4.8x ROAS), while Audience Network underperforms (2.1x ROAS). Consider redistributing budget.</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-dark-cta" />
            <h2 className="text-xl font-semibold text-dark-primary">AI Recommendations</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className={`p-6 border ${
                rec.type === 'critical' ? 'border-red-600/30 bg-red-600/5' :
                rec.type === 'opportunity' ? 'border-green-600/30 bg-green-600/5' :
                'border-blue-600/30 bg-blue-600/5'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium text-dark-primary">{rec.title}</h3>
                      <p className="text-sm text-dark-secondary">{rec.description}</p>
                    </div>
                    <Badge className={`${
                      rec.type === 'critical' ? 'bg-red-600/20 text-red-400' :
                      rec.type === 'opportunity' ? 'bg-green-600/20 text-green-400' :
                      'bg-blue-600/20 text-blue-400'
                    }`}>
                      {rec.type}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-dark-cta">{rec.impact}</div>
                    <Button size="sm" className={`w-full ${
                      rec.type === 'critical' ? 'bg-red-600 hover:bg-red-700 text-white' :
                      rec.type === 'opportunity' ? 'bg-green-600 hover:bg-green-700 text-white' :
                      'dark-button-primary'
                    }`}>
                      {rec.action}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}