import { createSlice } from '@reduxjs/toolkit';
import { fetchSundayLeagueTeams } from '../thunks/sundayLeagueTeamThunks';

const initialState = {
  currentTeam: {},
  teams: [],
  status: 'loading',
};

const sundayLeagueTeamSlice = createSlice({
  name: 'sundayLeagueTeam',
  initialState,
  reducers: {
    updateCurrentTeam(state, action) {
      state.currentTeam = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSundayLeagueTeams.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchSundayLeagueTeams.fulfilled, (state, action) => {
        state.teams = action.payload.data;
        state.status = 'idle';
      });
  },
});

export const { updateCurrentTeam } = sundayLeagueTeamSlice.actions;

export default sundayLeagueTeamSlice.reducer;
