import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProductTrends } from '../../store/slices/catalogSlice';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Package,
  IndianRupee,
  ShoppingCart,
  Award,
  AlertTriangle,
  Calendar,
  ChevronDown
} from "lucide-react";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ProductTrendPageProps {
  productId: number;
  onBack: () => void;
}

type TimeRange = '7d' | '30d' | '90d';

export function ProductTrendPage({ productId, onBack }: ProductTrendPageProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const dispatch = useAppDispatch();
  const productTrendState = useAppSelector((s: any) => s.catalog.productTrends?.[String(productId)]);
  const loading = useAppSelector((s: any) => s.catalog.loading);
  const error = useAppSelector((s: any) => s.catalog.error);
  const catalogProducts = useAppSelector((s: any) => s.catalog.products || []);
  const catalogProduct = catalogProducts.find((p: any) => Number(p.productId) === Number(productId));

  // Build product object dynamically from store (fallback to mock values)
  const product = {
    id: productId,
    name: catalogProduct?.name ?? catalogProduct?.title ?? "Premium Wireless Headphones",
    image: catalogProduct?.image ?? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    currentRoas: catalogProduct?.roas ?? 5.2,
    currentRto: catalogProduct?.rtoPercentage ?? catalogProduct?.rto ?? 8,
    currentRevenue: catalogProduct?.revenue ?? 850000,
    currentOrders: catalogProduct?.quantitySold ?? 342,
    currentAov: catalogProduct?.pVal ?? (catalogProduct?.quantitySold ? Math.round((catalogProduct.revenue || 0) / catalogProduct.quantitySold) : 2485),
    currentAcc: catalogProduct?.acc ?? productTrendState?.cards?.avgAcc ?? null,
    trend: "up" as const
  } as any;

  // Generate mock daily trend data for the selected time range
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
        roas: Math.max(1.5, product.currentRoas * performanceMultiplier + (Math.random() - 0.5) * 0.8),
        aov: Math.max(500, product.currentAov * (0.8 + Math.random() * 0.4)),
        revenue: Math.max(10000, product.currentRevenue * performanceMultiplier * (0.7 + Math.random() * 0.6)),
        rto: Math.min(30, Math.max(3, product.currentRto * (2 - performanceMultiplier) + (Math.random() - 0.5) * 3)),
        sales: Math.max(5, Math.round(product.currentOrders * performanceMultiplier * (0.6 + Math.random() * 0.8))),
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

  // Prefer API-driven trend data when available, otherwise use mock generator
  const mapApiToTrend = (apiItems: any[]) => {
    return apiItems.map((d: any, i: number) => {
      const dateRaw = d.date || d.fullDate || d.day || d.ts || d.createdAt || d.date_string || null;
      const date = dateRaw ? new Date(dateRaw) : new Date(new Date().setDate(new Date().getDate() - (getDaysFromTimeRange(timeRange) - i)));
      const displayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const roas = d.roas ?? d.roasValue ?? d.roas_x ?? null;
      const acc = d.acc ?? d.accValue ?? d.acc_percent ?? d.accPercentage ?? null;
      const aov = d.aov ?? d.avgOrderValue ?? d.aovValue ?? 0;
      const revenue = d.revenue ?? d.revenueValue ?? d.netRevenue ?? 0;
      const rto = d.rto ?? d.rtoPercentage ?? d.rtoPercent ?? 0;
      const sales = d.sales ?? d.quantitySold ?? d.orders ?? 0;

      const isHighPerformance = roas != null ? roas > (product.currentRoas * 1.05) : false;
      const isLowPerformance = roas != null ? roas < (product.currentRoas * 0.9) : false;

      return {
        date: displayDate,
        fullDate: date.toISOString().split('T')[0],
        roas: roas ?? Math.max(1.5, product.currentRoas * (0.8 + Math.random() * 0.4)),
        acc: acc ?? null,
        aov: aov ?? Math.max(500, product.currentAov * (0.8 + Math.random() * 0.4)),
        revenue: revenue ?? Math.max(10000, product.currentRevenue * (0.7 + Math.random() * 0.6)),
        rto: rto ?? Math.min(30, Math.max(3, product.currentRto * (1 + (Math.random() - 0.5) * 0.3))),
        sales: sales ?? Math.max(5, Math.round(product.currentOrders * (0.6 + Math.random() * 0.8))),
        isHighPerformance,
        isLowPerformance,
        performance: isHighPerformance ? 'high' : isLowPerformance ? 'low' : 'normal'
      };
    });
  };

  let trendData = [] as any[];
  if (productTrendState && Array.isArray(productTrendState.data) && productTrendState.data.length > 0) {
    trendData = mapApiToTrend(productTrendState.data.slice(-getDaysFromTimeRange(timeRange)));
  } else if (productTrendState && Array.isArray(productTrendState.trends) && productTrendState.trends.length > 0) {
    trendData = mapApiToTrend(productTrendState.trends.slice(-getDaysFromTimeRange(timeRange)));
  } else {
    trendData = generateTrendData(getDaysFromTimeRange(timeRange));
  }

  // Calculate performance insights
  const highPerformanceDays = trendData.filter(d => d.isHighPerformance).length;
  const lowPerformanceDays = trendData.filter(d => d.isLowPerformance).length;
  const normalPerformanceDays = trendData.length - highPerformanceDays - lowPerformanceDays;

  // Calculate average metrics
  const avgMetrics = {
    roas: (trendData.reduce((sum, d) => sum + d.roas, 0) / trendData.length).toFixed(1),
    aov: Math.round(trendData.reduce((sum, d) => sum + d.aov, 0) / trendData.length),
    revenue: Math.round(trendData.reduce((sum, d) => sum + d.revenue, 0) / trendData.length),
    rto: (trendData.reduce((sum, d) => sum + d.rto, 0) / trendData.length).toFixed(1),
    sales: Math.round(trendData.reduce((sum, d) => sum + d.sales, 0) / trendData.length)
  };

  const accValues = trendData.map(d => d.acc).filter((v: any) => v != null);
  const avgAcc = accValues.length ? (accValues.reduce((s: number, v: number) => s + v, 0) / accValues.length) : null;

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
            <p className="text-dark-cta text-sm">ROAS: {payload.find((p: any) => p.dataKey === 'roas')?.value?.toFixed ? payload.find((p: any) => p.dataKey === 'roas')?.value.toFixed(1) + 'x' : (payload.find((p: any) => p.dataKey === 'roas')?.value ?? '-')}</p>
            <p className="text-yellow-400 text-sm">ACC: {payload.find((p: any) => p.dataKey === 'acc')?.value != null ? `${payload.find((p: any) => p.dataKey === 'acc')?.value}%` : '-'}</p>
            <p className="text-green-400 text-sm">AOV: ₹{payload.find((p: any) => p.dataKey === 'aov')?.value?.toLocaleString ? payload.find((p: any) => p.dataKey === 'aov')?.value.toLocaleString() : (payload.find((p: any) => p.dataKey === 'aov')?.value ?? '-')}</p>
            <p className="text-blue-400 text-sm">Revenue: {formatCurrency(payload.find((p: any) => p.dataKey === 'revenue')?.value)}</p>
            <p className="text-orange-400 text-sm">RTO: {payload.find((p: any) => p.dataKey === 'rto')?.value != null ? `${payload.find((p: any) => p.dataKey === 'rto')?.value.toFixed(1)}%` : '-'}</p>
            <p className="text-purple-400 text-sm">Sales: {payload.find((p: any) => p.dataKey === 'sales')?.value ?? '-'}</p>
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

  useEffect(() => {
    // Replace with dynamic userId if available; keeping same placeholder used elsewhere
    const userId = '68c900ac51647b3b7dbab556';
    dispatch(fetchProductTrends({ userId, productId, interval: 'daily' }));
  }, [dispatch, productId, timeRange]);

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
          Back to Catalog
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-dark-primary">Product Trend Analysis</h1>
          <p className="text-dark-secondary">Daily performance insights and trends</p>
        </div>
      </div>

      {/* Product Info Card */}
      <Card className="dark-card">
        <div className="flex items-center gap-6">
          <div className="relative">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-dark-primary mb-2">{product.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div>
                <p className="text-xs text-dark-secondary">Current ROAS</p>
                <p className="font-bold text-dark-cta">{product.currentRoas}x</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">AOV</p>
                <p className="font-bold text-green-400">₹{product.currentAov.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">Revenue</p>
                <p className="font-bold text-blue-400">{formatCurrency(product.currentRevenue)}</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">RTO</p>
                <p className="font-bold text-orange-400">{product.currentRto}%</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">Orders</p>
                <p className="font-bold text-purple-400">{product.currentOrders}</p>
              </div>
              <div>
                <p className="text-xs text-dark-secondary">ACC</p>
                <p className="font-bold text-dark-cta">{product.currentAcc != null ? `${product.currentAcc}%` : '—'}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-dark-cta" />
            <span className="text-sm text-dark-secondary">Avg ROAS</span>
          </div>
          <p className="text-xl font-bold text-dark-cta">{avgMetrics.roas}x</p>
        </Card>
        
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="h-4 w-4 text-green-400" />
            <span className="text-sm text-dark-secondary">Avg AOV</span>
          </div>
          <p className="text-xl font-bold text-green-400">₹{avgMetrics.aov.toLocaleString()}</p>
        </Card>
        
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="h-4 w-4 text-blue-400" />
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
            <ShoppingCart className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-dark-secondary">Avg Sales</span>
          </div>
          <p className="text-xl font-bold text-purple-400">{avgMetrics.sales}</p>
        </Card>
        <Card className="dark-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-dark-cta" />
            <span className="text-sm text-dark-secondary">Avg ACC</span>
          </div>
          <p className="text-xl font-bold text-dark-cta">{avgAcc != null ? `${avgAcc.toFixed(1)}%` : '—'}</p>
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
                dataKey="acc"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                name="ACC (%)"
              />
              <Line 
                type="monotone" 
                dataKey="aov" 
                stroke="#22C55E" 
                strokeWidth={2}
                dot={{ fill: '#22C55E', strokeWidth: 2, r: 3 }}
                name="AOV (₹)"
                yAxisId="aov"
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
                dataKey="sales" 
                stroke="#A855F7" 
                strokeWidth={2}
                dot={{ fill: '#A855F7', strokeWidth: 2, r: 3 }}
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
                High performance days typically show ROAS above {(product.currentRoas * 0.9).toFixed(1)}x with AOV exceeding ₹{Math.round(product.currentAov * 0.9).toLocaleString()}
              </div>
            </div>
            
            <div className="p-3 bg-green-600/10 rounded-lg border border-green-600/20">
              <div className="text-sm text-green-400 font-medium">🎯 Optimization Opportunity</div>
              <div className="text-xs text-dark-secondary mt-1">
                Replicate conditions from high-performance days to boost overall product effectiveness
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
                Low performance periods show increased RTO rates and decreased AOV
              </div>
            </div>
            
            <div className="p-3 bg-red-600/10 rounded-lg border border-red-600/20">
              <div className="text-sm text-red-400 font-medium">🔧 Recommended Actions</div>
              <div className="text-xs text-dark-secondary mt-1">
                Consider inventory adjustments, pricing optimization, or promotional strategies during low-performance patterns
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}