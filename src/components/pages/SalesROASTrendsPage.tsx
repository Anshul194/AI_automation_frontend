import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Clock,
  Info,
  ChevronDown
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface DayData {
  day: string;
  date: string;
  sales: number;
  roas: number;
}

interface WeeklyData {
  week: string;
  sales: number;
  roas: number;
}

interface MonthlyData {
  month: string;
  sales: number;
  roas: number;
}

type DateRange = '3months' | '6months' | '12months';
type MetricType = 'sales' | 'roas' | 'combined';

export function SalesROASTrendsPage() {
  const [selectedRange, setSelectedRange] = useState<DateRange>('6months');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('combined');

  // Mock data for different time periods
  const dailyData: DayData[] = [
    { day: 'Mon', date: '2024-01-01', sales: 45000, roas: 3.2 },
    { day: 'Tue', date: '2024-01-02', sales: 52000, roas: 3.8 },
    { day: 'Wed', date: '2024-01-03', sales: 61000, roas: 4.5 },
    { day: 'Thu', date: '2024-01-04', sales: 49000, roas: 3.6 },
    { day: 'Fri', date: '2024-01-05', sales: 58000, roas: 4.1 },
    { day: 'Sat', date: '2024-01-06', sales: 74000, roas: 4.8 },
    { day: 'Sun', date: '2024-01-07', sales: 78000, roas: 5.2 }
  ];

  const weeklyData: WeeklyData[] = [
    { week: 'Week 1', sales: 315000, roas: 3.8 },
    { week: 'Week 2', sales: 342000, roas: 4.2 },
    { week: 'Week 3', sales: 298000, roas: 3.5 },
    { week: 'Week 4', sales: 387000, roas: 4.7 },
    { week: 'Week 5', sales: 421000, roas: 5.1 },
    { week: 'Week 6', sales: 356000, roas: 4.0 },
    { week: 'Week 7', sales: 445000, roas: 5.3 },
    { week: 'Week 8', sales: 398000, roas: 4.4 },
    { week: 'Week 9', sales: 467000, roas: 5.6 },
    { week: 'Week 10', sales: 523000, roas: 6.2 },
    { week: 'Week 11', sales: 478000, roas: 5.4 },
    { week: 'Week 12', sales: 556000, roas: 6.8 }
  ];

  const monthlyData: MonthlyData[] = [
    { month: 'Jan', sales: 1342000, roas: 4.2 },
    { month: 'Feb', sales: 1487000, roas: 4.6 },
    { month: 'Mar', sales: 1623000, roas: 5.1 },
    { month: 'Apr', sales: 1756000, roas: 5.4 },
    { month: 'May', sales: 1889000, roas: 5.8 },
    { month: 'Jun', sales: 2012000, roas: 6.2 },
    { month: 'Jul', sales: 2156000, roas: 6.5 },
    { month: 'Aug', sales: 2298000, roas: 6.8 },
    { month: 'Sep', sales: 2445000, roas: 7.1 },
    { month: 'Oct', sales: 2587000, roas: 7.4 },
    { month: 'Nov', sales: 2734000, roas: 7.8 },
    { month: 'Dec', sales: 2923000, roas: 8.2 }
  ];

  const getChartData = () => {
    switch (selectedRange) {
      case '3months':
        return weeklyData.slice(-12);
      case '6months':
        return weeklyData;
      case '12months':
        return monthlyData;
      default:
        return weeklyData;
    }
  };

  const formatCurrency = (value: number) => {
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  const formatSales = (value: number) => {
    if (value >= 1000000) {
      return `₹${(value / 1000000).toFixed(1)}M`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  const getBestPerformingDay = (metric: 'sales' | 'roas') => {
    const sorted = [...dailyData].sort((a, b) => b[metric] - a[metric]);
    return sorted[0];
  };

  const getDateRangeLabel = () => {
    switch (selectedRange) {
      case '3months': return 'Last 3 Months';
      case '6months': return 'Last 6 Months';
      case '12months': return 'Last 12 Months';
      default: return 'Last 6 Months';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-card p-4 rounded-lg border border-dark-border shadow-lg">
          <p className="text-dark-primary font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'sales' 
                ? `Sales: ${formatSales(entry.value)}`
                : `ROAS: ${entry.value.toFixed(1)}x`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-8 bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-primary">Sales & ROAS Trends</h1>
          <p className="text-dark-secondary">Analyze performance patterns and optimize your peak days</p>
        </div>
        
        {/* Date Range Selector */}
        <div className="relative">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value as DateRange)}
            className="appearance-none bg-dark-card border border-dark-border rounded-lg px-4 py-3 pr-10 text-dark-primary focus:outline-none focus:ring-2 focus:ring-dark-cta min-w-[200px]"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-secondary pointer-events-none" />
        </div>
      </div>

      {/* Metrics Tabs */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedMetric('sales')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedMetric === 'sales'
              ? 'bg-dark-cta text-white'
              : 'bg-dark-card text-dark-secondary hover:bg-dark-hover'
          }`}
        >
          Sales Trend
        </button>
        <button
          onClick={() => setSelectedMetric('roas')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedMetric === 'roas'
              ? 'bg-dark-cta text-white'
              : 'bg-dark-card text-dark-secondary hover:bg-dark-hover'
          }`}
        >
          ROAS Trend
        </button>
        <button
          onClick={() => setSelectedMetric('combined')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedMetric === 'combined'
              ? 'bg-dark-cta text-white'
              : 'bg-dark-card text-dark-secondary hover:bg-dark-hover'
          }`}
        >
          Combined View
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2">
          <Card className="dark-card p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark-primary">
                  {selectedMetric === 'sales' ? 'Sales Trend' : 
                   selectedMetric === 'roas' ? 'ROAS Trend' : 
                   'Sales & ROAS Trends'}
                </h2>
                <Badge className="bg-dark-positive/20 text-dark-positive">
                  {getDateRangeLabel()}
                </Badge>
              </div>
              
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey={selectedRange === '12months' ? 'month' : 'week'} 
                    stroke="#94A3B8" 
                  />
                  <YAxis 
                    yAxisId="left" 
                    stroke="#94A3B8"
                    tickFormatter={formatSales}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#94A3B8"
                    tickFormatter={(value) => `${value}x`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  {(selectedMetric === 'sales' || selectedMetric === 'combined') && (
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      name="Sales"
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  )}
                  
                  {(selectedMetric === 'roas' || selectedMetric === 'combined') && (
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="roas"
                      stroke="#22C55E"
                      strokeWidth={3}
                      name="ROAS"
                      dot={{ fill: '#22C55E', strokeWidth: 2, r: 4 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Insights Section */}
        <div className="space-y-6">
          {/* Best Performing Days */}
          <Card className="dark-card p-6">
            <h3 className="text-lg font-semibold text-dark-primary mb-4">Best Performing Days</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-dark-cta" />
                  <span className="text-sm font-medium text-dark-cta">Highest Sales</span>
                </div>
                <div className="text-xl font-bold text-dark-primary">
                  {getBestPerformingDay('sales').day}
                </div>
                <div className="text-sm text-dark-secondary">
                  {formatSales(getBestPerformingDay('sales').sales)} average
                </div>
              </div>

              <div className="p-4 bg-green-600/10 rounded-lg border border-green-600/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-dark-positive" />
                  <span className="text-sm font-medium text-dark-positive">Highest ROAS</span>
                </div>
                <div className="text-xl font-bold text-dark-primary">
                  {getBestPerformingDay('roas').day}
                </div>
                <div className="text-sm text-dark-secondary">
                  {getBestPerformingDay('roas').roas.toFixed(1)}x average
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Highlights */}
          <Card className="dark-card p-6">
            <h3 className="text-lg font-semibold text-dark-primary mb-4">Peak Performance Times</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-dark-cta" />
                <div>
                  <div className="text-sm font-medium text-dark-primary">Best Time of Day</div>
                  <div className="text-xs text-dark-secondary">7:00 PM - 9:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-dark-positive" />
                <div>
                  <div className="text-sm font-medium text-dark-primary">Best Month</div>
                  <div className="text-xs text-dark-secondary">December (8.2x ROAS)</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Insights Text */}
          <div className="space-y-3 text-sm text-dark-secondary">
            <p>
              <span className="text-dark-primary font-medium">Sales Insight:</span> Your data shows that Saturday & Sunday consistently perform best for Sales.
            </p>
            <p>
              <span className="text-dark-primary font-medium">ROAS Insight:</span> Your data shows that Wednesday performs best for ROAS.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border border-blue-600/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-6 w-6 text-dark-cta" />
          <h2 className="text-xl font-semibold text-dark-primary">Maximize Your Peak Days 🚀</h2>
        </div>
        
        <p className="text-dark-secondary mb-6 leading-relaxed">
          Click below to automatically increase your ad spend by 20% on peak days so you don't miss out on maximum returns.
        </p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button className="dark-button-primary px-8 py-3 min-w-[280px]">
            Auto-Increase Spend on Peak Days
          </Button>
          <div className="flex items-center gap-2 text-xs text-dark-secondary">
            <Info className="h-3 w-3" />
            <span>You can change this % anytime in Settings</span>
          </div>
        </div>
      </div>

      {/* Justification Note */}
      <Card className="dark-card p-4 bg-dark-hover/50">
        <div className="flex items-start gap-3">
          <Info className="h-4 w-4 text-dark-secondary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-dark-secondary leading-relaxed">
            These insights are derived from analyzing repeat patterns in historical data across multiple ranges to confirm the best performing days.
          </p>
        </div>
      </Card>
    </div>
  );
}