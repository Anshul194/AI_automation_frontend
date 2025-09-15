import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { 
  LayoutGrid, 
  List, 
  Search,
  Filter,
  Play,
  TrendingUp,
  TrendingDown,
  Star,
  Eye,
  ShoppingCart,
  Heart,
  Video,
  Award,
  AlertTriangle,
  Crown,
  Target,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  IndianRupee,
  Package,
  Repeat,
  BarChart3
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "../ui/dropdown-menu";
import { ImageWithFallback } from '../figma/ImageWithFallback';

type ViewMode = 'grid' | 'table';

type SortOption = 'none' | 'hookrate-asc' | 'hookrate-desc' | 'roas-asc' | 'roas-desc' | 'revenue-asc' | 'revenue-desc' | 'rto-asc' | 'rto-desc' | 'frequency-asc' | 'frequency-desc';

export function VideosPage({ onNavigateToTrend }: { onNavigateToTrend?: (videoId: number) => void }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('none');

  // Mock video creative data
  const videos = [
    {
      id: 1,
      name: "Headphones Lifestyle Ad",
      thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      duration: "0:30",
      roas: 5.8,
      hookCtr: 12.4,
      addToCartRate: 8.2,
      purchaseRate: 3.1,
      impressions: 245000,
      spend: 18500,
      revenue: 107300,
      aov: 2485,
      rto: 8,
      frequency: 2.4,
      isBestHook: true,
      trend: "up"
    },
    {
      id: 2,
      name: "Fitness Watch Morning Routine",
      thumbnail: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d5?w=400&h=300&fit=crop",
      duration: "0:45",
      roas: 4.6,
      hookCtr: 9.8,
      addToCartRate: 6.4,
      purchaseRate: 2.8,
      impressions: 189000,
      spend: 15200,
      revenue: 69920,
      aov: 2416,
      rto: 12,
      frequency: 3.1,
      isBestHook: false,
      trend: "up"
    },
    {
      id: 3,
      name: "Skincare Before & After",
      thumbnail: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop",
      duration: "0:25",
      roas: 4.2,
      hookCtr: 11.2,
      addToCartRate: 7.8,
      purchaseRate: 2.4,
      impressions: 156000,
      spend: 12800,
      revenue: 53760,
      aov: 1529,
      rto: 15,
      frequency: 2.8,
      isBestHook: false,
      trend: "up"
    },
    {
      id: 4,
      name: "Coffee Brewing Tutorial",
      thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
      duration: "1:00",
      roas: 3.8,
      hookCtr: 8.4,
      addToCartRate: 5.2,
      purchaseRate: 2.1,
      impressions: 134000,
      spend: 9800,
      revenue: 37240,
      aov: 618,
      rto: 6,
      frequency: 1.9,
      isBestHook: false,
      trend: "stable"
    },
    {
      id: 5,
      name: "Sunglasses Style Guide",
      thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      duration: "0:35",
      roas: 3.1,
      hookCtr: 6.8,
      addToCartRate: 4.1,
      purchaseRate: 1.9,
      impressions: 98000,
      spend: 11200,
      revenue: 34720,
      aov: 2436,
      rto: 25,
      frequency: 4.2,
      isBestHook: false,
      trend: "down"
    },
    {
      id: 6,
      name: "Yoga Flow Session",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      duration: "0:40",
      roas: 2.8,
      hookCtr: 5.2,
      addToCartRate: 3.4,
      purchaseRate: 1.6,
      impressions: 76000,
      spend: 8900,
      revenue: 24920,
      aov: 1239,
      rto: 18,
      frequency: 3.6,
      isBestHook: false,
      trend: "down"
    }
  ];

  // Filter and sort videos
  let filteredVideos = videos.filter(video =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting
  switch (sortBy) {
    case 'hookrate-asc':
      filteredVideos = [...filteredVideos].sort((a, b) => a.hookCtr - b.hookCtr);
      break;
    case 'hookrate-desc':
      filteredVideos = [...filteredVideos].sort((a, b) => b.hookCtr - a.hookCtr);
      break;
    case 'roas-asc':
      filteredVideos = [...filteredVideos].sort((a, b) => a.roas - b.roas);
      break;
    case 'roas-desc':
      filteredVideos = [...filteredVideos].sort((a, b) => b.roas - a.roas);
      break;
    case 'revenue-asc':
      filteredVideos = [...filteredVideos].sort((a, b) => a.revenue - b.revenue);
      break;
    case 'revenue-desc':
      filteredVideos = [...filteredVideos].sort((a, b) => b.revenue - a.revenue);
      break;
    case 'rto-asc':
      filteredVideos = [...filteredVideos].sort((a, b) => a.rto - b.rto);
      break;
    case 'rto-desc':
      filteredVideos = [...filteredVideos].sort((a, b) => b.rto - a.rto);
      break;
    case 'frequency-asc':
      filteredVideos = [...filteredVideos].sort((a, b) => a.frequency - b.frequency);
      break;
    case 'frequency-desc':
      filteredVideos = [...filteredVideos].sort((a, b) => b.frequency - a.frequency);
      break;
    default:
      // No sorting applied
      break;
  }

  // Calculate performance rankings - each category shows exactly top 3 videos
  const bestPerformingByRoas = [...videos]
    .sort((a, b) => b.roas - a.roas)
    .slice(0, 3);

  const bestPerformingByHookCtr = [...videos]
    .sort((a, b) => b.hookCtr - a.hookCtr)
    .slice(0, 3);

  const worstPerformingByRoas = [...videos]
    .sort((a, b) => a.roas - b.roas)
    .slice(0, 3);

  const worstPerformingByHookCtr = [...videos]
    .sort((a, b) => a.hookCtr - b.hookCtr)
    .slice(0, 3);

  // Helper function to get performance tags for a video
  const getPerformanceTags = (video: typeof videos[0]) => {
    const tags = [];
    
    if (bestPerformingByRoas.some(v => v.id === video.id)) {
      const rank = bestPerformingByRoas.findIndex(v => v.id === video.id) + 1;
      tags.push({ type: 'best-roas', rank, label: `#${rank} Best ROAS` });
    }
    
    if (bestPerformingByHookCtr.some(v => v.id === video.id)) {
      const rank = bestPerformingByHookCtr.findIndex(v => v.id === video.id) + 1;
      tags.push({ type: 'best-hook', rank, label: `#${rank} Best Hook` });
    }
    
    if (worstPerformingByRoas.some(v => v.id === video.id)) {
      const rank = worstPerformingByRoas.findIndex(v => v.id === video.id) + 1;
      tags.push({ type: 'worst-roas', rank, label: `#${rank} Low ROAS` });
    }
    
    if (worstPerformingByHookCtr.some(v => v.id === video.id)) {
      const rank = worstPerformingByHookCtr.findIndex(v => v.id === video.id) + 1;
      tags.push({ type: 'worst-hook', rank, label: `#${rank} Low Hook` });
    }
    
    return tags;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getSortLabel = (sortOption: SortOption): string => {
    switch (sortOption) {
      case 'hookrate-asc': return 'Hook Rate (Low → High)';
      case 'hookrate-desc': return 'Hook Rate (High → Low)';
      case 'roas-asc': return 'ROAS (Low → High)';
      case 'roas-desc': return 'ROAS (High → Low)';
      case 'revenue-asc': return 'Revenue (Low → High)';
      case 'revenue-desc': return 'Revenue (High → Low)';
      case 'rto-asc': return 'RTO % (Low → High)';
      case 'rto-desc': return 'RTO % (High → Low)';
      case 'frequency-asc': return 'Frequency (Low → High)';
      case 'frequency-desc': return 'Frequency (High → Low)';
      default: return 'Sort By';
    }
  };

  const VideoCard = ({ video }: { video: typeof videos[0] }) => {
    const performanceTags = getPerformanceTags(video);
    
    const handleViewTrend = () => {
      onNavigateToTrend?.(video.id);
    };
    
    return (
      <Card className="dark-card p-6 hover:ring-2 hover:ring-dark-cta transition-all duration-200">
        <div className="space-y-4">
          {/* Video Thumbnail */}
          <div className="relative group">
            <ImageWithFallback
              src={video.thumbnail}
              alt={video.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-white ml-1" fill="white" />
              </div>
            </div>
            
            {/* Duration */}
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-none">
              {video.duration}
            </Badge>
            
            {/* Performance Tags */}
            <div className="absolute top-2 left-2 space-y-1">
              {performanceTags.map((tag, index) => (
                <Badge 
                  key={`${tag.type}-${tag.rank}`}
                  className={`block text-xs font-semibold ${
                    tag.type === 'best-roas' 
                      ? 'bg-green-600/90 text-white border-green-500' 
                      : tag.type === 'best-hook'
                      ? 'bg-blue-600/90 text-white border-blue-500'
                      : tag.type === 'worst-roas'
                      ? 'bg-red-600/90 text-white border-red-500'
                      : 'bg-orange-600/90 text-white border-orange-500'
                  }`}
                >
                  {tag.type === 'best-roas' && <Award className="h-3 w-3 inline mr-1" />}
                  {tag.type === 'best-hook' && <Target className="h-3 w-3 inline mr-1" />}
                  {tag.type === 'worst-roas' && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                  {tag.type === 'worst-hook' && <Eye className="h-3 w-3 inline mr-1" />}
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>

        {/* Video Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-dark-primary">{video.name}</h3>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-dark-cta" />
                <span className="text-sm text-dark-secondary">ROAS</span>
              </div>
              <div className={`text-lg font-bold ${video.roas >= 4 ? 'text-dark-positive' : video.roas >= 3 ? 'text-dark-cta' : 'text-dark-negative'}`}>
                {video.roas}x
              </div>
            </div>
            
            <div className="p-3 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-dark-secondary" />
                <span className="text-sm text-dark-secondary">Hook Rate</span>
              </div>
              <div className={`text-lg font-bold ${video.hookCtr >= 10 ? 'text-dark-positive' : video.hookCtr >= 7 ? 'text-dark-cta' : 'text-dark-negative'}`}>
                {video.hookCtr}%
              </div>
            </div>
            
            <div className="p-3 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-dark-secondary" />
                <span className="text-sm text-dark-secondary">RTO</span>
              </div>
              <div className={`text-lg font-bold ${video.rto <= 10 ? 'text-dark-positive' : video.rto <= 20 ? 'text-dark-cta' : 'text-dark-negative'}`}>
                {video.rto}%
              </div>
            </div>
            
            <div className="p-3 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4 text-dark-secondary" />
                <span className="text-sm text-dark-secondary">Frequency</span>
              </div>
              <div className={`text-lg font-bold ${video.frequency <= 3 ? 'text-dark-positive' : video.frequency <= 5 ? 'text-dark-cta' : 'text-dark-negative'}`}>
                {video.frequency}
              </div>
            </div>
          </div>

          {/* Performance Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart Rate
                </span>
                <span className="text-sm font-medium text-dark-primary">{video.addToCartRate}%</span>
              </div>
              <Progress 
                value={video.addToCartRate} 
                className="h-2" 
                max={15}
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-secondary flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Purchase Rate
                </span>
                <span className="text-sm font-medium text-dark-primary">{video.purchaseRate}%</span>
              </div>
              <Progress 
                value={video.purchaseRate} 
                className="h-2" 
                max={5}
              />
            </div>
          </div>

          {/* Revenue & Spend */}
          <div className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
            <div>
              <div className="text-sm text-dark-secondary">Revenue</div>
              <div className="font-bold text-dark-positive">{formatCurrency(video.revenue)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-dark-secondary">Spend</div>
              <div className="font-bold text-dark-primary">{formatCurrency(video.spend)}</div>
            </div>
          </div>

          {/* View Trend Button */}
          <Button 
            onClick={handleViewTrend}
            className="w-full dark-button-secondary flex items-center gap-2 mt-4"
            size="sm"
          >
            <BarChart3 className="h-4 w-4" />
            View Trend
          </Button>
        </div>
      </div>
    </Card>
    );
  };

  const VideoTableRow = ({ video }: { video: typeof videos[0] }) => {
    const performanceTags = getPerformanceTags(video);
    
    return (
      <tr className="border-t border-dark-border hover:bg-dark-table-hover transition-colors">
        <td className="py-4 px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ImageWithFallback
                src={video.thumbnail}
                alt={video.name}
                className="w-16 h-12 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                <Play className="h-4 w-4 text-white" fill="white" />
              </div>
            </div>
            <div>
              <div className="font-medium text-dark-primary">{video.name}</div>
              <div className="text-sm text-dark-secondary">{video.duration}</div>
              
              {/* Performance Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {performanceTags.map((tag, index) => (
                  <Badge 
                    key={`${tag.type}-${tag.rank}`}
                    className={`text-xs font-semibold ${
                      tag.type === 'best-roas' 
                        ? 'bg-green-600/20 text-green-400 border-green-600/30' 
                        : tag.type === 'best-hook'
                        ? 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                        : tag.type === 'worst-roas'
                        ? 'bg-red-600/20 text-red-400 border-red-600/30'
                        : 'bg-orange-600/20 text-orange-400 border-orange-600/30'
                    }`}
                  >
                    {tag.type === 'best-roas' && <Award className="h-3 w-3 inline mr-1" />}
                    {tag.type === 'best-hook' && <Target className="h-3 w-3 inline mr-1" />}
                    {tag.type === 'worst-roas' && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                    {tag.type === 'worst-hook' && <Eye className="h-3 w-3 inline mr-1" />}
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </td>
      <td className="py-4 px-6">
        <div className={`font-bold ${video.hookCtr >= 10 ? 'text-dark-positive' : video.hookCtr >= 7 ? 'text-dark-cta' : 'text-dark-negative'}`}>
          {video.hookCtr}%
        </div>
      </td>
      <td className="py-4 px-6">
        <div className={`font-bold ${video.roas >= 4 ? 'text-dark-positive' : video.roas >= 3 ? 'text-dark-cta' : 'text-dark-negative'}`}>
          {video.roas}x
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="font-bold text-dark-primary">{formatCurrency(video.revenue)}</div>
      </td>
      <td className="py-4 px-6">
        <div className={`font-bold ${video.rto <= 10 ? 'text-dark-positive' : video.rto <= 20 ? 'text-dark-cta' : 'text-dark-negative'}`}>
          {video.rto}%
        </div>
      </td>
      <td className="py-4 px-6">
        <div className={`font-bold ${video.frequency <= 3 ? 'text-dark-positive' : video.frequency <= 5 ? 'text-dark-cta' : 'text-dark-negative'}`}>
          {video.frequency}
        </div>
      </td>
    </tr>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-primary">Video Creatives</h1>
          <p className="text-dark-secondary">Ad creative performance and engagement analytics</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-2 p-1 bg-dark-hover rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'dark-button-primary' : 'text-dark-secondary hover:text-dark-primary'}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? 'dark-button-primary' : 'text-dark-secondary hover:text-dark-primary'}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Total Videos</p>
              <Video className="h-4 w-4 text-dark-cta" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">{videos.length}</p>
            <p className="text-xs text-dark-positive">+3 this week</p>
          </div>
        </Card>
        
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Avg Hook Rate</p>
              <Eye className="h-4 w-4 text-dark-cta" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">9.0%</p>
            <p className="text-xs text-dark-positive">+1.2% from last week</p>
          </div>
        </Card>
        
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Avg ROAS</p>
              <TrendingUp className="h-4 w-4 text-dark-positive" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">4.1x</p>
            <p className="text-xs text-dark-positive">+0.4x from last week</p>
          </div>
        </Card>
        
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Total Revenue</p>
              <Heart className="h-4 w-4 text-dark-positive" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">₹3.3L</p>
            <p className="text-xs text-dark-positive">+24.8% from last week</p>
          </div>
        </Card>
      </div>

      {/* Performance Sections */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Best Performing Videos by ROAS */}
        <Card className="dark-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-dark-positive" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-primary">Best ROAS</h3>
                <p className="text-sm text-dark-secondary">Top 3 by Revenue</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {bestPerformingByRoas.map((video, index) => (
                <div key={video.id} className="flex items-center gap-3 p-3 bg-dark-hover rounded-lg">
                  <div className="relative">
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.name}
                      className="w-12 h-9 object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark-primary text-sm truncate">
                      {video.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-dark-positive font-bold">{video.roas}x ROAS</span>
                      <span className="text-dark-secondary">•</span>
                      <span className="text-dark-secondary">{formatCurrency(video.revenue)}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-600/20 text-green-400 text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Best Performing Videos by Hook Rate */}
        <Card className="dark-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-dark-cta" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-primary">Best Hooks</h3>
                <p className="text-sm text-dark-secondary">Top 3 by Rate</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {bestPerformingByHookCtr.map((video, index) => (
                <div key={video.id} className="flex items-center gap-3 p-3 bg-dark-hover rounded-lg">
                  <div className="relative">
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.name}
                      className="w-12 h-9 object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark-primary text-sm truncate">
                      {video.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-dark-cta font-bold">{video.hookCtr}% Rate</span>
                      <span className="text-dark-secondary">•</span>
                      <span className="text-dark-secondary">{video.roas}x ROAS</span>
                    </div>
                  </div>
                  <Badge className="bg-blue-600/20 text-blue-400 text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Worst Performing Videos by ROAS */}
        <Card className="dark-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-dark-negative" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-primary">Low ROAS</h3>
                <p className="text-sm text-dark-secondary">Bottom 3 by Revenue</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {worstPerformingByRoas.map((video, index) => (
                <div key={video.id} className="flex items-center gap-3 p-3 bg-red-600/5 rounded-lg border border-red-600/20">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-12 h-9 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark-primary text-sm truncate">
                      {video.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-dark-negative font-bold">{video.roas}x ROAS</span>
                      <span className="text-dark-secondary">•</span>
                      <span className="text-dark-secondary">{video.hookCtr}% Rate</span>
                    </div>
                  </div>
                  <Badge className="bg-red-600/20 text-red-400 text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-red-600/10 rounded-lg border border-red-600/20">
              <div className="text-xs text-red-400 font-medium">⚠️ Action Required</div>
              <div className="text-xs text-dark-secondary mt-1">
                Consider pausing or refreshing low ROAS creatives
              </div>
            </div>
          </div>
        </Card>

        {/* Worst Performing Videos by Hook Rate */}
        <Card className="dark-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-primary">Low Hook Rate</h3>
                <p className="text-sm text-dark-secondary">Bottom 3 by Rate</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {worstPerformingByHookCtr.map((video, index) => (
                <div key={video.id} className="flex items-center gap-3 p-3 bg-orange-600/5 rounded-lg border border-orange-600/20">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-12 h-9 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark-primary text-sm truncate">
                      {video.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-orange-400 font-bold">{video.hookCtr}% Rate</span>
                      <span className="text-dark-secondary">•</span>
                      <span className="text-dark-secondary">{video.roas}x ROAS</span>
                    </div>
                  </div>
                  <Badge className="bg-orange-600/20 text-orange-400 text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-orange-600/10 rounded-lg border border-orange-600/20">
              <div className="text-xs text-orange-400 font-medium">💡 Insight</div>
              <div className="text-xs text-dark-secondary mt-1">
                Test new hooks to improve engagement rates
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-dark-secondary" />
          <Input
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-dark-hover border-dark-border text-dark-primary"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="dark-button-secondary">
              <Filter className="h-4 w-4 mr-2" />
              {sortBy === 'none' ? 'Sort By' : getSortLabel(sortBy)}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 dark-card border-dark-border">
            <DropdownMenuItem 
              onClick={() => setSortBy('none')}
              className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'none' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Default Order
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-dark-border" />
            
            {/* Hook Rate Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-dark-hover text-dark-primary cursor-pointer">
                <Eye className="h-4 w-4 mr-2" />
                Hook Rate
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="dark-card border-dark-border">
                <DropdownMenuItem 
                  onClick={() => setSortBy('hookrate-asc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'hookrate-asc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Low → High
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('hookrate-desc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'hookrate-desc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowDown className="h-4 w-4 mr-2" />
                  High → Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* ROAS Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-dark-hover text-dark-primary cursor-pointer">
                <TrendingUp className="h-4 w-4 mr-2" />
                ROAS
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="dark-card border-dark-border">
                <DropdownMenuItem 
                  onClick={() => setSortBy('roas-asc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'roas-asc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Low → High
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('roas-desc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'roas-desc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowDown className="h-4 w-4 mr-2" />
                  High → Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Revenue Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-dark-hover text-dark-primary cursor-pointer">
                <Heart className="h-4 w-4 mr-2" />
                Revenue
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="dark-card border-dark-border">
                <DropdownMenuItem 
                  onClick={() => setSortBy('revenue-asc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'revenue-asc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Low → High
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('revenue-desc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'revenue-desc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowDown className="h-4 w-4 mr-2" />
                  High → Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* RTO % Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-dark-hover text-dark-primary cursor-pointer">
                <Package className="h-4 w-4 mr-2" />
                RTO %
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="dark-card border-dark-border">
                <DropdownMenuItem 
                  onClick={() => setSortBy('rto-asc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'rto-asc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Low → High
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('rto-desc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'rto-desc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowDown className="h-4 w-4 mr-2" />
                  High → Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Frequency Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-dark-hover text-dark-primary cursor-pointer">
                <Repeat className="h-4 w-4 mr-2" />
                Frequency
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="dark-card border-dark-border">
                <DropdownMenuItem 
                  onClick={() => setSortBy('frequency-asc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'frequency-asc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Low → High
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('frequency-desc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'frequency-desc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowDown className="h-4 w-4 mr-2" />
                  High → Low
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-dark-secondary">
          Showing {filteredVideos.length} of {videos.length} videos
          {sortBy !== 'none' && ` • Sorted by ${getSortLabel(sortBy)}`}
        </p>
      </div>

      {/* Videos Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <Card className="dark-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">Video</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">Hook Rate</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">ROAS</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">Revenue</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">RTO %</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((video) => (
                  <VideoTableRow key={video.id} video={video} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="h-12 w-12 text-dark-secondary mx-auto mb-4" />
          <p className="text-dark-secondary">No videos found matching your search.</p>
        </div>
      )}
    </div>
  );
}