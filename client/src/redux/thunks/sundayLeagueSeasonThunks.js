import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCurrentSeason = createAsyncThunk(
  'sundayLeagueSeasons/fetchCurrentSeason',
  async () => {
    const response = await api.request('get', null, `/sunday-league/season/`);
    return response;
  }
);
