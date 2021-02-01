import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentSeason } from '../thunks/sundayLeagueSeasonThunks';

const initialState = {
  season: {},
  status: 'loading',
};

const sundayLeagueSeasonSlice = createSlice({
  name: 'sundayLeagueSeason',
  initialState,
  reducers: {
    // updateSundayLeagues(state, action) {
    //   return { ...state, leagues: action.payload };
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentSeason.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentSeason.fulfilled, (state, action) => {
        state.season = action.payload.data;
        state.status = 'idle';
      });
  },
});

export const {} = sundayLeagueSeasonSlice.actions;

export default sundayLeagueSeasonSlice.reducer;
