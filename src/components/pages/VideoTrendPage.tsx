import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft, 
  Play, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Heart,
  Package,
  Repeat,
  Award,
  AlertTriangle,
  Calendar,
  Filter,
  ChevronDown
} from "lucide-react";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface VideoTrendPageProps {
  videoId: number;
  onBack: () => void;
}

type TimeRange = '7d' | '30d' | '90d';

export function VideoTrendPage({ videoId, onBack }: VideoTrendPageProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Mock video data - in real app this would be fetched based on videoId
  const video = {
    id: videoId,
    name: "Headphones Lifestyle Ad",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    duration: "0:30",
    currentRoas: 5.8,
    currentHookRate: 12.4,
    currentRevenue: 107300,
    currentRto: 8,
    currentFrequency: 2.4,
    currentSales: 43
  };

  // Generate mock daily trend data for the last 30 days
  const generateTrendData = (days: number) => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Create realistic trend patterns with some volatility
      const dayOfWeek = date.getDay();
      const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1;
      
      // Base performance with weekly cycles and some randomness
      const baseMultiplier = 0.8 + (Math.sin(i * 0.2) * 0.3) + (Math.random() * 0.4);
      const performanceMultiplier = weekendMultiplier * baseMultiplier;
      
      // Simulate performance periods
      const isHighPerformance = performanceMultiplier > 0.9;
      const isLowPerformance = performanceMultiplier < 0.7;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        roas: Math.max(1.5, video.currentRoas * performanceMultiplier + (Math.random() - 0.5) * 0.8),
        hookRate: Math.max(2, video.currentHookRate * performanceMultiplier + (Math.random() - 0.5) * 2),
        revenue: Math.max(10000, video.currentRevenue * performanceMultiplier * (0.7 + Math.random() * 0.6)),
        rto: Math.min(30, Math.max(3, video.currentRto * (2 - performanceMultiplier) + (Math.random() - 0.5) * 3)),
        frequency: Math.max(1, video.currentFrequency * (0.8 + Math.random() * 0.4)),
        sales: Math.max(5, Math.round(video.currentSales * performanceMultiplier * (0.6 + Math.random() * 0.8))),
        isHighPerformance,
        isLowPerformance,
        performance: isHighPerformance ? 'high' : isLowPerformance ? 'low' : 'normal'
      });
    }
    
    return data;
  };

  const getDaysFromTimeRange = (range: TimeRange) => {
    switch (range) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };

  const trendData = generateTrendData(getDaysFromTimeRange(timeRange));

  // Calculate performance insights
  const highPerformanceDays = trendData.filter(d => d.isHighPerformance).length;
  const lowPerformanceDays = trendData.filter(d => d.isLowPerformance).length;
  const normalPerformanceDays = trendData.length - highPerformanceDays - lowPerformanceDays;

  // Calculate average metrics
  const avgMetrics = {
    roas: (trendData.reduce((sum, d) => sum + d.roas, 0) / trendData.length).toFixed(1),
    hookRate: (trendData.reduce((sum, d) => sum + d.hookRate, 0) / trendData.length).toFixed(1),
    revenue: Math.round(trendData.reduce((sum, d) => sum + d.revenue, 0) / trendData.length),
    rto: (trendData.reduce((sum, d) => sum + d.rto, 0) / trendData.length).toFixed(1),
    frequency: (trendData.reduce((sum, d) => sum + d.frequency, 0) / trendData.length).toFixed(1),
    sales: Math.round(trendData.reduce((sum, d) => sum + d.sales, 0) / trendData.length)
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-lg">
          <p className="text-dark-primary font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-dark-cta text-sm">ROAS: {payload.find((p: any) => p.dataKey === 'roas')?.value.toFixed(1)}x</p>
            <p className="text-green-400 text-sm">Hook Rate: {payload.find((p: any) => p.dataKey === 'hookRate')?.value.toFixed(1)}%</p>
            <p className="text-blue-400 text-sm">Revenue: {formatCurrency(payload.find((p: any) => p.dataKey === 'revenue')?.value)}</p>
            <p className="text-orange-400 text-sm">RTO: {payload.find((p: any) => p.dataKey === 'rto')?.value.toFixed(1)}%</p>
            <p className="text-purple-400 text-sm">Frequency: {payload.find((p: any) => p.dataKey === 'frequency')?.value.toFixed(1)}</p>
            <p className="text-pink-400 text-sm">Sales: {payload.find((p: any) => p.dataKey === 'sales')?.value}</p>
          </div>
          {data.performance !== 'normal' && (
            <div className="mt-2 pt-2 border-t border-dark-border">
              <Badge className={`text-xs ${
                data.performance === 'high' 
                  ? 'bg-green-600/20 text-green-400 border-green-600/30' 
                  : 'bg-red-600/20 text-red-400 border-red-600/30'
              }`}>
                {data.performance === 'high' ? '🔥 High Performance' : '⚠️ Low Performance'}
              </Badge>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

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
          Back to Videos
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-dark-primary">Video Trend Analysis</h1>
          <p className="text-dark-secondary">Daily performance insights and trends</p>
        </div>
      </div>

      {/* Video Info Card */}
      <Card className="dark-card">
        <div className="flex items-center gap-6">
          <div className="relative">
            <ImageWithFallback
              src={video.thumbnail}
              alt={video.name}
              className="w-32 h-24 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-none text-xs">
              {video.duration}
            </Badge>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-dark-primary mb-2">{video.name}</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div>
                <p className="text-xs text-dark-secondary">Current ROAS</p>
                <p className="font-bold text-dark-cta">{video.currentRoas}x</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">Hook Rate</p>
                <p className="font-bold text-green-400">{video.currentHookRate}%</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">Revenue</p>
                <p className="font-bold text-blue-400">{formatCurrency(video.currentRevenue)}</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">RTO</p>
                <p className="font-bold text-orange-400">{video.currentRto}%</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">Frequency</p>
                <p className="font-bold text-purple-400">{video.currentFrequency}</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">Sales</p>
                <p className="font-bold text-pink-400">{video.currentSales}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="dark-button-secondary">
                <Calendar className="h-4 w-4 mr-2" />
                {timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="dark-card border-dark-border">
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

        {/* Performance Summary */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-dark-secondary">{highPerformanceDays} High Performance Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-sm text-dark-secondary">{normalPerformanceDays} Normal Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-dark-secondary">{lowPerformanceDays} Low Performance Days</span>
          </div>
        </div>
      </div>

      {/* Average Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-dark-cta" />
            <span className="text-sm text-dark-secondary">Avg ROAS</span>
          </div>
          <p className="text-xl font-bold text-dark-cta">{avgMetrics.roas}x</p>
        </Card>
        
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-green-400" />
            <span className="text-sm text-dark-secondary">Avg Hook Rate</span>
          </div>
          <p className="text-xl font-bold text-green-400">{avgMetrics.hookRate}%</p>
        </Card>
        
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-dark-secondary">Avg Revenue</span>
          </div>
          <p className="text-xl font-bold text-blue-400">{formatCurrency(avgMetrics.revenue)}</p>
        </Card>
        
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-orange-400" />
            <span className="text-sm text-dark-secondary">Avg RTO</span>
          </div>
          <p className="text-xl font-bold text-orange-400">{avgMetrics.rto}%</p>
        </Card>
        
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Repeat className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-dark-secondary">Avg Frequency</span>
          </div>
          <p className="text-xl font-bold text-purple-400">{avgMetrics.frequency}</p>
        </Card>
        
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-pink-400" />
            <span className="text-sm text-dark-secondary">Avg Sales</span>
          </div>
          <p className="text-xl font-bold text-pink-400">{avgMetrics.sales}</p>
        </Card>
      </div>

      {/* Multi-Line Trend Chart */}
      <Card className="dark-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-dark-primary mb-2">Performance Trends Over Time</h3>
          <p className="text-sm text-dark-secondary">Daily metrics with performance period highlighting</p>
        </div>
        
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ color: '#94A3B8' }}
                iconType="line"
              />
              
              {/* Performance Period Reference Lines */}
              {trendData.map((item, index) => {
                if (item.isHighPerformance) {
                  return (
                    <ReferenceLine 
                      key={`high-${index}`}
                      x={item.date} 
                      stroke="#22C55E" 
                      strokeOpacity={0.3}
                      strokeWidth={2}
                    />
                  );
                }
                if (item.isLowPerformance) {
                  return (
                    <ReferenceLine 
                      key={`low-${index}`}
                      x={item.date} 
                      stroke="#EF4444" 
                      strokeOpacity={0.3}
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              })}
              
              <Line 
                type="monotone" 
                dataKey="roas" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                name="ROAS"
              />
              <Line 
                type="monotone" 
                dataKey="hookRate" 
                stroke="#22C55E" 
                strokeWidth={2}
                dot={{ fill: '#22C55E', strokeWidth: 2, r: 3 }}
                name="Hook Rate (%)"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#60A5FA" 
                strokeWidth={2}
                dot={{ fill: '#60A5FA', strokeWidth: 2, r: 3 }}
                name="Revenue (₹)"
                yAxisId="revenue"
              />
              <Line 
                type="monotone" 
                dataKey="rto" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                name="RTO (%)"
              />
              <Line 
                type="monotone" 
                dataKey="frequency" 
                stroke="#A855F7" 
                strokeWidth={2}
                dot={{ fill: '#A855F7', strokeWidth: 2, r: 3 }}
                name="Frequency"
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#EC4899" 
                strokeWidth={2}
                dot={{ fill: '#EC4899', strokeWidth: 2, r: 3 }}
                name="Sales"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-4 bg-dark-hover rounded-lg">
          <h4 className="text-sm font-medium text-dark-primary mb-2">Performance Period Legend</h4>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-dark-secondary">High Performance Days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-dark-secondary">Low Performance Days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-dark-secondary">Normal Performance Days</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="dark-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-primary">High Performance Insights</h3>
              <p className="text-sm text-dark-secondary">{highPerformanceDays} days identified</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-green-600/10 rounded-lg border border-green-600/20">
              <div className="text-sm text-green-400 font-medium">📈 Peak Performance Pattern</div>
              <div className="text-xs text-dark-secondary mt-1">
                High performance days typically show ROAS above {(video.currentRoas * 0.9).toFixed(1)}x with hook rates exceeding {(video.currentHookRate * 0.9).toFixed(1)}%
              </div>
            </div>
            
            <div className="p-3 bg-green-600/10 rounded-lg border border-green-600/20">
              <div className="text-sm text-green-400 font-medium">🎯 Optimization Opportunity</div>
              <div className="text-xs text-dark-secondary mt-1">
                Replicate conditions from high-performance days to boost overall video effectiveness
              </div>
            </div>
          </div>
        </Card>

        <Card className="dark-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-primary">Areas for Improvement</h3>
              <p className="text-sm text-dark-secondary">{lowPerformanceDays} days need attention</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-red-600/10 rounded-lg border border-red-600/20">
              <div className="text-sm text-red-400 font-medium">⚠️ Performance Dips</div>
              <div className="text-xs text-dark-secondary mt-1">
                Low performance periods show increased RTO rates and decreased hook engagement
              </div>
            </div>
            
            <div className="p-3 bg-red-600/10 rounded-lg border border-red-600/20">
              <div className="text-sm text-red-400 font-medium">🔧 Recommended Actions</div>
              <div className="text-xs text-dark-secondary mt-1">
                Consider adjusting targeting, creative refresh, or budget allocation during low-performance patterns
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}