import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

interface FaqState {
  faqs: Faq[];
  loading: boolean;
  error: string | null;
}

const initialState: FaqState = {
  faqs: [],
  loading: false,
  error: null,
};


export const fetchFaqs = createAsyncThunk('faq/fetchFaqs', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3000/api/faqs', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        // Handle API response: { success, message, data: [...] }
        if (action.payload && Array.isArray(action.payload.data)) {
          state.faqs = action.payload.data;
        } else if (Array.isArray(action.payload)) {
          state.faqs = action.payload;
        } else {
          state.faqs = [];
        }
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default faqSlice.reducer;
