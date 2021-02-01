import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCurrentGameweek = createAsyncThunk(
  'sundayLeagueGameweek/fetchCurrentGameweek',
  async (seasonId) => {
    const response = await api.request(
      'get',
      null,
      `/sunday-league/gameweek/${seasonId}/current`
    );

    return response;
  }
);

export const fetchSpecificGameweek = createAsyncThunk(
  'sundayLeagueGameweek/fetchSpecificGameweek',
  async ({ season, number }) => {
    const response = await api.request(
      'get',
      null,
      `/sunday-league/gameweek/${season}/${number}`
    );

    return response;
  }
);
