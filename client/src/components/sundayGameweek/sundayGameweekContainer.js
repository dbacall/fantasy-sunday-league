
import React, { useState, useEffect, useRef } from 'react';
import SundayGameweek from './sundayGameweekComponent';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCurrentGameweek,
  fetchSpecificGameweek,
} from '../../redux/thunks/sundayLeagueGameweekThunks';

const SundayGameweekContainer = () => {
  const dispatch = useDispatch();

  const [GameweekAdded, setGameweekAdded] = useState(false);

  const { gameweek, status } = useSelector(
    (state) => state.sundayLeagueGameweek
  );

  const { season } = useSelector((state) => state.sundayLeagueSeason);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current && (!gameweek || Object.keys(gameweek).length === 0)) {
      isInitialMount.current = false;
      dispatch(fetchCurrentGameweek(season._id));
    }
    if (GameweekAdded) {
      dispatch(fetchCurrentGameweek(season._id));
      setGameweekAdded(false);
    }
  }, [GameweekAdded]);

  const createNewGameweek = async () => {
    const number = gameweek ? gameweek.number + 1 : 1;
    const data = {
      number,
      season: season._id,
    };

    const path = '/sunday-league/gameweek';

    await api.request('post', data, path);
    setGameweekAdded(true);
  };

  const getPrevious = () => {
    const number = gameweek.number - 1;
    dispatch(fetchSpecificGameweek({ season: season._id, number }));
  };

  const getNext = () => {
    const number = gameweek.number + 1;
    dispatch(fetchSpecificGameweek({ season: season._id, number }));
  };

  const completeGameweek = async () => {
    const path = `/sunday-league/gameweek/${gameweek.id}/complete`;

    await api.request('put', null, path);
  }

  return (
    <SundayGameweek
      createNewGameweek={createNewGameweek}
      gameweek={gameweek}
      status={status}
      getPrevious={getPrevious}
      getNext={getNext}
      completeGameweek={completeGameweek}
    />
  );
};

export default SundayGameweekContainer;
