import React, { useState, useEffect, useRef } from 'react';
import SundaySeason from './sundaySeasonComponent';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentSeason } from '../../redux/thunks/sundayLeagueSeasonThunks';

const SundaySeasonContainer = ({ league }) => {
  const dispatch = useDispatch();

  const [seasonAdded, setSeasonAdded] = useState(false);

  const { season, status } = useSelector((state) => state.sundayLeagueSeason);

  const isInitialMount = useRef(true);



  useEffect(() => {
    if (isInitialMount.current && Object.keys(season).length === 0) {
      isInitialMount.current = false;
      dispatch(fetchCurrentSeason());
    }
    if (seasonAdded) {
      dispatch(fetchCurrentSeason());
      setSeasonAdded(false);
    }
  }, [seasonAdded]);

  const createNewSeason = async (yearFrom, yearTo) => {
    const number = season ? season.number + 1 : 1;
    const data = {
      number,
      yearFrom,
      yearTo,
      league: league.id,
    };

    const path = '/sunday-league/season';

    await api.request('post', data, path);
    setSeasonAdded(true);
  };

  return (
    <SundaySeason
      createNewSeason={createNewSeason}
      season={season}
      status={status}
    />
  );
};

export default SundaySeasonContainer;
