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
    userStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    userSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    userFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userClear: (state) => {
      (state.currentUser = null), (state.error = null), (state.loading = false);
    },
  },
});

export const { userStart, userSuccess, userFailed, userClear } = userSlice.actions;

export default userSlice.reducer;
