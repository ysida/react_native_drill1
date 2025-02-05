// slices/contentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

export interface ContentItem {
  id: number;
  title: string;
  body: string;
}

interface ContentState {
  data: ContentItem[] | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;  // Timestamp for caching
}

const initialState: ContentState = {
  data: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Define a TTL (in milliseconds) for caching (e.g., 60 seconds)
const CACHE_TTL = 60000;

export const fetchContent = createAsyncThunk<
  ContentItem[],
  void,
  { state: RootState; rejectValue: string }
>(
  'content/fetchContent',
  async (_, thunkAPI) => {
    try {
      // Set timeout to 5000ms (5 seconds)
      const response = await axios.get<ContentItem[]>('http://jsonplaceholder.typicode.com/posts', {
        timeout: 5000,
      });
      return response.data;
    } catch (error: any) {
      console.log("Error during fetchContent:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    // Condition function: if the data was fetched recently, cancel the request.
    condition: (_, { getState }) => {
      const { content } = getState() as RootState;
      const now = Date.now();
      if (content.lastFetched && now - content.lastFetched < CACHE_TTL) {
        // Returning false cancels the thunk
        return false;
      }
      return true;
    },
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    deleteContentItem(state, action: PayloadAction<number>) {
      if (state.data) {
        state.data = state.data.filter(item => item.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.lastFetched = Date.now(); // Update the cache timestamp
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch content';
    });
  },
});

export const { deleteContentItem } = contentSlice.actions;
export default contentSlice.reducer;
