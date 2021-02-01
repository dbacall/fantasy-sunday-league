import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentGameweek,
  fetchSpecificGameweek,
} from '../thunks/sundayLeagueGameweekThunks';

const initialState = {
  gameweek: {},
  status: 'loading',
};

const sundayLeagueGameweekSlice = createSlice({
  name: 'sundayLeagueGameweek',
  initialState,
  reducers: {
    // updateSundayLeagues(state, action) {
    //   return { ...state, leagues: action.payload };
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentGameweek.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentGameweek.fulfilled, (state, action) => {
        state.gameweek = action.payload.data;
        state.status = 'idle';
      })
      .addCase(fetchSpecificGameweek.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecificGameweek.fulfilled, (state, action) => {
        state.gameweek = action.payload.data;
        state.status = 'idle';
      });
  },
});

export const {} = sundayLeagueGameweekSlice.actions;

export default sundayLeagueGameweekSlice.reducer;
