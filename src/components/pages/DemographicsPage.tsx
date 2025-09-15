import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  Smartphone,
  Monitor,
  Facebook,
  Instagram,
  Zap,
  MessageCircle,
  Filter,
  TrendingUp,
  TrendingDown,
  ChevronDown
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface DemographicsPageProps {
  onBack: () => void;
}

type TimeRange = '7d' | '30d' | '90d';

export function DemographicsPage({ onBack }: DemographicsPageProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Mock demographic data
  const ageData = [
    { age: '13-17', users: 1250, percentage: 5.2, trend: 'up', change: 12.3 },
    { age: '18-24', users: 8950, percentage: 37.1, trend: 'up', change: 8.7 },
    { age: '25-34', users: 7890, percentage: 32.8, trend: 'up', change: 15.2 },
    { age: '35-44', users: 3420, percentage: 14.2, trend: 'down', change: -3.1 },
    { age: '45-54', users: 1890, percentage: 7.8, trend: 'down', change: -5.4 },
    { age: '55-64', users: 520, percentage: 2.2, trend: 'up', change: 2.1 },
    { age: '65+', users: 180, percentage: 0.7, trend: 'up', change: 1.8 }
  ];

  const genderData = [
    { gender: 'Female', users: 13850, percentage: 57.6, color: '#F472B6', trend: 'up', change: 4.2 },
    { gender: 'Male', users: 10200, percentage: 42.4, color: '#60A5FA', trend: 'up', change: 2.8 }
  ];

  // Top 15 locations (Indian states + some international)
  const locationData = [
    { location: 'Maharashtra', users: 4250, percentage: 17.7, trend: 'up', change: 12.5 },
    { location: 'Delhi', users: 3890, percentage: 16.2, trend: 'up', change: 8.9 },
    { location: 'Karnataka', users: 2950, percentage: 12.3, trend: 'up', change: 15.2 },
    { location: 'Tamil Nadu', users: 2340, percentage: 9.7, trend: 'up', change: 6.8 },
    { location: 'Gujarat', users: 1890, percentage: 7.9, trend: 'up', change: 9.4 },
    { location: 'Rajasthan', users: 1450, percentage: 6.0, trend: 'up', change: 4.2 },
    { location: 'West Bengal', users: 1320, percentage: 5.5, trend: 'down', change: -2.1 },
    { location: 'Uttar Pradesh', users: 1180, percentage: 4.9, trend: 'up', change: 7.3 },
    { location: 'Punjab', users: 980, percentage: 4.1, trend: 'up', change: 3.6 },
    { location: 'Haryana', users: 850, percentage: 3.5, trend: 'up', change: 5.8 },
    { location: 'Kerala', users: 720, percentage: 3.0, trend: 'up', change: 8.1 },
    { location: 'United States', users: 650, percentage: 2.7, trend: 'up', change: 11.2 },
    { location: 'United Kingdom', users: 520, percentage: 2.2, trend: 'up', change: 6.4 },
    { location: 'Canada', users: 380, percentage: 1.6, trend: 'up', change: 9.7 },
    { location: 'Australia', users: 290, percentage: 1.2, trend: 'up', change: 4.5 }
  ];

  const placementData = [
    { 
      platform: 'Facebook Feed', 
      users: 9850, 
      percentage: 41.0, 
      color: '#1877F2',
      impressions: 125000,
      ctr: 3.2,
      trend: 'up',
      change: 8.5
    },
    { 
      platform: 'Instagram Feed', 
      users: 7890, 
      percentage: 32.8, 
      color: '#E4405F',
      impressions: 98000,
      ctr: 4.1,
      trend: 'up',
      change: 12.3
    },
    { 
      platform: 'Instagram Stories', 
      users: 3420, 
      percentage: 14.2, 
      color: '#833AB4',
      impressions: 67000,
      ctr: 5.8,
      trend: 'up',
      change: 15.7
    },
    { 
      platform: 'Facebook Stories', 
      users: 1890, 
      percentage: 7.8, 
      color: '#42A5F5',
      impressions: 34000,
      ctr: 4.2,
      trend: 'down',
      change: -2.4
    },
    { 
      platform: 'Audience Network', 
      users: 680, 
      percentage: 2.8, 
      color: '#00D9FF',
      impressions: 15000,
      ctr: 2.1,
      trend: 'down',
      change: -5.1
    },
    { 
      platform: 'Threads', 
      users: 320, 
      percentage: 1.3, 
      color: '#000000',
      impressions: 8500,
      ctr: 6.2,
      trend: 'up',
      change: 45.2
    }
  ];

  const deviceData = [
    { device: 'Mobile', users: 18650, percentage: 77.6, color: '#22C55E' },
    { device: 'Desktop', users: 4890, percentage: 20.3, color: '#3B82F6' },
    { device: 'Tablet', users: 510, percentage: 2.1, color: '#F59E0B' }
  ];

  // Time series data for trends
  const demographicTrends = [
    { date: 'Week 1', female: 13200, male: 9800, mobile: 17800, desktop: 4600 },
    { date: 'Week 2', female: 13450, male: 9950, mobile: 18100, desktop: 4700 },
    { date: 'Week 3', female: 13680, male: 10120, mobile: 18350, desktop: 4750 },
    { date: 'Week 4', female: 13850, male: 10200, mobile: 18650, desktop: 4890 }
  ];

  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      default: return 'Last 30 Days';
    }
  };

  const totalUsers = ageData.reduce((sum, item) => sum + item.users, 0);

  return (
    <div className="p-6 space-y-6 bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="dark-button-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reports
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-dark-primary">Demographics Analysis</h1>
          <p className="text-dark-secondary">Detailed audience demographics and placement insights</p>
        </div>
        
        {/* Time Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="dark-button-secondary">
              <Calendar className="h-4 w-4 mr-2" />
              {getTimeRangeLabel(timeRange)}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark-card border-dark-border">
            <DropdownMenuItem 
              onClick={() => setTimeRange('7d')}
              className={`cursor-pointer hover:bg-dark-hover ${timeRange === '7d' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
            >
              Last 7 Days
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setTimeRange('30d')}
              className={`cursor-pointer hover:bg-dark-hover ${timeRange === '30d' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
            >
              Last 30 Days
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setTimeRange('90d')}
              className={`cursor-pointer hover:bg-dark-hover ${timeRange === '90d' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
            >
              Last 90 Days
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dark-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-secondary">Total Audience</span>
            <Users className="h-4 w-4 text-dark-cta" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-dark-primary">{totalUsers.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-dark-positive">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">+8.7%</span>
            </div>
          </div>
        </Card>

        <Card className="dark-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-secondary">Top Age Group</span>
            <Calendar className="h-4 w-4 text-green-400" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-dark-primary">18-24</p>
            <Badge className="bg-green-600/20 text-green-400 text-xs">37.1%</Badge>
          </div>
        </Card>

        <Card className="dark-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-secondary">Primary Gender</span>
            <Users className="h-4 w-4 text-pink-400" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-dark-primary">Female</p>
            <Badge className="bg-pink-600/20 text-pink-400 text-xs">57.6%</Badge>
          </div>
        </Card>

        <Card className="dark-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-secondary">Top Location</span>
            <MapPin className="h-4 w-4 text-orange-400" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-dark-primary">Maharashtra</p>
            <Badge className="bg-orange-600/20 text-orange-400 text-xs">17.7%</Badge>
          </div>
        </Card>
      </div>

      {/* Age Breakdown */}
      <Card className="dark-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-dark-primary mb-2">Age Distribution</h3>
          <p className="text-sm text-dark-secondary">Audience breakdown by age groups with trend analysis</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Age Chart */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="age" 
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
                  formatter={(value) => [value.toLocaleString(), 'Users']}
                />
                <Bar 
                  dataKey="users" 
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Age Table */}
          <div className="space-y-3">
            <h4 className="font-medium text-dark-primary">Detailed Breakdown</h4>
            {ageData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-dark-cta/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-dark-cta">{item.age}</span>
                  </div>
                  <div>
                    <p className="font-medium text-dark-primary">{item.users.toLocaleString()} users</p>
                    <p className="text-sm text-dark-secondary">{item.percentage}% of total</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 ${
                    item.trend === 'up' ? 'text-dark-positive' : 'text-dark-negative'
                  }`}>
                    {item.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span className="text-xs">{Math.abs(item.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Gender & Device Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <Card className="dark-card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark-primary mb-2">Gender Distribution</h3>
            <p className="text-sm text-dark-secondary">Audience breakdown by gender identity</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="users"
                    label={({ percentage }) => `${percentage}%`}
                  >
                    {genderData.map((entry, index) => (
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
                    formatter={(value) => [value.toLocaleString(), 'Users']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {genderData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="font-medium text-dark-primary">{item.gender}</p>
                      <p className="text-sm text-dark-secondary">{item.users.toLocaleString()} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-dark-primary">{item.percentage}%</p>
                    <div className="flex items-center gap-1 text-dark-positive">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">+{item.change}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Device Distribution */}
        <Card className="dark-card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark-primary mb-2">Device Usage</h3>
            <p className="text-sm text-dark-secondary">Distribution across device types</p>
          </div>
          
          <div className="space-y-4">
            {deviceData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                    {item.device === 'Mobile' && <Smartphone className="h-4 w-4" style={{ color: item.color }} />}
                    {item.device === 'Desktop' && <Monitor className="h-4 w-4" style={{ color: item.color }} />}
                    {item.device === 'Tablet' && <Smartphone className="h-4 w-4" style={{ color: item.color }} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-dark-primary">{item.device}</span>
                      <span className="text-sm font-bold text-dark-primary">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-dark-hover rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: item.color 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-dark-secondary mt-1">{item.users.toLocaleString()} users</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Location Breakdown */}
      <Card className="dark-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-dark-primary mb-2">Geographic Distribution</h3>
          <p className="text-sm text-dark-secondary">Top 15 locations by user count with growth trends</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Users</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Percentage</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Trend</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-dark-secondary">Growth</th>
              </tr>
            </thead>
            <tbody>
              {locationData.map((location, index) => (
                <tr key={index} className="border-b border-dark-border hover:bg-dark-hover transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-dark-secondary" />
                      <span className="text-dark-primary font-medium">{location.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-dark-primary font-semibold">{location.users.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-dark-hover rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-dark-cta transition-all duration-300"
                          style={{ width: `${(location.percentage / 20) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-dark-primary text-sm">{location.percentage}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`flex items-center gap-1 ${
                      location.trend === 'up' ? 'text-dark-positive' : 'text-dark-negative'
                    }`}>
                      {location.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${
                      location.trend === 'up' ? 'text-dark-positive' : 'text-dark-negative'
                    }`}>
                      {location.trend === 'up' ? '+' : ''}{location.change}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Platform Placement Breakdown */}
      <Card className="dark-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-dark-primary mb-2">Platform Placement Performance</h3>
          <p className="text-sm text-dark-secondary">Detailed breakdown across Facebook, Instagram, and other Meta platforms</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Placement Chart */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="platform" 
                  stroke="#94A3B8"
                  fontSize={12}
                  tick={{ fill: '#94A3B8' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
                  formatter={(value, name) => [
                    name === 'users' ? value.toLocaleString() : `${value}%`,
                    name === 'users' ? 'Users' : 'CTR'
                  ]}
                />
                <Bar 
                  dataKey="users" 
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Placement Details */}
          <div className="space-y-4">
            {placementData.map((platform, index) => (
              <div key={index} className="p-4 bg-dark-hover rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${platform.color}20` }}
                    >
                      {platform.platform.includes('Facebook') && <Facebook className="h-4 w-4" style={{ color: platform.color }} />}
                      {platform.platform.includes('Instagram') && <Instagram className="h-4 w-4" style={{ color: platform.color }} />}
                      {platform.platform.includes('Audience') && <Zap className="h-4 w-4" style={{ color: platform.color }} />}
                      {platform.platform.includes('Threads') && <MessageCircle className="h-4 w-4" style={{ color: platform.color }} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-dark-primary">{platform.platform}</h4>
                      <p className="text-xs text-dark-secondary">{platform.users.toLocaleString()} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-dark-primary">{platform.percentage}%</p>
                    <div className={`flex items-center gap-1 ${
                      platform.trend === 'up' ? 'text-dark-positive' : 'text-dark-negative'
                    }`}>
                      {platform.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="text-xs">{Math.abs(platform.change)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-dark-secondary">Impressions</p>
                    <p className="font-semibold text-dark-primary">{platform.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-dark-secondary">CTR</p>
                    <p className="font-semibold text-dark-primary">{platform.ctr}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Demographic Trends Over Time */}
      <Card className="dark-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-dark-primary mb-2">Demographic Trends</h3>
          <p className="text-sm text-dark-secondary">Gender and device usage trends over the selected time period</p>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demographicTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                formatter={(value) => [value.toLocaleString(), 'Users']}
              />
              <Legend 
                wrapperStyle={{ color: '#94A3B8' }}
              />
              <Line 
                type="monotone" 
                dataKey="female" 
                stroke="#F472B6" 
                strokeWidth={2}
                dot={{ fill: '#F472B6', strokeWidth: 2, r: 4 }}
                name="Female Users"
              />
              <Line 
                type="monotone" 
                dataKey="male" 
                stroke="#60A5FA" 
                strokeWidth={2}
                dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                name="Male Users"
              />
              <Line 
                type="monotone" 
                dataKey="mobile" 
                stroke="#22C55E" 
                strokeWidth={2}
                dot={{ fill: '#22C55E', strokeWidth: 2, r: 4 }}
                name="Mobile Users"
              />
              <Line 
                type="monotone" 
                dataKey="desktop" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                name="Desktop Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}