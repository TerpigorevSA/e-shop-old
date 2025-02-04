import { createSlice } from '@reduxjs/toolkit';
import { resetState } from '../../../shared/actions/actions';
import { clearToken } from 'src/shared/lib/localStorage';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    signout: () => {
      setAuthenticated(null);
      clearToken();
    }
    // setUnauthenticated: (state) => {
    //   state.token = null;
    //   state.isAuthenticated = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
    // .addCase(signin.pending, (state) => {
    //   state.status = 'loading';
    //   state.isAuthenticated = false;
    //   state.error = null;
    // })
    // .addCase(signin.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.token = action.payload.token;
    //   state.isAuthenticated = true;
    // })
    // .addCase(signin.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.isAuthenticated = false;
    //   state.error = action.payload as string;
    // })
    // .addCase(signup.pending, (state) => {
    //   state.status = 'loading';
    //   state.isAuthenticated = false;
    //   state.error = null;
    // })
    // .addCase(signup.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.token = action.payload.token;
    //   state.isAuthenticated = true;
    // })
    // .addCase(signup.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.payload as string;
    //   state.isAuthenticated = false;
    // })
    // .addCase(signout.fulfilled, (state) => {
    //   state.token = null;
    //   state.isAuthenticated = false;
    //   state.status = 'idle';
    // });
  },
});

export const { setAuthenticated, signout } = authSlice.actions;
export default authSlice.reducer;
