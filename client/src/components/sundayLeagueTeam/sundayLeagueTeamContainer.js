import React, { useState, useEffect, useRef } from 'react';
import SundayLeagueTeam from './sundayLeagueTeamComponent';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSundayLeaguePlayers } from '../../redux/thunks/sundayLeaguePlayerThunks';
import { updateCurrentTeam } from '../../redux/slices/sundayLeagueTeamSlice';

const SundayLeagueTeamContainer = ({ location }) => {
  const dispatch = useDispatch();

  const [playerAdded, setPlayerAdded] = useState(false);

  const { players, status } = useSelector((state) => state.sundayLeaguePlayer);
  const { currentTeam } = useSelector((state) => state.sundayLeagueTeam);
  const { team } = location.state;

  const [currentTeamUpdated, setCurrentTeamUpdated] = useState(false);

  useEffect(() => {
    dispatch(updateCurrentTeam(team));
    setCurrentTeamUpdated(true);
  }, [team]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (
      isInitialMount.current &&
      (players.length === 0 || currentTeamUpdated)
    ) {
      isInitialMount.current = false;
      dispatch(fetchSundayLeaguePlayers(team.id));
    }
    if (playerAdded) {
      dispatch(fetchSundayLeaguePlayers(team.id));
      setPlayerAdded(false);
    }
  }, [playerAdded, currentTeam]);

  const submitPlayer = async (firstName, surname, position) => {
    const data = {
      firstName,
      surname,
      position,
      team: team.id,
    };

    const path = '/sunday-league/player';

    api.request('post', data, path);

    setPlayerAdded(true);
  };

  return (
    <SundayLeagueTeam
      team={team}
      submitPlayer={submitPlayer}
      players={players}
      status={status}
    />
  );
};

export default SundayLeagueTeamContainer;
