import { createSlice } from '@reduxjs/toolkit';
import { fetchFixture } from '../thunks/sundayLeagueFixtureThunks';

const initialState = {
  fixture: {},
  status: 'loading',
};

const sundayLeagueFixtureSlice = createSlice({
  name: 'sundayLeagueFixture',
  initialState,
  reducers: {
    // updateSundayLeagues(state, action) {
    //   return { ...state, leagues: action.payload };
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixture.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFixture.fulfilled, (state, action) => {
        state.fixture = action.payload.data;
        state.status = 'idle';
      });
  },
});

export const {} = sundayLeagueFixtureSlice.actions;

export default sundayLeagueFixtureSlice.reducer;
