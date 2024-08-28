import { createSlice } from '@reduxjs/toolkit';

interface ActionState {
  error: string | null;
  loading: boolean;
}

const initialState: ActionState = {
  error: null,
  loading: false,
};

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    actionStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    actionSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    actionFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    actionClear: (state) => {
      (state.error = null), (state.loading = false);
    },
  },
});

export const { actionStart, actionSuccess, actionFailed, actionClear } = actionSlice.actions;

export default actionSlice.reducer;
