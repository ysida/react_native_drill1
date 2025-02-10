import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  name: string;
}

interface AuthState {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userProfile: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk<
  UserProfile, // Return type on success
  { email: string; password: string }, // Thunk argument type
  { rejectValue: string } // Rejection value type
>(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    // Simulate an asynchronous authentication request with a 2-second delay.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // always return a user as per directions
    return { id: '1', name: email };

    // // hard-coded credentials
    // // Check credentials against hard-coded values.
    // if (email === 'user' && password === 'password123') {
    //   return { id: '1', name: email };
    // } else {
    //   return thunkAPI.rejectWithValue('Invalid credentials');
    // }

  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.userProfile = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Login failed';
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
