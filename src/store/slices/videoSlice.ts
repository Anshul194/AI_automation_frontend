import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../axiosConfig';

type VideoItem = {
  ad_id: string;
  ad_name: string;
  account_id: string;
  account_name: string;
  video_3sec_views: number;
  impressions: number;
  hook_rate: number;
  roas: number;
  add_to_cart: number;
  purchase: number;
  rto: number;
  frequency: number;
  thumbnail_url: string;
  website_url?: string;
};

type VideoAnalyticsResponse = {
  success: boolean;
  best_roas?: VideoItem[];
  best_hook?: VideoItem[];
  low_roas?: VideoItem[];
  low_hook?: VideoItem[];
  total_videos?: number;
  avg_hook_rate?: number;
  avg_roas?: number;
  total_revenue?: number;
};

type VideoState = {
  loading: boolean;
  error: string | null;
  bestRoas: VideoItem[];
  bestHook: VideoItem[];
  lowRoas: VideoItem[];
  lowHook: VideoItem[];
  summary: {
    total_videos: number;
    avg_hook_rate: number;
    avg_roas: number;
    total_revenue: number;
  } | null;
  accounts: Array<{
    account_id: string;
    account_name: string;
    currency: string;
    ads: VideoItem[];
  }>;
};

const initialState: VideoState = {
  loading: false,
  error: null,
  bestRoas: [],
  bestHook: [],
  lowRoas: [],
  lowHook: [],
  summary: null,
  accounts: [],
};

export const fetchBestVideoAds = createAsyncThunk(
  'video/fetchBestVideoAds',
  async (userId: string) => {
    const url = `/meta-ads/best-video-ads`;
    const res = await axios.get<VideoAnalyticsResponse>(url, { params: { userId } });
    return res.data;
  }
);

export const fetchVideoAnalytics = createAsyncThunk(
  'video/fetchVideoAnalytics',
  async (userId: string) => {
    const url = `/meta-ads/video-analytics`;
    const res = await axios.get<VideoAnalyticsResponse>(url, { params: { userId } });
    console.log('fetchVideoAnalytics response:', res.data);
    return res.data;
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestVideoAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestVideoAds.fulfilled, (state, action: PayloadAction<VideoAnalyticsResponse>) => {
        state.loading = false;
        // Only overwrite lists when the payload provides non-empty arrays.
        if (action.payload.best_roas && action.payload.best_roas.length) {
          state.bestRoas = action.payload.best_roas;
        }
        if (action.payload.best_hook && action.payload.best_hook.length) {
          state.bestHook = action.payload.best_hook;
        }
        if (action.payload.low_roas && action.payload.low_roas.length) {
          state.lowRoas = action.payload.low_roas;
        }
        if (action.payload.low_hook && action.payload.low_hook.length) {
          state.lowHook = action.payload.low_hook;
        }
        state.summary = {
          total_videos: action.payload.total_videos ?? (state.summary?.total_videos || 0),
          avg_hook_rate: action.payload.avg_hook_rate ?? (state.summary?.avg_hook_rate || 0),
          avg_roas: action.payload.avg_roas ?? (state.summary?.avg_roas || 0),
          total_revenue: action.payload.total_revenue ?? (state.summary?.total_revenue || 0),
        };
      })
      .addCase(fetchBestVideoAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load best video ads';
      })

      .addCase(fetchVideoAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoAnalytics.fulfilled, (state, action: PayloadAction<VideoAnalyticsResponse>) => {
        state.loading = false;

        console.log('fetchVideoAnalytics fulfilled with payload:', action.payload);
        // If API returned `accounts`, store them and aggregate their `ads` where appropriate.
        const payloadAny: any = action.payload as any;
        if (payloadAny.accounts && Array.isArray(payloadAny.accounts)) {
          state.accounts = payloadAny.accounts;
          const allAds: VideoItem[] = payloadAny.accounts.flatMap((a: any) => a.ads || []);
          state.bestRoas = payloadAny.best_roas && payloadAny.best_roas.length ? payloadAny.best_roas : allAds;
          state.bestHook = payloadAny.best_hook || [];
          state.lowRoas = payloadAny.low_roas || [];
          state.lowHook = payloadAny.low_hook || [];
          state.summary = {
            total_videos: payloadAny.total_videos || (state.summary?.total_videos || allAds.length || 0),
            avg_hook_rate: payloadAny.avg_hook_rate || (state.summary?.avg_hook_rate || 0),
            avg_roas: payloadAny.avg_roas || (state.summary?.avg_roas || 0),
            total_revenue: payloadAny.total_revenue || (state.summary?.total_revenue || 0),
          };
        } else {
          if (action.payload.best_roas) state.bestRoas = action.payload.best_roas;
          if (action.payload.best_hook) state.bestHook = action.payload.best_hook;
          if (action.payload.low_roas) state.lowRoas = action.payload.low_roas;
          if (action.payload.low_hook) state.lowHook = action.payload.low_hook;
          state.summary = {
            total_videos: action.payload.total_videos || (state.summary?.total_videos || 0),
            avg_hook_rate: action.payload.avg_hook_rate || (state.summary?.avg_hook_rate || 0),
            avg_roas: action.payload.avg_roas || (state.summary?.avg_roas || 0),
            total_revenue: action.payload.total_revenue || (state.summary?.total_revenue || 0),
          };
        }
      })
      .addCase(fetchVideoAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load video analytics';
      });
  },
});

export const { clearError } = videoSlice.actions;
export default videoSlice.reducer;
