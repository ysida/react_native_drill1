// slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  name: string;
  // add more fields as needed
}

interface AuthState {
  userProfile: UserProfile | null;
}

const initialState: AuthState = {
  userProfile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
    },
    logout(state) {
      state.userProfile = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
