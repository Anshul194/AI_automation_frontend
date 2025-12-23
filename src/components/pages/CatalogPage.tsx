import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCatalogDashboard, fetchCatalogProducts, setPage } from '../../store/slices/catalogSlice';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  LayoutGrid, 
  List, 
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Star,
  Package,
  IndianRupee,
  ShoppingCart,
  Award,
  AlertTriangle,
  Crown,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Heart,
  BarChart3
} from "lucide-react";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "../ui/dropdown-menu";

type ViewMode = 'grid' | 'table';

type SortOption = 'none' | 'aov-asc' | 'aov-desc' | 'roas-asc' | 'roas-desc' | 'revenue-asc' | 'revenue-desc' | 'rto-asc' | 'rto-desc';

export function CatalogPage({ onNavigateToTrend }: { onNavigateToTrend?: (productId: number) => void }) {
  const dispatch = useAppDispatch();
  const { loading, error, cards, lists, products: catalogProducts, totalValues, totalPages, currentPage } = useAppSelector(state => state.catalog);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('none');

  // TODO: Replace with dynamic userId
  const userId = '68c900ac51647b3b7dbab556';

  useEffect(() => {
    dispatch(fetchCatalogDashboard(userId));
    dispatch(fetchCatalogProducts({ userId, page: 1 }));
  }, [dispatch]);

  // API-driven product data
  const apiProducts = catalogProducts || [];
  const bestPerformingProducts = lists?.bestPerforming || [];
  const worstPerformingProducts = lists?.worstPerforming || [];
  const topRevenueProducts = lists?.topRevenue || [];

  // Filter and sort products
  let filteredProducts = apiProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting (API fields: revenue, rtoPercentage, roas, quantitySold, etc.)
  switch (sortBy) {
    case 'aov-asc':
      filteredProducts = [...filteredProducts].sort((a, b) => (a.revenue / (a.quantitySold || 1)) - (b.revenue / (b.quantitySold || 1)));
      break;
    case 'aov-desc':
      filteredProducts = [...filteredProducts].sort((a, b) => (b.revenue / (b.quantitySold || 1)) - (a.revenue / (a.quantitySold || 1)));
      break;
    case 'roas-asc':
      filteredProducts = [...filteredProducts].sort((a, b) => (a.roas || 0) - (b.roas || 0));
      break;
    case 'roas-desc':
      filteredProducts = [...filteredProducts].sort((a, b) => (b.roas || 0) - (a.roas || 0));
      break;
    case 'revenue-asc':
      filteredProducts = [...filteredProducts].sort((a, b) => a.revenue - b.revenue);
      break;
    case 'revenue-desc':
      filteredProducts = [...filteredProducts].sort((a, b) => b.revenue - a.revenue);
      break;
    case 'rto-asc':
      filteredProducts = [...filteredProducts].sort((a, b) => a.rtoPercentage - b.rtoPercentage);
      break;
    case 'rto-desc':
      filteredProducts = [...filteredProducts].sort((a, b) => b.rtoPercentage - a.rtoPercentage);
      break;
    default:
      // No sorting applied
      break;
  }

  // Rankings now come from API lists

  // Helper function to get performance tags for a product
  const getPerformanceTags = (product: any) => {
    const tags = [];
    if (bestPerformingProducts.some((p: any) => p.productId === product.productId)) {
      const rank = bestPerformingProducts.findIndex((p: any) => p.productId === product.productId) + 1;
      tags.push({ type: 'best', rank, label: `#${rank} Best ROAS` });
    }
    if (worstPerformingProducts.some((p: any) => p.productId === product.productId)) {
      const rank = worstPerformingProducts.findIndex((p: any) => p.productId === product.productId) + 1;
      tags.push({ type: 'worst', rank, label: `#${rank} High RTO` });
    }
    if (topRevenueProducts.some((p: any) => p.productId === product.productId)) {
      const rank = topRevenueProducts.findIndex((p: any) => p.productId === product.productId) + 1;
      tags.push({ type: 'revenue', rank, label: `#${rank} Revenue` });
    }
    return tags;
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return '₹0';
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getSortLabel = (sortOption: SortOption): string => {
    switch (sortOption) {
      case 'aov-asc': return 'AOV (Low → High)';
      case 'aov-desc': return 'AOV (High → Low)';
      case 'roas-asc': return 'ROAS (Low → High)';
      case 'roas-desc': return 'ROAS (High → Low)';
      case 'revenue-asc': return 'Revenue (Low → High)';
      case 'revenue-desc': return 'Revenue (High → Low)';
      case 'rto-asc': return 'RTO (Low → High)';
      case 'rto-desc': return 'RTO (High → Low)';
      default: return 'Sort By';
    }
  };

  const ProductCard = ({ product }: { product: any }) => {
    const performanceTags = getPerformanceTags(product);
    
    const handleViewTrend = () => {
      onNavigateToTrend?.(product.productId);
    };
    
    return (
    <Card className="dark-card p-6 hover:ring-2 hover:ring-dark-cta transition-all duration-200">
      <div className="space-y-4">
        {/* Product Image */}
        <div className="relative">
          <ImageWithFallback
            src={product.image ?? undefined}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          {/* Performance Tags */}
          <div className="absolute top-2 right-2 space-y-1">
            {performanceTags.map((tag, index) => (
              <Badge
                key={`${tag.type}-${tag.rank}`}
                className={`block text-xs font-semibold ${
                  tag.type === 'best'
                    ? 'bg-green-600/90 text-white border-green-500'
                    : tag.type === 'worst'
                    ? 'bg-red-600/90 text-white border-red-500'
                    : 'bg-blue-600/90 text-white border-blue-500'
                }`}
              >
                {tag.type === 'best' && <Award className="h-3 w-3 inline mr-1" />}
                {tag.type === 'worst' && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                {tag.type === 'revenue' && <Crown className="h-3 w-3 inline mr-1" />}
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-dark-primary">{product.name}</h3>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-dark-cta" />
                <span className="text-sm text-dark-secondary">ROAS</span>
              </div>
              <div className={`text-lg font-bold ${product.roas != null && product.roas >= 4 ? 'text-dark-positive' : product.roas != null && product.roas >= 3 ? 'text-dark-cta' : 'text-dark-negative'}`}>
                {product.roas != null ? product.roas + 'x' : '-'}
              </div>
            </div>

            <div className="p-3 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-dark-secondary" />
                <span className="text-sm text-dark-secondary">RTO</span>
              </div>
              <div className={`text-lg font-bold ${product.rtoPercentage != null && product.rtoPercentage <= 10 ? 'text-dark-positive' : product.rtoPercentage != null && product.rtoPercentage <= 20 ? 'text-dark-cta' : 'text-dark-negative'}`}>
                {product.rtoPercentage != null ? product.rtoPercentage + '%' : '-'}
              </div>
            </div>

            <div className="p-3 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-dark-positive" />
                <span className="text-sm text-dark-secondary">Revenue</span>
              </div>
              <div className="text-lg font-bold text-dark-primary">
                {formatCurrency(product.revenue)}
              </div>
            </div>

            <div className="p-3 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-dark-secondary" />
                <span className="text-sm text-dark-secondary">Orders</span>
              </div>
              <div className="text-lg font-bold text-dark-primary">
                {product.quantitySold}
              </div>
            </div>
          </div>

          {/* AOV */}
          <div className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
            <span className="text-sm text-dark-secondary">Avg Order Value</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-dark-primary">₹{product.quantitySold ? Math.round(product.revenue / product.quantitySold).toLocaleString() : '0'}</span>
              {/* No trend info in API, so just show up arrow if revenue > 0 */}
              {product.revenue > 0 ? (
                <TrendingUp className="h-4 w-4 text-dark-positive" />
              ) : (
                <TrendingDown className="h-4 w-4 text-dark-negative" />
              )}
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

  const ProductTableRow = ({ product }: { product: any }) => {
    const performanceTags = getPerformanceTags(product);
    
    return (
      <tr className="border-t border-dark-border hover:bg-dark-table-hover transition-colors">
        <td className="py-4 px-6">
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src={product.image ?? undefined}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <div className="font-medium text-dark-primary">{product.name}</div>
              {/* Performance Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {performanceTags.map((tag, index) => (
                  <Badge
                    key={`${tag.type}-${tag.rank}`}
                    className={`text-xs font-semibold ${
                      tag.type === 'best'
                        ? 'bg-green-600/20 text-green-400 border-green-600/30'
                        : tag.type === 'worst'
                        ? 'bg-red-600/20 text-red-400 border-red-600/30'
                        : 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                    }`}
                  >
                    {tag.type === 'best' && <Award className="h-3 w-3 inline mr-1" />}
                    {tag.type === 'worst' && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                    {tag.type === 'revenue' && <Crown className="h-3 w-3 inline mr-1" />}
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </td>
        <td className="py-4 px-6">
          <div className={`font-bold ${product.roas != null && product.roas >= 4 ? 'text-dark-positive' : product.roas != null && product.roas >= 3 ? 'text-dark-cta' : 'text-dark-negative'}`}>
            {product.roas != null ? product.roas + 'x' : '-'}
          </div>
        </td>
        <td className="py-4 px-6">
          <div className={`font-bold ${product.rtoPercentage != null && product.rtoPercentage <= 10 ? 'text-dark-positive' : product.rtoPercentage != null && product.rtoPercentage <= 20 ? 'text-dark-cta' : 'text-dark-negative'}`}>
            {product.rtoPercentage != null ? product.rtoPercentage + '%' : '-'}
          </div>
        </td>
        <td className="py-4 px-6">
          <div className="font-bold text-dark-primary">{formatCurrency(product.revenue)}</div>
        </td>
        <td className="py-4 px-6">
          <div className="font-medium text-dark-primary">{product.quantitySold}</div>
        </td>
        <td className="py-4 px-6">
          <div className="flex items-center gap-2">
            <span className="font-medium text-dark-primary">₹{product.quantitySold ? Math.round(product.revenue / product.quantitySold).toLocaleString() : '0'}</span>
            {product.revenue > 0 ? (
              <TrendingUp className="h-4 w-4 text-dark-positive" />
            ) : (
              <TrendingDown className="h-4 w-4 text-dark-negative" />
            )}
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
          <h1 className="text-3xl font-bold text-dark-primary">Product Catalog</h1>
          <p className="text-dark-secondary">Performance analytics for your product catalog</p>
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
              <p className="text-sm text-dark-secondary">Total Products</p>
              <Package className="h-4 w-4 text-dark-cta" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">{cards?.totalProducts ?? 0}</p>
            {/* <p className="text-xs text-dark-positive">+2 this month</p> */}
          </div>
        </Card>
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Avg ROAS</p>
              <TrendingUp className="h-4 w-4 text-dark-positive" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">{cards?.avgRoas ?? 0}x</p>
            {/* <p className="text-xs text-dark-positive">+0.3x from last month</p> */}
          </div>
        </Card>
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Total Revenue</p>
              <IndianRupee className="h-4 w-4 text-dark-positive" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">{formatCurrency(cards?.totalRevenue ?? 0)}</p>
            {/* <p className="text-xs text-dark-positive">+18.4% from last month</p> */}
          </div>
        </Card>
        <Card className="dark-card p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-secondary">Avg RTO</p>
              <Package className="h-4 w-4 text-dark-negative" />
            </div>
            <p className="text-2xl font-bold text-dark-primary">{cards?.avgRto ?? 0}%</p>
            {/* <p className="text-xs text-dark-negative">+2.1% from last month</p> */}
          </div>
        </Card>
      </div>

      {/* Performance Sections */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Best Performing Products */}
        <Card className="dark-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-dark-positive" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-primary">Best Performing</h3>
                <p className="text-sm text-dark-secondary">Highest ROAS Products</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {bestPerformingProducts.map((product: any, index: number) => (
                <div key={product.productId} className="flex items-center gap-3 p-3 bg-dark-hover rounded-lg">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image ?? undefined}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark-primary text-sm truncate">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-dark-positive font-bold">{product.roas != null ? product.roas + 'x ROAS' : '-'}</span>
                      <span className="text-dark-secondary">•</span>
                      <span className="text-dark-secondary">{formatCurrency(product.revenue)}</span>
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

        {/* Worst Performing Products */}
        <Card className="dark-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-dark-negative" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-primary">Worst Performing</h3>
                <p className="text-sm text-dark-secondary">Highest RTO Products</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {worstPerformingProducts.map((product: any, index: number) => (
                <div key={product.productId} className="flex items-center gap-3 p-3 bg-red-600/5 rounded-lg border border-red-600/20">
                  <ImageWithFallback
                    src={product.image ?? undefined}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark-primary text-sm truncate">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-dark-negative font-bold">{product.rtoPercentage != null ? product.rtoPercentage + '% RTO' : '-'}</span>
                      <span className="text-dark-secondary">•</span>
                      <span className="text-dark-secondary">{product.roas != null ? product.roas + 'x ROAS' : '-'}</span>
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
                Consider optimizing or pausing ads for high RTO products
              </div>
            </div>
          </div>
        </Card>

        {/* Top Revenue Products */}
        <Card className="dark-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <IndianRupee className="h-5 w-5 text-dark-cta" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-primary">Top Revenue</h3>
                <p className="text-sm text-dark-secondary">Highest Revenue Products</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {topRevenueProducts.map((product: any, index: number) => (
                <div key={product.productId} className="flex items-center gap-3 p-3 bg-dark-hover rounded-lg">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image ?? undefined}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark-primary text-sm truncate">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-dark-cta font-bold">{formatCurrency(product.revenue)}</span>
                      <span className="text-dark-secondary">•</span>
                      <span className="text-dark-secondary">{product.quantitySold} orders</span>
                    </div>
                  </div>
                  <Badge className="bg-blue-600/20 text-blue-400 text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-blue-600/10 rounded-lg border border-blue-600/20">
              <div className="text-xs text-blue-400 font-medium">💡 Insight</div>
              <div className="text-xs text-dark-secondary mt-1">
                Focus marketing spend on top revenue generators
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
            placeholder="Search products..."
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
            
            {/* AOV Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-dark-hover text-dark-primary cursor-pointer">
                <IndianRupee className="h-4 w-4 mr-2" />
                AOV
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="dark-card border-dark-border">
                <DropdownMenuItem 
                  onClick={() => setSortBy('aov-asc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'aov-asc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Low → High
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('aov-desc')}
                  className={`cursor-pointer hover:bg-dark-hover ${sortBy === 'aov-desc' ? 'bg-dark-hover text-dark-cta' : 'text-dark-primary'}`}
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

            {/* RTO Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-dark-hover text-dark-primary cursor-pointer">
                <Package className="h-4 w-4 mr-2" />
                RTO
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-dark-secondary">
          Showing {filteredProducts.length} of {totalValues || filteredProducts.length} products
          {sortBy !== 'none' && ` • Sorted by ${getSortLabel(sortBy)}`}
        </p>
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: any) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      ) : (
        <Card className="dark-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">Product</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">ROAS</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">RTO</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">Net Sales</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">Orders</th>
                  <th className="text-left py-4 px-6 text-dark-primary font-medium">AOV</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => (
                  <ProductTableRow key={product.productId} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-dark-secondary mx-auto mb-4" />
          <p className="text-dark-secondary">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}