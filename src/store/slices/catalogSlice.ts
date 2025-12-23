import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
type Product = {
  productId: number;
  name: string;
  handle: string;
  productLink: string;
  image: string | null;
  revenue: number;
  quantitySold: number;
  quantityReturned: number;
  rtoPercentage: number;
  adSpend: number | null;
  roas: number | null;
  pVal: number;
  acc: number | null;
  metaAdId: string | null;
  matchedAdCount: number;
  matchReason: string | null;
};

type CatalogCards = {
  totalProducts: number;
  avgRoas: number;
  totalRevenue: number;
  avgRto: number;
};

type CatalogLists = {
  bestPerforming: Product[];
  worstPerforming: Product[];
  topRevenue: Product[];
};

type CatalogState = {
  loading: boolean;
  error: string | null;
  cards: CatalogCards | null;
  lists: CatalogLists | null;
  products: Product[];
  totalValues: number;
  totalPages: number;
  currentPage: number;
};

const initialState: CatalogState = {
  loading: false,
  error: null,
  cards: null,
  lists: null,
  products: [],
  totalValues: 0,
  totalPages: 0,
  currentPage: 1,
};

export const fetchCatalogDashboard = createAsyncThunk(
  'catalog/fetchDashboard',
  async (userId: string) => {
    const res = await axios.get(
      `http://localhost:3000/api/products-roas/product-analytics-dashboard?userId=${userId}`
    );
    return res.data;
  }
);

export const fetchCatalogProducts = createAsyncThunk(
  'catalog/fetchProducts',
  async ({ userId, page }: { userId: string; page: number }) => {
    const res = await axios.get(
      `http://localhost:3000/api/products-roas/products-roas?userId=${userId}&page=${page}`
    );
    return res.data;
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalogDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload.cards;
        state.lists = action.payload.lists;
      })
      .addCase(fetchCatalogDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard';
      })
      .addCase(fetchCatalogProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalogProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalValues = action.payload.totalValues;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCatalogProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setPage } = catalogSlice.actions;
export default catalogSlice.reducer;
