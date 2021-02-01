import React, { useState, useEffect, useRef } from 'react';
import SundayFixture from './sundayFixtureComponent';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixture } from '../../redux/thunks/sundayLeagueFixtureThunks';
import { fetchSundayLeagueTeams } from '../../redux/thunks/sundayLeagueTeamThunks';

const SundayFixtureContainer = ({ fixtureId }) => {
  const dispatch = useDispatch();

  const [goalAdded, setGoalAdded] = useState(false);

  const { fixture, status } = useSelector((state) => state.sundayLeagueFixture);

  const { teams } = useSelector((state) => state.sundayLeagueTeam);

  const { season } = useSelector((state) => state.sundayLeagueSeason);

  const isInitialMount = useRef(true);


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      dispatch(fetchFixture(fixtureId));
    }
    if (goalAdded) {
      dispatch(fetchFixture(fixtureId));
      setGoalAdded(false);
    }
  }, [goalAdded]);

  const createNewGoal = async (minute, player, team) => {
    const data = {
      fixture: fixtureId,
      minute,
      player,
      season: season._id,
      team,
    };

    const path = '/sunday-league/goal';

    await api.request('post', data, path);
    setGoalAdded(true);
  };

  return (
    <SundayFixture
      createNewGoal={createNewGoal}
      fixture={fixture}
      status={status}
      teams={teams}
    />
  );
};

export default SundayFixtureContainer;
