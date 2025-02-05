// slices/contentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ContentItem {
  id: number;
  title: string;
  body: string;
}

interface ContentState {
  data: ContentItem[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchContent = createAsyncThunk<ContentItem[], void, { rejectValue: string }>(
  'content/fetchContent',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ContentItem[]>('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
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
  extraReducers: builder => {
    builder.addCase(fetchContent.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch content';
    });
  },
});

export const { deleteContentItem } = contentSlice.actions;
export default contentSlice.reducer;
