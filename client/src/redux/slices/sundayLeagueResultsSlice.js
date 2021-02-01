import { createSlice } from '@reduxjs/toolkit';
import { fetchResults } from '../thunks/sundayLeagueResultsThunks';

const initialState = {
  results: [],
  status: 'loading',
};

const sundayLeagueResultsSlice = createSlice({
  name: 'sundayLeagueResults',
  initialState,
  reducers: {
    // updateCurrentResults(state, action) {
    //   state.currentResults = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.results = action.payload.data;
        state.status = 'idle';
      });
  },
});

export const { } = sundayLeagueResultsSlice.actions;

export default sundayLeagueResultsSlice.reducer;
