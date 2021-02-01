import React, { useState, useEffect, useRef } from 'react';
import CreateSundayTeams from './createSundayTeamsComponent'
import api from '../../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSundayLeagues } from '../../../redux/slices/sundayLeagueSlice'
import { fetchSundayLeagueTeams } from '../../../redux/thunks/sundayLeagueTeamThunks';
import { setTeamsAdded } from '../../../redux/slices/sundayCreatorSlice'

const CreateSundayTeamsContainer = () => {
  const dispatch = useDispatch();

  const [teamAdded, setTeamAdded] = useState(false);

  const { user } = useSelector((state) => state.auth)

  const { teams, status } = useSelector((state) => state.sundayLeagueTeam);

  const sundayLeague = useSelector((state) => state.sundayLeague);
  const { currentLeague } = sundayLeague
  const leagueStatus = sundayLeague.status

  const submitTeam = async (name) => {
    const data = {
      name,
      league: currentLeague.id,
    };

    const path = '/sunday-league/team';

    api.request('post', data, path);

    setTeamAdded(true);
  };


  const isInitialMount = useRef(true);

  useEffect(() => {

    if (
      isInitialMount.current
    ) {
      isInitialMount.current = false;
      dispatch(fetchSundayLeagues(user.id))
      dispatch(fetchSundayLeagueTeams(currentLeague.id));
    }
    if (teamAdded) {
      dispatch(fetchSundayLeagueTeams(currentLeague.id));
      setTeamAdded(false);
    }
  }, [teamAdded, currentLeague]);

  const finishTeams = () => {
    dispatch(setTeamsAdded(true))
  }

  return (<CreateSundayTeams
    submitTeam={submitTeam}
    teams={teams}
    status={status}
    leagueStatus={leagueStatus}
    finishTeams={finishTeams}
  />);
}

export default CreateSundayTeamsContainer;