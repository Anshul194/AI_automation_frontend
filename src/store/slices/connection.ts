// Shopify Connect
export const fetchShopifyConnectUrl = async (userId: string, shopDomain: string): Promise<string> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.post(
      `/v1/integrations/shopify/connect`,
      { shopDomain },
      {
        params: {
          userId,
          redirectUrl: "http://localhost:3000/api/v1/integrations/shopify/callback",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    // API returns { success, data: { url } }
    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;
    }
    return response.data.url || response.data.redirectUrl || response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message || 'Failed to fetch Shopify connect URL';
  }
};
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosConfig';

interface ConnectionState {
  authUrl: string;
  tokens: {
    access_token: string;
    refresh_token: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConnectionState = {
  authUrl: '',
  tokens: null,
  loading: false,
  error: null,
};

// Async actions
export const fetchGoogleAuthUrl = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('/google-analytics/auth-url');
    return response.data.url;
  } catch (error: any) {
    throw error.response?.data?.message || error.message || 'Failed to fetch auth URL';
  }
};

export const fetchGoogleTokens = async (code: string): Promise<{ access_token: string; refresh_token: string }> => {
  try {
    const response = await axiosInstance.post('/google-analytics/tokens', { code });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message || 'Failed to fetch tokens';
  }
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setAuthUrl(state, action: PayloadAction<string>) {
      state.authUrl = action.payload;
    },
    setTokens(state, action: PayloadAction<{ access_token: string; refresh_token: string }>) {
      state.tokens = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetConnectionState(state) {
      state.authUrl = '';
      state.tokens = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAuthUrl, setTokens, setLoading, setError, resetConnectionState } = connectionSlice.actions;
export default connectionSlice.reducer;
