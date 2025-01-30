import { createSlice } from '@reduxjs/toolkit';
import { signin, signup, signout } from './thunks';
import { resetState } from '../../../shared/actions/actions';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | string[];
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setUnauthenticated: (state) => {
      state.status = 'idle';
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(signout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
      });
  },
});

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
