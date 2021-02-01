import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchFixture = createAsyncThunk(
  'sundayLeagueFixture/fetchFixture',
  async (id) => {
    const response = await api.request(
      'get',
      null,
      `/sunday-league/fixture/${id}/current`
    );
    console.log('response', response);
    return response;
  }
);
