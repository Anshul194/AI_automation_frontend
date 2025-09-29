import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../../axiosConfig';

interface GoogleAnalyticsProperty {
    id: string;
    name: string;
    // Add other relevant fields as needed
}

interface GoogleAnalyticsState {
    properties: GoogleAnalyticsProperty[];
    loading: boolean;
    error: string | null;
}

const initialState: GoogleAnalyticsState = {
    properties: [],
    loading: false,
    error: null,
};

export const fetchGoogleAnalyticsProperties = createAsyncThunk<
    GoogleAnalyticsProperty[],
    { access_token: string },
    { rejectValue: string }
>(
    'googleAnalytics/fetchProperties',
    async ({ access_token }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                '/google-analytics/list-properties',
                { access_token },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Google Analytics Properties Response:', response.data);
            // Handle API response: { success, message, data: [...] }
            if (response.data && Array.isArray(response.data.data)) {
                return response.data.data;
            }
            return [];
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export interface GoogleAnalyticsDataRequest {
    access_token: string;
    propertyId: string;
    startDate: string;
    endDate: string;
}

export interface GoogleAnalyticsDataResponse {
    // Define the expected response structure from your API
    // Example:
    sessions?: number;
    users?: number;
    // Add other relevant fields as needed
    [key: string]: any;
}

export const fetchGoogleAnalyticsData = createAsyncThunk<
    GoogleAnalyticsDataResponse,
    GoogleAnalyticsDataRequest,
    { rejectValue: string }
>(
    'googleAnalytics/fetchAnalyticsData',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                '/google-analytics/fetch-analytics-data',
                {
                    access_token: params.access_token,
                    propertyId: params.propertyId,
                    startDate: params.startDate,
                    endDate: params.endDate,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${params.access_token}`,
                    },
                }
            );
            console.log('Google Analytics Data Response:', response.data);
            if (response.data) {
                return response.data;
            }
            return {};
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const googleAnalyticsSlice = createSlice({
    name: 'googleAnalytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoogleAnalyticsProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoogleAnalyticsProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchGoogleAnalyticsProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchGoogleAnalyticsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoogleAnalyticsData.fulfilled, (state) => {
                state.loading = false;
                // Handle the fetched analytics data as needed
            })
            .addCase(fetchGoogleAnalyticsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default googleAnalyticsSlice.reducer;