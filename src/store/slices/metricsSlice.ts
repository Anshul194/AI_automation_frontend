import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosConfig';

interface MetricsData {
  kpiData?: any[];
  genderPerformanceData?: any[];
  agePerformanceData?: any[];
  placementData?: any[];
  recommendations?: any[];
  [key: string]: any;
}

interface LocationPerformanceData {
  locationData: any[];
  locationSummary: any;
  top5ByRoas: any[];
  bottom3ByRto: any[];
  highRtoAlert: string | null;
  dateRange: any;
}

interface AgePerformanceData {
  ageData: any[];
  summary: any;
  topPerformingAge: any;
  worstPerformingAge: any;
}

interface GenderPerformanceData {
  genderData: any[];
  summary: any;
  bestPerformingGender: string;
  insight: string;
}

interface AIRecommendationData {
  id: string;
  type: 'critical' | 'opportunity' | 'optimize';
  title: string;
  description: string;
  impact: string;
  action: string;
  priority: number;
  createdAt: string;
}

interface FunnelStep {
  name: string;
  count: number;
  percentage: number;
  change: string;
}

interface TrafficSource {
  name: string;
  visitors: number;
  conversions: number;
  cvr: number;
  revenue: number;
  roas: number;
}

interface CohortRetention {
  cohortMonth: string;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

interface FunnelData {
  funnelSteps: FunnelStep[];
  overallConversion: number;
  avgOrderValue: number;
  totalRevenue: number;
  cartAbandonment: number;
  trafficSources: TrafficSource[];
  cohortRetention: CohortRetention[];
}

interface MetricsState {
  data: MetricsData | null;
  loading: boolean;
  error: string | null;
  locationPerformance: LocationPerformanceData | null;
  locationLoading: boolean;
  locationError: string | null;
  agePerformance: AgePerformanceData | null;
  ageLoading: boolean;
  ageError: string | null;
  placementPerformance: PlacementPerformanceData | null;
  placementLoading: boolean;
  placementError: string | null;
  genderPerformance: GenderPerformanceData | null;
  genderLoading: boolean;
  genderError: string | null;
  aiRecommendations: AIRecommendationData[] | null;
  aiRecommendationsLoading: boolean;
  aiRecommendationsError: string | null;
  funnelData: FunnelData | null;
  funnelLoading: boolean;
  funnelError: string | null;
}

const initialState: MetricsState = {
  data: null,
  loading: false,
  error: null,
  locationPerformance: null,
  locationLoading: false,
  locationError: null,
  agePerformance: null,
  ageLoading: false,
  ageError: null,
  placementPerformance: null,
  placementLoading: false,
  placementError: null,
  genderPerformance: null,
  genderLoading: false,
  genderError: null,
  aiRecommendations: null,
  aiRecommendationsLoading: false,
  aiRecommendationsError: null,
  funnelData: null,
  funnelLoading: false,
  funnelError: null,
};

// Helper function to format currency
const formatCurrency = (value: number): string => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};

// Helper function to calculate percentage change (mock for now)
const calculateChange = (value: number): string => {
  // This is a placeholder - you can implement actual change calculation
  return '+0%';
};

// Async thunk to fetch location performance data
export const fetchLocationPerformance = createAsyncThunk(
  'metrics/fetchLocationPerformance',
  async ({ startDate, endDate }: { startDate: string; endDate: string }, { rejectWithValue }) => {
    try {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        throw new Error('User not found in localStorage');
      }

      const userData = JSON.parse(userString);
      const userId = userData?._id;
      
      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      const response = await axiosInstance.get(
        `/location-performance/?startDate=${startDate}&endDate=${endDate}&userId=${userId}`
      );
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch location performance'
      );
    }
  }
);

// Async thunk to fetch age-wise performance data
export const fetchAgePerformance = createAsyncThunk(
  'metrics/fetchAgePerformance',
  async (_, { rejectWithValue }) => {
    try {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        throw new Error('User not found in localStorage');
      }

      const userData = JSON.parse(userString);
      const userId = userData?._id;
      
      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      const response = await axiosInstance.get(
        `/meta-insights/age-wise-summary?userId=${userId}`
      );
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch age performance'
      );
    }
  }
);

// Async thunk to fetch placement-wise performance data
export const fetchPlacementPerformance = createAsyncThunk(
  'metrics/fetchPlacementPerformance',
  async (_, { rejectWithValue }) => {
    try {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        throw new Error('User not found in localStorage');
      }

      const userData = JSON.parse(userString);
      const userId = userData?._id;
      
      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      const response = await axiosInstance.get(
        `/placement-performance/placement-wise-roas?userId=${userId}`
      );
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch placement performance'
      );
    }
  }
);

