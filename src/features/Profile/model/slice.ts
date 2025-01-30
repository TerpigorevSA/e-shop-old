import { createSlice } from '@reduxjs/toolkit';
import { changePassword, getProfile, updateProfile } from '../../../entities/User/model/thunks';
import { clearCurrentUser, setCurrentUser } from '../../../entities/User/model/slice';
import { resetState } from '../../../shared/actions/actions';

interface ProfileState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | string[];
}

const initialState: ProfileState = {
  status: 'idle',
  error: null,
};

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(getProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(setCurrentUser, (state) => {
        state.status = 'succeeded';
      })
      .addCase(clearCurrentUser, (state) => {
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default ProfileSlice.reducer;
