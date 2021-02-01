import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchResults = createAsyncThunk(
  'sundayLeagueResults/fetchResults',
  async (teams) => {
    const teamsString = JSON.stringify(teams)
    const response = await api.request(
      'get',
      null,
      `/sunday-league/season/results/${teamsString}`
    );

    return response;
  }
);
