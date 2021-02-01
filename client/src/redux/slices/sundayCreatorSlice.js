import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leagueCreated: false,
  teamsAdded: false,
  seasonAdded: false,
};

const sundayCreatorSlice = createSlice({
  name: 'sundayCreator',
  initialState,
  reducers: {
    reset(state, action) {
      state.leagueCreated = false
      state.teamsAdded = false
      state.seasonAdded = false

    },
    setLeagueCreated(state, action) {
      state.leagueCreated = action.payload;
    },
    setTeamsAdded(state, action) {
      state.teamsAdded = action.payload;
    },
    setSeasonAdded(state, action) {
      state.seasonAdded = action.payload;
    },
  },
});

export const { reset, setLeagueCreated, setTeamsAdded, setSeasonAdded } = sundayCreatorSlice.actions;

export default sundayCreatorSlice.reducer;
