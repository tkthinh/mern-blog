import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  email: string;
  photoUrl: string;
}

interface UserState {
  currentUser: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actionStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    actionSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    actionFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actionStart, actionSuccess, actionFailed } = userSlice.actions;

export default userSlice.reducer;