// Async thunk to fetch user metrics
export const fetchUserMetrics = createAsyncThunk(
  'metrics/fetchUserMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        throw new Error('User not found in localStorage');
      }

      const userData = JSON.parse(userString);
      const userId = userData?._id;
      
      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      const response = await axiosInstance.get(
        `/integrations/user/metrics?userId=${userId}`
      );
      
      const apiData = response.data.data;

      // Transform API data to dashboard format
      const transformedData: MetricsData = {
        kpiData: [
          {
            title: "Total Revenue",
            value: formatCurrency(apiData.totalRevenue || 0),
            change: calculateChange(apiData.totalRevenue),
            trend: "up",
            subtitle: "Shopify"
          },
          {
            title: "Total Orders",
            value: apiData.totalOrders?.toLocaleString() || "0",
            change: calculateChange(apiData.totalOrders),
            trend: "up",
            subtitle: "Last 30 days"
          },
          {
            title: "Total Ad Spend",
            value: formatCurrency(apiData.totalAdSpend || 0),
            change: calculateChange(apiData.totalAdSpend),
            trend: apiData.totalAdSpend > 0 ? "up" : "down",
            subtitle: "Meta Ads"
          },
          {
            title: "Blended ROAS",
            value: apiData.blendedROAS ? `${apiData.blendedROAS.toFixed(1)}x` : "0x",
            change: calculateChange(apiData.blendedROAS),
            trend: apiData.blendedROAS > 0 ? "up" : "down",
            subtitle: "Return on Ad Spend"
          },
          {
            title: "Avg Order Value",
            value: formatCurrency(apiData.averageOrderValue || 0),
            change: calculateChange(apiData.averageOrderValue),
            trend: "up",
            subtitle: "Per Order"
          }
        ],
        socialMediaRevenue: apiData.socialMediaRevenue,
        socialMediaOrders: apiData.socialMediaOrders,
        conversionRate: apiData.conversionRate,
        totalClicks: apiData.totalClicks,
        totalImpressions: apiData.totalImpressions,
        // Keep empty arrays for sections without API data yet
        genderPerformanceData: [],
        agePerformanceData: [],
        placementData: [],
        recommendations: []
      };
      
      return transformedData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch metrics'
      );
    }
  }
);

// Async thunk to fetch gender performance
export const fetchGenderPerformance = createAsyncThunk(
  'metrics/fetchGenderPerformance',
  async (_, { rejectWithValue }) => {
    try {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        throw new Error('User not found in localStorage');
      }

      const userData = JSON.parse(userString);
      const userId = userData?._id;
      
      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      const response = await axiosInstance.get(
        `/gender-performance?userId=${userId}`
      );

      console.log('Gender Performance API Response:', response.data);
      
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch gender performance'
      );
    }
  }
);

// Async thunk to fetch AI recommendations
export const fetchAIRecommendations = createAsyncThunk(
  'metrics/fetchAIRecommendations',
  async (_, { rejectWithValue }) => {
    try {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        throw new Error('User not found in localStorage');
      }

      const userData = JSON.parse(userString);
      const userId = userData?._id;
      
      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      const response = await axiosInstance.get(
        `/ai/latest-recommendations?userId=${userId}`
      );
      
      console.log('AI Recommendations API Response:', response.data);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch AI recommendations'
      );
    }
  }
);

