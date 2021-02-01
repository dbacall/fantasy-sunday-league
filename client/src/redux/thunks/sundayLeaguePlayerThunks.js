import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchSundayLeaguePlayers = createAsyncThunk(
  'sundayLeaguePlayers/fetchSundayLeaguePlayers',
  async (id) => {
    const response = await api.request(
      'get',
      null,
      `/sunday-league/player/${id}/team`
    );
    return response;
  }
);
