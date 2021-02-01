import React, { useState, useEffect, useRef } from 'react';
import SundayFixtures from './sundayFixturesComponent';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpecificGameweek } from '../../redux/thunks/sundayLeagueGameweekThunks';
import { fetchSundayLeagueTeams } from '../../redux/thunks/sundayLeagueTeamThunks'

const SundayFixturesContainer = () => {
  const dispatch = useDispatch();

  const [fixtureAdded, setFixtureAdded] = useState(false);

  const sundayLeagueTeam = useSelector((state) => state.sundayLeagueTeam);
  const { teams } = sundayLeagueTeam
  const teamsStatus = sundayLeagueTeam.status
  const { gameweek, status } = useSelector(
    (state) => state.sundayLeagueGameweek
  );

  const { season } = useSelector((state) => state.sundayLeagueSeason);

  // const { currentLeague } = useSelector((state) => state.sundayLeague)

  // const isInitialMount = useRef(true);

  useEffect(() => {
    // if (isInitialMount.current) {
    //   console.log('here');
    //   isInitialMount.current = false;
    // }
    if (fixtureAdded) {
      dispatch(
        fetchSpecificGameweek({ season: season._id, number: gameweek.number })
      );
      setFixtureAdded(false);
    }
  }, [fixtureAdded]);

  const createNewFixture = async (homeTeam, awayTeam, date) => {
    const data = {
      homeTeam,
      awayTeam,
      date,
      gameweek: gameweek.id,
    };

    const path = '/sunday-league/fixture';

    await api.request('post', data, path);
    setFixtureAdded(true);
  };

  return (
    <SundayFixtures
      createNewFixture={createNewFixture}
      teams={teams}
      gameweek={gameweek}
      status={status}
      teamsStatus={teamsStatus}
    />
  );
};

export default SundayFixturesContainer;