// Async thunk to fetch funnel analytics data
export const fetchFunnelData = createAsyncThunk(
  'metrics/fetchFunnelData',
  async ({ startDate, endDate }: { startDate?: string; endDate?: string } = {}, { rejectWithValue }) => {
    try {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        throw new Error('User not found in localStorage');
      }

      const userData = JSON.parse(userString);
      const userId = userData?._id;
      
      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      // Build query parameters
      const params = new URLSearchParams({ userId });
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await axiosInstance.get(
        `/funnel-analytics?${params.toString()}`
      );
      
      console.log('Funnel Analytics API Response:', response.data);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch funnel analytics'
      );
    }
  }
);

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    clearMetrics: (state) => {
      state.data = null;
      state.error = null;
    },
    clearLocationPerformance: (state) => {
      state.locationPerformance = null;
      state.locationError = null;
    },
    clearAgePerformance: (state) => {
      state.agePerformance = null;
      state.ageError = null;
    },
    clearPlacementPerformance: (state) => {
      state.placementPerformance = null;
      state.placementError = null;
    },
    clearGenderPerformance: (state) => {
      state.genderPerformance = null;
      state.genderError = null;
    },
    clearAIRecommendations: (state) => {
      state.aiRecommendations = null;
      state.aiRecommendationsError = null;
    },
    clearFunnelData: (state) => {
      state.funnelData = null;
      state.funnelError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMetrics.fulfilled, (state, action: PayloadAction<MetricsData>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Location performance thunk handlers
      .addCase(fetchLocationPerformance.pending, (state) => {
        state.locationLoading = true;
        state.locationError = null;
      })
      .addCase(fetchLocationPerformance.fulfilled, (state, action: PayloadAction<any>) => {
        state.locationLoading = false;
        
        // Transform API data to component format
        const apiData = action.payload.data;
        
        if (apiData && apiData.allStates) {
          // Helper function to determine color based on ROAS
          const getColorByRoas = (roas: number): string => {
            if (roas >= 4.0) return '#22C55E';
            if (roas >= 3.5) return '#3B82F6';
            if (roas >= 2.5) return '#F59E0B';
            if (roas >= 1.5) return '#EF4444';
            return '#DC2626';
          };

          // Transform allStates data to match component format
          const transformedLocationData = apiData.allStates
            .filter((state: any) => state.totalOrders > 0) // Only include states with orders
            .map((state: any) => ({
              state: state.state,
              roas: parseFloat(state.roas.toFixed(1)),
              rto: parseFloat(state.rtoRate.toFixed(0)),
              color: getColorByRoas(state.roas),
              totalOrders: state.totalOrders,
              totalRevenue: state.totalRevenue,
              totalSpend: state.totalSpend,
              averageOrderValue: state.averageOrderValue
            }))
            .sort((a: any, b: any) => b.roas - a.roas); // Sort by ROAS descending

          state.locationPerformance = {
            locationData: transformedLocationData,
            locationSummary: apiData.summary,
            top5ByRoas: apiData.top5ByRoas,
            bottom3ByRto: apiData.bottom3ByRto,
            highRtoAlert: apiData.highRtoAlert,
            dateRange: apiData.dateRange
          };
        }
        
        state.locationError = null;
      })
      .addCase(fetchLocationPerformance.rejected, (state, action) => {
        state.locationLoading = false;
        state.locationError = action.payload as string;
      })
      // Age performance thunk handlers
      .addCase(fetchAgePerformance.pending, (state) => {
        state.ageLoading = true;
        state.ageError = null;
      })
      .addCase(fetchAgePerformance.fulfilled, (state, action: PayloadAction<any>) => {
        state.ageLoading = false;
        
        const apiData = action.payload.data;
        
        if (apiData) {
          // Combine top and bottom performers into one array
          const allAgeGroups = [
            ...(apiData.topPerformers || []),
            ...(apiData.bottomPerformers || [])
          ];

          // Transform age groups data
          const transformedAgeData = allAgeGroups
            .filter((age: any) => age.ageGroup !== 'Unknown') // Filter out Unknown age group
            .map((age: any) => ({
              age: age.ageGroup,
              roas: parseFloat(age.roas?.toFixed(1) || 0),
              rto: 0, // RTO not available in this API
              orders: age.totalPurchases || 0,
              spend: age.totalSpend || 0,
              revenue: age.totalPurchaseValue || 0,
              clicks: age.totalClicks || 0,
              impressions: age.totalImpressions || 0,
              ctr: age.ctr || 0,
              cpm: age.cpm || 0
            }))
            .sort((a: any, b: any) => b.roas - a.roas); // Sort by ROAS descending

          // Get top and worst performers from the best and worst age groups in summary
          const topPerformer = apiData.topPerformers?.[0] || apiData.summary?.bestAgeGroup;
          const worstPerformer = apiData.bottomPerformers?.[0] || apiData.summary?.worstAgeGroup;

          state.agePerformance = {
            ageData: transformedAgeData,
            summary: apiData.summary,
            topPerformingAge: topPerformer ? {
              ageRange: topPerformer.ageGroup || topPerformer.ageGroup,
              roas: topPerformer.roas || 0,
              totalPurchases: topPerformer.totalPurchases || topPerformer.purchases || 0,
              totalSpend: topPerformer.totalSpend || topPerformer.spend || 0,
              revenue: topPerformer.totalPurchaseValue || topPerformer.revenue || 0,
              rtoRate: 0
            } : null,
            worstPerformingAge: worstPerformer ? {
              ageRange: worstPerformer.ageGroup || worstPerformer.ageGroup,
              roas: worstPerformer.roas || 0,
              totalPurchases: worstPerformer.totalPurchases || worstPerformer.purchases || 0,
              totalSpend: worstPerformer.totalSpend || worstPerformer.spend || 0,
              revenue: worstPerformer.totalPurchaseValue || worstPerformer.revenue || 0,
              rtoRate: 0
            } : null
          };
        }
        
        state.ageError = null;
      })
      .addCase(fetchAgePerformance.rejected, (state, action) => {
        state.ageLoading = false;
        state.ageError = action.payload as string;
      })
      // Placement performance thunk handlers
      .addCase(fetchPlacementPerformance.pending, (state) => {
        state.placementLoading = true;
        state.placementError = null;
      })
      .addCase(fetchPlacementPerformance.fulfilled, (state, action: PayloadAction<any>) => {
        state.placementLoading = false;
        
        const apiData = action.payload.data;
        
        if (apiData && apiData.placements) {
          // Helper function to format placement name
          const formatPlacementName = (placement: string): string => {
            const nameMap: { [key: string]: string } = {
              'unknown': 'Unknown',
              'instagram': 'Instagram',
              'facebook': 'Facebook',
              'audience_network': 'Audience Network',
              'threads': 'Threads',
              'messenger': 'Messenger',
              'instagram_feed': 'Instagram Feed',
              'facebook_feed': 'Facebook Feed',
              'instagram_stories': 'Instagram Stories',
              'instagram_reels': 'Instagram Reels'
            };
            return nameMap[placement] || placement.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          };

          // Transform placements data
          const transformedPlacements = apiData.placements.map((placement: any) => ({
            platform: formatPlacementName(placement.placement),
            spend: parseFloat((placement.spendShare || 0).toFixed(2)),
            roas: parseFloat((placement.roas || 0).toFixed(1)),
            rto: parseFloat((placement.rtoPercentage || 0).toFixed(0)),
            totalSpend: placement.totalSpend || 0,
            totalRevenue: placement.totalPurchaseValue || 0,
            totalOrders: placement.totalPurchases || 0,
            clicks: placement.totalClicks || 0,
            impressions: placement.totalImpressions || 0,
            reach: placement.totalReach || 0,
            ctr: parseFloat((placement.ctr || 0).toFixed(2)),
            cpm: parseFloat((placement.cpm || 0).toFixed(2)),
            cpc: parseFloat((placement.cpc || 0).toFixed(2)),
            returnedOrders: placement.returnedOrders || 0,
            cancelledOrders: placement.cancelledOrders || 0
          }));

          state.placementPerformance = {
            placements: transformedPlacements,
            summary: apiData.summary,
            bestPerformer: apiData.summary?.bestPlacement,
            worstPerformer: apiData.summary?.worstPlacement
          };
        }
        
        state.placementError = null;
      })
      .addCase(fetchPlacementPerformance.rejected, (state, action) => {
        state.placementLoading = false;
        state.placementError = action.payload as string;
      })
      // Gender performance thunk handlers
      .addCase(fetchGenderPerformance.pending, (state) => {
        state.genderLoading = true;
        state.genderError = null;
      })
      .addCase(fetchGenderPerformance.fulfilled, (state, action: PayloadAction<any>) => {
        state.genderLoading = false;

        console.log('Gender Performance API Data:', action.payload);
        
        // Transform API data to component format
        const apiData = action.payload;
        
        if (apiData) {
          // Transform the data to match the expected format
          const transformedGenderData = [
            {
              gender: 'Male',
              roas: parseFloat((apiData.male?.roas || 0).toFixed(1)),
              rto: parseFloat(((apiData.male?.rtoRate || 0) * 100).toFixed(0)),
              orders: apiData.male?.totalOrders || 0,
              spend: 0, // Spend not provided in API
              revenue: apiData.male?.totalRevenue || 0,
              clicks: 0, // Not provided
              impressions: 0 // Not provided
            },
            {
              gender: 'Female',
              roas: parseFloat((apiData.female?.roas || 0).toFixed(1)),
              rto: parseFloat(((apiData.female?.rtoRate || 0) * 100).toFixed(0)),
              orders: apiData.female?.totalOrders || 0,
              spend: 0, // Spend not provided in API
              revenue: apiData.female?.totalRevenue || 0,
              clicks: 0, // Not provided
              impressions: 0 // Not provided
            }
          ];

          state.genderPerformance = {
            genderData: transformedGenderData,
            bestPerformingGender: apiData.bestPerformingGender || 'Male',
            insight: apiData.insight || 'Gender performance analysis available'
          };
        }
        
        state.genderError = null;
      })
      .addCase(fetchGenderPerformance.rejected, (state, action) => {
        state.genderLoading = false;
        state.genderError = action.payload as string;
      })
      // AI recommendations thunk handlers
      .addCase(fetchAIRecommendations.pending, (state) => {
        state.aiRecommendationsLoading = true;
        state.aiRecommendationsError = null;
      })
      .addCase(fetchAIRecommendations.fulfilled, (state, action: PayloadAction<any>) => {
        state.aiRecommendationsLoading = false;
        
        // Transform API data to component format
        const apiData = action.payload;
        
        // Handle the nested structure: response.data.data[0].recommendations
        const recommendations = apiData?.data?.[0]?.recommendations;
        
        if (recommendations && Array.isArray(recommendations)) {
          // Transform the data to match the expected format
          const transformedRecommendations = recommendations.map((rec: any) => ({
            id: rec._id || rec.id || Math.random().toString(),
            type: rec.type === 'critical' ? 'critical' : 
                  rec.type === 'growth' ? 'opportunity' : 
                  rec.type === 'trend' ? 'optimize' : 'optimize',
            title: rec.title || 'AI Recommendation',
            description: rec.description || 'No description available',
            impact: rec.reasoning || 'Impact analysis available',
            action: rec.action || 'Take Action',
            priority: rec.priority || 1,
            createdAt: new Date().toISOString()
          }));

          state.aiRecommendations = transformedRecommendations;
        } else {
          state.aiRecommendations = [];
        }
        
        state.aiRecommendationsError = null;
      })
      .addCase(fetchAIRecommendations.rejected, (state, action) => {
        state.aiRecommendationsLoading = false;
        state.aiRecommendationsError = action.payload as string;
      })
      // Funnel data thunk handlers
      .addCase(fetchFunnelData.pending, (state) => {
        state.funnelLoading = true;
        state.funnelError = null;
      })
      .addCase(fetchFunnelData.fulfilled, (state, action: PayloadAction<any>) => {
        state.funnelLoading = false;
        
        const apiData = action.payload.data || action.payload;
        
        if (apiData) {
          // Transform API data to component format
          const transformedFunnelData: FunnelData = {
            funnelSteps: apiData.funnelSteps || [
              {
                name: 'Website Visitors',
                count: apiData.visitors || 45680,
                percentage: 100,
                change: '+0.8%'
              },
              {
                name: 'Add to Cart',
                count: apiData.addToCart || 17105,
                percentage: 37.5,
                change: '-50.1%'
              },
              {
                name: 'Checkout Started',
                count: apiData.checkoutStarted || 8552,
                percentage: 18.7,
                change: '-50.0%'
              },
              {
                name: 'Payment Initiated',
                count: apiData.paymentInitiated || 0,
                percentage: 0,
                change: '0%'
              },
              {
                name: 'Purchases',
                count: apiData.purchases || 2740,
                percentage: 6.0,
                change: '-67.9%'
              }
            ],
            overallConversion: apiData.overallConversion || 6.0,
            avgOrderValue: apiData.avgOrderValue || 298,
            totalRevenue: apiData.totalRevenue || 460000,
            cartAbandonment: apiData.cartAbandonment || 37.1,
            trafficSources: apiData.trafficSources || [
              {
                name: 'Facebook Ads',
                visitors: 12500,
                conversions: 420,
                cvr: 3.36,
                revenue: 125000,
                roas: 2.8
              },
              {
                name: 'Instagram Ads',
                visitors: 8200,
                conversions: 328,
                cvr: 4.0,
                revenue: 98000,
                roas: 3.2
              },
              {
                name: 'Google Ads',
                visitors: 15300,
                conversions: 765,
                cvr: 5.0,
                revenue: 228000,
                roas: 4.1
              },
              {
                name: 'Organic',
                visitors: 9700,
                conversions: 963,
                cvr: 9.92,
                revenue: 287000,
                roas: Infinity
              }
            ],
            cohortRetention: apiData.cohortRetention || [
              { cohortMonth: 'Jan', week1: 85, week2: 62, week3: 45, week4: 28 },
              { cohortMonth: 'Feb', week1: 88, week2: 65, week3: 48, week4: 31 },
              { cohortMonth: 'Mar', week1: 91, week2: 68, week3: 52, week4: 35 }
            ]
          };
          
          state.funnelData = transformedFunnelData;
        }
        
        state.funnelError = null;
      })
      .addCase(fetchFunnelData.rejected, (state, action) => {
        state.funnelLoading = false;
        state.funnelError = action.payload as string;
      });
  },
});

export const { clearMetrics, clearLocationPerformance, clearAgePerformance, clearPlacementPerformance, clearGenderPerformance, clearAIRecommendations, clearFunnelData } = metricsSlice.actions;
export default metricsSlice.reducer;