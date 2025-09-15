import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ShoppingCart,
  Video,
  Download,
  Filter
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function TrendsPage() {
  // Mock trend data
  const monthlyTrends = [
    { month: 'Jan', roas: 3.2, rto: 18, revenue: 2800000, orders: 1240 },
    { month: 'Feb', roas: 3.6, rto: 16, revenue: 3200000, orders: 1456 },
    { month: 'Mar', roas: 3.8, rto: 15, revenue: 3600000, orders: 1672 },
    { month: 'Apr', roas: 4.1, rto: 13, revenue: 4100000, orders: 1890 },
    { month: 'May', roas: 4.3, rto: 12, revenue: 4500000, orders: 2134 },
    { month: 'Jun', roas: 4.2, rto: 14, revenue: 4520000, orders: 2087 }
  ];

  const ageGroupTrends = [
    { month: 'Jan', '18-24': 2.8, '25-34': 4.2, '35-44': 3.6, '45-54': 2.4, '55+': 1.8 },
    { month: 'Feb', '18-24': 3.1, '25-34': 4.5, '35-44': 3.8, '45-54': 2.6, '55+': 1.9 },
    { month: 'Mar', '18-24': 3.3, '25-34': 4.7, '35-44': 4.0, '45-54': 2.8, '55+': 2.1 },
    { month: 'Apr', '18-24': 3.5, '25-34': 4.9, '35-44': 4.2, '45-54': 3.0, '55+': 2.2 },
    { month: 'May', '18-24': 3.4, '25-34': 5.1, '35-44': 4.3, '45-54': 3.1, '55+': 2.3 },
    { month: 'Jun', '18-24': 3.2, '25-34': 4.8, '35-44': 4.1, '45-54': 2.9, '55+': 2.1 }
  ];

  const monthlyProducts = [
    {
      month: 'January',
      bestSelling: { name: 'Wireless Headphones', sales: 342, revenue: 850000 },
      highestRevenue: { name: 'Smart Watch Pro', sales: 156, revenue: 920000 },
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      month: 'February',
      bestSelling: { name: 'Fitness Tracker', sales: 389, revenue: 680000 },
      highestRevenue: { name: 'Premium Headphones', sales: 167, revenue: 890000 },
      image: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d5?w=100&h=100&fit=crop"
    },
    {
      month: 'March',
      bestSelling: { name: 'Skincare Set', sales: 456, revenue: 720000 },
      highestRevenue: { name: 'Wireless Headphones', sales: 234, revenue: 980000 },
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100&h=100&fit=crop"
    },
    {
      month: 'April',
      bestSelling: { name: 'Coffee Beans', sales: 678, revenue: 450000 },
      highestRevenue: { name: 'Smart Watch Pro', sales: 189, revenue: 1120000 },
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop"
    },
    {
      month: 'May',
      bestSelling: { name: 'Wireless Headphones', sales: 712, revenue: 890000 },
      highestRevenue: { name: 'Wireless Headphones', sales: 712, revenue: 1450000 },
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      month: 'June',
      bestSelling: { name: 'Fitness Tracker', sales: 634, revenue: 820000 },
      highestRevenue: { name: 'Smart Watch Pro', sales: 201, revenue: 1380000 },
      image: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d5?w=100&h=100&fit=crop"
    }
  ];

  const monthlyVideos = [
    {
      month: 'January',
      bestVideo: 'Headphones Unboxing',
      hookCtr: 11.2,
      roas: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      month: 'February',
      bestVideo: 'Morning Workout Routine',
      hookCtr: 12.4,
      roas: 5.1,
      thumbnail: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=100&h=100&fit=crop"
    },
    {
      month: 'March',
      bestVideo: 'Skincare Transformation',
      hookCtr: 13.8,
      roas: 5.6,
      thumbnail: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100&h=100&fit=crop"
    },
    {
      month: 'April',
      bestVideo: 'Perfect Coffee Brew',
      hookCtr: 10.9,
      roas: 4.2,
      thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop"
    },
    {
      month: 'May',
      bestVideo: 'Tech Review Comparison',
      hookCtr: 14.2,
      roas: 5.8,
      thumbnail: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop"
    },
    {
      month: 'June',
      bestVideo: 'Lifestyle Upgrade',
      hookCtr: 13.1,
      roas: 5.2,
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
    }
  ];

  const COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="p-6 space-y-8 bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-primary">Performance Trends</h1>
          <p className="text-dark-secondary">Monthly analytics and performance insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="dark-button-secondary">
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 months
          </Button>
          <Button variant="outline" size="sm" className="dark-button-secondary">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="dark-button-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Trends
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Current ROAS</p>
              <TrendingUp className="h-4 w-4 text-dark-positive" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">4.2x</p>
            <p className="text-xs text-dark-positive">+31% vs 6 months ago</p>
          </div>
        </Card>
        
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Revenue Growth</p>
              <TrendingUp className="h-4 w-4 text-dark-positive" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">+61%</p>
            <p className="text-xs text-dark-positive">₹4.52L this month</p>
          </div>
        </Card>
        
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">RTO Improvement</p>
              <TrendingDown className="h-4 w-4 text-dark-positive" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">-22%</p>
            <p className="text-xs text-dark-positive">Down to 14% from 18%</p>
          </div>
        </Card>
        
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Best Age Group</p>
              <Users className="h-4 w-4 text-dark-cta" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">25-34</p>
            <p className="text-xs text-dark-positive">5.1x ROAS peak</p>
          </div>
        </Card>
      </div>

      {/* ROAS & Revenue Trends */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark-primary">ROAS & Revenue Trends</h2>
            <Badge className="bg-dark-positive/20 text-dark-positive">Consistent Growth</Badge>
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94A3B8" />
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
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="roas"
                stroke="#3B82F6"
                strokeWidth={3}
                name="ROAS"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#22C55E"
                fill="rgba(34, 197, 94, 0.1)"
                name="Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Age-wise ROAS Trends */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark-primary">Age-wise ROAS Trends</h2>
            <Badge className="bg-dark-cta/20 text-dark-cta">25-34 Leading</Badge>
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={ageGroupTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94A3B8" />
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
              <Line type="monotone" dataKey="18-24" stroke="#EF4444" strokeWidth={2} name="18-24" />
              <Line type="monotone" dataKey="25-34" stroke="#22C55E" strokeWidth={3} name="25-34" />
              <Line type="monotone" dataKey="35-44" stroke="#3B82F6" strokeWidth={2} name="35-44" />
              <Line type="monotone" dataKey="45-54" stroke="#F59E0B" strokeWidth={2} name="45-54" />
              <Line type="monotone" dataKey="55+" stroke="#8B5CF6" strokeWidth={2} name="55+" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* RTO Trends */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark-primary">RTO Rate Trends</h2>
            <Badge className="bg-dark-positive/20 text-dark-positive">
              <TrendingDown className="h-4 w-4 mr-1" />
              Improving
            </Badge>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Area
                type="monotone"
                dataKey="rto"
                stroke="#EF4444"
                fill="rgba(239, 68, 68, 0.2)"
                strokeWidth={2}
                name="RTO Rate (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Monthly Product Performance */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark-primary">Monthly Product Leaders</h2>
            <Badge className="bg-dark-cta/20 text-dark-cta">Best Sellers & Revenue</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-dark-primary mb-4">Best Selling Products by Month</h3>
              <div className="space-y-4">
                {monthlyProducts.map((month, index) => (
                  <div key={month.month} className="flex items-center gap-4 p-4 bg-dark-hover rounded-lg">
                    <ImageWithFallback
                      src={month.image}
                      alt={month.bestSelling.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-dark-primary">{month.month}</div>
                      <div className="text-sm text-dark-secondary">{month.bestSelling.name}</div>
                      <div className="text-xs text-dark-cta">{month.bestSelling.sales} units • {formatCurrency(month.bestSelling.revenue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-dark-primary mb-4">Highest Revenue Products by Month</h3>
              <div className="space-y-4">
                {monthlyProducts.map((month, index) => (
                  <div key={month.month} className="flex items-center gap-4 p-4 bg-dark-hover rounded-lg">
                    <ImageWithFallback
                      src={month.image}
                      alt={month.highestRevenue.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-dark-primary">{month.month}</div>
                      <div className="text-sm text-dark-secondary">{month.highestRevenue.name}</div>
                      <div className="text-xs text-dark-positive">{month.highestRevenue.sales} units • {formatCurrency(month.highestRevenue.revenue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly Video Creative Performance */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark-primary">Best Performing Video Creatives</h2>
            <Badge className="bg-dark-positive/20 text-dark-positive">Creative Excellence</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyVideos.map((month, index) => (
              <Card key={month.month} className="p-4 bg-dark-hover border border-dark-border">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={month.thumbnail}
                      alt={month.bestVideo}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="text-sm text-dark-secondary">{month.month}</div>
                      <div className="font-medium text-dark-primary text-sm">{month.bestVideo}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-dark-bg rounded">
                      <div className="text-lg font-bold text-dark-cta">{month.hookCtr}%</div>
                      <div className="text-xs text-dark-secondary">Hook CTR</div>
                    </div>
                    <div className="text-center p-2 bg-dark-bg rounded">
                      <div className="text-lg font-bold text-dark-positive">{month.roas}x</div>
                      <div className="text-xs text-dark-secondary">ROAS</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="dark-card p-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-dark-primary">Key Trend Insights</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-600/10 rounded-lg border border-green-600/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-dark-positive flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-dark-positive">Strong Growth Trajectory</div>
                  <div className="text-sm text-dark-secondary mt-1">ROAS improved by 31% over 6 months with consistent monthly growth. Revenue increased 61% in the same period.</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-dark-cta flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-dark-cta">25-34 Age Group Dominance</div>
                  <div className="text-sm text-dark-secondary mt-1">Consistently highest performing demographic with peak ROAS of 5.1x. Should be primary targeting focus.</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-600/10 rounded-lg border border-purple-600/20">
              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-purple-400">Creative Performance Peak</div>
                  <div className="text-sm text-dark-secondary mt-1">May's "Tech Review Comparison" achieved 14.2% Hook CTR and 5.8x ROAS - highest performing creative to date.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}